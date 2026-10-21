import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import QuestionForm from "../components/quiz/QuestionForm";

import {
  getQuestion,
  updateQuestion,
} from "../api/questionApi";

import {
  updateQuestionInList,
} from "../redux/slices/questionSlice";

const EditQuestion = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const loadQuestion = async () => {
    try {
      setLoading(true);

      const response = await getQuestion(id);

      setQuestion(response.data);
    } catch (error) {
      console.error(
        "Failed to load question:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to load question."
      );

      navigate("/questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuestion();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      setSubmitting(true);

      const response = await updateQuestion(id, data);

      dispatch(
        updateQuestionInList(response.data)
      );

      navigate("/questions");
    } catch (error) {
      console.error(
        "Failed to update question:",
        error
      );

      const errors = error.response?.data?.errors;

      if (errors) {
        const firstError = Object.values(errors)
          .flat()[0];

        alert(firstError || "Validation failed.");
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to update question."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="rounded-xl border bg-white p-6 text-gray-500 shadow-sm">
          Loading question...
        </div>
      </div>
    );
  }

  if (!question) {
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">
          Edit Question
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Update the question and its answer options.
        </p>
      </div>

      <QuestionForm
        initialData={question}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
};

export default EditQuestion;