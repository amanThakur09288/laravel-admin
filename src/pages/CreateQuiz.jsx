// import { useEffect, useState } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import { quizSchema, defaultQuizValues } from "../utils/quizSchema";
// import QuizForm from "../components/quiz/QuizForm";

// import { createQuiz } from "../api/quizApi";
// import { getBatches } from "../api/batchApi";
// import { getCourses } from "../api/courseApi";

// import { addQuiz } from "../redux/slices/quizSlice";

// export default function CreateQuiz() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const placement = location.state?.placement || null;

//   const [batches, setBatches] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   const methods = useForm({
//     resolver: zodResolver(quizSchema),
//     defaultValues: {
//       ...defaultQuizValues,
//       ...(placement || {}),
//     },
//     mode: "onBlur",
//   });

//   useEffect(() => {
//     let cancelled = false;

//     const loadData = async () => {
//       setLoading(true);
//       setError("");

//       // Courses are required; batches are optional.
//       const [courseResult, batchResult] = await Promise.allSettled([
//         getCourses(),
//         getBatches(),
//       ]);

//       if (cancelled) return;

//       if (courseResult.status === "rejected") {
//         setError(
//           courseResult.reason?.response?.data?.message ||
//             "Failed to load courses.",
//         );
//         setLoading(false);
//         return;
//       }

//       const courseData = courseResult.value?.data;

//       setCourses(Array.isArray(courseData) ? courseData : []);

//       if (batchResult.status === "fulfilled") {
//         const batchData = batchResult.value?.data;
//         setBatches(Array.isArray(batchData) ? batchData : []);
//       } else {
//         setBatches([]);
//       }

//       setLoading(false);
//     };

//     loadData();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   const onSubmit = async (data) => {
//     try {
//       setSubmitting(true);
//       setError("");
//       const response = await createQuiz(data);
//       dispatch(addQuiz(response.data));
//       navigate(location.state?.returnTo || "/quizzes");
//     } catch (submitError) {
//       setError(submitError.response?.data?.message || "Failed to create quiz.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="py-10 text-center text-gray-500">Loading courses...</div>
//     );
//   }

//   const quizType = placement?.course_lesson_id
//     ? "Lesson"
//     : placement?.course_section_id
//       ? "Module"
//       : placement?.course_id
//         ? "Course"
//         : "";

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
//           {quizType ? `Create ${quizType} Quiz` : "Create Quiz"}
//         </h1>

//         <p className="text-sm text-gray-500">
//           {placement
//             ? `This quiz will be attached to the selected ${quizType.toLowerCase()}. A batch is optional.`
//             : "Create a quiz and optionally attach it to a course, module or lesson."}
//         </p>
//       </div>

//       {error && (
//         <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-300">
//           {error}
//         </div>
//       )}

//       <FormProvider {...methods}>
//         <QuizForm
//           batches={batches}
//           courses={courses}
//           initialData={
//             placement
//               ? {
//                   ...defaultQuizValues,
//                   ...placement,
//                 }
//               : null
//           }
//           onSubmit={onSubmit}
//           saving={submitting}
//           submitLabel="Create Quiz"
//         />
//       </FormProvider>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import { quizSchema, defaultQuizValues } from "../utils/quizSchema";
import QuizForm from "../components/quiz/QuizForm";

import { createQuiz } from "../api/quizApi";
import { getBatches } from "../api/batchApi";
import { getCourses } from "../api/courseApi";

import { addQuiz } from "../redux/slices/quizSlice";
import { getApiErrorMessage } from "../utils/apiError";

export default function CreateQuiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const placement = location.state?.placement || null;

  const [batches, setBatches] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const methods = useForm({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      ...defaultQuizValues,
      ...(placement || {}),
    },
    mode: "onBlur",
  });

  useEffect(() => {
    let cancelled = false;

    const loadData = async () => {
      setLoading(true);
      setError("");

      // Courses are required; batches are optional.
      const [courseResult, batchResult] = await Promise.allSettled([
        getCourses(),
        getBatches(),
      ]);

      if (cancelled) return;

      if (courseResult.status === "rejected") {
        const message = getApiErrorMessage(courseResult.reason);

        setError(message);
        toast.error(message);

        setLoading(false);
        return;
      }

      const courseData = courseResult.value?.data;

      setCourses(Array.isArray(courseData) ? courseData : []);

      if (batchResult.status === "fulfilled") {
        const batchData = batchResult.value?.data;
        setBatches(Array.isArray(batchData) ? batchData : []);
      } else {
        setBatches([]);
      }

      setLoading(false);
    };

    loadData();

    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError("");

      const response = await createQuiz(data);

      // Update Redux store.
      dispatch(addQuiz(response.data));

      // Show success notification.
      toast.success(response.message || "Quiz created successfully.");

      // Navigate after successful creation.
      navigate(location.state?.returnTo || "/quizzes");
    } catch (submitError) {
      console.error("Failed to create quiz:", submitError);

      const message = getApiErrorMessage(submitError);

      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">Loading courses...</div>
    );
  }

  const quizType = placement?.course_lesson_id
    ? "Lesson"
    : placement?.course_section_id
      ? "Module"
      : placement?.course_id
        ? "Course"
        : "";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {quizType ? `Create ${quizType} Quiz` : "Create Quiz"}
        </h1>

        <p className="text-sm text-gray-500">
          {placement
            ? `This quiz will be attached to the selected ${quizType.toLowerCase()}. A batch is optional.`
            : "Create a quiz and optionally attach it to a course, module or lesson."}
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-300">
          {error}
        </div>
      )}

      <FormProvider {...methods}>
        <QuizForm
          batches={batches}
          courses={courses}
          initialData={
            placement
              ? {
                  ...defaultQuizValues,
                  ...placement,
                }
              : null
          }
          onSubmit={onSubmit}
          saving={submitting}
          submitLabel="Create Quiz"
        />
      </FormProvider>
    </div>
  );
}
