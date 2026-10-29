// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import {
//   getCourseSections,
//   createCourseSection,
//   updateCourseSection,
//   deleteCourseSection,
//   getSectionLessons,
//   createSectionLesson,
//   updateSectionLesson,
//   deleteSectionLesson,
// } from "../../api/courseApi";

// import Button from "../common/Button";
// import { getApiErrorMessage } from "../../utils/apiError";

// const defaultSectionForm = {
//   title: "",
//   description: "",
//   sort_order: 1,
//   status: "draft",
// };

// const defaultLessonForm = {
//   title: "",
//   description: "",
//   type: "video",
//   sort_order: 1,
//   duration_seconds: "",
//   is_preview: false,
//   status: "draft",
// };

// export default function CourseSections({ courseId }) {
//   const [sections, setSections] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [savingSection, setSavingSection] = useState(false);

//   const [deletingSectionId, setDeletingSectionId] = useState(null);

//   const [sectionFormOpen, setSectionFormOpen] = useState(false);

//   const [editingSection, setEditingSection] = useState(null);

//   const [sectionForm, setSectionForm] = useState(defaultSectionForm);

//   /*
//   |--------------------------------------------------------------------------
//   | Lesson State
//   |--------------------------------------------------------------------------
//   */

//   const [expandedSectionId, setExpandedSectionId] = useState(null);

//   const [lessons, setLessons] = useState({});

//   const [loadingLessons, setLoadingLessons] = useState({});

//   const [lessonFormOpen, setLessonFormOpen] = useState(null);

//   const [editingLesson, setEditingLesson] = useState(null);

//   const [lessonForm, setLessonForm] = useState(defaultLessonForm);

//   const [savingLesson, setSavingLesson] = useState(false);

//   const [deletingLessonId, setDeletingLessonId] = useState(null);

//   /*
//   |--------------------------------------------------------------------------
//   | Fetch Sections
//   |--------------------------------------------------------------------------
//   */

//   const fetchSections = async () => {
//     try {
//       setLoading(true);

//       const response = await getCourseSections(courseId);

//       setSections(Array.isArray(response.data) ? response.data : []);
//     } catch (error) {
//       console.error("Failed to fetch course sections:", error);

//       toast.error(getApiErrorMessage(error));
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (courseId) {
//       fetchSections();
//     }
//   }, [courseId]);

//   /*
//   |--------------------------------------------------------------------------
//   | Section Handlers
//   |--------------------------------------------------------------------------
//   */

//   const handleAddSection = () => {
//     setEditingSection(null);

//     setSectionForm({
//       title: "",
//       description: "",
//       sort_order: sections.length + 1,
//       status: "draft",
//     });

//     setSectionFormOpen(true);
//   };

//   const handleEditSection = (section) => {
//     setEditingSection(section);

//     setSectionForm({
//       title: section.title ?? "",
//       description: section.description ?? "",
//       sort_order: section.sort_order ?? 1,
//       status: section.status ?? "draft",
//     });

//     setSectionFormOpen(true);
//   };

//   const handleCloseSectionForm = () => {
//     if (savingSection) {
//       return;
//     }

//     setSectionFormOpen(false);
//     setEditingSection(null);
//     setSectionForm(defaultSectionForm);
//   };

//   const handleSectionChange = (event) => {
//     const { name, value } = event.target;

//     setSectionForm((previous) => ({
//       ...previous,
//       [name]: name === "sort_order" ? Number(value) : value,
//     }));
//   };

//   const handleSectionSubmit = async (event) => {
//     event.preventDefault();

//     if (!sectionForm.title.trim()) {
//       toast.error("Section title is required.");
//       return;
//     }

//     try {
//       setSavingSection(true);

//       const payload = {
//         title: sectionForm.title.trim(),

//         description: sectionForm.description.trim() || null,

//         sort_order: Number(sectionForm.sort_order),

//         status: sectionForm.status,
//       };

//       if (editingSection) {
//         const response = await updateCourseSection(
//           courseId,
//           editingSection.id,
//           payload,
//         );

//         const updatedSection = response.data;

//         setSections((previous) =>
//           previous.map((section) =>
//             section.id === editingSection.id
//               ? {
//                   ...section,
//                   ...updatedSection,
//                 }
//               : section,
//           ),
//         );

//         toast.success("Course section updated successfully.");
//       } else {
//         const response = await createCourseSection(courseId, payload);

//         const newSection = response.data;

//         setSections((previous) => [...previous, newSection]);

//         toast.success("Course section created successfully.");
//       }

//       setSectionFormOpen(false);
//       setEditingSection(null);
//       setSectionForm(defaultSectionForm);
//     } catch (error) {
//       console.error("Failed to save course section:", error);

//       toast.error(getApiErrorMessage(error));
//     } finally {
//       setSavingSection(false);
//     }
//   };

//   const handleDeleteSection = async (section) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${section.title}"?`,
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       setDeletingSectionId(section.id);

//       await deleteCourseSection(courseId, section.id);

//       setSections((previous) =>
//         previous.filter((item) => item.id !== section.id),
//       );

//       setLessons((previous) => {
//         const updated = { ...previous };

//         delete updated[section.id];

//         return updated;
//       });

//       toast.success("Course section deleted successfully.");
//     } catch (error) {
//       console.error("Failed to delete course section:", error);

//       toast.error(getApiErrorMessage(error));
//     } finally {
//       setDeletingSectionId(null);
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Lesson Fetch
//   |--------------------------------------------------------------------------
//   */

//   const fetchLessons = async (sectionId) => {
//     try {
//       setLoadingLessons((previous) => ({
//         ...previous,
//         [sectionId]: true,
//       }));

//       const response = await getSectionLessons(sectionId);

//       setLessons((previous) => ({
//         ...previous,
//         [sectionId]: Array.isArray(response.data) ? response.data : [],
//       }));
//     } catch (error) {
//       console.error("Failed to fetch lessons:", error);

//       toast.error(getApiErrorMessage(error));
//     } finally {
//       setLoadingLessons((previous) => ({
//         ...previous,
//         [sectionId]: false,
//       }));
//     }
//   };

//   const handleToggleSection = async (sectionId) => {
//     if (expandedSectionId === sectionId) {
//       setExpandedSectionId(null);
//       return;
//     }

//     setExpandedSectionId(sectionId);

//     if (!lessons[sectionId]) {
//       await fetchLessons(sectionId);
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Lesson Handlers
//   |--------------------------------------------------------------------------
//   */

//   const handleAddLesson = (section) => {
//     const sectionLessons = lessons[section.id] || [];

//     setEditingLesson(null);

//     setLessonForm({
//       title: "",
//       description: "",
//       type: "video",
//       sort_order: sectionLessons.length + 1,
//       duration_seconds: "",
//       is_preview: false,
//       status: "draft",
//     });

//     setLessonFormOpen(section.id);
//   };

//   const handleEditLesson = (section, lesson) => {
//     setEditingLesson({
//       ...lesson,
//       sectionId: section.id,
//     });

//     setLessonForm({
//       title: lesson.title ?? "",
//       description: lesson.description ?? "",
//       type: lesson.type ?? "video",
//       sort_order: lesson.sort_order ?? 1,
//       duration_seconds: lesson.duration_seconds ?? "",
//       is_preview: Boolean(lesson.is_preview),
//       status: lesson.status ?? "draft",
//     });

//     setLessonFormOpen(section.id);
//   };

//   const handleCloseLessonForm = () => {
//     if (savingLesson) {
//       return;
//     }

//     setLessonFormOpen(null);
//     setEditingLesson(null);
//     setLessonForm(defaultLessonForm);
//   };

//   const handleLessonChange = (event) => {
//     const { name, value, type, checked } = event.target;

//     setLessonForm((previous) => ({
//       ...previous,

//       [name]:
//         type === "checkbox"
//           ? checked
//           : name === "sort_order" || name === "duration_seconds"
//             ? value === ""
//               ? ""
//               : Number(value)
//             : value,
//     }));
//   };

//   const handleLessonSubmit = async (event) => {
//     event.preventDefault();

//     if (!lessonForm.title.trim()) {
//       toast.error("Lesson title is required.");
//       return;
//     }

//     const sectionId = editingLesson?.sectionId || lessonFormOpen;

//     if (!sectionId) {
//       return;
//     }

//     try {
//       setSavingLesson(true);

//       const payload = {
//         title: lessonForm.title.trim(),

//         description: lessonForm.description.trim() || null,

//         type: "video",

//         sort_order: Number(lessonForm.sort_order),

//         duration_seconds:
//           lessonForm.duration_seconds === ""
//             ? null
//             : Number(lessonForm.duration_seconds),

//         is_preview: Boolean(lessonForm.is_preview),

//         status: lessonForm.status,
//       };

//       if (editingLesson) {
//         const response = await updateSectionLesson(
//           sectionId,
//           editingLesson.id,
//           payload,
//         );

//         const updatedLesson = response.data;

//         setLessons((previous) => ({
//           ...previous,
//           [sectionId]: (previous[sectionId] || []).map((lesson) =>
//             lesson.id === editingLesson.id ? updatedLesson : lesson,
//           ),
//         }));

//         toast.success("Lesson updated successfully.");
//       } else {
//         const response = await createSectionLesson(sectionId, payload);

//         const newLesson = response.data;

//         setLessons((previous) => ({
//           ...previous,

//           [sectionId]: [...(previous[sectionId] || []), newLesson],
//         }));

//         setSections((previous) =>
//           previous.map((section) =>
//             section.id === Number(sectionId)
//               ? {
//                   ...section,
//                   lessons_count: (section.lessons_count || 0) + 1,
//                 }
//               : section,
//           ),
//         );

//         toast.success("Lesson created successfully.");
//       }

//       setLessonFormOpen(null);
//       setEditingLesson(null);
//       setLessonForm(defaultLessonForm);
//     } catch (error) {
//       console.error("Failed to save lesson:", error);

//       toast.error(getApiErrorMessage(error));
//     } finally {
//       setSavingLesson(false);
//     }
//   };

//   const handleDeleteLesson = async (sectionId, lesson) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${lesson.title}"?`,
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       setDeletingLessonId(lesson.id);

//       await deleteSectionLesson(sectionId, lesson.id);

//       setLessons((previous) => ({
//         ...previous,

//         [sectionId]: (previous[sectionId] || []).filter(
//           (item) => item.id !== lesson.id,
//         ),
//       }));

//       setSections((previous) =>
//         previous.map((section) =>
//           section.id === Number(sectionId)
//             ? {
//                 ...section,
//                 lessons_count: Math.max((section.lessons_count || 0) - 1, 0),
//               }
//             : section,
//         ),
//       );

//       toast.success("Lesson deleted successfully.");
//     } catch (error) {
//       console.error("Failed to delete lesson:", error);

//       toast.error(getApiErrorMessage(error));
//     } finally {
//       setDeletingLessonId(null);
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Loading
//   |--------------------------------------------------------------------------
//   */

//   if (loading) {
//     return (
//       <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//         <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//           Course Content
//         </h2>

//         <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
//           Loading sections...
//         </p>
//       </section>
//     );
//   }

//   /*
//   |--------------------------------------------------------------------------
//   | UI
//   |--------------------------------------------------------------------------
//   */

//   return (
//     <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//       {/* Course Content Header */}

//       <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Course Content
//           </h2>

//           <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//             Manage course sections and lessons.
//           </p>
//         </div>

//         <Button type="button" onClick={handleAddSection}>
//           + Add Section
//         </Button>
//       </div>

//       {/* Section Form */}

//       {sectionFormOpen && (
//         <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50/50 p-5 dark:border-blue-900 dark:bg-blue-900/10">
//           <div className="mb-5">
//             <h3 className="font-semibold text-gray-900 dark:text-white">
//               {editingSection ? "Edit Section" : "Add Section"}
//             </h3>
//           </div>

//           <form onSubmit={handleSectionSubmit} className="space-y-5">
//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Section Title
//               </label>

//               <input
//                 type="text"
//                 name="title"
//                 value={sectionForm.title}
//                 onChange={handleSectionChange}
//                 placeholder="e.g. Introduction to React"
//                 className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
//                 disabled={savingSection}
//               />
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Description
//               </label>

//               <textarea
//                 name="description"
//                 value={sectionForm.description}
//                 onChange={handleSectionChange}
//                 rows={4}
//                 placeholder="Describe what students will learn..."
//                 className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
//                 disabled={savingSection}
//               />
//             </div>

//             <div className="grid gap-5 sm:grid-cols-2">
//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Sort Order
//                 </label>

//                 <input
//                   type="number"
//                   name="sort_order"
//                   min="1"
//                   value={sectionForm.sort_order}
//                   onChange={handleSectionChange}
//                   className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
//                   disabled={savingSection}
//                 />
//               </div>

//               <div>
//                 <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Status
//                 </label>

//                 <select
//                   name="status"
//                   value={sectionForm.status}
//                   onChange={handleSectionChange}
//                   className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
//                   disabled={savingSection}
//                 >
//                   <option value="draft">Draft</option>

//                   <option value="published">Published</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={handleCloseSectionForm}
//                 disabled={savingSection}
//                 className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
//               >
//                 Cancel
//               </button>

//               <Button type="submit" disabled={savingSection}>
//                 {savingSection
//                   ? "Saving..."
//                   : editingSection
//                     ? "Update Section"
//                     : "Create Section"}
//               </Button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* No Sections */}

//       {!sections.length ? (
//         <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             No sections added yet.
//           </p>

//           <button
//             type="button"
//             onClick={handleAddSection}
//             className="mt-3 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
//           >
//             + Add your first section
//           </button>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {sections.map((section, index) => {
//             const sectionLessons = lessons[section.id] || [];

//             const isExpanded = expandedSectionId === section.id;

//             return (
//               <div
//                 key={section.id}
//                 className="rounded-xl border border-gray-200 dark:border-gray-700"
//               >
//                 {/* Section Header */}

//                 <div className="p-5">
//                   <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
//                     <div className="flex gap-4">
//                       <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
//                         {index + 1}
//                       </div>

//                       <div>
//                         <h3 className="font-semibold text-gray-900 dark:text-white">
//                           {section.title}
//                         </h3>

//                         {section.description && (
//                           <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                             {section.description}
//                           </p>
//                         )}

//                         <div className="mt-3 flex flex-wrap gap-2">
//                           <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
//                             {section.lessons_count ?? 0}{" "}
//                             {section.lessons_count === 1 ? "Lesson" : "Lessons"}
//                           </span>

//                           <span
//                             className={`rounded-full px-3 py-1 text-xs font-medium ${
//                               section.status === "published"
//                                 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
//                                 : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
//                             }`}
//                           >
//                             {section.status}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex flex-wrap gap-2">
//                       <button
//                         type="button"
//                         onClick={() => handleToggleSection(section.id)}
//                         className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
//                       >
//                         {isExpanded ? "Hide Lessons" : "View Lessons"}
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() => handleEditSection(section)}
//                         className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         type="button"
//                         onClick={() => handleDeleteSection(section)}
//                         disabled={deletingSectionId === section.id}
//                         className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
//                       >
//                         {deletingSectionId === section.id
//                           ? "Deleting..."
//                           : "Delete"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Lessons */}

//                 {isExpanded && (
//                   <div className="border-t border-gray-200 bg-gray-50/50 p-5 dark:border-gray-700 dark:bg-gray-800/20">
//                     <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                       <div>
//                         <h4 className="font-semibold text-gray-900 dark:text-white">
//                           Lessons
//                         </h4>

//                         <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//                           Video lessons inside this section.
//                         </p>
//                       </div>

//                       <Button
//                         type="button"
//                         onClick={() => handleAddLesson(section)}
//                       >
//                         + Add Lesson
//                       </Button>
//                     </div>

//                     {/* Lesson Form */}

//                     {lessonFormOpen === section.id && (
//                       <div className="mb-5 rounded-xl border border-blue-200 bg-white p-5 dark:border-blue-900 dark:bg-gray-900">
//                         <h4 className="mb-5 font-semibold text-gray-900 dark:text-white">
//                           {editingLesson ? "Edit Lesson" : "Add Lesson"}
//                         </h4>

//                         <form
//                           onSubmit={handleLessonSubmit}
//                           className="space-y-5"
//                         >
//                           <div>
//                             <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                               Lesson Title
//                             </label>

//                             <input
//                               type="text"
//                               name="title"
//                               value={lessonForm.title}
//                               onChange={handleLessonChange}
//                               placeholder="e.g. Introduction to React"
//                               className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
//                               disabled={savingLesson}
//                             />
//                           </div>

//                           <div>
//                             <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                               Description
//                             </label>

//                             <textarea
//                               name="description"
//                               value={lessonForm.description}
//                               onChange={handleLessonChange}
//                               rows={4}
//                               placeholder="Describe this lesson..."
//                               className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
//                               disabled={savingLesson}
//                             />
//                           </div>

//                           <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
//                             <div>
//                               <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                                 Type
//                               </label>

//                               <select
//                                 name="type"
//                                 value="video"
//                                 disabled
//                                 className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
//                               >
//                                 <option value="video">Video</option>
//                               </select>
//                             </div>

//                             <div>
//                               <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                                 Sort Order
//                               </label>

//                               <input
//                                 type="number"
//                                 name="sort_order"
//                                 min="1"
//                                 value={lessonForm.sort_order}
//                                 onChange={handleLessonChange}
//                                 className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
//                                 disabled={savingLesson}
//                               />
//                             </div>

//                             <div>
//                               <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                                 Duration (seconds)
//                               </label>

//                               <input
//                                 type="number"
//                                 name="duration_seconds"
//                                 min="0"
//                                 value={lessonForm.duration_seconds}
//                                 onChange={handleLessonChange}
//                                 placeholder="e.g. 600"
//                                 className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
//                                 disabled={savingLesson}
//                               />
//                             </div>
//                           </div>

//                           <div className="flex flex-wrap gap-6">
//                             <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
//                               <input
//                                 type="checkbox"
//                                 name="is_preview"
//                                 checked={lessonForm.is_preview}
//                                 onChange={handleLessonChange}
//                                 disabled={savingLesson}
//                                 className="h-4 w-4 rounded border-gray-300 text-blue-600"
//                               />
//                               Free Preview
//                             </label>

//                             <div>
//                               <label className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
//                                 Status
//                               </label>

//                               <select
//                                 name="status"
//                                 value={lessonForm.status}
//                                 onChange={handleLessonChange}
//                                 disabled={savingLesson}
//                                 className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
//                               >
//                                 <option value="draft">Draft</option>

//                                 <option value="published">Published</option>
//                               </select>
//                             </div>
//                           </div>

//                           <div className="flex justify-end gap-3">
//                             <button
//                               type="button"
//                               onClick={handleCloseLessonForm}
//                               disabled={savingLesson}
//                               className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
//                             >
//                               Cancel
//                             </button>

//                             <Button type="submit" disabled={savingLesson}>
//                               {savingLesson
//                                 ? "Saving..."
//                                 : editingLesson
//                                   ? "Update Lesson"
//                                   : "Create Lesson"}
//                             </Button>
//                           </div>
//                         </form>
//                       </div>
//                     )}

//                     {/* Lesson Loading */}

//                     {loadingLessons[section.id] ? (
//                       <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
//                         Loading lessons...
//                       </p>
//                     ) : !sectionLessons.length ? (
//                       <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
//                         <p className="text-sm text-gray-500 dark:text-gray-400">
//                           No lessons added yet.
//                         </p>

//                         <button
//                           type="button"
//                           onClick={() => handleAddLesson(section)}
//                           className="mt-3 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
//                         >
//                           + Add first lesson
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="space-y-3">
//                         {sectionLessons.map((lesson, lessonIndex) => (
//                           <div
//                             key={lesson.id}
//                             className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
//                           >
//                             <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
//                               <div className="flex gap-3">
//                                 <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
//                                   {lessonIndex + 1}
//                                 </div>

//                                 <div>
//                                   <h5 className="font-medium text-gray-900 dark:text-white">
//                                     {lesson.title}
//                                   </h5>

//                                   {lesson.description && (
//                                     <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                                       {lesson.description}
//                                     </p>
//                                   )}

//                                   <div className="mt-2 flex flex-wrap gap-2">
//                                     <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
//                                       Video
//                                     </span>

//                                     {lesson.duration_seconds !== null &&
//                                       lesson.duration_seconds !== undefined && (
//                                         <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
//                                           {lesson.duration_seconds} sec
//                                         </span>
//                                       )}

//                                     {lesson.is_preview && (
//                                       <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-300">
//                                         Preview
//                                       </span>
//                                     )}

//                                     <span
//                                       className={`rounded-full px-2.5 py-1 text-xs font-medium ${
//                                         lesson.status === "published"
//                                           ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
//                                           : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
//                                       }`}
//                                     >
//                                       {lesson.status}
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>

//                               <div className="flex gap-2">
//                                 <button
//                                   type="button"
//                                   onClick={() =>
//                                     handleEditLesson(section, lesson)
//                                   }
//                                   className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
//                                 >
//                                   Edit
//                                 </button>

//                                 <button
//                                   type="button"
//                                   onClick={() =>
//                                     handleDeleteLesson(section.id, lesson)
//                                   }
//                                   disabled={deletingLessonId === lesson.id}
//                                   className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
//                                 >
//                                   {deletingLessonId === lesson.id
//                                     ? "Deleting..."
//                                     : "Delete"}
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </section>
//   );
// }

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getCourseSections,
  getCourseSection,
  createCourseSection,
  updateCourseSection,
  deleteCourseSection,
  getSectionLessons,
} from "../../api/courseApi";

import Button from "../common/Button";
import DeleteModal from "../common/DeleteModal";
import { getApiErrorMessage } from "../../utils/apiError";

const createEmptyLesson = (sortOrder = 1) => ({
  id: null,
  title: "",
  description: "",
  type: "video",
  sort_order: sortOrder,
  duration_seconds: "",
  is_preview: false,
  status: "draft",
  video: null,
  existingVideo: null,
});

const createDefaultSectionForm = () => ({
  title: "",
  description: "",
  sort_order: 1,
  status: "draft",
  lessons: [createEmptyLesson(1)],
});

export default function CourseSections({ courseId }) {
  /*
  |--------------------------------------------------------------------------
  | Sections
  |--------------------------------------------------------------------------
  */

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | Section Form
  |--------------------------------------------------------------------------
  */

  const [sectionFormOpen, setSectionFormOpen] = useState(false);

  const [editingSection, setEditingSection] = useState(null);

  const [sectionForm, setSectionForm] = useState(createDefaultSectionForm());

  const [savingSection, setSavingSection] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Lesson Display
  |--------------------------------------------------------------------------
  */

  const [expandedSectionId, setExpandedSectionId] = useState(null);

  const [lessons, setLessons] = useState({});

  const [loadingLessons, setLoadingLessons] = useState({});

  /*
  |--------------------------------------------------------------------------
  | Delete Section
  |--------------------------------------------------------------------------
  */

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [sectionToDelete, setSectionToDelete] = useState(null);

  const [deletingSectionId, setDeletingSectionId] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | Fetch Sections
  |--------------------------------------------------------------------------
  */

  const fetchSections = async () => {
    try {
      setLoading(true);

      const response = await getCourseSections(courseId);

      setSections(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch course sections:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchSections();
    }
  }, [courseId]);

  /*
  |--------------------------------------------------------------------------
  | Section Form Helpers
  |--------------------------------------------------------------------------
  */

  const resetSectionForm = () => {
    setSectionForm(createDefaultSectionForm());
  };

  /*
  |--------------------------------------------------------------------------
  | Add Section
  |--------------------------------------------------------------------------
  */

  const handleAddSection = () => {
    setEditingSection(null);

    setSectionForm({
      title: "",
      description: "",
      sort_order: sections.length + 1,
      status: "draft",
      lessons: [createEmptyLesson(1)],
    });

    setSectionFormOpen(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Edit Section
  |--------------------------------------------------------------------------
  */

  const handleEditSection = async (section) => {
    try {
      setSavingSection(true);

      const response = await getCourseSection(courseId, section.id);

      const sectionData = response.data;

      const sectionLessons = Array.isArray(sectionData.lessons)
        ? sectionData.lessons
        : [];

      setEditingSection(sectionData);

      setSectionForm({
        title: sectionData.title ?? "",

        description: sectionData.description ?? "",

        sort_order: sectionData.sort_order ?? 1,

        status: sectionData.status ?? "draft",

        lessons:
          sectionLessons.length > 0
            ? sectionLessons.map((lesson, index) => ({
                id: lesson.id ?? null,

                title: lesson.title ?? "",

                description: lesson.description ?? "",

                type: "video",

                sort_order: lesson.sort_order ?? index + 1,

                duration_seconds: lesson.duration_seconds ?? "",

                is_preview: Boolean(lesson.is_preview),

                status: lesson.status ?? "draft",

                video: null,

                existingVideo:
                  lesson.video_path ?? lesson.video_url ?? lesson.video ?? null,
              }))
            : [createEmptyLesson(1)],
      });

      setSectionFormOpen(true);
    } catch (error) {
      console.error("Failed to load course section:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setSavingSection(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Close Section Form
  |--------------------------------------------------------------------------
  */

  const handleCloseSectionForm = () => {
    if (savingSection) {
      return;
    }

    setSectionFormOpen(false);
    setEditingSection(null);
    resetSectionForm();
  };

  /*
  |--------------------------------------------------------------------------
  | Section Change
  |--------------------------------------------------------------------------
  */

  const handleSectionChange = (event) => {
    const { name, value } = event.target;

    setSectionForm((previous) => ({
      ...previous,

      [name]: name === "sort_order" ? Number(value) : value,
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Lesson Change
  |--------------------------------------------------------------------------
  */

  const handleLessonChange = (index, event) => {
    const { name, value, type, checked } = event.target;

    setSectionForm((previous) => {
      const updatedLessons = [...previous.lessons];

      updatedLessons[index] = {
        ...updatedLessons[index],

        [name]:
          type === "checkbox"
            ? checked
            : name === "sort_order" || name === "duration_seconds"
              ? value === ""
                ? ""
                : Number(value)
              : value,
      };

      return {
        ...previous,
        lessons: updatedLessons,
      };
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Video Change
  |--------------------------------------------------------------------------
  */

  const handleVideoChange = (index, event) => {
    const file = event.target.files?.[0] ?? null;

    setSectionForm((previous) => {
      const updatedLessons = [...previous.lessons];

      updatedLessons[index] = {
        ...updatedLessons[index],
        video: file,
      };

      return {
        ...previous,
        lessons: updatedLessons,
      };
    });

    if (!file) {
      return;
    }

    const objectUrl = URL.createObjectURL(file);

    const video = document.createElement("video");

    video.preload = "metadata";

    video.onloadedmetadata = () => {
      const duration = Math.round(video.duration);

      setSectionForm((previous) => {
        const updatedLessons = [...previous.lessons];

        updatedLessons[index] = {
          ...updatedLessons[index],
          duration_seconds: duration,
        };

        return {
          ...previous,
          lessons: updatedLessons,
        };
      });

      URL.revokeObjectURL(objectUrl);
    };

    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);

      toast.error("Unable to read video duration.");
    };

    video.src = objectUrl;
  };

  /*
  |--------------------------------------------------------------------------
  | Add Lesson
  |--------------------------------------------------------------------------
  */

  const handleAddLesson = () => {
    setSectionForm((previous) => ({
      ...previous,

      lessons: [
        ...previous.lessons,

        createEmptyLesson(previous.lessons.length + 1),
      ],
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Remove Lesson
  |--------------------------------------------------------------------------
  */

  const handleRemoveLesson = (index) => {
    if (sectionForm.lessons.length === 1) {
      toast.error("A section must have at least one lesson.");

      return;
    }

    setSectionForm((previous) => ({
      ...previous,

      lessons: previous.lessons
        .filter((_, lessonIndex) => lessonIndex !== index)
        .map((lesson, lessonIndex) => ({
          ...lesson,
          sort_order: lessonIndex + 1,
        })),
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Validate Section
  |--------------------------------------------------------------------------
  */

  const validateSectionForm = () => {
    if (!sectionForm.title.trim()) {
      toast.error("Section title is required.");

      return false;
    }

    if (sectionForm.lessons.length === 0) {
      toast.error("Add at least one lesson.");

      return false;
    }

    for (let index = 0; index < sectionForm.lessons.length; index++) {
      const lesson = sectionForm.lessons[index];

      if (!lesson.title.trim()) {
        toast.error(`Lesson ${index + 1} title is required.`);

        return false;
      }

      /*
        | New lesson requires video.
        | Existing lesson can keep its
        | current video.
        */

      if (!lesson.id && !(lesson.video instanceof File)) {
        toast.error(`Please select a video for Lesson ${index + 1}.`);

        return false;
      }

      if (
        lesson.duration_seconds !== "" &&
        Number(lesson.duration_seconds) < 0
      ) {
        toast.error(`Invalid duration for Lesson ${index + 1}.`);

        return false;
      }
    }

    return true;
  };

  /*
  |--------------------------------------------------------------------------
  | Save Section + Lessons
  |--------------------------------------------------------------------------
  */

  const handleSectionSubmit = async (event) => {
    event.preventDefault();

    if (!validateSectionForm()) {
      return;
    }

    try {
      setSavingSection(true);

      const payload = {
        title: sectionForm.title.trim(),

        description: sectionForm.description.trim() || null,

        sort_order: Number(sectionForm.sort_order),

        status: sectionForm.status,

        lessons: sectionForm.lessons.map((lesson, index) => ({
          ...(lesson.id
            ? {
                id: lesson.id,
              }
            : {}),

          title: lesson.title.trim(),

          description: lesson.description.trim() || null,

          type: "video",

          sort_order: index + 1,

          duration_seconds:
            lesson.duration_seconds === ""
              ? null
              : Number(lesson.duration_seconds),

          is_preview: Boolean(lesson.is_preview),

          status: lesson.status,

          ...(lesson.video instanceof File
            ? {
                video: lesson.video,
              }
            : {}),
        })),
      };

      /*
        |--------------------------------------------------------------------------
        | Update
        |--------------------------------------------------------------------------
        */

      if (editingSection) {
        const response = await updateCourseSection(
          courseId,
          editingSection.id,
          payload,
        );

        const updatedSection = response.data;

        setSections((previous) =>
          previous.map((section) =>
            section.id === editingSection.id
              ? {
                  ...section,
                  ...updatedSection,
                  lessons_count:
                    updatedSection.lessons_count ?? payload.lessons.length,
                }
              : section,
          ),
        );

        toast.success("Course section updated successfully.");
      } else {

      /*
        |--------------------------------------------------------------------------
        | Create
        |--------------------------------------------------------------------------
        */
        const response = await createCourseSection(courseId, payload);

        const newSection = response.data;

        setSections((previous) => [
          ...previous,
          {
            ...newSection,

            lessons_count: newSection.lessons_count ?? payload.lessons.length,
          },
        ]);

        toast.success("Course section created successfully.");
      }

      setSectionFormOpen(false);

      setEditingSection(null);

      resetSectionForm();

      /*
        | Refresh sections so lesson
        | counts and server data are
        | always correct.
        */

      await fetchSections();
    } catch (error) {
      console.error("Failed to save course section:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setSavingSection(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Delete Section Modal
  |--------------------------------------------------------------------------
  */

  const handleOpenDeleteSection = (section) => {
    setSectionToDelete(section);

    setDeleteModalOpen(true);
  };

  const handleCloseDeleteSection = () => {
    if (deletingSectionId !== null) {
      return;
    }

    setDeleteModalOpen(false);

    setSectionToDelete(null);
  };

  /*
  |--------------------------------------------------------------------------
  | Delete Section
  |--------------------------------------------------------------------------
  */

  const handleDeleteSection = async () => {
    if (!sectionToDelete) {
      return;
    }

    try {
      setDeletingSectionId(sectionToDelete.id);

      await deleteCourseSection(courseId, sectionToDelete.id);

      setSections((previous) =>
        previous.filter((section) => section.id !== sectionToDelete.id),
      );

      setLessons((previous) => {
        const updated = {
          ...previous,
        };

        delete updated[sectionToDelete.id];

        return updated;
      });

      if (expandedSectionId === sectionToDelete.id) {
        setExpandedSectionId(null);
      }

      toast.success("Course section deleted successfully.");

      setDeleteModalOpen(false);

      setSectionToDelete(null);
    } catch (error) {
      console.error("Failed to delete course section:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setDeletingSectionId(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Fetch Lessons For View
  |--------------------------------------------------------------------------
  */

  const fetchLessons = async (sectionId) => {
    try {
      setLoadingLessons((previous) => ({
        ...previous,
        [sectionId]: true,
      }));

      const response = await getSectionLessons(sectionId);

      setLessons((previous) => ({
        ...previous,

        [sectionId]: Array.isArray(response.data) ? response.data : [],
      }));
    } catch (error) {
      console.error("Failed to fetch lessons:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setLoadingLessons((previous) => ({
        ...previous,
        [sectionId]: false,
      }));
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Toggle Lessons
  |--------------------------------------------------------------------------
  */

  const handleToggleSection = async (sectionId) => {
    if (expandedSectionId === sectionId) {
      setExpandedSectionId(null);

      return;
    }

    setExpandedSectionId(sectionId);

    await fetchLessons(sectionId);
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Course Content
        </h2>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Loading sections...
        </p>
      </section>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <>
      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        {/* ============================================================ */}
        {/* Header */}
        {/* ============================================================ */}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Course Content
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage course sections and video lessons.
            </p>
          </div>

          <Button type="button" onClick={handleAddSection}>
            + Add Section
          </Button>
        </div>

        {/* ============================================================ */}
        {/* Combined Section Form */}
        {/* ============================================================ */}

        {sectionFormOpen && (
          <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50/50 p-5 dark:border-blue-900 dark:bg-blue-900/10">
            <div className="mb-5">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {editingSection ? "Edit Video Section" : "Add Video Section"}
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Add the section and all video lessons in one form.
              </p>
            </div>

            <form onSubmit={handleSectionSubmit} className="space-y-6">
              {/* ====================================================== */}
              {/* Section Details */}
              {/* ====================================================== */}

              <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                <h4 className="mb-5 font-semibold text-gray-900 dark:text-white">
                  Section Details
                </h4>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Section Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={sectionForm.title}
                      onChange={handleSectionChange}
                      placeholder="e.g. Introduction to React"
                      disabled={savingSection}
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={sectionForm.description}
                      onChange={handleSectionChange}
                      rows={4}
                      placeholder="Describe what students will learn..."
                      disabled={savingSection}
                      className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Sort Order
                      </label>

                      <input
                        type="number"
                        name="sort_order"
                        min="1"
                        value={sectionForm.sort_order}
                        onChange={handleSectionChange}
                        disabled={savingSection}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Status
                      </label>

                      <select
                        name="status"
                        value={sectionForm.status}
                        onChange={handleSectionChange}
                        disabled={savingSection}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      >
                        <option value="draft">Draft</option>

                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* ====================================================== */}
              {/* Lessons */}
              {/* ====================================================== */}

              <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Video Lessons
                    </h4>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Add multiple video lessons to this section.
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={handleAddLesson}
                    disabled={savingSection}
                  >
                    + Add Lesson
                  </Button>
                </div>

                <div className="space-y-5">
                  {sectionForm.lessons.map((lesson, index) => (
                    <div
                      key={lesson.id ?? `new-${index}`}
                      className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/40"
                    >
                      {/* Lesson Header */}

                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                            {index + 1}
                          </div>

                          <h5 className="font-semibold text-gray-900 dark:text-white">
                            Lesson {index + 1}
                          </h5>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveLesson(index)}
                          disabled={savingSection}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                          Remove
                        </button>
                      </div>

                      {/* Title */}

                      <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Lesson Title
                        </label>

                        <input
                          type="text"
                          name="title"
                          value={lesson.title}
                          onChange={(event) => handleLessonChange(index, event)}
                          placeholder="e.g. Introduction to React"
                          disabled={savingSection}
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                      </div>

                      {/* Description */}

                      <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Description
                        </label>

                        <textarea
                          name="description"
                          value={lesson.description}
                          onChange={(event) => handleLessonChange(index, event)}
                          rows={3}
                          placeholder="Describe this lesson..."
                          disabled={savingSection}
                          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />
                      </div>

                      {/* Video */}

                      <div className="mb-5">
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Video
                        </label>

                        <input
                          type="file"
                          accept="video/*"
                          onChange={(event) => handleVideoChange(index, event)}
                          disabled={savingSection}
                          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:border-0 file:bg-gray-100 file:px-4 file:py-2.5 file:text-sm file:font-medium dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:file:bg-gray-800"
                        />

                        {lesson.video instanceof File && (
                          <p className="mt-2 text-xs text-green-600 dark:text-green-400">
                            Selected: {lesson.video.name}
                          </p>
                        )}

                        {lesson.id &&
                          lesson.existingVideo &&
                          !(lesson.video instanceof File) && (
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                              Existing video will be kept. Select a new video
                              only to replace it.
                            </p>
                          )}
                      </div>

                      {/* Lesson Settings */}

                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Type
                          </label>

                          <select
                            value="video"
                            disabled
                            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                          >
                            <option value="video">Video</option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Sort Order
                          </label>

                          <input
                            type="number"
                            name="sort_order"
                            min="1"
                            value={lesson.sort_order}
                            onChange={(event) =>
                              handleLessonChange(index, event)
                            }
                            disabled={savingSection}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Duration (seconds)
                          </label>

                          <input
                            type="number"
                            name="duration_seconds"
                            min="0"
                            value={lesson.duration_seconds}
                            onChange={(event) =>
                              handleLessonChange(index, event)
                            }
                            placeholder="Auto detected"
                            disabled={savingSection}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Status
                          </label>

                          <select
                            name="status"
                            value={lesson.status}
                            onChange={(event) =>
                              handleLessonChange(index, event)
                            }
                            disabled={savingSection}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                          >
                            <option value="draft">Draft</option>

                            <option value="published">Published</option>
                          </select>
                        </div>
                      </div>

                      {/* Preview */}

                      <div className="mt-5">
                        <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <input
                            type="checkbox"
                            name="is_preview"
                            checked={lesson.is_preview}
                            onChange={(event) =>
                              handleLessonChange(index, event)
                            }
                            disabled={savingSection}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          Free Preview
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddLesson}
                  disabled={savingSection}
                  className="mt-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  + Add another video lesson
                </button>
              </div>

              {/* ====================================================== */}
              {/* Actions */}
              {/* ====================================================== */}

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseSectionForm}
                  disabled={savingSection}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>

                <Button type="submit" disabled={savingSection}>
                  {savingSection
                    ? "Saving..."
                    : editingSection
                      ? "Update Section & Lessons"
                      : "Create Section & Lessons"}
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* No Sections */}
        {/* ============================================================ */}

        {!sections.length ? (
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No sections added yet.
            </p>

            <button
              type="button"
              onClick={handleAddSection}
              className="mt-3 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              + Add your first section
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map((section, index) => {
              const sectionLessons = lessons[section.id] || [];

              const isExpanded = expandedSectionId === section.id;

              return (
                <div
                  key={section.id}
                  className="rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  {/* ================================================= */}
                  {/* Section Header */}
                  {/* ================================================= */}

                  <div className="p-5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          {index + 1}
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {section.title}
                          </h3>

                          {section.description && (
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              {section.description}
                            </p>
                          )}

                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                              {section.lessons_count ?? 0}{" "}
                              {(section.lessons_count ?? 0) === 1
                                ? "Lesson"
                                : "Lessons"}
                            </span>

                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${
                                section.status === "published"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                              }`}
                            >
                              {section.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleSection(section.id)}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                        >
                          {isExpanded ? "Hide Lessons" : "View Lessons"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleEditSection(section)}
                          disabled={savingSection}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-50 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenDeleteSection(section)}
                          disabled={deletingSectionId === section.id}
                          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                          {deletingSectionId === section.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ================================================= */}
                  {/* Lessons */}
                  {/* ================================================= */}

                  {isExpanded && (
                    <div className="border-t border-gray-200 bg-gray-50/50 p-5 dark:border-gray-700 dark:bg-gray-800/20">
                      <div className="mb-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Lessons
                        </h4>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          Video lessons inside this section.
                        </p>
                      </div>

                      {loadingLessons[section.id] ? (
                        <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                          Loading lessons...
                        </p>
                      ) : !sectionLessons.length ? (
                        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            No lessons added yet.
                          </p>

                          <button
                            type="button"
                            onClick={() => handleEditSection(section)}
                            className="mt-3 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                          >
                            + Add lesson
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {sectionLessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
                            >
                              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex gap-3">
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                    {lessonIndex + 1}
                                  </div>

                                  <div>
                                    <h5 className="font-medium text-gray-900 dark:text-white">
                                      {lesson.title}
                                    </h5>

                                    {lesson.description && (
                                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {lesson.description}
                                      </p>
                                    )}

                                    <div className="mt-2 flex flex-wrap gap-2">
                                      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                        Video
                                      </span>

                                      {lesson.duration_seconds !== null &&
                                        lesson.duration_seconds !==
                                          undefined && (
                                          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                            {lesson.duration_seconds} sec
                                          </span>
                                        )}

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
                                        {lesson.status}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleEditSection(section)}
                                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                                >
                                  Edit Section
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================================================================ */}
      {/* Delete Modal */}
      {/* ================================================================ */}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteSection}
        onConfirm={handleDeleteSection}
        name={sectionToDelete?.title ?? ""}
        loading={deletingSectionId !== null}
      />
    </>
  );
}
