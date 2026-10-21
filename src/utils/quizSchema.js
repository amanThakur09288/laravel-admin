import { z } from "zod";

const numberFromInput = (value) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  return Number(value);
};

export const quizSchema = z
  .object({
    batch_id: z.preprocess(
      numberFromInput,
      z
        .number({
          message: "Please select a batch.",
        })
        .int()
        .positive("Please select a valid batch."),
    ),

    title: z
      .string()
      .trim()
      .min(1, "Quiz title is required.")
      .max(255, "Quiz title cannot exceed 255 characters."),

    description: z
      .string()
      .max(5000, "Description cannot exceed 5000 characters.")
      .optional()
      .or(z.literal("")),

    duration_minutes: z.preprocess(
      numberFromInput,
      z
        .number({
          message: "Duration is required.",
        })
        .int("Duration must be a whole number.")
        .min(1, "Duration must be at least 1 minute.")
        .max(1440, "Duration cannot exceed 1440 minutes."),
    ),

    total_marks: z.preprocess(
      numberFromInput,
      z
        .number({
          message: "Total marks are required.",
        })
        .int("Total marks must be a whole number.")
        .min(1, "Total marks must be at least 1."),
    ),

    passing_marks: z.preprocess(
      numberFromInput,
      z
        .number({
          message: "Passing marks are required.",
        })
        .int("Passing marks must be a whole number.")
        .min(0, "Passing marks cannot be negative."),
    ),

    attempts_allowed: z.preprocess(
      numberFromInput,
      z
        .number({
          message: "Attempts allowed is required.",
        })
        .int("Attempts must be a whole number.")
        .min(1, "At least 1 attempt is required.")
        .max(100, "Attempts cannot exceed 100."),
    ),

    shuffle_questions: z.boolean(),

    shuffle_options: z.boolean(),

    auto_submit: z.boolean(),

    show_result: z.boolean(),

    show_correct_answers: z.boolean(),

    status: z.enum(["draft", "published", "closed"]),
  })
  .superRefine((data, ctx) => {
    if (data.passing_marks > data.total_marks) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passing_marks"],
        message: "Passing marks cannot be greater than total marks.",
      });
    }
  });

export const quizDefaultValues = {
  batch_id: "",
  title: "",
  description: "",
  duration_minutes: 30,
  total_marks: 10,
  passing_marks: 5,
  attempts_allowed: 1,
  shuffle_questions: false,
  shuffle_options: false,
  auto_submit: true,
  show_result: true,
  show_correct_answers: true,
  status: "draft",
};
