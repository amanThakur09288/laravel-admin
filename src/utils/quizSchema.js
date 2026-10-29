// import { z } from "zod";

// export const defaultQuizOption = {
//   option_text: "",
//   is_correct: false,
// };

// export const defaultQuizQuestion = {
//   question_text: "",
//   question_image: null,
//   type: "single_select",
//   marks: 1,
//   explanation: "",

//   options: [
//     {
//       option_text: "",
//       is_correct: false,
//     },
//     {
//       option_text: "",
//       is_correct: false,
//     },
//   ],
// };

// /*
// |--------------------------------------------------------------------------
// | Default Quiz Values
// |--------------------------------------------------------------------------
// */

// export const defaultQuizValues = {
//   batch_id: undefined,
//   title: "",
//   description: "",
//   duration_minutes: 30,
//   passing_marks: 0,
//   attempts_allowed: 1,
//   shuffle_questions: false,
//   shuffle_options: false,
//   auto_submit: true,
//   show_result: true,
//   show_correct_answers: false,
//   status: "draft",
//   questions: [
//     {
//       question_text: "",
//       question_image: null,
//       type: "single_select",
//       marks: 1,
//       explanation: "",

//       options: [
//         {
//           option_text: "",
//           is_correct: false,
//         },
//         {
//           option_text: "",
//           is_correct: false,
//         },
//       ],
//     },
//   ],
// };

// /*
// |--------------------------------------------------------------------------
// | Option Schema
// |--------------------------------------------------------------------------
// */

// export const optionSchema = z.object({
//   option_text: z
//     .string()
//     .trim()
//     .min(1, "Option is required.")
//     .max(1000, "Option cannot exceed 1000 characters."),

//   is_correct: z.boolean({
//     error: "Correct option value must be true or false.",
//   }),
// });

// /*
// |--------------------------------------------------------------------------
// | Question Schema
// |--------------------------------------------------------------------------
// */

// export const questionSchema = z
//   .object({
//     question_text: z
//       .string()
//       .trim()
//       .min(1, "Question is required.")
//       .max(5000, "Question cannot exceed 5000 characters."),

//     question_image: z.any().nullable().optional(),

//     type: z.enum(["single_select", "multi_select"]),

//     marks: z
//       .number({
//         error: "Marks are required.",
//       })
//       .finite("Marks must be a valid number.")
//       .int("Marks must be a whole number.")
//       .min(1, "Marks must be at least 1.")
//       .max(1000, "Marks cannot exceed 1000."),

//     explanation: z
//       .string()
//       .trim()
//       .max(5000, "Explanation cannot exceed 5000 characters."),

//     options: z
//       .array(optionSchema)
//       .min(2, "At least 2 options are required.")
//       .max(20, "Maximum 20 options are allowed."),
//   })
//   .superRefine((question, ctx) => {
//     /*
//     |--------------------------------------------------------------------------
//     | Find correct options
//     |--------------------------------------------------------------------------
//     */

//     const correctOptions = question.options.filter(
//       (option) => option.is_correct === true,
//     );

//     /*
//     |--------------------------------------------------------------------------
//     | Single Select
//     |--------------------------------------------------------------------------
//     */

//     if (question.type === "single_select" && correctOptions.length !== 1) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["options"],
//         message: "Single Select must have exactly one correct option.",
//       });
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | Multi Select
//     |--------------------------------------------------------------------------
//     */

//     if (question.type === "multi_select" && correctOptions.length < 2) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["options"],
//         message: "Multi Select must have at least two correct options.",
//       });
//     }

//     /*
//     |--------------------------------------------------------------------------
//     | Duplicate Options
//     |--------------------------------------------------------------------------
//     */

//     const optionNames = question.options.map((option) =>
//       option.option_text.trim().toLowerCase(),
//     );

//     const duplicateIndexes = [];

//     optionNames.forEach((optionName, index) => {
//       if (optionName && optionNames.indexOf(optionName) !== index) {
//         duplicateIndexes.push(index);
//       }
//     });

//     duplicateIndexes.forEach((index) => {
//       ctx.addIssue({
//         code: "custom",
//         path: ["options", index, "option_text"],
//         message: "Duplicate options are not allowed.",
//       });
//     });
//   });

// /*
// |--------------------------------------------------------------------------
// | Quiz Schema
// |--------------------------------------------------------------------------
// */

// export const quizSchema = z
//   .object({
//     batch_id: z
//       .number({
//         error: "Please select a batch.",
//       })
//       .int("Please select a valid batch.")
//       .positive("Please select a valid batch."),

//     title: z
//       .string()
//       .trim()
//       .min(1, "Quiz title is required.")
//       .max(255, "Quiz title cannot exceed 255 characters."),

//     description: z
//       .string()
//       .trim()
//       .max(5000, "Description cannot exceed 5000 characters."),

//     duration_minutes: z
//       .number({
//         error: "Duration is required.",
//       })
//       .finite("Duration must be a valid number.")
//       .int("Duration must be a whole number.")
//       .min(1, "Duration must be at least 1 minute.")
//       .max(1440, "Duration cannot exceed 1440 minutes."),

//     passing_marks: z
//       .number({
//         error: "Passing marks are required.",
//       })
//       .finite("Passing marks must be a valid number.")
//       .int("Passing marks must be a whole number.")
//       .min(0, "Passing marks cannot be negative."),

//     attempts_allowed: z
//       .number({
//         error: "Attempts allowed is required.",
//       })
//       .finite("Attempts allowed must be a valid number.")
//       .int("Attempts allowed must be a whole number.")
//       .min(1, "At least 1 attempt is required.")
//       .max(100, "Maximum 100 attempts are allowed."),

//     shuffle_questions: z.boolean(),

//     shuffle_options: z.boolean(),

//     auto_submit: z.boolean(),

//     show_result: z.boolean(),

//     show_correct_answers: z.boolean(),

//     status: z.enum(["draft", "published", "closed"]),

//     questions: z
//       .array(questionSchema)
//       .min(1, "At least 1 question is required.")
//       .max(200, "Maximum 200 questions are allowed."),
//   })
//   .superRefine((quiz, ctx) => {
//     const totalMarks = quiz.questions.reduce(
//       (total, question) => total + question.marks,
//       0,
//     );

//     if (quiz.passing_marks > totalMarks) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["passing_marks"],
//         message: `Passing marks cannot exceed total marks (${totalMarks}).`,
//       });
//     }

//     if (quiz.show_correct_answers === true && quiz.show_result === false) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["show_correct_answers"],
//         message: "Correct answers cannot be shown when the result is hidden.",
//       });
//     }
//   });

import { z } from "zod";

/*
|--------------------------------------------------------------------------
| Default Option
|--------------------------------------------------------------------------
*/

export const defaultQuizOption = {
  option_text: "",
  is_correct: false,
};

/*
|--------------------------------------------------------------------------
| Default Question
|--------------------------------------------------------------------------
*/

export const defaultQuizQuestion = {
  question_text: "",
  question_image: null,
  type: "single_select",
  marks: 1,
  explanation: "",

  options: [
    {
      option_text: "",
      is_correct: false,
    },
    {
      option_text: "",
      is_correct: false,
    },
  ],
};

/*
|--------------------------------------------------------------------------
| Default Quiz Values
|--------------------------------------------------------------------------
*/

export const defaultQuizValues = {
  batch_id: undefined,

  title: "",

  description: "",

  duration_minutes: 30,

  passing_marks: 0,

  attempts_allowed: 1,

  shuffle_questions: false,

  shuffle_options: false,

  auto_submit: true,

  show_result: true,

  show_correct_answers: false,

  status: "draft",

  questions: [
    {
      question_text: "",
      question_image: null,
      type: "single_select",
      marks: 1,
      explanation: "",

      options: [
        {
          option_text: "",
          is_correct: false,
        },
        {
          option_text: "",
          is_correct: false,
        },
      ],
    },
  ],
};

/*
|--------------------------------------------------------------------------
| Option Schema
|--------------------------------------------------------------------------
|
| IMPORTANT:
| id is optional because:
|
| - New option       -> no id
| - Existing option  -> has database id
|
|--------------------------------------------------------------------------
*/

export const optionSchema = z.object({
  id: z.number().int().positive().optional(),

  option_text: z
    .string()
    .trim()
    .min(1, "Option is required.")
    .max(1000, "Option cannot exceed 1000 characters."),

  is_correct: z.boolean({
    error: "Correct option value must be true or false.",
  }),
});

/*
|--------------------------------------------------------------------------
| Question Schema
|--------------------------------------------------------------------------
|
| IMPORTANT:
| id is optional because:
|
| - New question       -> no id
| - Existing question  -> has database id
|
|--------------------------------------------------------------------------
*/

export const questionSchema = z
  .object({
    id: z.number().int().positive().optional(),

    question_text: z
      .string()
      .trim()
      .min(1, "Question is required.")
      .max(5000, "Question cannot exceed 5000 characters."),

    question_image: z.any().nullable().optional(),

    type: z.enum(["single_select", "multi_select"]),

    marks: z
      .number({
        error: "Marks are required.",
      })
      .finite("Marks must be a valid number.")
      .int("Marks must be a whole number.")
      .min(1, "Marks must be at least 1.")
      .max(1000, "Marks cannot exceed 1000."),

    explanation: z
      .string()
      .trim()
      .max(5000, "Explanation cannot exceed 5000 characters."),

    options: z
      .array(optionSchema)
      .min(2, "At least 2 options are required.")
      .max(20, "Maximum 20 options are allowed."),
  })
  .superRefine((question, ctx) => {
    /*
    |--------------------------------------------------------------------------
    | Find correct options
    |--------------------------------------------------------------------------
    */

    const correctOptions = question.options.filter(
      (option) => option.is_correct === true,
    );

    /*
    |--------------------------------------------------------------------------
    | Single Select
    |--------------------------------------------------------------------------
    */

    if (question.type === "single_select" && correctOptions.length !== 1) {
      ctx.addIssue({
        code: "custom",
        path: ["options"],
        message: "Single Select must have exactly one correct option.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Multi Select
    |--------------------------------------------------------------------------
    */

    if (question.type === "multi_select" && correctOptions.length < 2) {
      ctx.addIssue({
        code: "custom",
        path: ["options"],
        message: "Multi Select must have at least two correct options.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Duplicate Options
    |--------------------------------------------------------------------------
    */

    const optionNames = question.options.map((option) =>
      option.option_text.trim().toLowerCase(),
    );

    const duplicateIndexes = [];

    optionNames.forEach((optionName, index) => {
      if (optionName && optionNames.indexOf(optionName) !== index) {
        duplicateIndexes.push(index);
      }
    });

    duplicateIndexes.forEach((index) => {
      ctx.addIssue({
        code: "custom",
        path: ["options", index, "option_text"],
        message: "Duplicate options are not allowed.",
      });
    });
  });

/*
|--------------------------------------------------------------------------
| Quiz Schema
|--------------------------------------------------------------------------
*/

export const quizSchema = z
  .object({
    batch_id: z
      .number({
        error: "Please select a batch.",
      })
      .int("Please select a valid batch.")
      .positive("Please select a valid batch."),

    title: z
      .string()
      .trim()
      .min(1, "Quiz title is required.")
      .max(255, "Quiz title cannot exceed 255 characters."),

    description: z
      .string()
      .trim()
      .max(5000, "Description cannot exceed 5000 characters."),

    duration_minutes: z
      .number({
        error: "Duration is required.",
      })
      .finite("Duration must be a valid number.")
      .int("Duration must be a whole number.")
      .min(1, "Duration must be at least 1 minute.")
      .max(1440, "Duration cannot exceed 1440 minutes."),

    passing_marks: z
      .number({
        error: "Passing marks are required.",
      })
      .finite("Passing marks must be a valid number.")
      .int("Passing marks must be a whole number.")
      .min(0, "Passing marks cannot be negative."),

    attempts_allowed: z
      .number({
        error: "Attempts allowed is required.",
      })
      .finite("Attempts allowed must be a valid number.")
      .int("Attempts allowed must be a whole number.")
      .min(1, "At least 1 attempt is required.")
      .max(100, "Maximum 100 attempts are allowed."),

    shuffle_questions: z.boolean(),

    shuffle_options: z.boolean(),

    auto_submit: z.boolean(),

    show_result: z.boolean(),

    show_correct_answers: z.boolean(),

    status: z.enum(["draft", "published", "closed"]),

    questions: z
      .array(questionSchema)
      .min(1, "At least 1 question is required.")
      .max(200, "Maximum 200 questions are allowed."),
  })
  .superRefine((quiz, ctx) => {
    /*
    |--------------------------------------------------------------------------
    | Calculate total marks
    |--------------------------------------------------------------------------
    */

    const totalMarks = quiz.questions.reduce(
      (total, question) => total + question.marks,
      0,
    );

    /*
    |--------------------------------------------------------------------------
    | Passing marks cannot exceed total marks
    |--------------------------------------------------------------------------
    */

    if (quiz.passing_marks > totalMarks) {
      ctx.addIssue({
        code: "custom",
        path: ["passing_marks"],
        message: `Passing marks cannot exceed total marks (${totalMarks}).`,
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Correct answers require result
    |--------------------------------------------------------------------------
    */

    if (quiz.show_correct_answers === true && quiz.show_result === false) {
      ctx.addIssue({
        code: "custom",
        path: ["show_correct_answers"],
        message: "Correct answers cannot be shown when the result is hidden.",
      });
    }
  });
