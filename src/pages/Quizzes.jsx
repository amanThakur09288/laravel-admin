// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// import QuizTable from "../components/quiz/QuizTable";

// import { setQuizzes, removeQuiz } from "../redux/slices/quizSlice";

// import { getQuizzes, deleteQuiz } from "../api/quizApi";

// const Quizzes = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { quizzes } = useSelector((state) => state.quiz);

//   const [loading, setLoading] = useState(false);
//   const [deletingId, setDeletingId] = useState(null);

//   const loadQuizzes = async () => {
//     try {
//       setLoading(true);

//       const response = await getQuizzes();

//       dispatch(setQuizzes(response.data || []));
//     } catch (error) {
//       console.error("Failed to load quizzes:", error);

//       alert(error.response?.data?.message || "Failed to load quizzes.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadQuizzes();
//   }, []);

//   const handleView = (quiz) => {
//     navigate(`/quizzes/${quiz.id}`);
//   };

//   const handleEdit = (quiz) => {
//     navigate(`/quizzes/${quiz.id}/edit`);
//   };

//   const handleDelete = async (quiz) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${quiz.title}"?`,
//     );

//     if (!confirmed) return;

//     try {
//       setDeletingId(quiz.id);

//       await deleteQuiz(quiz.id);

//       dispatch(removeQuiz(quiz.id));
//     } catch (error) {
//       console.error("Failed to delete quiz:", error);

//       alert(error.response?.data?.message || "Failed to delete quiz.");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   return (
//     <div className="space-y-6 p-6">
//       {/* Header */}
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-2xl font-bold">Quizzes</h1>

//           <p className="mt-1 text-sm text-gray-500">
//             Create and manage quizzes for your batches.
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={() => navigate("/quizzes/create")}
//           className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
//         >
//           + Create Quiz
//         </button>
//       </div>

//       {/* Table */}
//       <div className="rounded-xl border bg-white p-4 shadow-sm">
//         <QuizTable
//           quizzes={quizzes}
//           loading={loading}
//           deletingId={deletingId}
//           onView={handleView}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />
//       </div>
//     </div>
//   );
// };

// export default Quizzes;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getQuizzes, deleteQuiz } from "../api/quizApi";

import {
  setQuizzes,
  removeQuiz,
} from "../redux/slices/quizSlice";

import QuizTable from "../components/quiz/QuizTable";

import PageLoader from "../components/common/PageLoader";
import Button from "../components/common/Button";
import DeleteModal from "../components/common/DeleteModal";

import { getApiErrorMessage } from "../utils/apiError";

export default function Quizzes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quizzes = useSelector(
    (state) => state.quiz.quizzes
  );

  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] =
    useState(false);

  const [selectedQuiz, setSelectedQuiz] =
    useState(null);

  const [deletingId, setDeletingId] =
    useState(null);

  // Fetch quizzes
  const fetchQuizzes = async () => {
    try {
      setLoading(true);

      const response = await getQuizzes();

      const quizData = Array.isArray(response.data)
        ? response.data
        : [];

      dispatch(setQuizzes(quizData));
    } catch (error) {
      console.error(
        "Failed to fetch quizzes:",
        error
      );

      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Navigate to create quiz
  const handleCreate = () => {
    navigate("/quizzes/create");
  };

  // Navigate to view quiz
  const handleView = (quiz) => {
    navigate(`/quizzes/${quiz.id}`);
  };

  // Navigate to edit quiz
  const handleEdit = (quiz) => {
    navigate(`/quizzes/${quiz.id}/edit`);
  };

  // Open delete modal
  const handleDelete = (quiz) => {
    setSelectedQuiz(quiz);
    setDeleteModalOpen(true);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    if (deletingId) {
      return;
    }

    setDeleteModalOpen(false);
    setSelectedQuiz(null);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!selectedQuiz) {
      return;
    }

    try {
      setDeletingId(selectedQuiz.id);

      await deleteQuiz(selectedQuiz.id);

      dispatch(removeQuiz(selectedQuiz.id));

      toast.success("Quiz deleted successfully");

      setDeleteModalOpen(false);
      setSelectedQuiz(null);
    } catch (error) {
      console.error(
        "Failed to delete quiz:",
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
            Quizzes
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your quizzes.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleCreate}
        >
          + Create Quiz
        </Button>
      </div>

      {/* Quiz Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <QuizTable
          quizzes={quizzes}
          loading={false}
          deletingId={deletingId}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        name={selectedQuiz?.title}
        loading={!!deletingId}
      />
    </div>
  );
}