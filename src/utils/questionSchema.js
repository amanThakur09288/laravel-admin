import { z } from "zod";

const numberFromInput = (value) => {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  return Number(value);
};

const optionSchema = z.object({
  option_text: z
    .string()
    .trim()
    .min(1, "Option text is required.")
    .max(1000, "Option cannot exceed 1000 characters."),

  is_correct: z.boolean(),

  sort_order: z.number().int().min(0),
});

export const questionSchema = z
  .object({
    question_text: z
      .string()
      .trim()
      .min(1, "Question text is required.")
      .max(5000, "Question cannot exceed 5000 characters."),

    type: z.enum(["single_choice", "multiple_choice"]),

    marks: z.preprocess(
      numberFromInput,
      z
        .number({
          message: "Marks are required.",
        })
        .int("Marks must be a whole number.")
        .min(1, "Marks must be at least 1."),
    ),

    explanation: z
      .string()
      .max(5000, "Explanation cannot exceed 5000 characters.")
      .optional()
      .or(z.literal("")),

    options: z.array(optionSchema).min(2, "At least 2 options are required."),
  })
  .superRefine((data, ctx) => {
    /*
    |--------------------------------------------------------------------------
    | Count Correct Options
    |--------------------------------------------------------------------------
    */

    const correctOptions = data.options.filter(
      (option) => option.is_correct === true,
    );

    /*
    |--------------------------------------------------------------------------
    | Single Choice
    |--------------------------------------------------------------------------
    */

    if (data.type === "single_choice" && correctOptions.length !== 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,

        path: ["options"],

        message: "Single-choice question must have exactly one correct option.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Multiple Choice
    |--------------------------------------------------------------------------
    */

    if (data.type === "multiple_choice" && correctOptions.length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,

        path: ["options"],

        message:
          "Multiple-choice question must have at least two correct options.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Duplicate Options
    |--------------------------------------------------------------------------
    */

    const optionTexts = data.options.map((option) =>
      option.option_text.trim().toLowerCase(),
    );

    const duplicateIndexes = [];

    optionTexts.forEach((text, index) => {
      const firstIndex = optionTexts.indexOf(text);

      if (firstIndex !== index && !duplicateIndexes.includes(index)) {
        duplicateIndexes.push(index);
      }
    });

    duplicateIndexes.forEach((index) => {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,

        path: ["options", index, "option_text"],

        message: "Duplicate option is not allowed.",
      });
    });
  });

export const questionDefaultValues = {
  question_text: "",

  type: "single_choice",

  marks: 1,

  explanation: "",

  options: [
    {
      option_text: "",
      is_correct: true,
      sort_order: 0,
    },
    {
      option_text: "",
      is_correct: false,
      sort_order: 1,
    },
  ],
};
