// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import { getQuizResults } from "../api/quizResultApi";

// import { setResults } from "../redux/slices/quizResultSlice";

// export default function QuizResults() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const results = useSelector((state) => state.quizResult.results);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadResults();
//   }, []);

//   const loadResults = async () => {
//     try {
//       setLoading(true);

//       const response = await getQuizResults();

//       dispatch(setResults(response.data || []));
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Unable to load quiz results.",
//       );
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

//   return (
//     <div className="space-y-6">
//       {/* Header */}

//       <div>
//         <h1 className="text-2xl font-bold text-gray-800">Quiz Results</h1>

//         <p className="mt-1 text-sm text-gray-500">
//           View student quiz attempts and results.
//         </p>
//       </div>

//       {/* Loading */}

//       {loading && (
//         <div className="rounded-xl bg-white p-10 text-center shadow">
//           <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#727CB6]" />

//           <p className="mt-3 text-sm text-gray-500">Loading quiz results...</p>
//         </div>
//       )}

//       {/* Empty */}

//       {!loading && results.length === 0 && (
//         <div className="rounded-xl bg-white p-10 text-center shadow">
//           <p className="text-gray-500">No quiz results available.</p>
//         </div>
//       )}

//       {/* Table */}

//       {!loading && results.length > 0 && (
//         <div className="overflow-hidden rounded-xl bg-white shadow">
//           <div className="overflow-x-auto">
//             <table className="min-w-[1500px] w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-gray-500">
//                     Student
//                   </th>

//                   <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-gray-500">
//                     Quiz
//                   </th>

//                   <th className="px-4 py-4 text-center text-xs font-semibold uppercase text-gray-500">
//                     Attempt
//                   </th>

//                   <th className="px-4 py-4 text-center text-xs font-semibold uppercase text-gray-500">
//                     Score
//                   </th>

//                   <th className="px-4 py-4 text-center text-xs font-semibold uppercase text-gray-500">
//                     Total
//                   </th>

//                   <th className="px-4 py-4 text-center text-xs font-semibold uppercase text-gray-500">
//                     Correct
//                   </th>

//                   <th className="px-4 py-4 text-center text-xs font-semibold uppercase text-gray-500">
//                     Wrong
//                   </th>

//                   <th className="px-4 py-4 text-center text-xs font-semibold uppercase text-gray-500">
//                     Unanswered
//                   </th>

//                   <th className="px-4 py-4 text-center text-xs font-semibold uppercase text-gray-500">
//                     Allowed
//                   </th>

//                   <th className="px-4 py-4 text-center text-xs font-semibold uppercase text-gray-500">
//                     Used
//                   </th>

//                   <th className="px-4 py-4 text-center text-xs font-semibold uppercase text-gray-500">
//                     Left
//                   </th>

//                   <th className="px-4 py-4 text-center text-xs font-semibold uppercase text-gray-500">
//                     Result
//                   </th>

//                   <th className="px-4 py-4 text-left text-xs font-semibold uppercase text-gray-500">
//                     Submitted
//                   </th>

//                   <th className="px-4 py-4 text-center text-xs font-semibold uppercase text-gray-500">
//                     Action
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 {results.map((result) => (
//                   <tr key={result.id} className="hover:bg-gray-50">
//                     <td className="px-4 py-4">
//                       <div>
//                         <p className="font-semibold text-gray-800">
//                           {result.student?.name}
//                         </p>

//                         <p className="text-xs text-gray-500">
//                           {result.student?.email}
//                         </p>
//                       </div>
//                     </td>

//                     <td className="px-4 py-4 font-medium text-gray-800">
//                       {result.quiz?.title}
//                     </td>

//                     <td className="px-4 py-4 text-center">
//                       #{result.attempt_number}
//                     </td>

//                     <td className="px-4 py-4 text-center font-bold">
//                       {result.score}
//                     </td>

//                     <td className="px-4 py-4 text-center">
//                       {result.total_marks}
//                     </td>

//                     <td className="px-4 py-4 text-center text-green-600 font-semibold">
//                       {result.correct_answers}
//                     </td>

//                     <td className="px-4 py-4 text-center text-red-600 font-semibold">
//                       {result.wrong_answers}
//                     </td>

//                     <td className="px-4 py-4 text-center text-gray-600">
//                       {result.unanswered}
//                     </td>

//                     <td className="px-4 py-4 text-center">
//                       {result.attempts_allowed}
//                     </td>

//                     <td className="px-4 py-4 text-center font-semibold">
//                       {result.used_attempts}
//                     </td>

//                     <td className="px-4 py-4 text-center font-semibold text-[#727CB6]">
//                       {result.left_attempts}
//                     </td>

//                     <td className="px-4 py-4 text-center">
//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-semibold ${
//                           result.passed
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {result.passed ? "Passed" : "Failed"}
//                       </span>
//                     </td>

//                     <td className="px-4 py-4 text-sm text-gray-500">
//                       {formatDate(result.submitted_at)}
//                     </td>

//                     <td className="px-4 py-4 text-center">
//                       <button
//                         type="button"
//                         onClick={() => navigate(`/quiz-results/${result.id}`)}
//                         className="rounded-lg bg-[#727CB6] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#505B95]"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getQuizResults } from "../api/quizResultApi";
import { setResults } from "../redux/slices/quizResultSlice";
import QuizResultTable from "../components/quiz/QuizResultTable";
import PageLoader from "../components/common/PageLoader";

export default function QuizResults() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const results = useSelector((state) => state.quizResult.results);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      setLoading(true);
      const response = await getQuizResults();
      dispatch(setResults(response.data || []));
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to load quiz results.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleView = (result) => {
    navigate(`/quiz-results/${result.id}`);
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Quiz Results</h1>
        <p className="mt-1 text-sm text-gray-500">
          View student quiz attempts and results.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <QuizResultTable
          results={results}
          loading={false}
          onView={handleView}
        />
      </div>
    </div>
  );
}
