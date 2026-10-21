import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import QuizQuestionEditor from "../components/quiz/QuizQuestionEditor";

import PageLoader from "../components/common/PageLoader";

import { getQuiz } from "../api/quizApi";

import { getQuestions } from "../api/questionApi";

import { setSelectedQuiz } from "../redux/slices/quizSlice";

import { getApiErrorMessage } from "../utils/apiError";

const QuizDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);

  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);

  /*
  |--------------------------------------------------------------------------
  | Load
  |--------------------------------------------------------------------------
  */

  const loadData = async () => {
    try {
      setLoading(true);

      const [quizResponse, questionsResponse] = await Promise.all([
        getQuiz(id),
        getQuestions(),
      ]);

      setQuiz(quizResponse.data);

      setQuestions(questionsResponse.data || []);

      dispatch(setSelectedQuiz(quizResponse.data));
    } catch (error) {
      console.error("Failed to load quiz details:", error);

      toast.error(getApiErrorMessage(error, "Failed to load quiz details."));

      navigate("/quizzes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  /*
  |--------------------------------------------------------------------------
  | Updated Quiz
  |--------------------------------------------------------------------------
  */

  const handleQuizUpdated = (updatedQuiz) => {
    setQuiz(updatedQuiz);

    dispatch(setSelectedQuiz(updatedQuiz));
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!quiz) {
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {quiz.title}
            </h1>

            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              {quiz.status}
            </span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {quiz.description || "No quiz description."}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(`/quizzes/${quiz.id}/edit`)}
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
          >
            Edit Quiz
          </button>

          <button
            type="button"
            onClick={() => navigate("/quizzes")}
            className="rounded-lg bg-gray-100 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Back
          </button>
        </div>
      </div>

      {/* Quiz Summary */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Batch</p>

          <p className="mt-1 font-semibold text-gray-900 dark:text-white">
            {quiz.batch?.batch_name || "-"}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>

          <p className="mt-1 font-semibold text-gray-900 dark:text-white">
            {quiz.duration_minutes} minutes
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Marks
          </p>

          <p className="mt-1 font-semibold text-gray-900 dark:text-white">
            {quiz.total_marks}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Passing Marks
          </p>

          <p className="mt-1 font-semibold text-gray-900 dark:text-white">
            {quiz.passing_marks}
          </p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">Attempts</p>

          <p className="mt-1 font-semibold text-gray-900 dark:text-white">
            {quiz.attempts_allowed}
          </p>
        </div>
      </div>

      {/* Questions */}

      <QuizQuestionEditor
        quiz={quiz}
        allQuestions={questions}
        onQuizUpdated={handleQuizUpdated}
      />
    </div>
  );
};

export default QuizDetails;
