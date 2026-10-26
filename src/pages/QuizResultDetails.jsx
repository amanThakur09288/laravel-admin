// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import toast from "react-hot-toast";
// import { getQuizResult } from "../api/quizResultApi";

// export default function QuizResultDetails() {
//   const { attemptId } = useParams();
//   const navigate = useNavigate();

//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadResult();
//   }, [attemptId]);

//   const loadResult = async () => {
//     try {
//       setLoading(true);

//       const response = await getQuizResult(attemptId);

//       setResult(response.data);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Unable to load result.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (date) => {
//     if (!date) {
//       return "-";
//     }

//     return new Date(date).toLocaleString("en-IN", {
//       dateStyle: "medium",
//       timeStyle: "short",
//     });
//   };

//   if (loading) {
//     return (
//       <div className="py-12 text-center">
//         <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#727CB6]" />

//         <p className="mt-3 text-sm text-gray-500">Loading result...</p>
//       </div>
//     );
//   }

//   if (!result) {
//     return null;
//   }

//   return (
//     <div className="space-y-6">
//       {/* Back */}

//       <button
//         type="button"
//         onClick={() => navigate("/quiz-results")}
//         className="text-sm font-semibold text-[#727CB6] hover:underline"
//       >
//         ← Back to Quiz Results
//       </button>

//       {/* Header */}

//       <div>
//         <h1 className="text-2xl font-bold text-gray-800">Quiz Result</h1>

//         <p className="mt-1 text-sm text-gray-500">
//           Detailed result of quiz attempt.
//         </p>
//       </div>

//       {/* Student / Quiz */}

//       <div className="grid gap-5 md:grid-cols-2">
//         <div className="rounded-xl bg-white p-6 shadow">
//           <p className="text-xs font-semibold uppercase text-gray-400">
//             Student
//           </p>

//           <h2 className="mt-2 text-xl font-bold text-gray-800">
//             {result.student?.name}
//           </h2>

//           <p className="mt-1 text-sm text-gray-500">{result.student?.email}</p>
//         </div>

//         <div className="rounded-xl bg-white p-6 shadow">
//           <p className="text-xs font-semibold uppercase text-gray-400">Quiz</p>

//           <h2 className="mt-2 text-xl font-bold text-gray-800">
//             {result.quiz?.title}
//           </h2>

//           <p className="mt-1 text-sm text-gray-500">
//             Attempt #{result.attempt_number}
//           </p>
//         </div>
//       </div>

//       {/* Summary */}

//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <div className="rounded-xl bg-white p-5 shadow">
//           <p className="text-sm text-gray-500">Score</p>

//           <p className="mt-2 text-2xl font-bold text-[#727CB6]">
//             {result.score} / {result.total_marks}
//           </p>
//         </div>

//         <div className="rounded-xl bg-white p-5 shadow">
//           <p className="text-sm text-gray-500">Correct</p>

//           <p className="mt-2 text-2xl font-bold text-green-600">
//             {result.correct_answers}
//           </p>
//         </div>

//         <div className="rounded-xl bg-white p-5 shadow">
//           <p className="text-sm text-gray-500">Wrong</p>

//           <p className="mt-2 text-2xl font-bold text-red-600">
//             {result.wrong_answers}
//           </p>
//         </div>

//         <div className="rounded-xl bg-white p-5 shadow">
//           <p className="text-sm text-gray-500">Unanswered</p>

//           <p className="mt-2 text-2xl font-bold text-gray-700">
//             {result.unanswered}
//           </p>
//         </div>
//       </div>

//       {/* Attempt Information */}

//       <div className="rounded-xl bg-white p-6 shadow">
//         <h2 className="text-lg font-bold text-gray-800">Attempt Information</h2>

//         <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
//           <div>
//             <p className="text-xs text-gray-400">Attempt</p>

//             <p className="mt-1 font-semibold">#{result.attempt_number}</p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-400">Attempts Allowed</p>

//             <p className="mt-1 font-semibold">{result.attempts_allowed}</p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-400">Attempts Used</p>

//             <p className="mt-1 font-semibold">{result.used_attempts}</p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-400">Attempts Left</p>

//             <p className="mt-1 font-semibold text-[#727CB6]">
//               {result.left_attempts}
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-400">Passing Marks</p>

//             <p className="mt-1 font-semibold">{result.passing_marks}</p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-400">Result</p>

//             <p
//               className={`mt-1 font-bold ${
//                 result.passed ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {result.passed ? "Passed" : "Failed"}
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-400">Started</p>

//             <p className="mt-1 text-sm font-medium">
//               {formatDate(result.started_at)}
//             </p>
//           </div>

//           <div>
//             <p className="text-xs text-gray-400">Submitted</p>

//             <p className="mt-1 text-sm font-medium">
//               {formatDate(result.submitted_at)}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Questions */}

//       <div>
//         <h2 className="mb-4 text-xl font-bold text-gray-800">
//           Question-wise Result
//         </h2>

//         <div className="space-y-5">
//           {result.questions?.map((question, index) => (
//             <div key={question.id} className="rounded-xl bg-white p-6 shadow">
//               <div className="flex items-start justify-between gap-4">
//                 <div>
//                   <p className="text-sm font-semibold text-[#727CB6]">
//                     Question {index + 1}
//                   </p>

//                   <h3 className="mt-2 text-lg font-semibold text-gray-800">
//                     {question.question_text}
//                   </h3>
//                 </div>

//                 <span
//                   className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
//                     question.is_correct
//                       ? "bg-green-100 text-green-700"
//                       : "bg-red-100 text-red-700"
//                   }`}
//                 >
//                   {question.is_correct ? "Correct" : "Wrong"}
//                 </span>
//               </div>

//               <div className="mt-5 grid gap-5 md:grid-cols-2">
//                 {/* Student Answer */}

//                 <div>
//                   <p className="text-xs font-semibold uppercase text-gray-400">
//                     Student Answer
//                   </p>

//                   <div className="mt-2 space-y-2">
//                     {question.selected_options?.length > 0 ? (
//                       question.selected_options.map((option) => (
//                         <div
//                           key={option.id}
//                           className="rounded-lg bg-gray-50 p-3 text-sm text-gray-700"
//                         >
//                           {option.option_text}
//                         </div>
//                       ))
//                     ) : (
//                       <div className="rounded-lg bg-gray-50 p-3 text-sm text-gray-400">
//                         Not answered
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Correct Answer */}

//                 <div>
//                   <p className="text-xs font-semibold uppercase text-gray-400">
//                     Correct Answer
//                   </p>

//                   <div className="mt-2 space-y-2">
//                     {question.correct_options?.map((option) => (
//                       <div
//                         key={option.id}
//                         className="rounded-lg bg-green-50 p-3 text-sm text-green-700"
//                       >
//                         {option.option_text}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Marks */}

//               <div className="mt-5 border-t pt-4">
//                 <p className="text-sm text-gray-500">Marks</p>

//                 <p className="mt-1 text-lg font-bold">
//                   {question.marks_awarded} / {question.marks}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

import { getQuizResult } from "../api/quizResultApi";

export default function QuizResultDetails() {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.mode);

  const isDark = theme === "dark";

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResult();
  }, [attemptId]);

  const loadResult = async () => {
    try {
      setLoading(true);

      const response = await getQuizResult(attemptId);

      setResult(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load result.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Theme Classes
  |--------------------------------------------------------------------------
  */

  const pageClass = isDark ? "text-gray-100" : "text-gray-800";

  const cardClass = isDark
    ? "rounded-xl border border-gray-700 bg-gray-800 shadow"
    : "rounded-xl border border-gray-100 bg-white shadow";

  const headingClass = isDark ? "text-gray-100" : "text-gray-800";

  const mutedClass = isDark ? "text-gray-400" : "text-gray-500";

  const labelClass = isDark ? "text-gray-500" : "text-gray-400";

  const answerClass = isDark
    ? "bg-gray-700 text-gray-200"
    : "bg-gray-50 text-gray-700";

  const borderClass = isDark ? "border-gray-700" : "border-gray-200";

  if (loading) {
    return (
      <div className={`py-12 text-center ${pageClass}`}>
        <div
          className={`mx-auto h-8 w-8 animate-spin rounded-full border-4 ${
            isDark
              ? "border-gray-700 border-t-[#727CB6]"
              : "border-gray-200 border-t-[#727CB6]"
          }`}
        />

        <p className={`mt-3 text-sm ${mutedClass}`}>Loading result...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className={`rounded-xl p-10 text-center ${cardClass}`}>
        <p className={mutedClass}>Result not found.</p>

        <button
          type="button"
          onClick={() => navigate("/quiz-results")}
          className="mt-4 rounded-lg bg-[#727CB6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#505B95]"
        >
          Back to Results
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${pageClass}`}>
      {/* Back */}

      <button
        type="button"
        onClick={() => navigate("/quiz-results")}
        className={
          isDark
            ? "text-sm font-semibold text-[#9da5d3] hover:text-white hover:underline"
            : "text-sm font-semibold text-[#727CB6] hover:underline"
        }
      >
        ← Back to Quiz Results
      </button>

      {/* Header */}

      <div>
        <h1 className={`text-2xl font-bold ${headingClass}`}>Quiz Result</h1>

        <p className={`mt-1 text-sm ${mutedClass}`}>
          Detailed result of quiz attempt.
        </p>
      </div>

      {/* Student / Quiz */}

      <div className="grid gap-5 md:grid-cols-2">
        {/* Student */}

        <div className={cardClass}>
          <div className="p-6">
            <p className={`text-xs font-semibold uppercase ${labelClass}`}>
              Student
            </p>

            <h2 className={`mt-2 text-xl font-bold ${headingClass}`}>
              {result.student?.name || "-"}
            </h2>

            <p className={`mt-1 text-sm ${mutedClass}`}>
              {result.student?.email || "-"}
            </p>
          </div>
        </div>

        {/* Quiz */}

        <div className={cardClass}>
          <div className="p-6">
            <p className={`text-xs font-semibold uppercase ${labelClass}`}>
              Quiz
            </p>

            <h2 className={`mt-2 text-xl font-bold ${headingClass}`}>
              {result.quiz?.title || "-"}
            </h2>

            <p className={`mt-1 text-sm ${mutedClass}`}>
              Attempt #{result.attempt_number}
            </p>
          </div>
        </div>
      </div>

      {/* Summary */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Score */}

        <div className={cardClass}>
          <div className="p-5">
            <p className={`text-sm ${mutedClass}`}>Score</p>

            <p className="mt-2 text-2xl font-bold text-[#727CB6]">
              {result.score} / {result.total_marks}
            </p>
          </div>
        </div>

        {/* Correct */}

        <div className={cardClass}>
          <div className="p-5">
            <p className={`text-sm ${mutedClass}`}>Correct</p>

            <p
              className={
                isDark
                  ? "mt-2 text-2xl font-bold text-green-400"
                  : "mt-2 text-2xl font-bold text-green-600"
              }
            >
              {result.correct_answers}
            </p>
          </div>
        </div>

        {/* Wrong */}

        <div className={cardClass}>
          <div className="p-5">
            <p className={`text-sm ${mutedClass}`}>Wrong</p>

            <p
              className={
                isDark
                  ? "mt-2 text-2xl font-bold text-red-400"
                  : "mt-2 text-2xl font-bold text-red-600"
              }
            >
              {result.wrong_answers}
            </p>
          </div>
        </div>

        {/* Unanswered */}

        <div className={cardClass}>
          <div className="p-5">
            <p className={`text-sm ${mutedClass}`}>Unanswered</p>

            <p
              className={
                isDark
                  ? "mt-2 text-2xl font-bold text-gray-200"
                  : "mt-2 text-2xl font-bold text-gray-700"
              }
            >
              {result.unanswered}
            </p>
          </div>
        </div>
      </div>

      {/* Attempt Information */}

      <div className={cardClass}>
        <div className="p-6">
          <h2 className={`text-lg font-bold ${headingClass}`}>
            Attempt Information
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Attempt */}

            <div>
              <p className={`text-xs ${labelClass}`}>Attempt</p>

              <p className={`mt-1 font-semibold ${headingClass}`}>
                #{result.attempt_number}
              </p>
            </div>

            {/* Allowed */}

            <div>
              <p className={`text-xs ${labelClass}`}>Attempts Allowed</p>

              <p className={`mt-1 font-semibold ${headingClass}`}>
                {result.attempts_allowed}
              </p>
            </div>

            {/* Used */}

            <div>
              <p className={`text-xs ${labelClass}`}>Attempts Used</p>

              <p className={`mt-1 font-semibold ${headingClass}`}>
                {result.used_attempts}
              </p>
            </div>

            {/* Left */}

            <div>
              <p className={`text-xs ${labelClass}`}>Attempts Left</p>

              <p className="mt-1 font-semibold text-[#727CB6]">
                {result.left_attempts}
              </p>
            </div>

            {/* Passing Marks */}

            <div>
              <p className={`text-xs ${labelClass}`}>Passing Marks</p>

              <p className={`mt-1 font-semibold ${headingClass}`}>
                {result.passing_marks}
              </p>
            </div>

            {/* Result */}

            <div>
              <p className={`text-xs ${labelClass}`}>Result</p>

              <p
                className={`mt-1 font-bold ${
                  result.passed
                    ? isDark
                      ? "text-green-400"
                      : "text-green-600"
                    : isDark
                      ? "text-red-400"
                      : "text-red-600"
                }`}
              >
                {result.passed ? "Passed" : "Failed"}
              </p>
            </div>

            {/* Started */}

            <div>
              <p className={`text-xs ${labelClass}`}>Started</p>

              <p className={`mt-1 text-sm font-medium ${headingClass}`}>
                {formatDate(result.started_at)}
              </p>
            </div>

            {/* Submitted */}

            <div>
              <p className={`text-xs ${labelClass}`}>Submitted</p>

              <p className={`mt-1 text-sm font-medium ${headingClass}`}>
                {formatDate(result.submitted_at)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Questions */}

      <div>
        <h2 className={`mb-4 text-xl font-bold ${headingClass}`}>
          Question-wise Result
        </h2>

        <div className="space-y-5">
          {result.questions?.map((question, index) => (
            <div key={question.id} className={cardClass}>
              <div className="p-6">
                {/* Question Header */}

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[#727CB6]">
                      Question {index + 1}
                    </p>

                    <h3
                      className={`mt-2 text-lg font-semibold ${headingClass}`}
                    >
                      {question.question_text}
                    </h3>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      question.is_correct
                        ? isDark
                          ? "bg-green-900/40 text-green-400"
                          : "bg-green-100 text-green-700"
                        : isDark
                          ? "bg-red-900/40 text-red-400"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {question.is_correct ? "Correct" : "Wrong"}
                  </span>
                </div>

                {/* Answers */}

                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  {/* Student Answer */}

                  <div>
                    <p
                      className={`text-xs font-semibold uppercase ${labelClass}`}
                    >
                      Student Answer
                    </p>

                    <div className="mt-2 space-y-2">
                      {question.selected_options?.length > 0 ? (
                        question.selected_options.map((option) => (
                          <div
                            key={option.id}
                            className={`rounded-lg p-3 text-sm ${answerClass}`}
                          >
                            {option.option_text}
                          </div>
                        ))
                      ) : (
                        <div
                          className={`rounded-lg p-3 text-sm ${
                            isDark
                              ? "bg-gray-700 text-gray-500"
                              : "bg-gray-50 text-gray-400"
                          }`}
                        >
                          Not answered
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Correct Answer */}

                  <div>
                    <p
                      className={`text-xs font-semibold uppercase ${labelClass}`}
                    >
                      Correct Answer
                    </p>

                    <div className="mt-2 space-y-2">
                      {question.correct_options?.length > 0 ? (
                        question.correct_options.map((option) => (
                          <div
                            key={option.id}
                            className={
                              isDark
                                ? "rounded-lg bg-green-900/30 p-3 text-sm text-green-400"
                                : "rounded-lg bg-green-50 p-3 text-sm text-green-700"
                            }
                          >
                            {option.option_text}
                          </div>
                        ))
                      ) : (
                        <div
                          className={`rounded-lg p-3 text-sm ${answerClass}`}
                        >
                          -
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Marks */}

                <div className={`mt-5 border-t pt-4 ${borderClass}`}>
                  <p className={`text-sm ${mutedClass}`}>Marks</p>

                  <p className={`mt-1 text-lg font-bold ${headingClass}`}>
                    {question.marks_awarded} / {question.marks}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
