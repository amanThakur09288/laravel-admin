import {
  useEffect,
} from "react";

import {
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  questionSchema,
  questionDefaultValues,
} from "../../utils/questionSchema";

import OptionEditor from "./OptionEditor";

import Button from "../common/Button";


/*
|--------------------------------------------------------------------------
| Field Error
|--------------------------------------------------------------------------
*/

const FieldError = ({
  error,
}) => {

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
| Question Information
|--------------------------------------------------------------------------
*/

const QuestionInformation = () => {

  const {
    register,
    formState: {
      errors,
    },
  } = useFormContext();


  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">

      <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
        Question Information
      </h2>


      <div className="space-y-5">

        {/* Question */}

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Question
          </label>

          <textarea
            rows={5}
            placeholder="Enter your question"
            {...register(
              "question_text"
            )}
            className={inputClass}
          />

          <FieldError
            error={
              errors.question_text
            }
          />

        </div>


        {/* Type + Marks */}

        <div className="grid gap-5 sm:grid-cols-2">

          {/* Type */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Question Type
            </label>

            <select
              {...register("type")}
              className={inputClass}
            >

              <option value="single_choice">
                Single Choice
              </option>

              <option value="multiple_choice">
                Multiple Choice
              </option>

            </select>

            <FieldError
              error={errors.type}
            />

          </div>


          {/* Marks */}

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Marks
            </label>

            <input
              type="number"
              min="1"
              placeholder="Enter marks"
              {...register("marks")}
              className={inputClass}
            />

            <FieldError
              error={errors.marks}
            />

          </div>

        </div>


        {/* Explanation */}

        <div>

          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Explanation
            <span className="ml-1 font-normal text-gray-400">
              (Optional)
            </span>
          </label>

          <textarea
            rows={4}
            placeholder="Explain why the answer is correct..."
            {...register(
              "explanation"
            )}
            className={inputClass}
          />

          <FieldError
            error={errors.explanation}
          />

        </div>

      </div>

    </div>
  );
};


/*
|--------------------------------------------------------------------------
| Question Form
|--------------------------------------------------------------------------
*/

const QuestionForm = ({
  initialData = null,
  onSubmit,
  submitting = false,
}) => {

  /*
  |--------------------------------------------------------------------------
  | React Hook Form
  |--------------------------------------------------------------------------
  */

  const methods = useForm({

    resolver:
      zodResolver(
        questionSchema
      ),

    defaultValues:
      questionDefaultValues,

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
  | Edit / Initial Data
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    if (!initialData) {

      reset(
        questionDefaultValues
      );

      return;
    }


    reset({

      question_text:
        initialData.question_text ||
        "",

      type:
        initialData.type ||
        "single_choice",

      marks:
        initialData.marks ||
        1,

      explanation:
        initialData.explanation ||
        "",

      options:
        initialData.options?.length
          ? initialData.options.map(
              (
                option,
                index
              ) => ({
                option_text:
                  option.option_text ||
                  "",

                is_correct:
                  Boolean(
                    option.is_correct
                  ),

                sort_order:
                  index,
              })
            )
          : questionDefaultValues.options,
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

  const submitForm = (
    formData
  ) => {

    const data = {

      question_text:
        formData.question_text.trim(),

      type:
        formData.type,

      marks:
        Number(
          formData.marks
        ),

      explanation:
        formData.explanation?.trim() ||
        null,

      options:
        formData.options.map(
          (
            option,
            index
          ) => ({
            option_text:
              option.option_text.trim(),

            is_correct:
              Boolean(
                option.is_correct
              ),

            sort_order:
              index,
          })
        ),
    };


    onSubmit(
      data,
      setError
    );
  };


  return (

    /*
    |--------------------------------------------------------------------------
    | THIS FIXES YOUR ERROR
    |--------------------------------------------------------------------------
    */

    <FormProvider {...methods}>

      <form
        onSubmit={handleSubmit(
          submitForm
        )}
        className="space-y-6"
      >

        {/* Question Information */}

        <QuestionInformation />


        {/* Options */}

        <OptionEditor />


        {/* Submit */}

        <div className="flex justify-end">

          <Button
            type="submit"
            loading={submitting}
            disabled={submitting}
          >
            {initialData
              ? "Update Question"
              : "Create Question"}
          </Button>

        </div>

      </form>

    </FormProvider>
  );
};

export default QuestionForm;