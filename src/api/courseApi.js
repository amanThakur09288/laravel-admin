// import api from "./axios";

// export const getCourses = async () => {
//   const response = await api.get("/courses");
//   return response.data;
// };

// export const getCourse = async (id) => {
//   const response = await api.get(`/courses/${id}`);
//   return response.data;
// };

// export const createCourse = async (data) => {
//   const response = await api.post("/courses", data);
//   return response.data;
// };

// export const updateCourse = async (id, data) => {
//   const response = await api.put(`/courses/${id}`, data);

//   return response.data;
// };

// export const deleteCourse = async (id) => {
//   const response = await api.delete(`/courses/${id}`);

//   return response.data;
// };

// /*
// |--------------------------------------------------------------------------
// | Video Sections
// |--------------------------------------------------------------------------
// */

// const buildVideoSectionFormData = (data) => {
//   const formData = new FormData();

//   formData.append("course_id", String(data.course_id));

//   formData.append("title", data.title?.trim() || "");

//   formData.append("description", data.description?.trim() || "");

//   formData.append("sort_order", String(data.sort_order));

//   formData.append("status", data.status);

//   data.lessons.forEach((lesson, index) => {
//     if (lesson.id) {
//       formData.append(`lessons[${index}][id]`, String(lesson.id));
//     }

//     formData.append(`lessons[${index}][title]`, lesson.title?.trim() || "");

//     formData.append(
//       `lessons[${index}][description]`,
//       lesson.description?.trim() || "",
//     );

//     formData.append(`lessons[${index}][type]`, "video");

//     if (
//       lesson.duration_seconds !== null &&
//       lesson.duration_seconds !== undefined
//     ) {
//       formData.append(
//         `lessons[${index}][duration_seconds]`,
//         String(lesson.duration_seconds),
//       );
//     }

//     formData.append(
//       `lessons[${index}][is_preview]`,
//       lesson.is_preview ? "1" : "0",
//     );

//     formData.append(`lessons[${index}][status]`, lesson.status);

//     if (lesson.video instanceof File) {
//       formData.append(`lessons[${index}][video]`, lesson.video);
//     }
//   });

//   return formData;
// };

// export const getCourseSections = async (courseId) => {
//   const response = await api.get(`/courses/${courseId}/sections`);

//   return response.data;
// };

// export const getCourseSection = async (courseId, sectionId) => {
//   const response = await api.get(`/courses/${courseId}/sections/${sectionId}`);

//   return response.data;
// };

// export const createCourseSection = async (courseId, data) => {
//   const formData = buildVideoSectionFormData(data);

//   const response = await api.post(`/courses/${courseId}/sections`, formData);

//   return response.data;
// };

// export const updateCourseSection = async (courseId, sectionId, data) => {
//   const formData = buildVideoSectionFormData(data);

//   formData.append("_method", "PUT");

//   const response = await api.post(
//     `/courses/${courseId}/sections/${sectionId}`,
//     formData,
//   );

//   return response.data;
// };

// export const deleteCourseSection = async (courseId, sectionId) => {
//   const response = await api.delete(
//     `/courses/${courseId}/sections/${sectionId}`,
//   );

//   return response.data;
// };

// /*
// |--------------------------------------------------------------------------
// | Individual Lesson Actions
// |--------------------------------------------------------------------------
// */

// export const getSectionLessons = async (sectionId) => {
//   const response = await api.get(`/sections/${sectionId}/lessons`);

//   return response.data;
// };

// export const getSectionLesson = async (sectionId, lessonId) => {
//   const response = await api.get(`/sections/${sectionId}/lessons/${lessonId}`);

//   return response.data;
// };

// export const deleteSectionLesson = async (sectionId, lessonId) => {
//   const response = await api.delete(
//     `/sections/${sectionId}/lessons/${lessonId}`,
//   );

//   return response.data;
// };

import api from "./axios";

/*
|--------------------------------------------------------------------------
| Course API
|--------------------------------------------------------------------------
*/

export const getCourses = async () => {
  const response = await api.get("/courses");

  return response.data;
};

export const getCourse = async (id) => {
  const response = await api.get(`/courses/${id}`);

  return response.data;
};

export const createCourse = async (data) => {
  const response = await api.post("/courses", data);

  return response.data;
};

export const updateCourse = async (id, data) => {
  const response = await api.put(`/courses/${id}`, data);

  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`);

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Video Section Constants
|--------------------------------------------------------------------------
*/

const MAX_VIDEO_SIZE = 500 * 1024 * 1024;

/*
|--------------------------------------------------------------------------
| Validate Video Before Upload
|--------------------------------------------------------------------------
*/

const validateVideoFile = (file) => {
  if (!(file instanceof File)) {
    return;
  }

  if (file.size > MAX_VIDEO_SIZE) {
    const error = new Error(
      "Video is too large. Maximum allowed size is 500 MB.",
    );

    error.code = "VIDEO_TOO_LARGE";

    throw error;
  }

  if (!file.type.startsWith("video/")) {
    const error = new Error("Invalid video file. Please select a valid video.");

    error.code = "INVALID_VIDEO";

    throw error;
  }
};

/*
|--------------------------------------------------------------------------
| Build Video Section FormData
|--------------------------------------------------------------------------
*/

const buildVideoSectionFormData = (data) => {
  const formData = new FormData();

  /*
  |--------------------------------------------------------------------------
  | Section
  |--------------------------------------------------------------------------
  */

  formData.append("course_id", String(data.course_id ?? ""));

  formData.append("title", data.title?.trim() || "");

  formData.append("description", data.description?.trim() || "");

  formData.append("sort_order", String(data.sort_order ?? ""));

  formData.append("status", data.status || "draft");

  /*
  |--------------------------------------------------------------------------
  | Lessons
  |--------------------------------------------------------------------------
  */

  const lessons = Array.isArray(data.lessons) ? data.lessons : [];

  lessons.forEach((lesson, index) => {
    /*
    |--------------------------------------------------------------------------
    | Existing Lesson ID
    |--------------------------------------------------------------------------
    */

    if (lesson.id) {
      formData.append(`lessons[${index}][id]`, String(lesson.id));
    }

    /*
    |--------------------------------------------------------------------------
    | Lesson Title
    |--------------------------------------------------------------------------
    */

    formData.append(`lessons[${index}][title]`, lesson.title?.trim() || "");

    /*
    |--------------------------------------------------------------------------
    | Lesson Description
    |--------------------------------------------------------------------------
    */

    formData.append(
      `lessons[${index}][description]`,
      lesson.description?.trim() || "",
    );

    /*
    |--------------------------------------------------------------------------
    | Lesson Type
    |--------------------------------------------------------------------------
    */

    formData.append(`lessons[${index}][type]`, "video");

    /*
    |--------------------------------------------------------------------------
    | Lesson Sort Order
    |--------------------------------------------------------------------------
    */

    formData.append(
      `lessons[${index}][sort_order]`,
      String(lesson.sort_order ?? index + 1),
    );

    /*
    |--------------------------------------------------------------------------
    | Duration
    |--------------------------------------------------------------------------
    */

    if (
      lesson.duration_seconds !== null &&
      lesson.duration_seconds !== undefined &&
      lesson.duration_seconds !== ""
    ) {
      formData.append(
        `lessons[${index}][duration_seconds]`,
        String(lesson.duration_seconds),
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Preview
    |--------------------------------------------------------------------------
    */

    formData.append(
      `lessons[${index}][is_preview]`,
      lesson.is_preview ? "1" : "0",
    );

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    formData.append(`lessons[${index}][status]`, lesson.status || "draft");

    /*
    |--------------------------------------------------------------------------
    | Video
    |--------------------------------------------------------------------------
    */

    if (lesson.video instanceof File) {
      validateVideoFile(lesson.video);

      formData.append(`lessons[${index}][video]`, lesson.video);
    }
  });

  return formData;
};

/*
|--------------------------------------------------------------------------
| Video Sections
|--------------------------------------------------------------------------
*/

export const getCourseSections = async (courseId) => {
  const response = await api.get(`/courses/${courseId}/sections`);

  return response.data;
};

export const getCourseSection = async (courseId, sectionId) => {
  const response = await api.get(`/courses/${courseId}/sections/${sectionId}`);

  return response.data;
};

export const createCourseSection = async (courseId, data) => {
  try {
    const formData = buildVideoSectionFormData(data);

    const response = await api.post(`/courses/${courseId}/sections`, formData);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCourseSection = async (courseId, sectionId, data) => {
  try {
    const formData = buildVideoSectionFormData(data);

    /*
    |--------------------------------------------------------------------------
    | Laravel Method Spoofing
    |--------------------------------------------------------------------------
    */

    formData.append("_method", "PUT");

    const response = await api.post(
      `/courses/${courseId}/sections/${sectionId}`,
      formData,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCourseSection = async (courseId, sectionId) => {
  const response = await api.delete(
    `/courses/${courseId}/sections/${sectionId}`,
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Individual Lesson Actions
|--------------------------------------------------------------------------
*/

export const getSectionLessons = async (sectionId) => {
  const response = await api.get(`/sections/${sectionId}/lessons`);

  return response.data;
};

export const getSectionLesson = async (sectionId, lessonId) => {
  const response = await api.get(`/sections/${sectionId}/lessons/${lessonId}`);

  return response.data;
};

export const deleteSectionLesson = async (sectionId, lessonId) => {
  const response = await api.delete(
    `/sections/${sectionId}/lessons/${lessonId}`,
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Course Section Error Handler
|--------------------------------------------------------------------------
|
| Converts technical API errors into messages that an admin
| can actually understand.
|
*/

export const getCourseSectionErrorMessage = (error) => {
  /*
  |--------------------------------------------------------------------------
  | Frontend Video Size Validation
  |--------------------------------------------------------------------------
  */

  if (error?.code === "VIDEO_TOO_LARGE") {
    return "Video is too large. Maximum allowed size is 500 MB.";
  }

  /*
  |--------------------------------------------------------------------------
  | Invalid Video
  |--------------------------------------------------------------------------
  */

  if (error?.code === "INVALID_VIDEO") {
    return "Invalid video file. Please select a valid video.";
  }

  /*
  |--------------------------------------------------------------------------
  | HTTP Status
  |--------------------------------------------------------------------------
  */

  const status = error?.response?.status;

  const responseData = error?.response?.data;

  /*
  |--------------------------------------------------------------------------
  | 413 - Content Too Large
  |--------------------------------------------------------------------------
  */

  if (status === 413) {
    return "The upload is too large. Each video can be up to 500 MB.";
  }

  /*
  |--------------------------------------------------------------------------
  | 422 - Laravel Validation Error
  |--------------------------------------------------------------------------
  */

  if (status === 422) {
    const errors = responseData?.errors;

    if (errors && typeof errors === "object") {
      const messages = Object.values(errors).flat().filter(Boolean);

      if (messages.length > 0) {
        return messages[0];
      }
    }

    return (
      responseData?.message ||
      "Please check the form and correct the highlighted fields."
    );
  }

  /*
  |--------------------------------------------------------------------------
  | 401 - Unauthenticated
  |--------------------------------------------------------------------------
  */

  if (status === 401) {
    return "Your session has expired. Please login again.";
  }

  /*
  |--------------------------------------------------------------------------
  | 403 - Forbidden
  |--------------------------------------------------------------------------
  */

  if (status === 403) {
    return "You do not have permission to perform this action.";
  }

  /*
  |--------------------------------------------------------------------------
  | 404 - Not Found
  |--------------------------------------------------------------------------
  */

  if (status === 404) {
    return "The requested course section was not found.";
  }

  /*
  |--------------------------------------------------------------------------
  | 419 - CSRF / Session
  |--------------------------------------------------------------------------
  */

  if (status === 419) {
    return "Your session has expired. Please refresh the page and try again.";
  }

  /*
  |--------------------------------------------------------------------------
  | 500+ - Server Error
  |--------------------------------------------------------------------------
  */

  if (typeof status === "number" && status >= 500) {
    return "A server error occurred while processing the video. Please try again.";
  }

  /*
  |--------------------------------------------------------------------------
  | Network Error
  |--------------------------------------------------------------------------
  */

  if (error?.request && !error?.response) {
    return "Unable to connect to the server. Please check your internet connection and try again.";
  }

  /*
  |--------------------------------------------------------------------------
  | Normal Error
  |--------------------------------------------------------------------------
  */

  return (
    responseData?.message ||
    error?.message ||
    "Something went wrong. Please try again."
  );
};
