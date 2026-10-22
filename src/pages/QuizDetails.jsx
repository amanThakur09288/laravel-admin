import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getQuiz } from "../api/quizApi";

export default function QuizDetails() {
  const { id } = useParams();

  const [quiz, setQuiz] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadQuiz();
  }, [id]);

  const loadQuiz = async () => {
    try {
      setLoading(true);

      const response = await getQuiz(id);

      setQuiz(response.data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load quiz.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">Loading quiz...</div>
    );
  }

  if (error) {
    return <div className="rounded-lg bg-red-50 p-4 text-red-600">{error}</div>;
  }

  if (!quiz) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {quiz.title}
          </h1>

          <p className="text-sm text-gray-500">
            {quiz.description || "No description"}
          </p>
        </div>

        <Link
          to={`/quizzes/${quiz.id}/edit`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white"
        >
          Edit Quiz
        </Link>
      </div>

      {/* Quiz Information */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <InfoCard label="Batch" value={quiz.batch?.batch_name || "-"} />

        <InfoCard label="Duration" value={`${quiz.duration_minutes} minutes`} />

        <InfoCard label="Total Marks" value={quiz.total_marks} />

        <InfoCard label="Passing Marks" value={quiz.passing_marks} />
      </div>

      {/* Questions */}

      <div className="space-y-5">
        {quiz.questions?.map((question, index) => (
          <div
            key={question.id}
            className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="mb-4 flex justify-between">
              <h2 className="font-semibold text-gray-800 dark:text-white">
                {index + 1}. {question.question_text}
              </h2>

              <span className="text-sm text-gray-500">
                {question.marks} marks
              </span>
            </div>

            <div className="space-y-2">
              {question.options?.map((option) => (
                <div
                  key={option.id}
                  className={`rounded-lg border p-3 ${
                    option.is_correct
                      ? "border-green-400 bg-green-50 dark:bg-green-950"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{option.option_text}</span>

                    {option.is_correct && (
                      <span className="text-xs font-medium text-green-600">
                        Correct
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {question.explanation && (
              <div className="mt-4 rounded-lg bg-gray-50 p-3 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                <strong>Explanation:</strong> {question.explanation}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <p className="text-sm text-gray-500">{label}</p>

      <p className="mt-1 font-semibold text-gray-800 dark:text-white">
        {value}
      </p>
    </div>
  );
}
