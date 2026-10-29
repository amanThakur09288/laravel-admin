// import { useEffect, useState } from "react";
// import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import toast from "react-hot-toast";

// import {
//   getCourses,
//   getCourseSections,
//   getSectionLessons,
//   createSectionLesson,
//   updateSectionLesson,
//   deleteSectionLesson,
// } from "../api/courseApi";

// import VideoLessonForm from "../components/videoSection/VideoLessonForm";

// import Button from "../components/common/Button";
// import DeleteModal from "../components/common/DeleteModal";
// import PageLoader from "../components/common/PageLoader";

// import { getApiErrorMessage } from "../utils/apiError";

// export default function VideoSectionLessons() {
//   const { id: sectionId } = useParams();

//   const navigate = useNavigate();

//   const [searchParams] = useSearchParams();

//   const [courses, setCourses] = useState([]);

//   const [sections, setSections] = useState([]);

//   const [lessons, setLessons] = useState([]);

//   const [selectedSection, setSelectedSection] = useState(null);

//   const [loading, setLoading] = useState(true);

//   const [lessonFormOpen, setLessonFormOpen] = useState(false);

//   const [editingLesson, setEditingLesson] = useState(null);

//   const [submitting, setSubmitting] = useState(false);

//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);

//   const [selectedLesson, setSelectedLesson] = useState(null);

//   const [deletingId, setDeletingId] = useState(null);

//   const loadData = async () => {
//     try {
//       setLoading(true);

//       const courseId = searchParams.get("course_id");

//       if (!courseId) {
//         throw new Error("Course ID is missing.");
//       }

//       const [coursesResponse, sectionsResponse, lessonsResponse] =
//         await Promise.all([
//           getCourses(),

//           getCourseSections(courseId),

//           getSectionLessons(sectionId),
//         ]);

//       const courseData = Array.isArray(coursesResponse.data)
//         ? coursesResponse.data
//         : [];

//       const sectionData = Array.isArray(sectionsResponse.data)
//         ? sectionsResponse.data
//         : [];

//       const lessonData = Array.isArray(lessonsResponse.data)
//         ? lessonsResponse.data
//         : [];

//       const section = sectionData.find(
//         (item) => String(item.id) === String(sectionId),
//       );

//       if (!section) {
//         throw new Error("Video section not found.");
//       }

//       setCourses(courseData);
//       setSections(sectionData);
//       setLessons(lessonData);
//       setSelectedSection(section);
//     } catch (error) {
//       console.error("Failed to load video lessons:", error);

//       toast.error(getApiErrorMessage(error));

//       navigate("/video-sections");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, [sectionId, searchParams]);

//   const handleCreate = () => {
//     setEditingLesson(null);
//     setLessonFormOpen(true);
//   };

//   const handleEdit = (lesson) => {
//     setEditingLesson({
//       ...lesson,

//       course_id: selectedSection.course_id,

//       course_section_id: selectedSection.id,
//     });

//     setLessonFormOpen(true);
//   };

//   const handleCancelForm = () => {
//     if (submitting) {
//       return;
//     }

//     setLessonFormOpen(false);
//     setEditingLesson(null);
//   };

//   const handleSubmit = async (data) => {
//     try {
//       setSubmitting(true);

//       const payload = {
//         course_id: Number(data.course_id),

//         title: data.title.trim(),

//         description: data.description?.trim() || null,

//         type: "video",

//         sort_order: Number(data.sort_order ?? lessons.length + 1),

//         duration_seconds:
//           data.duration_seconds === null || data.duration_seconds === undefined
//             ? null
//             : Number(data.duration_seconds),

//         is_preview: Boolean(data.is_preview),

//         status: data.status,
//       };

//       const selectedSectionId = Number(data.course_section_id);

//       if (selectedSectionId !== Number(sectionId)) {
//         toast.error("The selected video section does not match this page.");

//         return;
//       }

//       if (editingLesson) {
//         const response = await updateSectionLesson(
//           selectedSectionId,
//           editingLesson.id,
//           payload,
//         );

//         setLessons((previous) =>
//           previous.map((lesson) =>
//             lesson.id === editingLesson.id ? response.data : lesson,
//           ),
//         );

//         toast.success("Video lesson updated successfully.");
//       } else {
//         const response = await createSectionLesson(selectedSectionId, payload);

//         setLessons((previous) => [...previous, response.data]);

//         toast.success("Video lesson created successfully.");
//       }

//       setLessonFormOpen(false);
//       setEditingLesson(null);
//     } catch (error) {
//       console.error("Failed to save video lesson:", error);

//       toast.error(getApiErrorMessage(error));
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleDelete = (lesson) => {
//     setSelectedLesson(lesson);
//     setDeleteModalOpen(true);
//   };

//   const handleCloseDeleteModal = () => {
//     if (deletingId) {
//       return;
//     }

//     setDeleteModalOpen(false);
//     setSelectedLesson(null);
//   };

//   const confirmDelete = async () => {
//     if (!selectedLesson) {
//       return;
//     }

//     try {
//       setDeletingId(selectedLesson.id);

//       await deleteSectionLesson(Number(sectionId), selectedLesson.id);

//       setLessons((previous) =>
//         previous.filter((lesson) => lesson.id !== selectedLesson.id),
//       );

//       toast.success("Video lesson deleted successfully.");

//       setDeleteModalOpen(false);
//       setSelectedLesson(null);
//     } catch (error) {
//       console.error("Failed to delete video lesson:", error);

//       toast.error(getApiErrorMessage(error));
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   if (loading) {
//     return <PageLoader />;
//   }

//   if (!selectedSection) {
//     return null;
//   }

//   return (
//     <>
//       <div className="space-y-6">
//         {/* Header */}

//         <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
//           <div>
//             <button
//               type="button"
//               onClick={() => navigate("/video-sections")}
//               className="mb-3 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
//             >
//               ← Back to Video Sections
//             </button>

//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//               {selectedSection.title}
//             </h1>

//             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//               Manage video lessons in this section.
//             </p>
//           </div>

//           {!lessonFormOpen && (
//             <Button type="button" onClick={handleCreate}>
//               + Add Video Lesson
//             </Button>
//           )}
//         </div>

//         {/* Section Information */}

//         <div className="grid gap-4 md:grid-cols-3">
//           <InfoCard
//             title="Course"
//             value={
//               courses.find(
//                 (course) =>
//                   String(course.id) === String(selectedSection.course_id),
//               )?.course_name ?? "-"
//             }
//           />

//           <InfoCard title="Section" value={selectedSection.title} />

//           <InfoCard title="Lessons" value={lessons.length} />
//         </div>

//         {/* Lesson Form */}

//         {lessonFormOpen && (
//           <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//             <div className="mb-6">
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 {editingLesson ? "Edit Video Lesson" : "Create Video Lesson"}
//               </h2>

//               <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                 Add video lesson details.
//               </p>
//             </div>

//             <VideoLessonForm
//               courses={courses}
//               sections={sections}
//               initialData={editingLesson}
//               onSubmit={handleSubmit}
//               submitting={submitting}
//               submitText={
//                 editingLesson ? "Update Video Lesson" : "Create Video Lesson"
//               }
//               onCancel={handleCancelForm}
//             />
//           </div>
//         )}

//         {/* Lessons */}

//         {!lessonFormOpen && (
//           <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
//             {!lessons.length ? (
//               <div className="p-10 text-center">
//                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                   No video lessons added yet.
//                 </p>

//                 <button
//                   type="button"
//                   onClick={handleCreate}
//                   className="mt-3 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
//                 >
//                   + Add first video lesson
//                 </button>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full min-w-[900px]">
//                   <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                         Lesson
//                       </th>

//                       <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                         Duration
//                       </th>

//                       <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                         Preview
//                       </th>

//                       <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                         Status
//                       </th>

//                       <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>

//                   <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//                     {lessons.map((lesson, index) => (
//                       <tr
//                         key={lesson.id}
//                         className="hover:bg-gray-50 dark:hover:bg-gray-800/40"
//                       >
//                         <td className="px-6 py-4">
//                           <div className="flex gap-3">
//                             <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
//                               {index + 1}
//                             </div>

//                             <div>
//                               <p className="font-medium text-gray-900 dark:text-white">
//                                 {lesson.title}
//                               </p>

//                               {lesson.description && (
//                                 <p className="mt-1 max-w-md truncate text-sm text-gray-500 dark:text-gray-400">
//                                   {lesson.description}
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         </td>

//                         <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
//                           {formatDuration(lesson.duration_seconds)}
//                         </td>

//                         <td className="px-6 py-4">
//                           {lesson.is_preview ? (
//                             <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
//                               Preview
//                             </span>
//                           ) : (
//                             <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
//                               No
//                             </span>
//                           )}
//                         </td>

//                         <td className="px-6 py-4">
//                           <span
//                             className={`rounded-full px-3 py-1 text-xs font-medium ${
//                               lesson.status === "published"
//                                 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
//                                 : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
//                             }`}
//                           >
//                             {lesson.status}
//                           </span>
//                         </td>

//                         <td className="px-6 py-4">
//                           <div className="flex justify-end gap-2">
//                             <button
//                               type="button"
//                               onClick={() => handleEdit(lesson)}
//                               className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
//                             >
//                               Edit
//                             </button>

//                             <button
//                               type="button"
//                               onClick={() => handleDelete(lesson)}
//                               disabled={deletingId === lesson.id}
//                               className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
//                             >
//                               {deletingId === lesson.id
//                                 ? "Deleting..."
//                                 : "Delete"}
//                             </button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       <DeleteModal
//         isOpen={deleteModalOpen}
//         onClose={handleCloseDeleteModal}
//         onConfirm={confirmDelete}
//         name={selectedLesson?.title}
//         loading={!!deletingId}
//       />
//     </>
//   );
// }

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

// function formatDuration(seconds) {
//   if (seconds === null || seconds === undefined) {
//     return "-";
//   }

//   const totalSeconds = Number(seconds);

//   if (!Number.isFinite(totalSeconds)) {
//     return "-";
//   }

//   const hours = Math.floor(totalSeconds / 3600);

//   const minutes = Math.floor((totalSeconds % 3600) / 60);

//   const remainingSeconds = totalSeconds % 60;

//   if (hours > 0) {
//     return `${hours}:${String(minutes).padStart(2, "0")}:${String(
//       remainingSeconds,
//     ).padStart(2, "0")}`;
//   }

//   return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getCourseSection, deleteSectionLesson } from "../api/courseApi";

import Button from "../components/common/Button";
import DeleteModal from "../components/common/DeleteModal";
import PageLoader from "../components/common/PageLoader";
import { getApiErrorMessage } from "../utils/apiError";

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

  const [section, setSection] = useState(null);

  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedLesson, setSelectedLesson] = useState(null);

  const [deletingId, setDeletingId] = useState(null);

  const loadSection = async () => {
    try {
      setLoading(true);

      const response = await getCourseSection(courseId, sectionId);

      setSection(response.data);
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

  if (loading) {
    return <PageLoader />;
  }

  if (!section) {
    return null;
  }

  const lessons = Array.isArray(section.lessons) ? section.lessons : [];

  return (
    <>
      <div className="space-y-6">
        {/* Header */}

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

          <div className="flex gap-2">
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
        </div>

        {/* Section info */}

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

        {/* Lessons */}

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
              {lessons.map((lesson, index) => (
                <div key={lesson.id} className="p-5">
                  <div className="flex flex-col gap-5 lg:flex-row">
                    {/* Video */}

                    <div className="w-full overflow-hidden rounded-lg bg-black lg:w-[360px]">
                      {lesson.video_url ? (
                        <video
                          src={lesson.video_url}
                          controls
                          controlsList="nodownload"
                          className="aspect-video w-full"
                        />
                      ) : (
                        <div className="flex aspect-video items-center justify-center text-sm text-gray-400">
                          No video
                        </div>
                      )}
                    </div>

                    {/* Details */}

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
                          {deletingId === lesson.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
