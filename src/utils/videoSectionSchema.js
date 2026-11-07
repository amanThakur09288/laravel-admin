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
