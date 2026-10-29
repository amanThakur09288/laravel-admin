// import { z } from "zod";

// const requiredText = (fieldName, maxLength) =>
//   z
//     .string()
//     .trim()
//     .min(1, `${fieldName} is required.`)
//     .max(maxLength, `${fieldName} must not exceed ${maxLength} characters.`);

// const requiredNumber = (fieldName, min, max = Number.MAX_SAFE_INTEGER) =>
//   z.preprocess(
//     (value) => {
//       if (value === "" || value === null || value === undefined) {
//         return undefined;
//       }

//       if (typeof value === "string") {
//         const trimmed = value.trim();

//         if (!trimmed) {
//           return undefined;
//         }

//         return Number(trimmed);
//       }

//       return value;
//     },
//     z
//       .number({
//         message: `${fieldName} is required.`,
//       })
//       .int(`${fieldName} must be a whole number.`)
//       .min(min, `${fieldName} must be at least ${min}.`)
//       .max(max, `${fieldName} cannot exceed ${max}.`),
//   );

// export const videoSectionSchema = z.object({
//   course_id: z.preprocess(
//     (value) => {
//       if (value === "" || value === null || value === undefined) {
//         return undefined;
//       }

//       return Number(value);
//     },
//     z
//       .number({
//         message: "Course is required.",
//       })
//       .int()
//       .positive("Please select a valid course."),
//   ),

//   title: requiredText("Section title", 255),

//   description: z
//     .string()
//     .trim()
//     .max(5000, "Description must not exceed 5000 characters.")
//     .optional()
//     .or(z.literal("")),

//   sort_order: requiredNumber("Sort order", 1, 10000),

//   status: z.enum(["draft", "published"], {
//     message: "Please select a valid status.",
//   }),
// });

// export const videoLessonSchema = z.object({
//   course_id: z.preprocess(
//     (value) => {
//       if (value === "" || value === null || value === undefined) {
//         return undefined;
//       }

//       return Number(value);
//     },
//     z
//       .number({
//         message: "Course is required.",
//       })
//       .int()
//       .positive("Please select a valid course."),
//   ),

//   course_section_id: z.preprocess(
//     (value) => {
//       if (value === "" || value === null || value === undefined) {
//         return undefined;
//       }

//       return Number(value);
//     },
//     z
//       .number({
//         message: "Video section is required.",
//       })
//       .int()
//       .positive("Please select a valid video section."),
//   ),

//   title: requiredText("Lesson title", 255),

//   description: z
//     .string()
//     .trim()
//     .max(5000, "Description must not exceed 5000 characters.")
//     .optional()
//     .or(z.literal("")),

//   video: z
//     .any()
//     .refine(
//       (file) => file instanceof File || file === null || file === undefined,
//       "Please select a valid video file.",
//     )
//     .optional()
//     .nullable(),

//   duration_seconds: z.number().int().min(0).nullable().optional(),

//   is_preview: z.boolean(),

//   status: z.enum(["draft", "published"], {
//     message: "Please select a valid status.",
//   }),
// });

import { z } from "zod";

const lessonSchema = z.object({
  id: z.number().optional(),

  title: z
    .string()
    .trim()
    .min(1, "Lesson title is required.")
    .max(255, "Lesson title cannot exceed 255 characters."),

  description: z
    .string()
    .trim()
    .max(10000, "Description cannot exceed 10000 characters.")
    .optional()
    .or(z.literal("")),

  type: z.literal("video"),

  video: z.any().nullable().optional(),

  video_name: z.string().optional(),

  has_existing_video: z.boolean().default(false),

  duration_seconds: z.number().int().min(0).max(86400).nullable().optional(),

  is_preview: z.boolean(),

  status: z.enum(["draft", "published"]),
});

const baseSectionSchema = z.object({
  course_id: z.coerce.number().int().positive("Please select a course."),

  title: z
    .string()
    .trim()
    .min(1, "Section title is required.")
    .max(255, "Section title cannot exceed 255 characters."),

  description: z
    .string()
    .trim()
    .max(10000, "Description cannot exceed 10000 characters.")
    .optional()
    .or(z.literal("")),

  sort_order: z.coerce
    .number()
    .int()
    .min(1, "Section order must be at least 1."),

  status: z.enum(["draft", "published"]),

  lessons: z
    .array(lessonSchema)
    .min(1, "At least one lesson is required.")
    .max(100, "Maximum 100 lessons are allowed."),
});

export const createVideoSectionSchema = baseSectionSchema.superRefine(
  (data, ctx) => {
    data.lessons.forEach((lesson, index) => {
      if (!(lesson.video instanceof File)) {
        ctx.addIssue({
          code: "custom",
          path: ["lessons", index, "video"],
          message: "Video is required.",
        });
      }
    });
  },
);

export const updateVideoSectionSchema = baseSectionSchema.superRefine(
  (data, ctx) => {
    data.lessons.forEach((lesson, index) => {
      const hasNewVideo = lesson.video instanceof File;

      if (!hasNewVideo && !lesson.has_existing_video) {
        ctx.addIssue({
          code: "custom",
          path: ["lessons", index, "video"],
          message: "Video is required.",
        });
      }
    });
  },
);
