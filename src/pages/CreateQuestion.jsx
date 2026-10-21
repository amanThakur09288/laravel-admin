import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import QuestionForm from "../components/quiz/QuestionForm";

import { createQuestion } from "../api/questionApi";

import { addQuestion } from "../redux/slices/questionSlice";

import { getApiErrorMessage } from "../utils/apiError";
import { applyServerErrors } from "../utils/applyServerErrors";
const CreateQuestion = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (data, setError) => {
    try {
      setSubmitting(true);

      const response = await createQuestion(data);

      /*
      |--------------------------------------------------------------------------
      | Redux
      |--------------------------------------------------------------------------
      */

      dispatch(addQuestion(response.data));

      /*
      |--------------------------------------------------------------------------
      | Success
      |--------------------------------------------------------------------------
      */

      toast.success("Question created successfully.");

      navigate("/questions");
    } catch (error) {
      console.error("Failed to create question:", error);

      /*
      |--------------------------------------------------------------------------
      | Laravel Validation Errors
      |--------------------------------------------------------------------------
      */

      applyServerErrors(error, setError);

      toast.error(getApiErrorMessage(error, "Failed to create question."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Question
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Create a question and define its correct answer options.
        </p>
      </div>

      {/* Form */}

      <QuestionForm onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
};

export default CreateQuestion;
