import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import toast from "react-hot-toast";

import { getCourseSection, deleteSectionLesson } from "../api/courseApi";
import { getQuizzes } from "../api/quizApi";

import Button from "../components/common/Button";
import DeleteModal from "../components/common/DeleteModal";
import PageLoader from "../components/common/PageLoader";
import { getApiErrorMessage } from "../utils/apiError";

function QuizRows({ quizzes, onEdit }) {
  if (!quizzes.length) {
    return (
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
        No quizzes added here yet.
      </p>
    );
  }

  return (
    <div className="mt-3 space-y-2">
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="flex flex-col gap-2 rounded-lg border border-gray-200 px-3 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700"
        >
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {quiz.title}
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {quiz.questions_count ?? 0} questions · {quiz.duration_minutes}{" "}
              min · {quiz.status}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onEdit(quiz.id)}
            className="self-start rounded-md px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900/20"
          >
            Edit Quiz
          </button>
        </div>
      ))}
    </div>
  );
}

const formatDuration = (seconds) => {
  if (seconds === null || seconds === undefined) {
    return "-";
  }

  const total = Number(seconds);

  if (!Number.isFinite(total)) {
    return "-";
  }

  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const remaining = total % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      remaining,
    ).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remaining).padStart(2, "0")}`;
};

export default function VideoSectionLessons() {
  const { id: sectionId } = useParams();
  const [searchParams] = useSearchParams();

  const courseId = searchParams.get("course_id");

  const navigate = useNavigate();
  const location = useLocation();

  const [section, setSection] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadSection = async () => {
    try {
      setLoading(true);

      const response = await getCourseSection(courseId, sectionId);
      setSection(response.data);

      try {
        const quizResponse = await getQuizzes();

        setQuizzes(Array.isArray(quizResponse?.data) ? quizResponse.data : []);
      } catch (quizError) {
        console.error("Failed to load section quizzes:", quizError);
        setQuizzes([]);
        toast.error("Section loaded, but quizzes could not be loaded.");
      }
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!courseId || !sectionId) {
      toast.error("Course or section information is missing.");
      navigate("/video-sections");
      return;
    }

    loadSection();
  }, [courseId, sectionId, navigate]);

  const handleDelete = (lesson) => {
    setSelectedLesson(lesson);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedLesson) {
      return;
    }

    try {
      setDeletingId(selectedLesson.id);

      await deleteSectionLesson(sectionId, selectedLesson.id);

      toast.success("Lesson deleted successfully.");

      setDeleteModalOpen(false);
      setSelectedLesson(null);

      await loadSection();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  const openCreateQuiz = (placement) => {
    navigate("/quizzes/create", {
      state: {
        placement,
        returnTo: `${location.pathname}${location.search}`,
      },
    });
  };

  const openEditQuiz = (quizId) => {
    navigate(`/quizzes/${quizId}/edit`, {
      state: {
        returnTo: `${location.pathname}${location.search}`,
      },
    });
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!section) {
    return null;
  }

  const lessons = Array.isArray(section.lessons) ? section.lessons : [];

  const sectionQuizzes = quizzes.filter(
    (quiz) =>
      Number(quiz.course_id) === Number(section.course_id) &&
      Number(quiz.course_section_id) === Number(section.id) &&
      !quiz.course_lesson_id,
  );

  return (
    <>
      <div className="space-y-6">
        {/* Section header */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              {section.course?.course_name}
            </p>

            <h1 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {section.title}
            </h1>

            {section.description && (
              <p className="mt-2 max-w-3xl text-sm text-gray-500 dark:text-gray-400">
                {section.description}
              </p>
            )}
          </div>

          <Button
            type="button"
            onClick={() =>
              navigate(
                `/video-sections/${section.id}/edit?course_id=${section.course_id}`,
              )
            }
          >
            Edit Section
          </Button>
        </div>

        {/* Section information */}

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Lessons
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {lessons.length}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Section Order
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {section.sort_order}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Status
            </p>

            <p className="mt-1 text-sm font-semibold capitalize text-gray-900 dark:text-white">
              {section.status}
            </p>
          </div>
        </div>

        {/* Lessons and videos */}

        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="border-b border-gray-200 p-5 dark:border-gray-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Lessons & Videos
            </h2>
          </div>

          {lessons.length === 0 ? (
            <div className="p-10 text-center text-sm text-gray-500">
              No lessons found.
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {lessons.map((lesson, index) => {
                const lessonQuizzes = quizzes.filter(
                  (quiz) =>
                    Number(quiz.course_id) === Number(section.course_id) &&
                    Number(quiz.course_section_id) === Number(section.id) &&
                    Number(quiz.course_lesson_id) === Number(lesson.id),
                );

                return (
                  <div key={lesson.id} className="p-5">
                    <div className="flex flex-col gap-5 lg:flex-row">
                      {/* Video preview */}
                      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black lg:w-[360px]">
                        {/* <div className="w-full overflow-hidden rounded-lg bg-black lg:w-[360px]"> */}
                        {lesson.video_url ? (
                          <video
                            className="absolute inset-0 block h-full w-full object-contain"
                            src={lesson.video_url}
                            controls
                            controlsList="nodownload"
                            // className="aspect-video w-full"
                          />
                        ) : (
                          <div className="flex aspect-video items-center justify-center text-sm text-gray-400">
                            No video
                          </div>
                        )}
                      </div>

                      {/* Lesson details */}

                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                              Lesson {index + 1}
                            </p>

                            <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                              {lesson.title}
                            </h3>
                          </div>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              lesson.status === "published"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                            }`}
                          >
                            {lesson.status}
                          </span>
                        </div>

                        {lesson.description && (
                          <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                            {lesson.description}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>
                            Duration: {formatDuration(lesson.duration_seconds)}
                          </span>

                          {lesson.is_preview && (
                            <span className="font-medium text-blue-600 dark:text-blue-400">
                              Free Preview
                            </span>
                          )}
                        </div>

                        <div className="mt-5 flex gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/video-sections/${section.id}/edit?course_id=${section.course_id}`,
                              )
                            }
                            className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(lesson)}
                            disabled={deletingId === lesson.id}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            {deletingId === lesson.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>

                        {/* Lesson quiz */}

                        <div className="mt-5 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                                Lesson Quiz
                              </p>

                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Assessment for "{lesson.title}".
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                openCreateQuiz({
                                  course_id: Number(section.course_id),
                                  course_section_id: Number(section.id),
                                  course_lesson_id: Number(lesson.id),
                                })
                              }
                              className="rounded-lg border border-blue-600 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900/20"
                            >
                              + Add Lesson Quiz
                            </button>
                          </div>

                          <QuizRows
                            quizzes={lessonQuizzes}
                            onEdit={openEditQuiz}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Module quiz */}

        <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Module Assessment
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Quiz covering all lessons in {section.title}.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                openCreateQuiz({
                  course_id: Number(section.course_id),
                  course_section_id: Number(section.id),
                  course_lesson_id: null,
                })
              }
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            >
              + Add Module Quiz
            </button>
          </div>

          <QuizRows quizzes={sectionQuizzes} onEdit={openEditQuiz} />
        </section>
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          if (deletingId) {
            return;
          }

          setDeleteModalOpen(false);
          setSelectedLesson(null);
        }}
        onConfirm={confirmDelete}
        name={selectedLesson?.title}
        loading={!!deletingId}
      />
    </>
  );
}
