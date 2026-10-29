// import { useEffect, useState } from "react";
// import { Controller, useFieldArray, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import {
//   createVideoSectionSchema,
//   updateVideoSectionSchema,
// } from "../../utils/videoSectionSchema";

// import Button from "../common/Button";

// const createLesson = () => ({
//   title: "",
//   description: "",
//   type: "video",
//   video: null,
//   video_name: "",
//   has_existing_video: false,
//   duration_seconds: null,
//   is_preview: false,
//   status: "draft",
// });

// const defaultValues = {
//   course_id: "",
//   title: "",
//   description: "",
//   sort_order: 1,
//   status: "draft",
//   lessons: [createLesson()],
// };

// const formatDuration = (seconds) => {
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
//     return `${hours}:${String(minutes).padStart(2, "0")}:${String(
//       remainingSeconds,
//     ).padStart(2, "0")}`;
//   }

//   return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
// };

// const normalizeInitialData = (data) => {
//   if (!data) {
//     return defaultValues;
//   }

//   const lessons =
//     Array.isArray(data.lessons) && data.lessons.length > 0
//       ? data.lessons.map((lesson) => ({
//           id: lesson.id,
//           title: lesson.title ?? "",
//           description: lesson.description ?? "",
//           type: "video",
//           video: null,
//           video_name: lesson.video_original_name ?? "",
//           has_existing_video: Boolean(lesson.video_url || lesson.video_path),
//           duration_seconds:
//             lesson.duration_seconds !== null &&
//             lesson.duration_seconds !== undefined
//               ? Number(lesson.duration_seconds)
//               : null,
//           is_preview: Boolean(lesson.is_preview),
//           status: lesson.status ?? "draft",
//         }))
//       : [createLesson()];

//   return {
//     course_id: data.course_id ?? data.course?.id ?? "",
//     title: data.title ?? "",
//     description: data.description ?? "",
//     sort_order: Number(data.sort_order) || 1,
//     status: data.status ?? "draft",
//     lessons,
//   };
// };

// export default function VideoLessonForm({
//   courses = [],
//   initialData = null,
//   onSubmit,
//   submitting = false,
//   submitText = "Create Video Section",
//   onCancel,
// }) {
//   const isEdit = Boolean(initialData?.id);

//   const schema = isEdit ? updateVideoSectionSchema : createVideoSectionSchema;

//   const {
//     register,
//     control,
//     watch,
//     setValue,
//     handleSubmit,
//     reset,
//     formState: { errors, isDirty },
//   } = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: normalizeInitialData(initialData),
//     mode: "onSubmit",
//     reValidateMode: "onChange",
//     shouldFocusError: true,
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "lessons",
//   });

//   const lessons = watch("lessons") || [];

//   const [videoNames, setVideoNames] = useState({});

//   useEffect(() => {
//     reset(normalizeInitialData(initialData));

//     const names = {};

//     if (initialData?.lessons && Array.isArray(initialData.lessons)) {
//       initialData.lessons.forEach((lesson, index) => {
//         names[index] = lesson.video_original_name || "";
//       });
//     }

//     setVideoNames(names);
//   }, [initialData, reset]);

//   const handleAddLesson = () => {
//     if (fields.length >= 100) {
//       return;
//     }

//     append(createLesson());
//   };

//   const handleRemoveLesson = (index) => {
//     if (fields.length <= 1) {
//       return;
//     }

//     remove(index);

//     setVideoNames((previous) => {
//       const next = {};

//       Object.entries(previous).forEach(([key, value]) => {
//         const oldIndex = Number(key);

//         if (oldIndex < index) {
//           next[oldIndex] = value;
//         }

//         if (oldIndex > index) {
//           next[oldIndex - 1] = value;
//         }
//       });

//       return next;
//     });
//   };

//   const handleVideoChange = (event, index) => {
//     const file = event.target.files?.[0];

//     if (!file) {
//       return;
//     }

//     setValue(`lessons.${index}.video`, file, {
//       shouldValidate: true,
//       shouldDirty: true,
//     });

//     setValue(`lessons.${index}.video_name`, file.name, {
//       shouldDirty: true,
//     });

//     setValue(`lessons.${index}.has_existing_video`, true, {
//       shouldValidate: true,
//       shouldDirty: true,
//     });

//     setVideoNames((previous) => ({
//       ...previous,
//       [index]: file.name,
//     }));

//     const video = document.createElement("video");

//     const objectUrl = URL.createObjectURL(file);

//     video.preload = "metadata";

//     video.onloadedmetadata = () => {
//       const duration = Number.isFinite(video.duration)
//         ? Math.round(video.duration)
//         : null;

//       setValue(`lessons.${index}.duration_seconds`, duration, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });

//       URL.revokeObjectURL(objectUrl);
//     };

//     video.onerror = () => {
//       setValue(`lessons.${index}.duration_seconds`, null, {
//         shouldValidate: true,
//         shouldDirty: true,
//       });

//       URL.revokeObjectURL(objectUrl);
//     };

//     video.src = objectUrl;
//   };

//   const handleFormSubmit = async (data) => {
//     const payload = {
//       ...data,

//       course_id: Number(data.course_id),

//       sort_order: Number(data.sort_order),

//       lessons: data.lessons.map((lesson) => ({
//         ...lesson,

//         id: lesson.id ? Number(lesson.id) : undefined,

//         type: "video",

//         duration_seconds:
//           lesson.duration_seconds !== null &&
//           lesson.duration_seconds !== undefined
//             ? Number(lesson.duration_seconds)
//             : null,

//         is_preview: lesson.is_preview === true,
//       })),
//     };

//     await onSubmit(payload);
//   };

//   const handleValidationError = (validationErrors) => {
//     console.error("Video section validation errors:", validationErrors);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit(handleFormSubmit, handleValidationError)}
//       className="space-y-8"
//       noValidate
//     >
//       {/* ============================================================= */}
//       {/* COURSE + SECTION */}
//       {/* ============================================================= */}

//       <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
//         <h2 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
//           Video Section
//         </h2>

//         <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
//           Select a course and create the section together with all its video
//           lessons.
//         </p>

//         <div className="space-y-5">
//           {/* Course */}

//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Course *
//             </label>

//             <select
//               {...register("course_id")}
//               disabled={submitting}
//               className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none dark:bg-gray-900 dark:text-white ${
//                 errors.course_id
//                   ? "border-red-500"
//                   : "border-gray-300 dark:border-gray-700"
//               }`}
//             >
//               <option value="">Select Course</option>

//               {courses.map((course) => (
//                 <option key={course.id} value={course.id}>
//                   {course.course_name}
//                 </option>
//               ))}
//             </select>

//             {errors.course_id && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.course_id.message}
//               </p>
//             )}
//           </div>

//           {/* Section Title */}

//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Section Title *
//             </label>

//             <input
//               {...register("title")}
//               type="text"
//               placeholder="e.g. Introduction to Networking"
//               disabled={submitting}
//               className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none dark:bg-gray-900 dark:text-white ${
//                 errors.title
//                   ? "border-red-500"
//                   : "border-gray-300 dark:border-gray-700"
//               }`}
//             />

//             {errors.title && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.title.message}
//               </p>
//             )}
//           </div>

//           {/* Description */}

//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Section Description
//             </label>

//             <textarea
//               {...register("description")}
//               rows={4}
//               placeholder="Describe this section..."
//               disabled={submitting}
//               className={`w-full resize-y rounded-lg border bg-white px-4 py-3 text-sm outline-none dark:bg-gray-900 dark:text-white ${
//                 errors.description
//                   ? "border-red-500"
//                   : "border-gray-300 dark:border-gray-700"
//               }`}
//             />

//             {errors.description && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.description.message}
//               </p>
//             )}
//           </div>

//           {/* Order + Status */}

//           <div className="grid gap-5 sm:grid-cols-2">
//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Section Order *
//               </label>

//               <input
//                 {...register("sort_order")}
//                 type="number"
//                 min="1"
//                 disabled={submitting}
//                 className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none dark:bg-gray-900 dark:text-white ${
//                   errors.sort_order
//                     ? "border-red-500"
//                     : "border-gray-300 dark:border-gray-700"
//                 }`}
//               />

//               {errors.sort_order && (
//                 <p className="mt-1 text-sm text-red-600">
//                   {errors.sort_order.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Section Status *
//               </label>

//               <select
//                 {...register("status")}
//                 disabled={submitting}
//                 className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
//               >
//                 <option value="draft">Draft</option>

//                 <option value="published">Published</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ============================================================= */}
//       {/* LESSONS */}
//       {/* ============================================================= */}

//       <div>
//         <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
//               Lessons & Videos
//             </h2>

//             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//               Add lessons in the exact order students should see them.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={handleAddLesson}
//             disabled={submitting || fields.length >= 100}
//             className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             + Add Lesson
//           </button>
//         </div>

//         {errors.lessons?.message && (
//           <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4">
//             <p className="text-sm text-red-600">{errors.lessons.message}</p>
//           </div>
//         )}

//         <div className="space-y-6">
//           {fields.map((field, index) => {
//             const lesson = lessons[index] || {};

//             const lessonErrors = errors.lessons?.[index];

//             const selectedVideo = lesson.video;

//             return (
//               <div
//                 key={field.id}
//                 className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
//               >
//                 {/* Lesson header */}

//                 <div className="mb-6 flex items-center justify-between">
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//                       Lesson {index + 1}
//                     </h3>

//                     <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//                       Lesson order: {index + 1}
//                     </p>
//                   </div>

//                   {fields.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveLesson(index)}
//                       disabled={submitting}
//                       className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
//                     >
//                       Remove Lesson
//                     </button>
//                   )}
//                 </div>

//                 <div className="space-y-5">
//                   {/* Title */}

//                   <div>
//                     <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Lesson Title *
//                     </label>

//                     <input
//                       {...register(`lessons.${index}.title`)}
//                       type="text"
//                       placeholder="e.g. Introduction to OSI Model"
//                       disabled={submitting}
//                       className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none dark:bg-gray-900 dark:text-white ${
//                         lessonErrors?.title
//                           ? "border-red-500"
//                           : "border-gray-300 dark:border-gray-700"
//                       }`}
//                     />

//                     {lessonErrors?.title && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {lessonErrors.title.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Description */}

//                   <div>
//                     <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Lesson Description
//                     </label>

//                     <textarea
//                       {...register(`lessons.${index}.description`)}
//                       rows={4}
//                       placeholder="Describe this lesson..."
//                       disabled={submitting}
//                       className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
//                     />

//                     {lessonErrors?.description && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {lessonErrors.description.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* Video */}

//                   <div>
//                     <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                       Video *
//                     </label>

//                     <Controller
//                       name={`lessons.${index}.video`}
//                       control={control}
//                       render={() => (
//                         <input
//                           type="file"
//                           accept="video/mp4,video/webm,video/quicktime"
//                           disabled={submitting}
//                           onChange={(event) => handleVideoChange(event, index)}
//                           className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:file:bg-gray-800"
//                         />
//                       )}
//                     />

//                     {lessonErrors?.video && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {lessonErrors.video.message}
//                       </p>
//                     )}

//                     {(videoNames[index] || lesson.video_name) && (
//                       <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
//                         <p className="text-sm font-medium text-gray-900 dark:text-white">
//                           {videoNames[index] || lesson.video_name}
//                         </p>

//                         {lesson.duration_seconds !== null &&
//                           lesson.duration_seconds !== undefined && (
//                             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                               Duration:{" "}
//                               <span className="font-medium">
//                                 {formatDuration(lesson.duration_seconds)}
//                               </span>
//                             </p>
//                           )}

//                         {lesson.has_existing_video && !selectedVideo && (
//                           <p className="mt-1 text-xs text-green-600 dark:text-green-400">
//                             Existing video will be kept unless you select a
//                             replacement.
//                           </p>
//                         )}
//                       </div>
//                     )}

//                     <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
//                       Supported: MP4, WebM, MOV. Maximum upload size: 500MB.
//                     </p>
//                   </div>

//                   {/* Preview + Status */}

//                   <div className="grid gap-5 sm:grid-cols-2">
//                     <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
//                       <input
//                         {...register(`lessons.${index}.is_preview`)}
//                         type="checkbox"
//                         disabled={submitting}
//                         className="h-4 w-4 rounded border-gray-300 text-blue-600"
//                       />

//                       <div>
//                         <p className="text-sm font-medium text-gray-800 dark:text-white">
//                           Free Preview
//                         </p>

//                         <p className="text-xs text-gray-500 dark:text-gray-400">
//                           Allow students to preview this lesson.
//                         </p>
//                       </div>
//                     </label>

//                     <div>
//                       <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                         Lesson Status
//                       </label>

//                       <select
//                         {...register(`lessons.${index}.status`)}
//                         disabled={submitting}
//                         className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
//                       >
//                         <option value="draft">Draft</option>

//                         <option value="published">Published</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ============================================================= */}
//       {/* SUBMIT */}
//       {/* ============================================================= */}

//       <div className="flex items-center justify-end gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
//         {isDirty && (
//           <span className="mr-auto text-sm text-gray-500 dark:text-gray-400">
//             You have unsaved changes.
//           </span>
//         )}

//         {onCancel && (
//           <button
//             type="button"
//             onClick={onCancel}
//             disabled={submitting}
//             className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
//           >
//             Cancel
//           </button>
//         )}

//         <Button type="submit" disabled={submitting}>
//           {submitting ? "Saving..." : submitText}
//         </Button>
//       </div>
//     </form>
//   );
// }

import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createVideoSectionSchema,
  updateVideoSectionSchema,
} from "../../utils/videoSectionSchema";

import Button from "../common/Button";

const createLesson = () => ({
  title: "",
  description: "",
  type: "video",
  video: null,
  video_name: "",
  has_existing_video: false,
  duration_seconds: null,
  is_preview: false,
  status: "draft",
});

const defaultValues = {
  course_id: "",
  title: "",
  description: "",
  sort_order: 1,
  status: "draft",
  lessons: [createLesson()],
};

const formatDuration = (seconds) => {
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
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
};

const normalizeInitialData = (data) => {
  if (!data) {
    return defaultValues;
  }

  const lessons =
    Array.isArray(data.lessons) && data.lessons.length > 0
      ? data.lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title ?? "",
          description: lesson.description ?? "",
          type: "video",
          video: null,
          video_name: lesson.video_original_name ?? "",
          has_existing_video: Boolean(lesson.video_url || lesson.video_path),
          duration_seconds:
            lesson.duration_seconds !== null &&
            lesson.duration_seconds !== undefined
              ? Number(lesson.duration_seconds)
              : null,
          is_preview: Boolean(lesson.is_preview),
          status: lesson.status ?? "draft",
        }))
      : [createLesson()];

  return {
    course_id: data.course_id ?? data.course?.id ?? "",
    title: data.title ?? "",
    description: data.description ?? "",
    sort_order: Number(data.sort_order) || 1,
    status: data.status ?? "draft",
    lessons,
  };
};

export default function VideoLessonForm({
  courses = [],
  initialData = null,
  onSubmit,
  submitting = false,
  submitText = "Create Video Section",
  onCancel,
}) {
  const isEdit = Boolean(initialData?.id);

  const schema = isEdit ? updateVideoSectionSchema : createVideoSectionSchema;

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: normalizeInitialData(initialData),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "lessons",
  });

  const lessons = watch("lessons") || [];

  const [videoNames, setVideoNames] = useState({});

  useEffect(() => {
    reset(normalizeInitialData(initialData));

    const names = {};

    if (initialData?.lessons && Array.isArray(initialData.lessons)) {
      initialData.lessons.forEach((lesson, index) => {
        names[index] = lesson.video_original_name || "";
      });
    }

    setVideoNames(names);
  }, [initialData, reset]);

  const handleAddLesson = () => {
    if (fields.length >= 100) {
      return;
    }

    append(createLesson());
  };

  const handleRemoveLesson = (index) => {
    if (fields.length <= 1) {
      return;
    }

    remove(index);

    setVideoNames((previous) => {
      const next = {};

      Object.entries(previous).forEach(([key, value]) => {
        const oldIndex = Number(key);

        if (oldIndex < index) {
          next[oldIndex] = value;
        }

        if (oldIndex > index) {
          next[oldIndex - 1] = value;
        }
      });

      return next;
    });
  };

  const handleVideoChange = (event, index) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setValue(`lessons.${index}.video`, file, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue(`lessons.${index}.video_name`, file.name, {
      shouldDirty: true,
    });

    setValue(`lessons.${index}.has_existing_video`, true, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setVideoNames((previous) => ({
      ...previous,
      [index]: file.name,
    }));

    const video = document.createElement("video");

    const objectUrl = URL.createObjectURL(file);

    video.preload = "metadata";

    video.onloadedmetadata = () => {
      const duration = Number.isFinite(video.duration)
        ? Math.round(video.duration)
        : null;

      setValue(`lessons.${index}.duration_seconds`, duration, {
        shouldValidate: true,
        shouldDirty: true,
      });

      URL.revokeObjectURL(objectUrl);
    };

    video.onerror = () => {
      setValue(`lessons.${index}.duration_seconds`, null, {
        shouldValidate: true,
        shouldDirty: true,
      });

      URL.revokeObjectURL(objectUrl);
    };

    video.src = objectUrl;
  };

  const handleFormSubmit = async (data) => {
    const payload = {
      ...data,

      course_id: Number(data.course_id),

      sort_order: Number(data.sort_order),

      lessons: data.lessons.map((lesson) => ({
        ...lesson,

        id: lesson.id ? Number(lesson.id) : undefined,

        type: "video",

        duration_seconds:
          lesson.duration_seconds !== null &&
          lesson.duration_seconds !== undefined
            ? Number(lesson.duration_seconds)
            : null,

        is_preview: lesson.is_preview === true,
      })),
    };

    await onSubmit(payload);
  };

  const handleValidationError = (validationErrors) => {
    console.error("Video section validation errors:", validationErrors);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit, handleValidationError)}
      className="space-y-8"
      noValidate
    >
      {/* ============================================================= */}
      {/* COURSE + SECTION */}
      {/* ============================================================= */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
          Video Section
        </h2>

        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Select a course and create the section together with all its video
          lessons.
        </p>

        <div className="space-y-5">
          {/* Course */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Course *
            </label>

            <select
              {...register("course_id")}
              disabled={submitting}
              className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none dark:bg-gray-900 dark:text-white ${
                errors.course_id
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            >
              <option value="">Select Course</option>

              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_name}
                </option>
              ))}
            </select>

            {errors.course_id && (
              <p className="mt-1 text-sm text-red-600">
                {errors.course_id.message}
              </p>
            )}
          </div>

          {/* Section Title */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Section Title *
            </label>

            <input
              {...register("title")}
              type="text"
              placeholder="e.g. Introduction to Networking"
              disabled={submitting}
              className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none dark:bg-gray-900 dark:text-white ${
                errors.title
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Section Description
            </label>

            <textarea
              {...register("description")}
              rows={4}
              placeholder="Describe this section..."
              disabled={submitting}
              className={`w-full resize-y rounded-lg border bg-white px-4 py-3 text-sm outline-none dark:bg-gray-900 dark:text-white ${
                errors.description
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Order + Status */}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Section Order *
              </label>

              <input
                {...register("sort_order")}
                type="number"
                min="1"
                disabled={submitting}
                className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none dark:bg-gray-900 dark:text-white ${
                  errors.sort_order
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-700"
                }`}
              />

              {errors.sort_order && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.sort_order.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Section Status *
              </label>

              <select
                {...register("status")}
                disabled={submitting}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
              >
                <option value="draft">Draft</option>

                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* LESSONS */}
      {/* ============================================================= */}

      <div>
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Lessons & Videos
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add lessons in the exact order students should see them.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddLesson}
            disabled={submitting || fields.length >= 100}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Add Lesson
          </button>
        </div>

        {errors.lessons?.message && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">{errors.lessons.message}</p>
          </div>
        )}

        <div className="space-y-6">
          {fields.map((field, index) => {
            const lesson = lessons[index] || {};

            const lessonErrors = errors.lessons?.[index];

            const selectedVideo = lesson.video;

            return (
              <div
                key={field.id}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                {/* Lesson header */}

                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Lesson {index + 1}
                    </h3>

                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Lesson order: {index + 1}
                    </p>
                  </div>

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveLesson(index)}
                      disabled={submitting}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      Remove Lesson
                    </button>
                  )}
                </div>

                <div className="space-y-5">
                  {/* Title */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Lesson Title *
                    </label>

                    <input
                      {...register(`lessons.${index}.title`)}
                      type="text"
                      placeholder="e.g. Introduction to OSI Model"
                      disabled={submitting}
                      className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm outline-none dark:bg-gray-900 dark:text-white ${
                        lessonErrors?.title
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-700"
                      }`}
                    />

                    {lessonErrors?.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {lessonErrors.title.message}
                      </p>
                    )}
                  </div>

                  {/* Description */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Lesson Description
                    </label>

                    <textarea
                      {...register(`lessons.${index}.description`)}
                      rows={4}
                      placeholder="Describe this lesson..."
                      disabled={submitting}
                      className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                    />

                    {lessonErrors?.description && (
                      <p className="mt-1 text-sm text-red-600">
                        {lessonErrors.description.message}
                      </p>
                    )}
                  </div>

                  {/* Video */}

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Video *
                    </label>

                    <Controller
                      name={`lessons.${index}.video`}
                      control={control}
                      render={() => (
                        <input
                          type="file"
                          accept="video/mp4,video/webm,video/quicktime"
                          disabled={submitting}
                          onChange={(event) => handleVideoChange(event, index)}
                          className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:file:bg-gray-800"
                        />
                      )}
                    />

                    {lessonErrors?.video && (
                      <p className="mt-1 text-sm text-red-600">
                        {lessonErrors.video.message}
                      </p>
                    )}

                    {(videoNames[index] || lesson.video_name) && (
                      <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {videoNames[index] || lesson.video_name}
                        </p>

                        {lesson.duration_seconds !== null &&
                          lesson.duration_seconds !== undefined && (
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                              Duration:{" "}
                              <span className="font-medium">
                                {formatDuration(lesson.duration_seconds)}
                              </span>
                            </p>
                          )}

                        {lesson.has_existing_video && !selectedVideo && (
                          <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                            Existing video will be kept unless you select a
                            replacement.
                          </p>
                        )}
                      </div>
                    )}

                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      Supported: MP4, WebM, MOV. Maximum upload size: 500MB.
                    </p>
                  </div>

                  {/* Preview + Status */}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                      <input
                        {...register(`lessons.${index}.is_preview`)}
                        type="checkbox"
                        disabled={submitting}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />

                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          Free Preview
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Allow students to preview this lesson.
                        </p>
                      </div>
                    </label>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Lesson Status
                      </label>

                      <select
                        {...register(`lessons.${index}.status`)}
                        disabled={submitting}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      >
                        <option value="draft">Draft</option>

                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================= */}
      {/* SUBMIT */}
      {/* ============================================================= */}

      <div className="flex items-center justify-end gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        {isDirty && (
          <span className="mr-auto text-sm text-gray-500 dark:text-gray-400">
            You have unsaved changes.
          </span>
        )}

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        )}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : submitText}
        </Button>
      </div>
    </form>
  );
}
