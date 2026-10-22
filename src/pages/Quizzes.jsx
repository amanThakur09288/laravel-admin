// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";

// import QuizTable from "../components/quiz/QuizTable";
// import {
//   getQuizzes,
//   deleteQuiz,
// } from "../api/quizApi";

// import {
//   setQuizzes,
//   setLoading,
//   setError,
//   removeQuiz,
// } from "../redux/slices/quizSlice";

// export default function Quizzes() {
//   const dispatch = useDispatch();

//   const {
//     quizzes,
//     loading,
//   } = useSelector((state) => state.quiz);

//   const [error, setErrorMessage] = useState("");

//   useEffect(() => {
//     loadQuizzes();
//   }, []);

//   const loadQuizzes = async () => {
//     try {
//       dispatch(setLoading(true));
//       setErrorMessage("");

//       const response = await getQuizzes();

//       dispatch(setQuizzes(response.data || []));
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         "Failed to load quizzes.";

//       setErrorMessage(message);
//       dispatch(setError(message));
//     } finally {
//       dispatch(setLoading(false));
//     }
//   };

//   const handleDelete = async (quiz) => {
//     const confirmed = window.confirm(
//       `Delete "${quiz.title}"?`
//     );

//     if (!confirmed) return;

//     try {
//       await deleteQuiz(quiz.id);

//       dispatch(removeQuiz(quiz.id));
//     } catch (error) {
//       const message =
//         error.response?.data?.message ||
//         "Failed to delete quiz.";

//       setErrorMessage(message);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//             Quizzes
//           </h1>

//           <p className="text-sm text-gray-500">
//             Manage quizzes and questions.
//           </p>
//         </div>

//         <Link
//           to="/quizzes/create"
//           className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
//         >
//           + Create Quiz
//         </Link>
//       </div>

//       {error && (
//         <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
//           {error}
//         </div>
//       )}

//       {loading ? (
//         <div className="py-10 text-center text-gray-500">
//           Loading quizzes...
//         </div>
//       ) : (
//         <QuizTable
//           quizzes={quizzes}
//           onDelete={handleDelete}
//         />
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import QuizTable from "../components/quiz/QuizTable";
import DeleteModal from "../components/common/DeleteModal";

import { getQuizzes, deleteQuiz } from "../api/quizApi";

import {
  setQuizzes,
  setLoading,
  setError,
  removeQuiz,
} from "../redux/slices/quizSlice";

export default function Quizzes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quizzes, loading } = useSelector((state) => state.quiz);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setErrorMessage] = useState("");

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      dispatch(setLoading(true));
      setErrorMessage("");

      const response = await getQuizzes();
      const quizList = response.data?.data || response.data || [];

      dispatch(setQuizzes(quizList));
    } catch (err) {
      const message = err.response?.data?.message || "Failed to load quizzes.";

      setErrorMessage(message);
      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Row navigation handlers
  const handleView = (quiz) => {
    navigate(`/quizzes/${quiz.id}`);
  };

  const handleEdit = (quiz) => {
    navigate(`/quizzes/${quiz.id}/edit`);
  };

  // Open confirmation modal
  const handleDeleteClick = (quiz) => {
    setSelectedQuiz(quiz);
    setDeleteModalOpen(true);
  };

  // Close confirmation modal
  const handleCloseDeleteModal = () => {
    if (deletingId) return;
    setDeleteModalOpen(false);
    setSelectedQuiz(null);
  };

  // Confirm delete API call
  const confirmDelete = async () => {
    if (!selectedQuiz) return;

    try {
      setDeletingId(selectedQuiz.id);

      await deleteQuiz(selectedQuiz.id);

      dispatch(removeQuiz(selectedQuiz.id));
      toast.success("Quiz deleted successfully.");

      setDeleteModalOpen(false);
      setSelectedQuiz(null);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete quiz.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Quizzes
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage quizzes and questions.
          </p>
        </div>

        <Link
          to="/quizzes/create"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Create Quiz
        </Link>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Quizzes DataTable Wrapper */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <QuizTable
          quizzes={quizzes || []}
          loading={loading}
          deletingId={deletingId}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      </div>

      {/* Reusable Delete Modal */}
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
