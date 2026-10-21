import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getQuestions,
  deleteQuestion,
} from "../api/questionApi";

import {
  setQuestions,
  removeQuestion,
} from "../redux/slices/questionSlice";

import QuestionTable from "../components/quiz/QuestionTable";

import PageLoader from "../components/common/PageLoader";
import Button from "../components/common/Button";
import DeleteModal from "../components/common/DeleteModal";

import { getApiErrorMessage } from "../utils/apiError";

export default function Questions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questions = useSelector(
    (state) => state.question.questions
  );

  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  const [selectedQuestion, setSelectedQuestion] =
    useState(null);

  const [deletingId, setDeletingId] =
    useState(null);

  // Fetch questions
  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const response = await getQuestions();

      const questionData = Array.isArray(response.data)
        ? response.data
        : [];

      dispatch(setQuestions(questionData));
    } catch (error) {
      console.error(
        "Failed to fetch questions:",
        error
      );

      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // Navigate to create question
  const handleCreate = () => {
    navigate("/questions/create");
  };

  // Open delete modal
  const handleDelete = (question) => {
    setSelectedQuestion(question);
    setDeleteModalOpen(true);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    if (deletingId) {
      return;
    }

    setDeleteModalOpen(false);
    setSelectedQuestion(null);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!selectedQuestion) {
      return;
    }

    try {
      setDeletingId(selectedQuestion.id);

      await deleteQuestion(selectedQuestion.id);

      dispatch(
        removeQuestion(selectedQuestion.id)
      );

      toast.success(
        "Question deleted successfully"
      );

      setDeleteModalOpen(false);
      setSelectedQuestion(null);
    } catch (error) {
      console.error(
        "Failed to delete question:",
        error
      );

      toast.error(getApiErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  // Loading
  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Questions
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your quiz questions.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleCreate}
        >
          + Create Question
        </Button>
      </div>

      {/* Questions Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <QuestionTable
          questions={questions}
          loading={false}
          deletingId={deletingId}
          onDelete={handleDelete}
        />
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        name={
          selectedQuestion?.question_text
        }
        loading={!!deletingId}
      />
    </div>
  );
}