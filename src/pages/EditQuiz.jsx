import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import QuizForm from "../components/quiz/QuizForm";
import PageLoader from "../components/common/PageLoader";
import { getQuiz, updateQuiz } from "../api/quizApi";
import { getBatches } from "../api/batchApi";
import { updateQuizInList } from "../redux/slices/quizSlice";
import { getApiErrorMessage } from "../utils/apiError";
import { applyServerErrors } from "../utils/applyServerErrors";
const EditQuiz = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Load Quiz + Batches
  |--------------------------------------------------------------------------
  */

  const loadData = async () => {
    try {
      setLoading(true);

      const [quizResponse, batchesResponse] = await Promise.all([
        getQuiz(id),
        getBatches(),
      ]);

      setQuiz(quizResponse.data);

      setBatches(batchesResponse.data || []);
    } catch (error) {
      console.error("Failed to load quiz:", error);

      toast.error(getApiErrorMessage(error, "Failed to load quiz."));

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
  | Initial Form Data
  |--------------------------------------------------------------------------
  */

  const initialValues = useMemo(() => {
    if (!quiz) {
      return null;
    }

    return {
      batch_id: quiz.batch_id || "",

      title: quiz.title || "",

      description: quiz.description || "",

      duration_minutes: quiz.duration_minutes || 30,

      total_marks: quiz.total_marks || 10,

      passing_marks: quiz.passing_marks || 5,

      attempts_allowed: quiz.attempts_allowed || 1,

      shuffle_questions: Boolean(quiz.shuffle_questions),

      shuffle_options: Boolean(quiz.shuffle_options),

      auto_submit:
        quiz.auto_submit !== undefined ? Boolean(quiz.auto_submit) : true,

      show_result:
        quiz.show_result !== undefined ? Boolean(quiz.show_result) : true,

      show_correct_answers:
        quiz.show_correct_answers !== undefined
          ? Boolean(quiz.show_correct_answers)
          : true,

      status: quiz.status || "draft",
    };
  }, [quiz]);

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (data, setError) => {
    try {
      setSubmitting(true);

      const response = await updateQuiz(id, data);

      dispatch(updateQuizInList(response.data));

      toast.success("Quiz updated successfully.");

      navigate("/quizzes");
    } catch (error) {
      console.error("Failed to update quiz:", error);

      applyServerErrors(error, setError);

      toast.error(getApiErrorMessage(error, "Failed to update quiz."));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!quiz) {
    return null;
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Quiz
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Update quiz information and settings.
        </p>
      </div>

      <QuizForm
        initialData={initialValues}
        batches={batches}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
};

export default EditQuiz;
