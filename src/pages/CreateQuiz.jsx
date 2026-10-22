import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { quizSchema } from "../utils/quizSchema";
import QuizForm from "../components/quiz/QuizForm";
import { defaultQuizValues } from "../utils/quizSchema";

import { createQuiz } from "../api/quizApi";
import { getBatches } from "../api/batchApi";

import { addQuiz } from "../redux/slices/quizSlice";

export default function CreateQuiz() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [batches, setBatches] = useState([]);
  const [loadingBatches, setLoadingBatches] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const methods = useForm({
    resolver: zodResolver(quizSchema),

    defaultValues: defaultQuizValues,

    mode: "onBlur",
  });

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = async () => {
    try {
      const response = await getBatches();

      setBatches(response.data || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load batches.");
    } finally {
      setLoadingBatches(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError("");

      const response = await createQuiz(data);

      dispatch(addQuiz(response.data));

      navigate("/quizzes");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingBatches) {
    return (
      <div className="py-10 text-center text-gray-500">Loading batches...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Create Quiz
        </h1>

        <p className="text-sm text-gray-500">
          Create a quiz with multiple questions.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <FormProvider {...methods}>
        <QuizForm
          batches={batches}
          onSubmit={onSubmit}
          submitting={submitting}
          submitText="Create Quiz"
        />
      </FormProvider>
    </div>
  );
}
