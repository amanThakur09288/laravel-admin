// import { useEffect } from "react";
// import { useFieldArray, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import toast from "react-hot-toast";
// import { quizSchema } from "../../utils/quizSchema";
// import QuizQuestion from "./QuizQuestion";

// const createDefaultOption = () => ({
//   option_text: "",
//   is_correct: false,
// });

// const createDefaultQuestion = () => ({
//   question_text: "",

//   // NEW: question image
//   question_image: null,

//   type: "single_select",
//   marks: 1,
//   explanation: "",
//   options: [createDefaultOption(), createDefaultOption()],
// });

// const defaultValues = {
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

//   questions: [createDefaultQuestion()],
// };

// const normalizeInitialData = (data) => {
//   if (!data) {
//     return defaultValues;
//   }

//   const normalizedQuestions = Array.isArray(data.questions)
//     ? data.questions.map((question) => ({
//         question_text: question.question_text || "",

//         // NEW: preserve existing image URL in edit mode
//         question_image: question.question_image || null,

//         type:
//           question.type === "multi_select" ? "multi_select" : "single_select",

//         marks: Number(question.marks) || 1,

//         explanation: question.explanation || "",

//         options:
//           Array.isArray(question.options) && question.options.length >= 2
//             ? question.options.map((option) => ({
//                 option_text: option.option_text || "",
//                 is_correct: option.is_correct === true,
//               }))
//             : [createDefaultOption(), createDefaultOption()],
//       }))
//     : [createDefaultQuestion()];

//   return {
//     batch_id:
//       data.batch_id !== null && data.batch_id !== undefined
//         ? Number(data.batch_id)
//         : undefined,

//     title: data.title || "",

//     description: data.description || "",

//     duration_minutes: Number(data.duration_minutes) || 30,

//     passing_marks: Number(data.passing_marks) || 0,

//     attempts_allowed: Number(data.attempts_allowed) || 1,

//     shuffle_questions: data.shuffle_questions === true,

//     shuffle_options: data.shuffle_options === true,

//     auto_submit: data.auto_submit !== false,

//     show_result: data.show_result !== false,

//     show_correct_answers: data.show_correct_answers === true,

//     status: data.status || "draft",

//     questions: normalizedQuestions,
//   };
// };

// function QuizForm({
//   batches = [],
//   initialData = null,
//   onSubmit,
//   saving = false,
//   submitLabel = "Create Quiz",
// }) {
//   const {
//     register,
//     control,
//     handleSubmit,
//     watch,
//     setValue,
//     getValues,
//     reset,
//     formState: { errors, isSubmitting, isDirty },
//   } = useForm({
//     resolver: zodResolver(quizSchema),

//     defaultValues: normalizeInitialData(initialData),

//     mode: "onSubmit",

//     reValidateMode: "onChange",

//     shouldFocusError: true,
//   });

//   const {
//     fields: questionFields,
//     append: appendQuestion,
//     remove: removeQuestion,
//   } = useFieldArray({
//     control,
//     name: "questions",
//   });

//   const questions = watch("questions") || [];

//   const showResult = watch("show_result");

//   const showCorrectAnswers = watch("show_correct_answers");

//   const passingMarks = watch("passing_marks");

//   /*
//   |--------------------------------------------------------------------------
//   | Reset form when edit data arrives
//   |--------------------------------------------------------------------------
//   */

//   useEffect(() => {
//     if (initialData) {
//       reset(normalizeInitialData(initialData));
//     }
//   }, [initialData, reset]);

//   /*
//   |--------------------------------------------------------------------------
//   | Calculate total marks
//   |--------------------------------------------------------------------------
//   */

//   const totalMarks = questions.reduce((total, question) => {
//     const marks = Number(question?.marks || 0);

//     return total + (Number.isFinite(marks) ? marks : 0);
//   }, 0);

//   /*
//   |--------------------------------------------------------------------------
//   | Add question
//   |--------------------------------------------------------------------------
//   */

//   const handleAddQuestion = () => {
//     if (questionFields.length >= 200) {
//       toast.error("Maximum 200 questions are allowed.");

//       return;
//     }

//     appendQuestion(createDefaultQuestion());
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Remove question
//   |--------------------------------------------------------------------------
//   */

//   const handleRemoveQuestion = (questionIndex) => {
//     if (questionFields.length <= 1) {
//       toast.error("At least one question is required.");

//       return;
//     }

//     removeQuestion(questionIndex);
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Submit
//   |--------------------------------------------------------------------------
//   */

//   const submitForm = async (formData) => {
//     try {
//       /*
//        * Calculate total marks again from the final
//        * validated form data.
//        *
//        * Do not trust a total_marks field from the UI.
//        */

//       const calculatedTotalMarks = formData.questions.reduce(
//         (total, question) => total + question.marks,
//         0,
//       );

//       /*
//        * Backend expects clean data.
//        */

//       const payload = {
//         ...formData,

//         batch_id: Number(formData.batch_id),

//         duration_minutes: Number(formData.duration_minutes),

//         passing_marks: Number(formData.passing_marks),

//         attempts_allowed: Number(formData.attempts_allowed),

//         /*
//          * Do not send total_marks as user input.
//          * Backend calculates it.
//          */

//         questions: formData.questions.map((question) => ({
//           question_text: question.question_text.trim(),

//           /*
//            * NEW:
//            *
//            * Keep the actual File object here when
//            * the admin selects a new image.
//            *
//            * In edit mode this can also contain the
//            * existing image URL.
//            *
//            * quizApi.js will decide whether it is
//            * a File and append it to FormData.
//            */
//           question_image: question.question_image || null,

//           type: question.type,

//           marks: Number(question.marks),

//           explanation: question.explanation?.trim() || null,

//           options: question.options.map((option) => ({
//             option_text: option.option_text.trim(),

//             is_correct: option.is_correct === true,
//           })),
//         })),
//       };

//       console.log("Final Quiz Payload:", payload);

//       await onSubmit(payload, calculatedTotalMarks);
//     } catch (error) {
//       console.error("Quiz form submit error:", error);

//       toast.error(
//         error?.response?.data?.message ||
//           error?.message ||
//           "Unable to save quiz.",
//       );
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Validation failure
//   |--------------------------------------------------------------------------
//   */

//   const handleValidationError = (validationErrors) => {
//     console.error("Quiz validation errors:", validationErrors);

//     toast.error("Please fix the highlighted errors before submitting.");
//   };

//   const isSaving = saving || isSubmitting;

//   return (
//     <form
//       onSubmit={handleSubmit(submitForm, handleValidationError)}
//       className="space-y-8"
//       noValidate
//     >
//       {/* ================================================================ */}
//       {/* BASIC QUIZ INFORMATION */}
//       {/* ================================================================ */}

//       <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//         <h2 className="mb-6 text-xl font-semibold text-gray-800">
//           Quiz Information
//         </h2>

//         {/* -------------------------------------------------------------- */}
//         {/* Batch */}
//         {/* -------------------------------------------------------------- */}

//         <div className="mb-5">
//           <label className="mb-2 block text-sm font-medium text-gray-700">
//             Batch
//           </label>

//           <select
//             {...register("batch_id", {
//               setValueAs: (value) => (value === "" ? undefined : Number(value)),
//             })}
//             className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
//               errors.batch_id
//                 ? "border-red-500"
//                 : "border-gray-300 focus:border-[#505B95]"
//             }`}
//           >
//             <option value="">Select Batch</option>

//             {batches.map((batch) => (
//               <option key={batch.id} value={batch.id}>
//                 {batch.batch_name}
//                 {batch.course?.name ? ` - ${batch.course.name}` : ""}
//               </option>
//             ))}
//           </select>

//           {errors.batch_id && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.batch_id.message}
//             </p>
//           )}

//           {batches.length === 0 && (
//             <p className="mt-2 text-sm text-gray-500">No batches available.</p>
//           )}
//         </div>

//         {/* -------------------------------------------------------------- */}
//         {/* Title */}
//         {/* -------------------------------------------------------------- */}

//         <div className="mb-5">
//           <label className="mb-2 block text-sm font-medium text-gray-700">
//             Quiz Title
//           </label>

//           <input
//             type="text"
//             {...register("title")}
//             placeholder="Enter quiz title"
//             className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
//               errors.title
//                 ? "border-red-500"
//                 : "border-gray-300 focus:border-[#505B95]"
//             }`}
//           />

//           {errors.title && (
//             <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
//           )}
//         </div>

//         {/* -------------------------------------------------------------- */}
//         {/* Description */}
//         {/* -------------------------------------------------------------- */}

//         <div className="mb-5">
//           <label className="mb-2 block text-sm font-medium text-gray-700">
//             Description
//           </label>

//           <textarea
//             {...register("description")}
//             rows={4}
//             placeholder="Enter quiz description"
//             className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
//               errors.description
//                 ? "border-red-500"
//                 : "border-gray-300 focus:border-[#505B95]"
//             }`}
//           />

//           {errors.description && (
//             <p className="mt-1 text-sm text-red-600">
//               {errors.description.message}
//             </p>
//           )}
//         </div>

//         {/* -------------------------------------------------------------- */}
//         {/* Duration / Passing / Attempts */}
//         {/* -------------------------------------------------------------- */}

//         <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Duration (Minutes)
//             </label>

//             <input
//               type="number"
//               min="1"
//               max="1440"
//               {...register("duration_minutes", {
//                 setValueAs: (value) =>
//                   value === "" ? undefined : Number(value),
//               })}
//               className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
//                 errors.duration_minutes
//                   ? "border-red-500"
//                   : "border-gray-300 focus:border-[#505B95]"
//               }`}
//             />

//             {errors.duration_minutes && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.duration_minutes.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Passing Marks
//             </label>

//             <input
//               type="number"
//               min="0"
//               {...register("passing_marks", {
//                 setValueAs: (value) =>
//                   value === "" ? undefined : Number(value),
//               })}
//               className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
//                 errors.passing_marks
//                   ? "border-red-500"
//                   : "border-gray-300 focus:border-[#505B95]"
//               }`}
//             />

//             {errors.passing_marks && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.passing_marks.message}
//               </p>
//             )}
//           </div>

//           <div>
//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Attempts Allowed
//             </label>

//             <input
//               type="number"
//               min="1"
//               max="100"
//               {...register("attempts_allowed", {
//                 setValueAs: (value) =>
//                   value === "" ? undefined : Number(value),
//               })}
//               className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
//                 errors.attempts_allowed
//                   ? "border-red-500"
//                   : "border-gray-300 focus:border-[#505B95]"
//               }`}
//             />

//             {errors.attempts_allowed && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.attempts_allowed.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* -------------------------------------------------------------- */}
//         {/* Total Marks Preview */}
//         {/* -------------------------------------------------------------- */}

//         <div className="mt-6 rounded-lg bg-gray-50 p-4">
//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium text-gray-600">
//               Total Marks
//             </span>

//             <span className="text-lg font-bold text-[#505B95]">
//               {totalMarks}
//             </span>
//           </div>

//           {Number(passingMarks) > totalMarks && (
//             <p className="mt-2 text-sm text-red-600">
//               Passing marks cannot exceed total marks.
//             </p>
//           )}
//         </div>
//       </div>

//       {/* ================================================================ */}
//       {/* QUIZ SETTINGS */}
//       {/* ================================================================ */}

//       <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//         <h2 className="mb-6 text-xl font-semibold text-gray-800">
//           Quiz Settings
//         </h2>

//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           {/* Shuffle Questions */}

//           <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
//             <input
//               type="checkbox"
//               {...register("shuffle_questions")}
//               className="h-4 w-4"
//             />

//             <div>
//               <p className="text-sm font-medium text-gray-800">
//                 Shuffle Questions
//               </p>

//               <p className="text-xs text-gray-500">Randomize question order.</p>
//             </div>
//           </label>

//           {/* Shuffle Options */}

//           <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
//             <input
//               type="checkbox"
//               {...register("shuffle_options")}
//               className="h-4 w-4"
//             />

//             <div>
//               <p className="text-sm font-medium text-gray-800">
//                 Shuffle Options
//               </p>

//               <p className="text-xs text-gray-500">Randomize option order.</p>
//             </div>
//           </label>

//           {/* Auto Submit */}

//           <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
//             <input
//               type="checkbox"
//               {...register("auto_submit")}
//               className="h-4 w-4"
//             />

//             <div>
//               <p className="text-sm font-medium text-gray-800">Auto Submit</p>

//               <p className="text-xs text-gray-500">
//                 Automatically submit when time expires.
//               </p>
//             </div>
//           </label>

//           {/* Show Result */}

//           <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
//             <input
//               type="checkbox"
//               {...register("show_result")}
//               className="h-4 w-4"
//             />

//             <div>
//               <p className="text-sm font-medium text-gray-800">Show Result</p>

//               <p className="text-xs text-gray-500">
//                 Allow students to see their result.
//               </p>
//             </div>
//           </label>

//           {/* Show Correct Answers */}

//           <label
//             className={`flex items-center gap-3 rounded-lg border p-4 ${
//               !showResult
//                 ? "cursor-not-allowed bg-gray-50 opacity-60"
//                 : "cursor-pointer border-gray-200"
//             }`}
//           >
//             <input
//               type="checkbox"
//               {...register("show_correct_answers")}
//               disabled={!showResult}
//               className="h-4 w-4"
//             />

//             <div>
//               <p className="text-sm font-medium text-gray-800">
//                 Show Correct Answers
//               </p>

//               <p className="text-xs text-gray-500">
//                 Students can see correct answers after the result.
//               </p>
//             </div>
//           </label>

//           {/* Status */}

//           <div className="rounded-lg border border-gray-200 p-4">
//             <label className="mb-2 block text-sm font-medium text-gray-700">
//               Status
//             </label>

//             <select
//               {...register("status")}
//               className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
//                 errors.status
//                   ? "border-red-500"
//                   : "border-gray-300 focus:border-[#505B95]"
//               }`}
//             >
//               <option value="draft">Draft</option>

//               <option value="published">Published</option>

//               <option value="closed">Closed</option>
//             </select>

//             {errors.status && (
//               <p className="mt-1 text-sm text-red-600">
//                 {errors.status.message}
//               </p>
//             )}
//           </div>
//         </div>

//         {errors.show_correct_answers && (
//           <p className="mt-4 text-sm text-red-600">
//             {errors.show_correct_answers.message}
//           </p>
//         )}
//       </div>

//       {/* ================================================================ */}
//       {/* QUESTIONS */}
//       {/* ================================================================ */}

//       <div>
//         <div className="mb-6 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-800">Questions</h2>

//             <p className="mt-1 text-sm text-gray-500">
//               {questionFields.length} of 200 questions
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={handleAddQuestion}
//             disabled={questionFields.length >= 200}
//             className="rounded-lg bg-[#505B95] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#414a7d] disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             + Add Question
//           </button>
//         </div>

//         {errors.questions?.message && (
//           <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4">
//             <p className="text-sm text-red-600">{errors.questions.message}</p>
//           </div>
//         )}

//         <div className="space-y-6">
//           {questionFields.map((question, questionIndex) => (
//             <QuizQuestion
//               key={question.id}
//               control={control}
//               register={register}
//               watch={watch}
//               setValue={setValue}
//               getValues={getValues}
//               questionIndex={questionIndex}
//               errors={errors.questions?.[questionIndex]}
//               removeQuestion={handleRemoveQuestion}
//               canRemoveQuestion={questionFields.length > 1}
//             />
//           ))}
//         </div>
//       </div>

//       {/* ================================================================ */}
//       {/* SUBMIT */}
//       {/* ================================================================ */}

//       <div className="flex items-center justify-end gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//         {isDirty && (
//           <span className="mr-auto text-sm text-gray-500">
//             You have unsaved changes.
//           </span>
//         )}

//         <button
//           type="submit"
//           disabled={isSaving}
//           className="rounded-lg bg-[#505B95] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#414a7d] disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           {isSaving ? "Saving..." : submitLabel}
//         </button>
//       </div>
//     </form>
//   );
// }

// export default QuizForm;

import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { quizSchema } from "../../utils/quizSchema";
import QuizQuestion from "./QuizQuestion";

const createDefaultOption = () => ({
  option_text: "",
  is_correct: false,
});

const createDefaultQuestion = () => ({
  question_text: "",
  question_image: null,
  type: "single_select",
  marks: 1,
  explanation: "",
  options: [createDefaultOption(), createDefaultOption()],
});

const defaultValues = {
  batch_id: undefined,
  title: "",
  description: "",
  duration_minutes: 30,
  passing_marks: 0,
  attempts_allowed: 5,
  shuffle_questions: false,
  shuffle_options: false,
  auto_submit: true,
  show_result: true,
  show_correct_answers: false,
  status: "draft",
  questions: [createDefaultQuestion()],
};

const normalizeInitialData = (data) => {
  if (!data) {
    return defaultValues;
  }

  const normalizedQuestions = Array.isArray(data.questions)
    ? data.questions.map((question) => ({
        /*
        |--------------------------------------------------------------------------
        | IMPORTANT: Preserve database question ID
        |--------------------------------------------------------------------------
        */

        ...(question.id
          ? {
              id: Number(question.id),
            }
          : {}),

        question_text: question.question_text || "",

        question_image: question.question_image || null,

        type:
          question.type === "multi_select" ? "multi_select" : "single_select",

        marks: Number(question.marks) || 1,

        explanation: question.explanation || "",

        options:
          Array.isArray(question.options) && question.options.length >= 2
            ? question.options.map((option) => ({
                /*
                |--------------------------------------------------------------------------
                | IMPORTANT: Preserve database option ID
                |--------------------------------------------------------------------------
                */

                ...(option.id
                  ? {
                      id: Number(option.id),
                    }
                  : {}),

                option_text: option.option_text || "",

                is_correct: option.is_correct === true,
              }))
            : [createDefaultOption(), createDefaultOption()],
      }))
    : [createDefaultQuestion()];

  return {
    batch_id:
      data.batch_id !== null && data.batch_id !== undefined
        ? Number(data.batch_id)
        : undefined,
    title: data.title || "",
    description: data.description || "",
    duration_minutes: Number(data.duration_minutes) || 30,
    passing_marks: Number(data.passing_marks) || 0,
    attempts_allowed: Number(data.attempts_allowed) || 5,
    shuffle_questions: data.shuffle_questions === true,
    shuffle_options: data.shuffle_options === true,
    auto_submit: data.auto_submit !== false,
    show_result: data.show_result !== false,
    show_correct_answers: data.show_correct_answers === true,
    status: data.status || "draft",
    questions: normalizedQuestions,
  };
};

function QuizForm({
  batches = [],
  initialData = null,
  onSubmit,
  saving = false,
  submitLabel = "Create Quiz",
}) {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(quizSchema),
    defaultValues: normalizeInitialData(initialData),
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldFocusError: true,
  });

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  const questions = watch("questions") || [];
  const showResult = watch("show_result");
  const showCorrectAnswers = watch("show_correct_answers");
  const passingMarks = watch("passing_marks");

  /*
  |--------------------------------------------------------------------------
  | Reset form when edit data arrives
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (initialData) {
      reset(normalizeInitialData(initialData));
    }
  }, [initialData, reset]);

  /*
  |--------------------------------------------------------------------------
  | Calculate total marks
  |--------------------------------------------------------------------------
  */

  const totalMarks = questions.reduce((total, question) => {
    const marks = Number(question?.marks || 0);
    return total + (Number.isFinite(marks) ? marks : 0);
  }, 0);

  /*
  |--------------------------------------------------------------------------
  | Add question
  |--------------------------------------------------------------------------
  */

  const handleAddQuestion = () => {
    if (questionFields.length >= 200) {
      toast.error("Maximum 200 questions are allowed.");
      return;
    }
    appendQuestion(createDefaultQuestion());
  };

  /*
  |--------------------------------------------------------------------------
  | Remove question
  |--------------------------------------------------------------------------
  */

  const handleRemoveQuestion = (questionIndex) => {
    if (questionFields.length <= 1) {
      toast.error("At least one question is required.");
      return;
    }
    removeQuestion(questionIndex);
  };

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const submitForm = async (formData) => {
    try {
      /*
      |--------------------------------------------------------------------------
      | Calculate total marks again
      |--------------------------------------------------------------------------
      */

      const calculatedTotalMarks = formData.questions.reduce(
        (total, question) => total + question.marks,
        0,
      );

      /*
      |--------------------------------------------------------------------------
      | Backend payload
      |--------------------------------------------------------------------------
      */

      const payload = {
        ...formData,
        batch_id: Number(formData.batch_id),
        duration_minutes: Number(formData.duration_minutes),
        passing_marks: Number(formData.passing_marks),
        attempts_allowed: Number(formData.attempts_allowed),

        /*
        |--------------------------------------------------------------------------
        | Do not send total_marks
        |--------------------------------------------------------------------------
        */

        questions: formData.questions.map((question) => ({
          /*
            |--------------------------------------------------------------------------
            | IMPORTANT:
            | Preserve existing question ID
            |--------------------------------------------------------------------------
            */

          ...(question.id
            ? {
                id: Number(question.id),
              }
            : {}),

          question_text: question.question_text.trim(),
          question_image: question.question_image || null,
          type: question.type,
          marks: Number(question.marks),
          explanation: question.explanation?.trim() || null,
          options: question.options.map((option) => ({
            /*
                |--------------------------------------------------------------------------
                | IMPORTANT:
                | Preserve existing option ID
                |--------------------------------------------------------------------------
                */

            ...(option.id
              ? {
                  id: Number(option.id),
                }
              : {}),

            option_text: option.option_text.trim(),
            is_correct: option.is_correct === true,
          })),
        })),
      };

      console.log("Final Quiz Payload:", payload);
      await onSubmit(payload, calculatedTotalMarks);
    } catch (error) {
      console.error("Quiz form submit error:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to save quiz.",
      );
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Validation failure
  |--------------------------------------------------------------------------
  */

  const handleValidationError = (validationErrors) => {
    console.error("Quiz validation errors:", validationErrors);
    toast.error("Please fix the highlighted errors before submitting.");
  };

  const isSaving = saving || isSubmitting;

  return (
    <form
      onSubmit={handleSubmit(submitForm, handleValidationError)}
      className="space-y-8"
      noValidate
    >
      {/* ================================================================ */}
      {/* BASIC QUIZ INFORMATION */}
      {/* ================================================================ */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-800">
          Quiz Information
        </h2>

        {/* -------------------------------------------------------------- */}
        {/* Batch */}
        {/* -------------------------------------------------------------- */}

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Batch
          </label>

          <select
            {...register("batch_id", {
              setValueAs: (value) => (value === "" ? undefined : Number(value)),
            })}
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
              errors.batch_id
                ? "border-red-500"
                : "border-gray-300 focus:border-[#505B95]"
            }`}
          >
            <option value="">Select Batch</option>

            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.batch_name}
                {batch.course?.name ? ` - ${batch.course.name}` : ""}
              </option>
            ))}
          </select>

          {errors.batch_id && (
            <p className="mt-1 text-sm text-red-600">
              {errors.batch_id.message}
            </p>
          )}

          {batches.length === 0 && (
            <p className="mt-2 text-sm text-gray-500">No batches available.</p>
          )}
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Title */}
        {/* -------------------------------------------------------------- */}

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Quiz Title
          </label>

          <input
            type="text"
            {...register("title")}
            placeholder="Enter quiz title"
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
              errors.title
                ? "border-red-500"
                : "border-gray-300 focus:border-[#505B95]"
            }`}
          />

          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Description */}
        {/* -------------------------------------------------------------- */}

        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            {...register("description")}
            rows={4}
            placeholder="Enter quiz description"
            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
              errors.description
                ? "border-red-500"
                : "border-gray-300 focus:border-[#505B95]"
            }`}
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Duration / Passing / Attempts */}
        {/* -------------------------------------------------------------- */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Duration (Minutes)
            </label>

            <input
              type="number"
              min="1"
              max="1440"
              {...register("duration_minutes", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
                errors.duration_minutes
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#505B95]"
              }`}
            />

            {errors.duration_minutes && (
              <p className="mt-1 text-sm text-red-600">
                {errors.duration_minutes.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Passing Marks
            </label>

            <input
              type="number"
              min="0"
              {...register("passing_marks", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
                errors.passing_marks
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#505B95]"
              }`}
            />

            {errors.passing_marks && (
              <p className="mt-1 text-sm text-red-600">
                {errors.passing_marks.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Attempts Allowed
            </label>

            <input
              type="number"
              min="5"
              max="100"
              {...register("attempts_allowed", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
                errors.attempts_allowed
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#505B95]"
              }`}
            />

            {errors.attempts_allowed && (
              <p className="mt-1 text-sm text-red-600">
                {errors.attempts_allowed.message}
              </p>
            )}
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Total Marks Preview */}
        {/* -------------------------------------------------------------- */}

        <div className="mt-6 rounded-lg bg-gray-50 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              Total Marks
            </span>

            <span className="text-lg font-bold text-[#505B95]">
              {totalMarks}
            </span>
          </div>

          {Number(passingMarks) > totalMarks && (
            <p className="mt-2 text-sm text-red-600">
              Passing marks cannot exceed total marks.
            </p>
          )}
        </div>
      </div>

      {/* ================================================================ */}
      {/* QUIZ SETTINGS */}
      {/* ================================================================ */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-semibold text-gray-800">
          Quiz Settings
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Shuffle Questions */}

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
            <input
              type="checkbox"
              {...register("shuffle_questions")}
              className="h-4 w-4"
            />

            <div>
              <p className="text-sm font-medium text-gray-800">
                Shuffle Questions
              </p>

              <p className="text-xs text-gray-500">Randomize question order.</p>
            </div>
          </label>

          {/* Shuffle Options */}

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
            <input
              type="checkbox"
              {...register("shuffle_options")}
              className="h-4 w-4"
            />

            <div>
              <p className="text-sm font-medium text-gray-800">
                Shuffle Options
              </p>

              <p className="text-xs text-gray-500">Randomize option order.</p>
            </div>
          </label>

          {/* Auto Submit */}

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
            <input
              type="checkbox"
              {...register("auto_submit")}
              className="h-4 w-4"
            />

            <div>
              <p className="text-sm font-medium text-gray-800">Auto Submit</p>

              <p className="text-xs text-gray-500">
                Automatically submit when time expires.
              </p>
            </div>
          </label>

          {/* Show Result */}

          <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4">
            <input
              type="checkbox"
              {...register("show_result")}
              className="h-4 w-4"
            />

            <div>
              <p className="text-sm font-medium text-gray-800">Show Result</p>

              <p className="text-xs text-gray-500">
                Allow students to see their result.
              </p>
            </div>
          </label>

          {/* Show Correct Answers */}

          <label
            className={`flex items-center gap-3 rounded-lg border p-4 ${
              !showResult
                ? "cursor-not-allowed bg-gray-50 opacity-60"
                : "cursor-pointer border-gray-200"
            }`}
          >
            <input
              type="checkbox"
              {...register("show_correct_answers")}
              disabled={!showResult}
              className="h-4 w-4"
            />

            <div>
              <p className="text-sm font-medium text-gray-800">
                Show Correct Answers
              </p>

              <p className="text-xs text-gray-500">
                Students can see correct answers after the result.
              </p>
            </div>
          </label>

          {/* Status */}

          <div className="rounded-lg border border-gray-200 p-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              {...register("status")}
              className={`w-full rounded-lg border px-4 py-3 text-sm outline-none ${
                errors.status
                  ? "border-red-500"
                  : "border-gray-300 focus:border-[#505B95]"
              }`}
            >
              <option value="draft">Draft</option>

              <option value="published">Published</option>

              <option value="closed">Closed</option>
            </select>

            {errors.status && (
              <p className="mt-1 text-sm text-red-600">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        {errors.show_correct_answers && (
          <p className="mt-4 text-sm text-red-600">
            {errors.show_correct_answers.message}
          </p>
        )}
      </div>

      {/* ================================================================ */}
      {/* QUESTIONS */}
      {/* ================================================================ */}

      <div>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Questions</h2>

            <p className="mt-1 text-sm text-gray-500">
              {questionFields.length} of 200 questions
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddQuestion}
            disabled={questionFields.length >= 200}
            className="rounded-lg bg-[#505B95] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#414a7d] disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Add Question
          </button>
        </div>

        {errors.questions?.message && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-600">{errors.questions.message}</p>
          </div>
        )}

        <div className="space-y-6">
          {questionFields.map((question, questionIndex) => (
            <QuizQuestion
              key={question.id}
              control={control}
              register={register}
              watch={watch}
              setValue={setValue}
              getValues={getValues}
              questionIndex={questionIndex}
              errors={errors.questions?.[questionIndex]}
              removeQuestion={handleRemoveQuestion}
              canRemoveQuestion={questionFields.length > 1}
            />
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* SUBMIT */}
      {/* ================================================================ */}

      <div className="flex items-center justify-end gap-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {isDirty && (
          <span className="mr-auto text-sm text-gray-500">
            You have unsaved changes.
          </span>
        )}

        <button
          type="submit"
          disabled={isSaving}
          className="rounded-lg bg-[#505B95] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#414a7d] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSaving ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default QuizForm;
