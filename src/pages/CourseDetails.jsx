// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import { getCourse } from "../api/courseApi";
// import PageLoader from "../components/common/PageLoader";
// import Button from "../components/common/Button";
// import { getApiErrorMessage } from "../utils/apiError";

// export default function CourseDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchCourse = async () => {
//     try {
//       setLoading(true);

//       const response = await getCourse(id);

//       setCourse(response.data);
//     } catch (error) {
//       console.error("Failed to fetch course:", error);

//       toast.error(getApiErrorMessage(error));

//       navigate("/courses");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourse();
//   }, [id]);

//   if (loading) {
//     return <PageLoader />;
//   }

//   if (!course) {
//     return null;
//   }

//   return (
//     <div className="space-y-6">
//       {/* ============================================================= */}
//       {/* HEADER */}
//       {/* ============================================================= */}

//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//             {course.course_name}
//           </h1>

//           <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//             Course details
//           </p>
//         </div>

//         <Button
//           type="button"
//           onClick={() => navigate(`/courses/${course.id}/edit`)}
//         >
//           Edit Course
//         </Button>
//       </div>

//       {/* ============================================================= */}
//       {/* BASIC INFORMATION */}
//       {/* ============================================================= */}

//       <div className="grid gap-6 md:grid-cols-2">
//         <InfoCard title="Category" value={course.category} />

//         <InfoCard title="Level" value={course.level} />

//         <InfoCard title="Duration" value={course.duration || "-"} />

//         <InfoCard title="Total Hours" value={course.total_hours ?? "-"} />

//         <InfoCard title="Status" value={course.status} />
//       </div>

//       {/* ============================================================= */}
//       {/* SHORT DESCRIPTION */}
//       {/* ============================================================= */}

//       <ContentCard title="Short Description">
//         {course.short_description || "No description available."}
//       </ContentCard>

//       {/* ============================================================= */}
//       {/* COURSE DESCRIPTION */}
//       {/* ============================================================= */}

//       <ContentCard title="Course Description">
//         {course.course_description || "No description available."}
//       </ContentCard>

//       {/* ============================================================= */}
//       {/* COURSE INFORMATION */}
//       {/* ============================================================= */}

//       <ArrayCard title="Learning Outcomes" items={course.learning_outcomes} />

//       <ArrayCard title="Prerequisites" items={course.prerequisites} />

//       <ArrayCard title="Who Should Join" items={course.who_should_join} />

//       <ArrayCard title="Course Features" items={course.course_features} />

//       {/* ============================================================= */}
//       {/* CURRICULUM */}
//       {/* ============================================================= */}

//       <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//         <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
//           Curriculum
//         </h2>

//         <div className="space-y-5">
//           {!course.curriculum?.length ? (
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               No curriculum information added.
//             </p>
//           ) : (
//             course.curriculum.map((module, index) => (
//               <div
//                 key={index}
//                 className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
//               >
//                 <h3 className="font-semibold text-gray-900 dark:text-white">
//                   {index + 1}. {module.title}
//                 </h3>

//                 {module.description && (
//                   <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                     {module.description}
//                   </p>
//                 )}

//                 {module.topics?.length > 0 && (
//                   <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-400">
//                     {module.topics.map((topic, topicIndex) => (
//                       <li key={topicIndex}>{topic}</li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </section>

//       {/* ============================================================= */}
//       {/* VIDEO CURRICULUM */}
//       {/* ============================================================= */}

//       <VideoCurriculum sections={course.sections} />

//       {/* ============================================================= */}
//       {/* FAQs */}
//       {/* ============================================================= */}

//       <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//         <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
//           FAQs
//         </h2>

//         {!course.faqs?.length ? (
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             No FAQs added.
//           </p>
//         ) : (
//           <div className="space-y-5">
//             {course.faqs.map((faq, index) => (
//               <div key={index}>
//                 <h3 className="font-medium text-gray-900 dark:text-white">
//                   {faq.question}
//                 </h3>

//                 <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
//                   {faq.answer}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Video Curriculum
// |--------------------------------------------------------------------------
// */

// function VideoCurriculum({ sections }) {
//   const hasSections = Array.isArray(sections) && sections.length > 0;

//   return (
//     <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//       <div className="mb-5">
//         <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//           Video Curriculum
//         </h2>

//         <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//           Video sections and lessons for this course.
//         </p>
//       </div>

//       {!hasSections ? (
//         <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             No video sections have been added to this course yet.
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {sections.map((section, sectionIndex) => (
//             <VideoSection
//               key={section.id}
//               section={section}
//               sectionIndex={sectionIndex}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Video Section
// |--------------------------------------------------------------------------
// */

// function VideoSection({ section, sectionIndex }) {
//   const lessons = Array.isArray(section.lessons) ? section.lessons : [];

//   return (
//     <details
//       open={sectionIndex === 0}
//       className="group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
//     >
//       <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-gray-50 px-5 py-4 dark:bg-gray-800">
//         <div className="min-w-0">
//           <div className="flex items-center gap-3">
//             <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
//               {sectionIndex + 1}
//             </span>

//             <h3 className="truncate font-semibold text-gray-900 dark:text-white">
//               {section.title}
//             </h3>
//           </div>

//           {section.description && (
//             <p className="mt-2 pl-11 text-sm text-gray-500 dark:text-gray-400">
//               {section.description}
//             </p>
//           )}
//         </div>

//         <div className="flex shrink-0 items-center gap-3">
//           <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
//             {lessons.length} {lessons.length === 1 ? "Lesson" : "Lessons"}
//           </span>

//           <span className="text-gray-500 transition-transform group-open:rotate-180 dark:text-gray-400">
//             ▼
//           </span>
//         </div>
//       </summary>

//       <div className="border-t border-gray-200 dark:border-gray-700">
//         {!lessons.length ? (
//           <div className="px-5 py-6 text-center">
//             <p className="text-sm text-gray-500 dark:text-gray-400">
//               No lessons added to this section.
//             </p>
//           </div>
//         ) : (
//           <div>
//             {lessons.map((lesson, lessonIndex) => (
//               <VideoLesson
//                 key={lesson.id}
//                 lesson={lesson}
//                 lessonIndex={lessonIndex}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </details>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Video Lesson
// |--------------------------------------------------------------------------
// */

// function VideoLesson({ lesson, lessonIndex }) {
//   return (
//     <div className="flex items-center gap-4 border-b border-gray-100 px-5 py-4 last:border-b-0 dark:border-gray-800">
//       {/* Play Icon */}

//       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
//         ▶
//       </div>

//       {/* Lesson Information */}

//       <div className="min-w-0 flex-1">
//         <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
//           <div className="min-w-0">
//             <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
//               {lessonIndex + 1}. {lesson.title}
//             </p>

//             {lesson.description && (
//               <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
//                 {lesson.description}
//               </p>
//             )}
//           </div>

//           {lesson.duration_seconds !== null &&
//             lesson.duration_seconds !== undefined && (
//               <span className="shrink-0 text-xs font-medium text-gray-500 dark:text-gray-400">
//                 {formatDuration(lesson.duration_seconds)}
//               </span>
//             )}
//         </div>

//         <div className="mt-2 flex flex-wrap gap-2">
//           <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
//             Video
//           </span>

//           {lesson.is_preview && (
//             <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
//               Preview
//             </span>
//           )}

//           <span
//             className={`rounded-full px-2.5 py-1 text-xs font-medium ${
//               lesson.status === "published"
//                 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
//                 : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
//             }`}
//           >
//             {lesson.status === "published" ? "Published" : "Draft"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Duration
// |--------------------------------------------------------------------------
// */

// function formatDuration(seconds) {
//   if (
//     seconds === null ||
//     seconds === undefined ||
//     !Number.isFinite(Number(seconds))
//   ) {
//     return "-";
//   }

//   const totalSeconds = Math.floor(Number(seconds));

//   const hours = Math.floor(totalSeconds / 3600);

//   const minutes = Math.floor((totalSeconds % 3600) / 60);

//   const remainingSeconds = totalSeconds % 60;

//   if (hours > 0) {
//     return `${hours}:${String(minutes).padStart(
//       2,
//       "0",
//     )}:${String(remainingSeconds).padStart(2, "0")}`;
//   }

//   return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
// }

// /*
// |--------------------------------------------------------------------------
// | Info Card
// |--------------------------------------------------------------------------
// */

// function InfoCard({ title, value }) {
//   return (
//     <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
//       <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

//       <p className="mt-2 font-semibold text-gray-900 dark:text-white">
//         {value}
//       </p>
//     </div>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Content Card
// |--------------------------------------------------------------------------
// */

// function ContentCard({ title, children }) {
//   return (
//     <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//       <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
//         {title}
//       </h2>

//       <p className="whitespace-pre-line text-sm leading-7 text-gray-600 dark:text-gray-400">
//         {children}
//       </p>
//     </section>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Array Card
// |--------------------------------------------------------------------------
// */

// function ArrayCard({ title, items }) {
//   return (
//     <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//       <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
//         {title}
//       </h2>

//       {!items?.length ? (
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           No information added.
//         </p>
//       ) : (
//         <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-400">
//           {items.map((item, index) => (
//             <li key={index}>{item}</li>
//           ))}
//         </ul>
//       )}
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getCourse } from "../api/courseApi";
import { getQuizzes } from "../api/quizApi";
import PageLoader from "../components/common/PageLoader";
import Button from "../components/common/Button";
import { getApiErrorMessage } from "../utils/apiError";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [course, setCourse] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourse = async () => {
    try {
      setLoading(true);

      const response = await getCourse(id);
      const courseData = response?.data;

      setCourse(courseData);

      try {
        const quizResponse = await getQuizzes();
        setQuizzes(Array.isArray(quizResponse?.data) ? quizResponse.data : []);
      } catch (quizError) {
        console.error("Failed to load course quizzes:", quizError);
        setQuizzes([]);
        toast.error("Course loaded, but quizzes could not be loaded.");
      }
    } catch (error) {
      console.error("Failed to fetch course:", error);
      toast.error(getApiErrorMessage(error));
      navigate("/courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleAddQuiz = (placement) => {
    navigate("/quizzes/create", {
      state: {
        placement,
        returnTo: location.pathname,
      },
    });
  };

  const handleEditQuiz = (quizId) => {
    navigate(`/quizzes/${quizId}/edit`, {
      state: {
        returnTo: location.pathname,
      },
    });
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!course) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {course.course_name}
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Course details
          </p>
        </div>

        <Button
          type="button"
          onClick={() => navigate(`/courses/${course.id}/edit`)}
        >
          Edit Course
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard title="Category" value={course.category} />
        <InfoCard title="Level" value={course.level} />
        <InfoCard title="Duration" value={course.duration || "-"} />
        <InfoCard title="Total Hours" value={course.total_hours ?? "-"} />
        <InfoCard title="Status" value={course.status} />
      </div>

      <ContentCard title="Short Description">
        {course.short_description || "No description available."}
      </ContentCard>

      <ContentCard title="Course Description">
        {course.course_description || "No description available."}
      </ContentCard>

      <ArrayCard title="Learning Outcomes" items={course.learning_outcomes} />
      <ArrayCard title="Prerequisites" items={course.prerequisites} />
      <ArrayCard title="Who Should Join" items={course.who_should_join} />
      <ArrayCard title="Course Features" items={course.course_features} />

      {course.curriculum?.length > 0 && (
        <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
            Curriculum
          </h2>

          <div className="space-y-5">
            {course.curriculum.map((module, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {index + 1}. {module.title}
                </h3>

                {module.description && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {module.description}
                  </p>
                )}

                {module.topics?.length > 0 && (
                  <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-400">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <VideoCurriculum
        courseId={course.id}
        sections={course.sections}
        quizzes={quizzes}
        onAddQuiz={handleAddQuiz}
        onEditQuiz={handleEditQuiz}
      />

      <CourseQuizPanel
        course={course}
        quizzes={quizzes}
        onAddQuiz={handleAddQuiz}
        onEditQuiz={handleEditQuiz}
      />

      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
          FAQs
        </h2>

        {!course.faqs?.length ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No FAQs added.
          </p>
        ) : (
          <div className="space-y-5">
            {course.faqs.map((faq, index) => (
              <div key={index}>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function CourseQuizPanel({ course, quizzes, onAddQuiz, onEditQuiz }) {
  const courseQuizzes = quizzes.filter(
    (quiz) =>
      Number(quiz.course_id) === Number(course.id) &&
      !quiz.course_section_id &&
      !quiz.course_lesson_id,
  );

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Course Assessments
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Quizzes that assess the complete course.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            onAddQuiz({
              course_id: Number(course.id),
              course_section_id: null,
              course_lesson_id: null,
            })
          }
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Add Course Quiz
        </button>
      </div>

      <QuizPlacementList
        quizzes={courseQuizzes}
        onEditQuiz={onEditQuiz}
        emptyText="No course-level quizzes have been added."
      />
    </section>
  );
}

function VideoCurriculum({
  courseId,
  sections,
  quizzes,
  onAddQuiz,
  onEditQuiz,
}) {
  const hasSections = Array.isArray(sections) && sections.length > 0;

  const totalLessons = (sections || []).reduce(
    (total, section) =>
      total + (Array.isArray(section.lessons) ? section.lessons.length : 0),
    0,
  );

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Video Curriculum
        </h2>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {sections?.length || 0} modules · {totalLessons} lessons. Add
          assessments at course, module or lesson level.
        </p>
      </div>

      {!hasSections ? (
        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No video sections have been added to this course yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((section, sectionIndex) => (
            <VideoSection
              key={section.id}
              courseId={courseId}
              section={section}
              sectionIndex={sectionIndex}
              quizzes={quizzes}
              onAddQuiz={onAddQuiz}
              onEditQuiz={onEditQuiz}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function VideoSection({
  courseId,
  section,
  sectionIndex,
  quizzes,
  onAddQuiz,
  onEditQuiz,
}) {
  const lessons = Array.isArray(section.lessons) ? section.lessons : [];

  const sectionQuizzes = quizzes.filter(
    (quiz) =>
      Number(quiz.course_id) === Number(courseId) &&
      Number(quiz.course_section_id) === Number(section.id) &&
      !quiz.course_lesson_id,
  );

  return (
    <details
      open={sectionIndex === 0}
      className="group overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 bg-gray-50 px-5 py-4 dark:bg-gray-800">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              {sectionIndex + 1}
            </span>

            <h3 className="truncate font-semibold text-gray-900 dark:text-white">
              {section.title}
            </h3>
          </div>

          {section.description && (
            <p className="mt-2 pl-11 text-sm text-gray-500 dark:text-gray-400">
              {section.description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            {lessons.length} {lessons.length === 1 ? "Lesson" : "Lessons"}
          </span>

          <span className="text-gray-500 transition-transform group-open:rotate-180 dark:text-gray-400">
            ▼
          </span>
        </div>
      </summary>

      <div className="border-t border-gray-200 dark:border-gray-700">
        {!lessons.length ? (
          <div className="px-5 py-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No lessons added to this section.
            </p>
          </div>
        ) : (
          <div>
            {lessons.map((lesson, lessonIndex) => (
              <VideoLesson
                key={lesson.id}
                courseId={courseId}
                sectionId={section.id}
                lesson={lesson}
                lessonIndex={lessonIndex}
                quizzes={quizzes}
                onAddQuiz={onAddQuiz}
                onEditQuiz={onEditQuiz}
              />
            ))}
          </div>
        )}

        <div className="border-t border-gray-100 bg-gray-50/70 px-5 py-4 dark:border-gray-800 dark:bg-gray-900/40">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Module Assessment
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                This quiz covers the lessons in this module.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                onAddQuiz({
                  course_id: Number(courseId),
                  course_section_id: Number(section.id),
                  course_lesson_id: null,
                })
              }
              className="rounded-lg border border-blue-600 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900/20"
            >
              + Add Module Quiz
            </button>
          </div>

          <QuizPlacementList
            quizzes={sectionQuizzes}
            onEditQuiz={onEditQuiz}
            emptyText="No module-level quizzes yet."
          />
        </div>
      </div>
    </details>
  );
}

function VideoLesson({
  courseId,
  sectionId,
  lesson,
  lessonIndex,
  quizzes,
  onAddQuiz,
  onEditQuiz,
}) {
  const lessonQuizzes = quizzes.filter(
    (quiz) =>
      Number(quiz.course_id) === Number(courseId) &&
      Number(quiz.course_section_id) === Number(sectionId) &&
      Number(quiz.course_lesson_id) === Number(lesson.id),
  );

  return (
    <div className="border-b border-gray-100 px-5 py-4 last:border-b-0 dark:border-gray-800">
      <div className="flex items-center gap-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
          ▶
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                {lessonIndex + 1}. {lesson.title}
              </p>

              {lesson.description && (
                <p className="mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
                  {lesson.description}
                </p>
              )}
            </div>

            {lesson.duration_seconds !== null &&
              lesson.duration_seconds !== undefined && (
                <span className="shrink-0 text-xs font-medium text-gray-500 dark:text-gray-400">
                  {formatDuration(lesson.duration_seconds)}
                </span>
              )}
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
              Video
            </span>

            {lesson.is_preview && (
              <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
                Preview
              </span>
            )}

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                lesson.status === "published"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
              }`}
            >
              {lesson.status === "published" ? "Published" : "Draft"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            onAddQuiz({
              course_id: Number(courseId),
              course_section_id: Number(sectionId),
              course_lesson_id: Number(lesson.id),
            })
          }
          className="shrink-0 rounded-lg border border-blue-600 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900/20"
        >
          + Add Lesson Quiz
        </button>
      </div>

      <div className="ml-13 mt-3 border-l-2 border-blue-100 pl-4 dark:border-blue-900/50">
        <QuizPlacementList
          quizzes={lessonQuizzes}
          onEditQuiz={onEditQuiz}
          emptyText="No quiz attached to this lesson."
          compact
        />
      </div>
    </div>
  );
}

function QuizPlacementList({
  quizzes,
  onEditQuiz,
  emptyText,
  compact = false,
}) {
  if (!quizzes.length) {
    return (
      <p
        className={`${
          compact ? "py-1" : "py-4"
        } text-xs text-gray-500 dark:text-gray-400`}
      >
        {emptyText}
      </p>
    );
  }

  return (
    <div className={compact ? "space-y-2" : "my-4 space-y-2"}>
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="flex flex-col gap-2 rounded-lg border border-gray-200 px-3 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-gray-700"
        >
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {quiz.title}
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {quiz.questions_count ?? 0} questions · {quiz.duration_minutes}{" "}
              min · {quiz.status}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onEditQuiz(quiz.id)}
            className="self-start rounded-md px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-900/20"
          >
            Edit Quiz
          </button>
        </div>
      ))}
    </div>
  );
}

function formatDuration(seconds) {
  if (
    seconds === null ||
    seconds === undefined ||
    !Number.isFinite(Number(seconds))
  ) {
    return "-";
  }

  const totalSeconds = Math.floor(Number(seconds));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(
      2,
      "0",
    )}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

      <p className="mt-2 font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function ContentCard({ title, children }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>

      <p className="whitespace-pre-line text-sm leading-7 text-gray-600 dark:text-gray-400">
        {children}
      </p>
    </section>
  );
}

function ArrayCard({ title, items }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>

      {!items?.length ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No information added.
        </p>
      ) : (
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-400">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
