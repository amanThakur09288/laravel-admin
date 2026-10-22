import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import QuizForm from "../components/quiz/QuizForm";
import { quizSchema, defaultQuizValues } from "../utils/quizSchema";
import { getQuiz, updateQuiz } from "../api/quizApi";
import { getBatches } from "../api/batchApi";
import { updateQuiz as updateQuizState } from "../redux/slices/quizSlice";

export default function EditQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [batches, setBatches] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const methods = useForm({
    resolver: zodResolver(quizSchema),
    defaultValues: defaultQuizValues,
    mode: "onBlur",
  });

  useEffect(() => {
    if (!id) {
      setError("Quiz ID is missing.");
      setLoading(false);
      return;
    }
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [quizResponse, batchResponse] = await Promise.all([
        getQuiz(id),
        getBatches(),
      ]);

      const quizData = quizResponse?.data;

      if (!quizData) {
        throw new Error("Quiz data was not found.");
      }
      setQuiz(quizData);

      const formData = {
        batch_id:
          quizData?.batch_id !== null && quizData?.batch_id !== undefined
            ? Number(quizData?.batch_id)
            : undefined,

        title: quizData?.title || "",
        description: quizData?.description || "",
        duration_minutes: Number(quizData?.duration_minutes || 1),
        passing_marks: Number(quizData?.passing_marks || 0),
        attempts_allowed: Number(quizData?.attempts_allowed || 1),
        shuffle_questions: Boolean(quizData?.shuffle_questions),
        shuffle_options: Boolean(quizData?.shuffle_options),
        auto_submit: Boolean(quizData?.auto_submit),
        show_result: Boolean(quizData?.show_result),
        show_correct_answers: Boolean(quizData?.show_correct_answers),
        status: quizData?.status || "draft",
        questions: Array.isArray(quizData?.questions)
          ? quizData?.questions.map((question) => ({
              question_text: question.question_text || "",
              type: question.type || "single_select",
              marks: Number(question.marks || 1),
              explanation: question.explanation || "",
              options: Array.isArray(question?.options)
                ? question?.options.map((option) => ({
                    option_text: option?.option_text || "",
                    is_correct: Boolean(option?.is_correct),
                  }))
                : [],
            }))
          : [],
      };

      methods?.reset(formData);
      const batchData = batchResponse?.data;
      setBatches(Array.isArray(batchData) ? batchData : []);
    } catch (error) {
      console.error("Failed to load quiz:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load quiz.",
      );
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError("");
      const response = await updateQuiz(id, data);
      if (response?.data) {
        dispatch(updateQuizState(response?.data));
      }
      navigate("/quizzes");
    } catch (error) {
      console.error("Failed to update quiz:", error);
      setError(error?.response?.data?.message || "Failed to update quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading quiz...</div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Edit Quiz
        </h1>

        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error || "Quiz not found."}
        </div>

        <button
          type="button"
          onClick={() => navigate("/quizzes")}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Edit Quiz
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Update quiz information and questions.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      <FormProvider {...methods}>
        <QuizForm
          key={quiz.id}
          batches={batches}
          initialData={quiz}
          onSubmit={onSubmit}
          submitting={submitting}
          submitText="Update Quiz"
        />
      </FormProvider>
    </div>
  );
}
