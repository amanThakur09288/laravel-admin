import { useEffect } from "react";

import {
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  quizSchema,
  quizDefaultValues,
} from "../../utils/quizSchema";

import Button from "../common/Button";


/*
|--------------------------------------------------------------------------
| Reusable Field Error
|--------------------------------------------------------------------------
*/

const FieldError = ({ error }) => {
  if (!error?.message) {
    return null;
  }

  return (
    <p className="mt-1 text-sm text-red-500">
      {error.message}
    </p>
  );
};


/*
|--------------------------------------------------------------------------
| Input Class
|--------------------------------------------------------------------------
*/

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white";


/*
|--------------------------------------------------------------------------
| Basic Information
|--------------------------------------------------------------------------
*/

const BasicInformation = ({
  batches,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">

      <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
        Basic Information
      </h2>

      <div className="space-y-5">

        {/* Batch */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Batch
          </label>

          <select
            {...register("batch_id")}
            className={inputClass}
          >
            <option value="">
              Select Batch
            </option>

            {batches.map((batch) => (
              <option
                key={batch.id}
                value={batch.id}
              >
                {batch.batch_name}
              </option>
            ))}
          </select>

          <FieldError error={errors.batch_id} />
        </div>


        {/* Title */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Quiz Title
          </label>

          <input
            type="text"
            placeholder="Enter quiz title"
            {...register("title")}
            className={inputClass}
          />

          <FieldError error={errors.title} />
        </div>


        {/* Description */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>

          <textarea
            rows={4}
            placeholder="Enter quiz description"
            {...register("description")}
            className={inputClass}
          />

          <FieldError error={errors.description} />
        </div>

      </div>
    </div>
  );
};


/*
|--------------------------------------------------------------------------
| Quiz Settings
|--------------------------------------------------------------------------
*/

const QuizSettings = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">

      <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
        Quiz Settings
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {/* Duration */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Duration (Minutes)
          </label>

          <input
            type="number"
            min="1"
            max="1440"
            {...register("duration_minutes")}
            className={inputClass}
          />

          <FieldError
            error={errors.duration_minutes}
          />
        </div>


        {/* Total Marks */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Total Marks
          </label>

          <input
            type="number"
            min="1"
            {...register("total_marks")}
            className={inputClass}
          />

          <FieldError
            error={errors.total_marks}
          />
        </div>


        {/* Passing Marks */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Passing Marks
          </label>

          <input
            type="number"
            min="0"
            {...register("passing_marks")}
            className={inputClass}
          />

          <FieldError
            error={errors.passing_marks}
          />
        </div>


        {/* Attempts */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Attempts Allowed
          </label>

          <input
            type="number"
            min="1"
            max="100"
            {...register("attempts_allowed")}
            className={inputClass}
          />

          <FieldError
            error={errors.attempts_allowed}
          />
        </div>

      </div>
    </div>
  );
};


/*
|--------------------------------------------------------------------------
| Quiz Behavior
|--------------------------------------------------------------------------
*/

const QuizBehavior = () => {
  const {
    register,
  } = useFormContext();

  const checkboxClass =
    "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500";

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">

      <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
        Quiz Behavior
      </h2>

      <div className="space-y-4">

        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            {...register("shuffle_questions")}
            className={checkboxClass}
          />

          <span className="text-sm text-gray-700 dark:text-gray-300">
            Shuffle questions
          </span>
        </label>


        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            {...register("shuffle_options")}
            className={checkboxClass}
          />

          <span className="text-sm text-gray-700 dark:text-gray-300">
            Shuffle answer options
          </span>
        </label>


        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            {...register("auto_submit")}
            className={checkboxClass}
          />

          <span className="text-sm text-gray-700 dark:text-gray-300">
            Automatically submit when time expires
          </span>
        </label>


        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            {...register("show_result")}
            className={checkboxClass}
          />

          <span className="text-sm text-gray-700 dark:text-gray-300">
            Show result after submission
          </span>
        </label>


        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            {...register("show_correct_answers")}
            className={checkboxClass}
          />

          <span className="text-sm text-gray-700 dark:text-gray-300">
            Show correct answers after submission
          </span>
        </label>

      </div>
    </div>
  );
};


/*
|--------------------------------------------------------------------------
| Status
|--------------------------------------------------------------------------
*/

const QuizStatus = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">

      <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
        Status
      </h2>

      <select
        {...register("status")}
        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:max-w-sm"
      >
        <option value="draft">
          Draft
        </option>

        <option value="published">
          Published
        </option>

        <option value="closed">
          Closed
        </option>
      </select>

      <FieldError error={errors.status} />

    </div>
  );
};


/*
|--------------------------------------------------------------------------
| Quiz Form
|--------------------------------------------------------------------------
*/

const QuizForm = ({
  initialData = null,
  batches = [],
  onSubmit,
  submitting = false,
}) => {
  const methods = useForm({
    resolver: zodResolver(quizSchema),

    defaultValues: quizDefaultValues,

    mode: "onBlur",

    reValidateMode: "onChange",
  });

  const {
    reset,
    handleSubmit,
    setError,
  } = methods;


  /*
  |--------------------------------------------------------------------------
  | Edit Values
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!initialData) {
      reset(quizDefaultValues);
      return;
    }

    reset({
      batch_id: initialData.batch_id || "",

      title:
        initialData.title || "",

      description:
        initialData.description || "",

      duration_minutes:
        initialData.duration_minutes || 30,

      total_marks:
        initialData.total_marks || 10,

      passing_marks:
        initialData.passing_marks || 5,

      attempts_allowed:
        initialData.attempts_allowed || 1,

      shuffle_questions:
        Boolean(initialData.shuffle_questions),

      shuffle_options:
        Boolean(initialData.shuffle_options),

      auto_submit:
        initialData.auto_submit !== undefined
          ? Boolean(initialData.auto_submit)
          : true,

      show_result:
        initialData.show_result !== undefined
          ? Boolean(initialData.show_result)
          : true,

      show_correct_answers:
        initialData.show_correct_answers !== undefined
          ? Boolean(initialData.show_correct_answers)
          : true,

      status:
        initialData.status || "draft",
    });
  }, [
    initialData,
    reset,
  ]);


  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const submitForm = (formData) => {
    const data = {
      ...formData,

      batch_id:
        Number(formData.batch_id),

      duration_minutes:
        Number(formData.duration_minutes),

      total_marks:
        Number(formData.total_marks),

      passing_marks:
        Number(formData.passing_marks),

      attempts_allowed:
        Number(formData.attempts_allowed),

      shuffle_questions:
        Boolean(formData.shuffle_questions),

      shuffle_options:
        Boolean(formData.shuffle_options),

      auto_submit:
        Boolean(formData.auto_submit),

      show_result:
        Boolean(formData.show_result),

      show_correct_answers:
        Boolean(formData.show_correct_answers),
    };

    onSubmit(data, setError);
  };


  return (
    <FormProvider {...methods}>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="space-y-6"
      >

        <BasicInformation
          batches={batches}
        />

        <QuizSettings />

        <QuizBehavior />

        <QuizStatus />


        {/* Submit */}

        <div className="flex justify-end">

          <Button
            type="submit"
            loading={submitting}
            disabled={submitting}
          >
            {initialData
              ? "Update Quiz"
              : "Create Quiz"}
          </Button>

        </div>

      </form>

    </FormProvider>
  );
};

export default QuizForm;