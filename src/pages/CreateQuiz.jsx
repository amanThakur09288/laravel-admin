import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import QuizForm from "../components/quiz/QuizForm";
import { createQuiz } from "../api/quizApi";
import { getBatches } from "../api/batchApi";
import { addQuiz } from "../redux/slices/quizSlice";
import { getApiErrorMessage } from "../utils/apiError";
import { applyServerErrors } from "../utils/applyServerErrors";
const CreateQuiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [batches, setBatches] = useState([]);
  const [loadingBatches, setLoadingBatches] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Load Batches
  |--------------------------------------------------------------------------
  */

  const loadBatches = async () => {
    try {
      setLoadingBatches(true);

      const response = await getBatches();

      setBatches(response.data || []);
    } catch (error) {
      console.error("Failed to load batches:", error);

      toast.error(getApiErrorMessage(error, "Failed to load batches."));
    } finally {
      setLoadingBatches(false);
    }
  };

  useEffect(() => {
    loadBatches();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (data, setError) => {
    try {
      setSubmitting(true);

      const response = await createQuiz(data);

      dispatch(addQuiz(response.data));

      toast.success("Quiz created successfully.");

      navigate("/quizzes");
    } catch (error) {
      console.error("Failed to create quiz:", error);

      applyServerErrors(error, setError);

      toast.error(getApiErrorMessage(error, "Failed to create quiz."));
    } finally {
      setSubmitting(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loadingBatches) {
    return (
      <div className="p-6">
        <div className="rounded-xl border bg-white p-6 text-gray-500 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400">
          Loading batches...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Quiz
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Create a new quiz for your batch.
        </p>
      </div>

      <QuizForm
        batches={batches}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
};

export default CreateQuiz;
