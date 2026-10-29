// import { Controller, useFieldArray } from "react-hook-form";

// function QuizQuestion({
//   control,
//   register,
//   watch,
//   setValue,
//   getValues,
//   questionIndex,
//   errors,
//   removeQuestion,
//   canRemoveQuestion,
// }) {
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: `questions.${questionIndex}.options`,
//   });

//   const questionType = watch(`questions.${questionIndex}.type`);

//   const options = watch(`questions.${questionIndex}.options`) || [];

//   const questionImage = watch(`questions.${questionIndex}.question_image`);

//   /*
//   |--------------------------------------------------------------------------
//   | Add option
//   |--------------------------------------------------------------------------
//   */

//   const handleAddOption = () => {
//     if (fields.length >= 20) {
//       return;
//     }

//     append({
//       option_text: "",
//       is_correct: false,
//     });
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Remove option
//   |--------------------------------------------------------------------------
//   */

//   const handleRemoveOption = (optionIndex) => {
//     if (fields.length <= 2) {
//       return;
//     }

//     const currentOptions =
//       getValues(`questions.${questionIndex}.options`) || [];

//     const removedOption = currentOptions[optionIndex];

//     remove(optionIndex);

//     /*
//      * If we remove the only correct option in a Single Select
//      * question, the remaining options are reset to false.
//      *
//      * This prevents stale/invalid correct-answer state.
//      */

//     if (
//       questionType === "single_select" &&
//       removedOption?.is_correct === true
//     ) {
//       const remainingOptions =
//         getValues(`questions.${questionIndex}.options`) || [];

//       remainingOptions.forEach((_, index) => {
//         setValue(
//           `questions.${questionIndex}.options.${index}.is_correct`,
//           false,
//           {
//             shouldValidate: true,
//             shouldDirty: true,
//           },
//         );
//       });
//     }
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Single Select
//   |--------------------------------------------------------------------------
//   |
//   | Exactly ONE option can be correct.
//   |
//   */

//   const handleSingleCorrectOption = (selectedIndex) => {
//     const currentOptions =
//       getValues(`questions.${questionIndex}.options`) || [];

//     currentOptions.forEach((_, index) => {
//       setValue(
//         `questions.${questionIndex}.options.${index}.is_correct`,
//         index === selectedIndex,
//         {
//           shouldValidate: true,
//           shouldDirty: true,
//         },
//       );
//     });
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Multi Select
//   |--------------------------------------------------------------------------
//   |
//   | Multiple options can be correct.
//   |
//   */

//   const handleMultiCorrectOption = (optionIndex, checked) => {
//     setValue(
//       `questions.${questionIndex}.options.${optionIndex}.is_correct`,
//       checked === true,
//       {
//         shouldValidate: true,
//         shouldDirty: true,
//       },
//     );
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Change question type
//   |--------------------------------------------------------------------------
//   |
//   | When switching between Single Select and Multi Select,
//   | reset correct answers so old state cannot create confusion.
//   |
//   */

//   const handleQuestionTypeChange = (type) => {
//     setValue(`questions.${questionIndex}.type`, type, {
//       shouldValidate: true,
//       shouldDirty: true,
//     });

//     const currentOptions =
//       getValues(`questions.${questionIndex}.options`) || [];

//     currentOptions.forEach((_, index) => {
//       setValue(
//         `questions.${questionIndex}.options.${index}.is_correct`,
//         false,
//         {
//           shouldValidate: true,
//           shouldDirty: true,
//         },
//       );
//     });
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Question Image
//   |--------------------------------------------------------------------------
//   */

//   const handleQuestionImageChange = (event) => {
//     const file = event.target.files?.[0];

//     if (!file) {
//       return;
//     }

//     const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

//     const maxSize = 5 * 1024 * 1024;

//     if (!allowedTypes.includes(file.type)) {
//       toast.error("Only JPG, JPEG, PNG and WEBP images are allowed.");

//       event.target.value = "";

//       return;
//     }

//     if (file.size > maxSize) {
//       toast.error("Image size cannot exceed 5MB.");

//       event.target.value = "";

//       return;
//     }

//     setValue(`questions.${questionIndex}.question_image`, file, {
//       shouldValidate: true,
//       shouldDirty: true,
//     });
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Remove Question Image
//   |--------------------------------------------------------------------------
//   */

//   const handleRemoveQuestionImage = () => {
//     setValue(`questions.${questionIndex}.question_image`, null, {
//       shouldValidate: true,
//       shouldDirty: true,
//     });
//   };

//   /*
//   |--------------------------------------------------------------------------
//   | Image Preview
//   |--------------------------------------------------------------------------
//   */

//   const imagePreview =
//     questionImage instanceof File
//       ? URL.createObjectURL(questionImage)
//       : questionImage || null;

//   return (
//     <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
//       {/* ---------------------------------------------------------------- */}
//       {/* Question Header */}
//       {/* ---------------------------------------------------------------- */}

//       <div className="mb-6 flex items-center justify-between">
//         <h2 className="text-lg font-semibold text-gray-800">
//           Question {questionIndex + 1}
//         </h2>

//         {canRemoveQuestion && (
//           <button
//             type="button"
//             onClick={() => removeQuestion(questionIndex)}
//             className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
//           >
//             Remove Question
//           </button>
//         )}
//       </div>

//       {/* ---------------------------------------------------------------- */}
//       {/* Question Text */}
//       {/* ---------------------------------------------------------------- */}

//       <div className="mb-5">
//         <label className="mb-2 block text-sm font-medium text-gray-700">
//           Question
//         </label>

//         <textarea
//           {...register(`questions.${questionIndex}.question_text`)}
//           rows={4}
//           placeholder="Enter question"
//           className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
//             errors?.question_text
//               ? "border-red-500 focus:ring-2 focus:ring-red-100"
//               : "border-gray-300 focus:border-[#505B95] focus:ring-2 focus:ring-[#505B95]/10"
//           }`}
//         />

//         {errors?.question_text && (
//           <p className="mt-1 text-sm text-red-600">
//             {errors.question_text.message}
//           </p>
//         )}
//       </div>

//       {/* ---------------------------------------------------------------- */}
//       {/* Question Image */}
//       {/* ---------------------------------------------------------------- */}

//       <div className="mb-6">
//         <label className="mb-2 block text-sm font-medium text-gray-700">
//           Question Image
//           <span className="ml-1 text-gray-400">(Optional)</span>
//         </label>

//         <input
//           type="file"
//           accept="image/jpeg,image/jpg,image/png,image/webp"
//           onChange={handleQuestionImageChange}
//           className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-3 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
//         />

//         <p className="mt-2 text-xs text-gray-500">
//           Supported: JPG, JPEG, PNG, WEBP. Maximum size: 5MB.
//         </p>

//         {imagePreview && (
//           <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
//             <div className="mb-3 flex items-center justify-between">
//               <p className="text-sm font-medium text-gray-700">Image Preview</p>

//               <button
//                 type="button"
//                 onClick={handleRemoveQuestionImage}
//                 className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
//               >
//                 Remove Image
//               </button>
//             </div>

//             <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
//               <img
//                 src={imagePreview}
//                 alt={`Question ${questionIndex + 1}`}
//                 className="max-h-[350px] w-full object-contain"
//               />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ---------------------------------------------------------------- */}
//       {/* Question Type */}
//       {/* ---------------------------------------------------------------- */}

//       <div className="mb-5">
//         <label className="mb-2 block text-sm font-medium text-gray-700">
//           Question Type
//         </label>

//         <select
//           value={questionType}
//           onChange={(event) => handleQuestionTypeChange(event.target.value)}
//           className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
//             errors?.type
//               ? "border-red-500"
//               : "border-gray-300 focus:border-[#505B95]"
//           }`}
//         >
//           <option value="single_select">Single Select</option>

//           <option value="multi_select">Multi Select</option>
//         </select>

//         {errors?.type && (
//           <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
//         )}
//       </div>

//       {/* ---------------------------------------------------------------- */}
//       {/* Marks */}
//       {/* ---------------------------------------------------------------- */}

//       <div className="mb-6">
//         <label className="mb-2 block text-sm font-medium text-gray-700">
//           Marks
//         </label>

//         <input
//           type="number"
//           min="1"
//           max="1000"
//           {...register(`questions.${questionIndex}.marks`, {
//             setValueAs: (value) => (value === "" ? undefined : Number(value)),
//           })}
//           className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
//             errors?.marks
//               ? "border-red-500"
//               : "border-gray-300 focus:border-[#505B95]"
//           }`}
//         />

//         {errors?.marks && (
//           <p className="mt-1 text-sm text-red-600">{errors.marks.message}</p>
//         )}
//       </div>

//       {/* ---------------------------------------------------------------- */}
//       {/* Options */}
//       {/* ---------------------------------------------------------------- */}

//       <div className="mb-6">
//         <div className="mb-3 flex items-center justify-between">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">Options</h3>

//             <p className="text-sm text-gray-500">
//               {questionType === "single_select"
//                 ? "Select exactly one correct option."
//                 : "Select at least two correct options."}
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={handleAddOption}
//             disabled={fields.length >= 20}
//             className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
//           >
//             + Add Option
//           </button>
//         </div>

//         {errors?.options?.message && (
//           <p className="mb-3 text-sm font-medium text-red-600">
//             {errors.options.message}
//           </p>
//         )}

//         <div className="space-y-3">
//           {fields.map((field, optionIndex) => {
//             const optionError = errors?.options?.[optionIndex];

//             const isCorrect = options?.[optionIndex]?.is_correct === true;

//             return (
//               <div
//                 key={field.id}
//                 className={`rounded-lg border p-3 transition ${
//                   optionError?.option_text
//                     ? "border-red-400 bg-red-50"
//                     : isCorrect
//                       ? "border-[#505B95] bg-[#505B95]/5"
//                       : "border-gray-200"
//                 }`}
//               >
//                 <div className="flex items-start gap-3">
//                   {/* ---------------------------------------------------- */}
//                   {/* Correct Answer Control */}
//                   {/* ---------------------------------------------------- */}

//                   <div className="pt-3">
//                     {questionType === "single_select" ? (
//                       <input
//                         type="radio"
//                         name={`question-${questionIndex}-correct`}
//                         checked={isCorrect}
//                         onChange={() => handleSingleCorrectOption(optionIndex)}
//                         className="h-4 w-4 cursor-pointer"
//                       />
//                     ) : (
//                       <input
//                         type="checkbox"
//                         checked={isCorrect}
//                         onChange={(event) =>
//                           handleMultiCorrectOption(
//                             optionIndex,
//                             event.target.checked,
//                           )
//                         }
//                         className="h-4 w-4 cursor-pointer"
//                       />
//                     )}
//                   </div>

//                   {/* ---------------------------------------------------- */}
//                   {/* Option Input */}
//                   {/* ---------------------------------------------------- */}

//                   <div className="flex-1">
//                     <input
//                       type="text"
//                       {...register(
//                         `questions.${questionIndex}.options.${optionIndex}.option_text`,
//                       )}
//                       placeholder={`Option ${optionIndex + 1}`}
//                       className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
//                         optionError?.option_text
//                           ? "border-red-500"
//                           : "border-gray-300 focus:border-[#505B95]"
//                       }`}
//                     />

//                     {optionError?.option_text && (
//                       <p className="mt-1 text-sm text-red-600">
//                         {optionError.option_text.message}
//                       </p>
//                     )}
//                   </div>

//                   {/* ---------------------------------------------------- */}
//                   {/* Remove Option */}
//                   {/* ---------------------------------------------------- */}

//                   <button
//                     type="button"
//                     onClick={() => handleRemoveOption(optionIndex)}
//                     disabled={fields.length <= 2}
//                     className="mt-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ---------------------------------------------------------------- */}
//       {/* Explanation */}
//       {/* ---------------------------------------------------------------- */}

//       <div>
//         <label className="mb-2 block text-sm font-medium text-gray-700">
//           Explanation
//         </label>

//         <textarea
//           {...register(`questions.${questionIndex}.explanation`)}
//           rows={3}
//           placeholder="Optional explanation"
//           className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
//             errors?.explanation
//               ? "border-red-500"
//               : "border-gray-300 focus:border-[#505B95]"
//           }`}
//         />

//         {errors?.explanation && (
//           <p className="mt-1 text-sm text-red-600">
//             {errors.explanation.message}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default QuizQuestion;

import { useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";

function QuizQuestion({
  control,
  register,
  watch,
  setValue,
  getValues,
  questionIndex,
  errors,
  removeQuestion,
  canRemoveQuestion,
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`,
  });

  const questionType = watch(`questions.${questionIndex}.type`);

  const options = watch(`questions.${questionIndex}.options`) || [];

  const questionImage = watch(`questions.${questionIndex}.question_image`);

  /*
  |--------------------------------------------------------------------------
  | Add option
  |--------------------------------------------------------------------------
  */

  const handleAddOption = () => {
    if (fields.length >= 20) {
      return;
    }

    append({
      option_text: "",
      is_correct: false,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Remove option
  |--------------------------------------------------------------------------
  */

  const handleRemoveOption = (optionIndex) => {
    if (fields.length <= 2) {
      return;
    }

    const currentOptions =
      getValues(`questions.${questionIndex}.options`) || [];

    const removedOption = currentOptions[optionIndex];

    remove(optionIndex);

    /*
     * If we remove the only correct option
     * in a Single Select question,
     * reset remaining options.
     */

    if (
      questionType === "single_select" &&
      removedOption?.is_correct === true
    ) {
      const remainingOptions =
        getValues(`questions.${questionIndex}.options`) || [];

      remainingOptions.forEach((_, index) => {
        setValue(
          `questions.${questionIndex}.options.${index}.is_correct`,
          false,
          {
            shouldValidate: true,
            shouldDirty: true,
          },
        );
      });
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Single Select
  |--------------------------------------------------------------------------
  */

  const handleSingleCorrectOption = (selectedIndex) => {
    const currentOptions =
      getValues(`questions.${questionIndex}.options`) || [];

    currentOptions.forEach((_, index) => {
      setValue(
        `questions.${questionIndex}.options.${index}.is_correct`,
        index === selectedIndex,
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Multi Select
  |--------------------------------------------------------------------------
  */

  const handleMultiCorrectOption = (optionIndex, checked) => {
    setValue(
      `questions.${questionIndex}.options.${optionIndex}.is_correct`,
      checked === true,
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Change question type
  |--------------------------------------------------------------------------
  */

  const handleQuestionTypeChange = (type) => {
    setValue(`questions.${questionIndex}.type`, type, {
      shouldValidate: true,
      shouldDirty: true,
    });

    const currentOptions =
      getValues(`questions.${questionIndex}.options`) || [];

    currentOptions.forEach((_, index) => {
      setValue(
        `questions.${questionIndex}.options.${index}.is_correct`,
        false,
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Question Image
  |--------------------------------------------------------------------------
  */

  const handleQuestionImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, PNG and WEBP images are allowed.");

      event.target.value = "";

      return;
    }

    if (file.size > maxSize) {
      toast.error("Image size cannot exceed 5MB.");

      event.target.value = "";

      return;
    }

    setValue(`questions.${questionIndex}.question_image`, file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Remove Question Image
  |--------------------------------------------------------------------------
  */

  const handleRemoveQuestionImage = () => {
    setValue(`questions.${questionIndex}.question_image`, null, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Image Preview
  |--------------------------------------------------------------------------
  */

  const imagePreview =
    questionImage instanceof File
      ? URL.createObjectURL(questionImage)
      : questionImage || null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* ---------------------------------------------------------------- */}
      {/* Question Header */}
      {/* ---------------------------------------------------------------- */}

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Question {questionIndex + 1}
        </h2>

        {canRemoveQuestion && (
          <button
            type="button"
            onClick={() => removeQuestion(questionIndex)}
            className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            Remove Question
          </button>
        )}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Question Text */}
      {/* ---------------------------------------------------------------- */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Question
        </label>

        <textarea
          {...register(`questions.${questionIndex}.question_text`)}
          rows={4}
          placeholder="Enter question"
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
            errors?.question_text
              ? "border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-gray-300 focus:border-[#505B95] focus:ring-2 focus:ring-[#505B95]/10"
          }`}
        />

        {errors?.question_text && (
          <p className="mt-1 text-sm text-red-600">
            {errors.question_text.message}
          </p>
        )}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Question Image */}
      {/* ---------------------------------------------------------------- */}

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Question Image
          <span className="ml-1 text-gray-400">(Optional)</span>
        </label>

        <input
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          onChange={handleQuestionImageChange}
          className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-100 file:px-4 file:py-3 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
        />

        <p className="mt-2 text-xs text-gray-500">
          Supported: JPG, JPEG, PNG, WEBP. Maximum size: 5MB.
        </p>

        {imagePreview && (
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">Image Preview</p>

              <button
                type="button"
                onClick={handleRemoveQuestionImage}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Remove Image
              </button>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
              <img
                src={imagePreview}
                alt={`Question ${questionIndex + 1}`}
                className="max-h-[350px] w-full object-contain"
              />
            </div>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Question Type */}
      {/* ---------------------------------------------------------------- */}

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Question Type
        </label>

        <select
          value={questionType}
          onChange={(event) => handleQuestionTypeChange(event.target.value)}
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
            errors?.type
              ? "border-red-500"
              : "border-gray-300 focus:border-[#505B95]"
          }`}
        >
          <option value="single_select">Single Select</option>

          <option value="multi_select">Multi Select</option>
        </select>

        {errors?.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Marks */}
      {/* ---------------------------------------------------------------- */}

      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Marks
        </label>

        <input
          type="number"
          min="1"
          max="1000"
          {...register(`questions.${questionIndex}.marks`, {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
            errors?.marks
              ? "border-red-500"
              : "border-gray-300 focus:border-[#505B95]"
          }`}
        />

        {errors?.marks && (
          <p className="mt-1 text-sm text-red-600">{errors.marks.message}</p>
        )}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Options */}
      {/* ---------------------------------------------------------------- */}

      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Options</h3>

            <p className="text-sm text-gray-500">
              {questionType === "single_select"
                ? "Select exactly one correct option."
                : "Select at least two correct options."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddOption}
            disabled={fields.length >= 20}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            + Add Option
          </button>
        </div>

        {/* {errors?.options?.message && (
          <p className="mb-3 text-sm font-medium text-red-600">
            {errors.options.message}
          </p>
        )} */}

        {(errors?.options?.root?.message || errors?.options?.message) && (
          <p className="mb-3 text-sm font-medium text-red-600">
            {errors?.options?.root?.message || errors?.options?.message}
          </p>
        )}

        <div className="space-y-3">
          {fields?.map((field, optionIndex) => {
            const optionError = errors?.options?.[optionIndex];

            const isCorrect = options?.[optionIndex]?.is_correct === true;

            return (
              <div
                key={field.id}
                className={`rounded-lg border p-3 transition ${
                  optionError?.option_text
                    ? "border-red-400 bg-red-50"
                    : isCorrect
                      ? "border-[#505B95] bg-[#505B95]/5"
                      : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* -------------------------------------------------- */}
                  {/* Correct Answer Control */}
                  {/* -------------------------------------------------- */}

                  <div className="pt-3">
                    {questionType === "single_select" ? (
                      <input
                        type="radio"
                        name={`question-${questionIndex}-correct`}
                        checked={isCorrect}
                        onChange={() => handleSingleCorrectOption(optionIndex)}
                        className="h-4 w-4 cursor-pointer"
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={isCorrect}
                        onChange={(event) =>
                          handleMultiCorrectOption(
                            optionIndex,
                            event.target.checked,
                          )
                        }
                        className="h-4 w-4 cursor-pointer"
                      />
                    )}
                  </div>

                  {/* -------------------------------------------------- */}
                  {/* Option Input */}
                  {/* -------------------------------------------------- */}

                  <div className="flex-1">
                    <input
                      type="text"
                      {...register(
                        `questions.${questionIndex}.options.${optionIndex}.option_text`,
                      )}
                      placeholder={`Option ${optionIndex + 1}`}
                      className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                        optionError?.option_text
                          ? "border-red-500"
                          : "border-gray-300 focus:border-[#505B95]"
                      }`}
                    />

                    {optionError?.option_text && (
                      <p className="mt-1 text-sm text-red-600">
                        {optionError.option_text.message}
                      </p>
                    )}
                  </div>

                  {/* -------------------------------------------------- */}
                  {/* Remove Option */}
                  {/* -------------------------------------------------- */}

                  <button
                    type="button"
                    onClick={() => handleRemoveOption(optionIndex)}
                    disabled={fields.length <= 2}
                    className="mt-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Explanation */}
      {/* ---------------------------------------------------------------- */}

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Explanation
        </label>

        <textarea
          {...register(`questions.${questionIndex}.explanation`)}
          rows={3}
          placeholder="Optional explanation"
          className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
            errors?.explanation
              ? "border-red-500"
              : "border-gray-300 focus:border-[#505B95]"
          }`}
        />

        {errors?.explanation && (
          <p className="mt-1 text-sm text-red-600">
            {errors.explanation.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default QuizQuestion;
