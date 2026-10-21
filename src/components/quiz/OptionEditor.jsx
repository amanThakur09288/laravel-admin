import { useFieldArray, useFormContext } from "react-hook-form";

const OptionEditor = () => {
  /*
  |--------------------------------------------------------------------------
  | IMPORTANT
  |--------------------------------------------------------------------------
  | This works because QuestionForm wraps everything
  | inside <FormProvider>.
  |--------------------------------------------------------------------------
  */

  const {
    control,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  /*
  |--------------------------------------------------------------------------
  | Field Array
  |--------------------------------------------------------------------------
  */

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  /*
  |--------------------------------------------------------------------------
  | Current Question Type
  |--------------------------------------------------------------------------
  */

  const questionType = watch("type");

  /*
  |--------------------------------------------------------------------------
  | Add Option
  |--------------------------------------------------------------------------
  */

  const handleAddOption = () => {
    append({
      option_text: "",

      is_correct: false,

      sort_order: fields.length,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Select Single Correct Option
  |--------------------------------------------------------------------------
  */

  const handleSingleCorrect = (selectedIndex) => {
    fields.forEach((_, index) => {
      setValue(`options.${index}.is_correct`, index === selectedIndex, {
        shouldDirty: true,
        shouldValidate: true,
      });
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Multiple Choice Toggle
  |--------------------------------------------------------------------------
  */

  const handleMultipleCorrect = (index, checked) => {
    setValue(`options.${index}.is_correct`, checked, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Errors
  |--------------------------------------------------------------------------
  */

  const optionError = errors.options?.message;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      {/* Header */}

      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Answer Options
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add answer choices and select the correct answer.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddOption}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + Add Option
        </button>
      </div>

      {/* General Error */}

      {optionError && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
          {optionError}
        </div>
      )}

      {/* Options */}

      <div className="space-y-4">
        {fields.map((field, index) => {
          const isCorrect = watch(`options.${index}.is_correct`);

          const optionError = errors.options?.[index];

          return (
            <div
              key={field.id}
              className={`rounded-xl border p-4 transition ${
                isCorrect
                  ? "border-green-400 bg-green-50 dark:border-green-700 dark:bg-green-900/10"
                  : "border-gray-200 dark:border-gray-700"
              }`}
            >
              {/* Top */}

              <div className="flex items-start gap-3">
                {/* Number */}

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {index + 1}
                </div>

                {/* Input */}

                <div className="flex-1">
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Option {index + 1}
                  </label>

                  <input
                    type="text"
                    placeholder={`Enter option ${index + 1}`}
                    {...register(`options.${index}.option_text`)}
                    className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-white ${
                      optionError?.option_text
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  />

                  {optionError?.option_text?.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {optionError.option_text.message}
                    </p>
                  )}
                </div>

                {/* Remove */}

                {fields.length > 2 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="mt-7 rounded-md bg-red-100 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* Correct Answer */}

              <div className="mt-4 ml-12">
                {questionType === "single_choice" ? (
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      name="correct-option"
                      checked={Boolean(isCorrect)}
                      onChange={() => handleSingleCorrect(index)}
                      className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500"
                    />

                    <span
                      className={`text-sm font-medium ${
                        isCorrect
                          ? "text-green-700 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      Correct answer
                    </span>
                  </label>
                ) : (
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={Boolean(isCorrect)}
                      onChange={(event) =>
                        handleMultipleCorrect(index, event.target.checked)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />

                    <span
                      className={`text-sm font-medium ${
                        isCorrect
                          ? "text-green-700 dark:text-green-400"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      Correct answer
                    </span>
                  </label>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Minimum Options */}

      {fields.length < 2 && (
        <p className="mt-3 text-sm text-red-500">
          At least 2 options are required.
        </p>
      )}
    </div>
  );
};

export default OptionEditor;
