import { useMemo, useState } from "react";

import toast from "react-hot-toast";

import {
  addQuestionsToQuiz,
  removeQuestionFromQuiz,
  updateQuizQuestionOrder,
} from "../../api/quizApi";

import { getApiErrorMessage } from "../../utils/apiError";

const QuizQuestionEditor = ({ quiz, allQuestions = [], onQuizUpdated }) => {
  const initialQuestions = quiz?.questions || [];

  const [selectedIds, setSelectedIds] = useState([]);

  const [saving, setSaving] = useState(false);

  const [removingId, setRemovingId] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | Questions already attached
  |--------------------------------------------------------------------------
  */

  const attachedQuestions = useMemo(() => {
    return [...initialQuestions].sort(
      (a, b) =>
        Number(a.pivot?.sort_order || 0) - Number(b.pivot?.sort_order || 0),
    );
  }, [initialQuestions]);

  const attachedIds = new Set(attachedQuestions.map((question) => question.id));

  /*
  |--------------------------------------------------------------------------
  | Available Questions
  |--------------------------------------------------------------------------
  */

  const availableQuestions = allQuestions.filter(
    (question) => !attachedIds.has(question.id),
  );

  /*
  |--------------------------------------------------------------------------
  | Select Question
  |--------------------------------------------------------------------------
  */

  const handleToggleQuestion = (questionId) => {
    setSelectedIds((current) => {
      if (current.includes(questionId)) {
        return current.filter((id) => id !== questionId);
      }

      return [...current, questionId];
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Add Questions
  |--------------------------------------------------------------------------
  */

  const handleAddQuestions = async () => {
    if (selectedIds.length === 0) {
      toast.error("Please select at least one question.");

      return;
    }

    try {
      setSaving(true);

      const response = await addQuestionsToQuiz(quiz.id, selectedIds);

      toast.success("Questions added successfully.");

      setSelectedIds([]);

      onQuizUpdated(response.data);
    } catch (error) {
      console.error("Failed to add questions:", error);

      toast.error(getApiErrorMessage(error, "Failed to add questions."));
    } finally {
      setSaving(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Move Question
  |--------------------------------------------------------------------------
  */

  const moveQuestion = (index, direction) => {
    const newQuestions = [...attachedQuestions];

    const targetIndex = direction === "up" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newQuestions.length) {
      return;
    }

    [newQuestions[index], newQuestions[targetIndex]] = [
      newQuestions[targetIndex],
      newQuestions[index],
    ];

    onQuizUpdated({
      ...quiz,
      questions: newQuestions.map((question, newIndex) => ({
        ...question,

        pivot: {
          ...question.pivot,
          sort_order: newIndex,
        },
      })),
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Save Order
  |--------------------------------------------------------------------------
  */

  const handleSaveOrder = async () => {
    const questionIds = attachedQuestions.map((question) => question.id);

    try {
      setSaving(true);

      const response = await updateQuizQuestionOrder(quiz.id, questionIds);

      toast.success("Question order saved.");

      onQuizUpdated(response.data);
    } catch (error) {
      console.error("Failed to update question order:", error);

      toast.error(
        getApiErrorMessage(error, "Failed to update question order."),
      );
    } finally {
      setSaving(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Remove Question
  |--------------------------------------------------------------------------
  */

  const handleRemove = async (questionId) => {
    const confirmed = window.confirm("Remove this question from the quiz?");

    if (!confirmed) {
      return;
    }

    try {
      setRemovingId(questionId);

      await removeQuestionFromQuiz(quiz.id, questionId);

      toast.success("Question removed from quiz.");

      const updatedQuestions = attachedQuestions.filter(
        (question) => question.id !== questionId,
      );

      onQuizUpdated({
        ...quiz,
        questions: updatedQuestions,
      });
    } catch (error) {
      console.error("Failed to remove question:", error);

      toast.error(getApiErrorMessage(error, "Failed to remove question."));
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Existing Questions */}

      <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Quiz Questions
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {attachedQuestions.length} question(s) attached.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSaveOrder}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Order"}
          </button>
        </div>

        {attachedQuestions.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            No questions added to this quiz yet.
          </div>
        ) : (
          <div className="space-y-3">
            {attachedQuestions.map((question, index) => (
              <div
                key={question.id}
                className="flex flex-col gap-4 rounded-lg border p-4 dark:border-gray-700 sm:flex-row sm:items-center"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {question.question_text}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                      {question.type}
                    </span>

                    <span className="rounded-full bg-blue-100 px-2.5 py-1 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                      {question.marks} mark
                      {question.marks !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveQuestion(index, "up")}
                    className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    disabled={index === attachedQuestions.length - 1}
                    onClick={() => moveQuestion(index, "down")}
                    className="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  >
                    ↓
                  </button>

                  <button
                    type="button"
                    disabled={removingId === question.id}
                    onClick={() => handleRemove(question.id)}
                    className="rounded-md bg-red-100 px-3 py-1.5 text-sm text-red-700 hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-red-900/40 dark:text-red-300 dark:hover:bg-red-900"
                  >
                    {removingId === question.id ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Questions */}

      <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Add Questions
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Select existing questions to add to this quiz.
          </p>
        </div>

        {availableQuestions.length === 0 ? (
          <div className="rounded-lg border border-dashed p-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
            No additional questions available.
          </div>
        ) : (
          <div className="space-y-3">
            {availableQuestions.map((question) => {
              const checked = selectedIds.includes(question.id);

              return (
                <label
                  key={question.id}
                  className={`flex cursor-pointer gap-4 rounded-lg border p-4 transition ${
                    checked
                      ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20"
                      : "dark:border-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleToggleQuestion(question.id)}
                    className="mt-1 h-4 w-4"
                  />

                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {question.question_text}
                    </p>

                    <div className="mt-2 flex gap-2">
                      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                        {question.type}
                      </span>

                      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                        {question.marks} marks
                      </span>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        )}

        {selectedIds.length > 0 && (
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              disabled={saving}
              onClick={handleAddQuestions}
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Adding..."
                : `Add ${selectedIds.length} Question${
                    selectedIds.length !== 1 ? "s" : ""
                  }`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestionEditor;
