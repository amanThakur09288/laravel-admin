import { z } from "zod";

const requiredNumber = (fieldName, min, max) =>
  z.preprocess(
    (value) => {
      if (value === "" || value === null || value === undefined) {
        return undefined;
      }

      if (typeof value === "string") {
        const trimmedValue = value.trim();

        if (trimmedValue === "") {
          return undefined;
        }

        return Number(trimmedValue);
      }

      return value;
    },
    z
      .number({
        message: `${fieldName} is required.`,
      })
      .int(`${fieldName} must be a whole number.`)
      .min(min, `${fieldName} must be at least ${min}.`)
      .max(max, `${fieldName} cannot exceed ${max}.`),
  );

const requiredText = (fieldName, maxLength) =>
  z
    .string()
    .trim()
    .min(1, `${fieldName} is required.`)
    .max(maxLength, `${fieldName} must not exceed ${maxLength} characters.`);

export const courseSchema = z.object({
  course_name: requiredText("Course name", 255),

  category: requiredText("Category", 255),

  level: z.enum(["Beginner", "Intermediate", "Advanced"], {
    message: "Please select a valid level.",
  }),

  duration: requiredText("Duration", 100),

  total_hours: requiredNumber("Total hours", 1, 10000),

  status: z.enum(["Active", "Inactive"], {
    message: "Please select a valid status.",
  }),

  short_description: requiredText("Short description", 1000),
  course_description: requiredText("Course description", 10000),

  learning_outcomes: z
    .array(
      z.object({
        value: requiredText("Learning outcome", 500),
      }),
    )
    .default([]),

  curriculum: z
    .array(
      z.object({
        title: z
          .string()
          .trim()
          .min(1, "Module title is required.")
          .max(255, "Module title must not exceed 255 characters."),

        // description: z
        //   .string()
        //   .trim()
        //   .min(1, "Module description is required.")
        //   .max(5000, "Module description must not exceed 5000 characters."),
        description: z
          .string()
          .trim()
          .max(5000, "Module description must not exceed 5000 characters.")
          .optional()
          .or(z.literal("")),
        topicsText: z
          .string()
          .trim()
          .min(1, "Topics are required.")
          .max(3000, "Topics must not exceed 3000 characters."),
      }),
    )
    .default([]),

  prerequisites: z
    .array(
      z.object({
        value: requiredText("Prerequisite", 500),
      }),
    )
    .default([]),

  who_should_join: z
    .array(
      z.object({
        value: requiredText("Who should join entry", 500),
      }),
    )
    .default([]),

  course_features: z
    .array(
      z.object({
        value: requiredText("Course feature", 500),
      }),
    )
    .default([]),

  faqs: z
    .array(
      z.object({
        question: requiredText("FAQ question", 1000),

        answer: requiredText("FAQ answer", 5000),
      }),
    )
    .default([]),
});

export default courseSchema;
