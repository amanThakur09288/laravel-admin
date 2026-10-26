// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import { getProducts } from "../api/productApi";
// import { getCourses } from "../api/courseApi";
// import { getBatches } from "../api/batchApi";

// import { setProducts } from "../redux/slices/productSlice";
// import { setCourses } from "../redux/slices/courseSlice";
// import { setBatches } from "../redux/slices/batchSlice";

// import { formatDate } from "../utils/dateFormat";

// export default function Dashboard() {
//   const dispatch = useDispatch();

//   const products = useSelector((state) => state.products.items);
//   const courses = useSelector((state) => state.courses.items);
//   const batches = useSelector((state) => state.batches.items);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadDashboard = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const [productsResponse, coursesResponse, batchesResponse] =
//           await Promise.all([getProducts(), getCourses(), getBatches()]);

//         const productData = Array.isArray(productsResponse.data)
//           ? productsResponse.data
//           : [];

//         const courseData = Array.isArray(coursesResponse.data)
//           ? coursesResponse.data
//           : [];

//         const batchData = Array.isArray(batchesResponse.data)
//           ? batchesResponse.data
//           : [];

//         dispatch(setProducts(productData));
//         dispatch(setCourses(courseData));
//         dispatch(setBatches(batchData));
//       } catch (error) {
//         console.error("Failed to load dashboard:", error);

//         setError(
//           error?.response?.data?.message || "Unable to load dashboard data.",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadDashboard();
//   }, [dispatch]);

//   const activeBatches = batches?.filter(
//     (batch) =>
//       batch?.status === "Enrolling Open" ||
//       batch?.status === "Filling Fast" ||
//       batch?.status === "Few Seats Left",
//   );

//   const recentBatches = [...batches]
//     ?.sort((a, b) => {
//       return (
//         new Date(b?.created_at || b?.start_date) -
//         new Date(a?.created_at || a?.start_date)
//       );
//     })
//     ?.slice(0, 5);

//   if (loading) {
//     return (
//       <div className="flex min-h-[300px] items-center justify-center">
//         <div className="text-sm text-gray-500 dark:text-gray-400">
//           Loading dashboard...
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//           Dashboard
//         </h1>

//         <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//           Overview of your courses, batches and products.
//         </p>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
//           {error}
//         </div>
//       )}

//       {/* Statistics */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//         {/* Courses */}
//         <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Total Courses
//               </p>

//               <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
//                 {courses?.length}
//               </h2>
//             </div>

//             <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
//               📚
//             </div>
//           </div>
//         </div>

//         {/* Batches */}
//         <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Total Batches
//               </p>

//               <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
//                 {batches.length}
//               </h2>
//             </div>

//             <div className="rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
//               🎓
//             </div>
//           </div>
//         </div>

//         {/* Active Batches */}
//         <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Active Batches
//               </p>

//               <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
//                 {activeBatches?.length}
//               </h2>
//             </div>

//             <div className="rounded-lg bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
//               ✓
//             </div>
//           </div>
//         </div>

//         {/* Products */}
//         <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
//           <div className="flex items-start justify-between">
//             <div>
//               <p className="text-sm text-gray-500 dark:text-gray-400">
//                 Total Products
//               </p>

//               <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
//                 {products?.length}
//               </h2>
//             </div>

//             <div className="rounded-lg bg-orange-100 p-3 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
//               📦
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Batches */}
//       <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
//         <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-800">
//           <h2 className="font-semibold text-gray-900 dark:text-white">
//             Recent Batches
//           </h2>

//           <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//             Latest batches added to the system.
//           </p>
//         </div>

//         {recentBatches?.length === 0 ? (
//           <div className="p-5 text-sm text-gray-500 dark:text-gray-400">
//             No batches found.
//           </div>
//         ) : (
//           <div className="divide-y divide-gray-200 dark:divide-gray-800">
//             {recentBatches?.map((batch) => (
//               <div
//                 key={batch.id}
//                 className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
//               >
//                 {/* Batch Information */}
//                 <div>
//                   <h3 className="font-medium text-gray-900 dark:text-white">
//                     {batch?.batch_name}
//                   </h3>

//                   <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                     {batch?.course?.course_name || "Course not available"}
//                   </p>
//                 </div>

//                 {/* Batch Details */}
//                 <div className="flex items-center gap-4">
//                   <div className="text-right">
//                     <p className="text-xs text-gray-500 dark:text-gray-400">
//                       Start Date
//                     </p>

//                     <p className="text-sm font-medium text-gray-900 dark:text-white">
//                       {formatDate(batch?.start_date)}
//                     </p>
//                   </div>

//                   {/* Status */}
//                   <span
//                     className={`rounded-full px-3 py-1 text-xs font-medium ${
//                       batch?.status === "Enrolling Open"
//                         ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
//                         : batch?.status === "Filling Fast"
//                           ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
//                           : batch?.status === "Few Seats Left"
//                             ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
//                             : batch?.status === "Sold Out"
//                               ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
//                               : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
//                     }`}
//                   >
//                     {batch?.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getProducts } from "../api/productApi";
import { getCourses } from "../api/courseApi";
import { getBatches } from "../api/batchApi";
import { getQuizzes } from "../api/quizApi";
import { getQuizResults } from "../api/quizResultApi";

import { setProducts } from "../redux/slices/productSlice";
import { setCourses } from "../redux/slices/courseSlice";
import { setBatches } from "../redux/slices/batchSlice";

import { formatDate } from "../utils/dateFormat";

export default function Dashboard() {
  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.products.items,
  );

  const courses = useSelector(
    (state) => state.courses.items,
  );

  const batches = useSelector(
    (state) => state.batches.items,
  );

  const [quizzes, setQuizzes] = useState([]);
  const [quizResults, setQuizResults] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          productsResponse,
          coursesResponse,
          batchesResponse,
          quizzesResponse,
          quizResultsResponse,
        ] = await Promise.all([
          getProducts(),
          getCourses(),
          getBatches(),
          getQuizzes(),
          getQuizResults(),
        ]);

        const productData = Array.isArray(
          productsResponse.data,
        )
          ? productsResponse.data
          : [];

        const courseData = Array.isArray(
          coursesResponse.data,
        )
          ? coursesResponse.data
          : [];

        const batchData = Array.isArray(
          batchesResponse.data,
        )
          ? batchesResponse.data
          : [];

        const quizData = Array.isArray(
          quizzesResponse.data,
        )
          ? quizzesResponse.data
          : [];

        const quizResultData = Array.isArray(
          quizResultsResponse.data,
        )
          ? quizResultsResponse.data
          : [];

        dispatch(setProducts(productData));
        dispatch(setCourses(courseData));
        dispatch(setBatches(batchData));

        setQuizzes(quizData);
        setQuizResults(quizResultData);
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error,
        );

        setError(
          error?.response?.data?.message ||
            "Unable to load dashboard data.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [dispatch]);

  /*
  |--------------------------------------------------------------------------
  | Active Batches
  |--------------------------------------------------------------------------
  */

  const activeBatches = batches?.filter(
    (batch) =>
      batch?.status === "Enrolling Open" ||
      batch?.status === "Filling Fast" ||
      batch?.status === "Few Seats Left",
  );

  /*
  |--------------------------------------------------------------------------
  | Recent Batches
  |--------------------------------------------------------------------------
  */

  const recentBatches = [...(batches || [])]
    .sort((a, b) => {
      return (
        new Date(
          b?.created_at || b?.start_date,
        ) -
        new Date(
          a?.created_at || a?.start_date,
        )
      );
    })
    .slice(0, 5);

  /*
  |--------------------------------------------------------------------------
  | Recent Quiz Results
  |--------------------------------------------------------------------------
  */

  const recentQuizResults = [
    ...(quizResults || []),
  ]
    .sort((a, b) => {
      return (
        new Date(b?.submitted_at || 0) -
        new Date(a?.submitted_at || 0)
      );
    })
    .slice(0, 5);

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Loading dashboard...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Overview of your courses, batches, products and quizzes.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Courses */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Courses
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {courses?.length || 0}
              </h2>
            </div>

            <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              📚
            </div>
          </div>
        </div>

        {/* Batches */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Batches
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {batches?.length || 0}
              </h2>
            </div>

            <div className="rounded-lg bg-purple-100 p-3 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              🎓
            </div>
          </div>
        </div>

        {/* Active Batches */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Active Batches
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {activeBatches?.length || 0}
              </h2>
            </div>

            <div className="rounded-lg bg-green-100 p-3 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              ✓
            </div>
          </div>
        </div>

        {/* Products */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Products
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {products?.length || 0}
              </h2>
            </div>

            <div className="rounded-lg bg-orange-100 p-3 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              📦
            </div>
          </div>
        </div>

        {/* Quizzes */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total Quizzes
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {quizzes?.length || 0}
              </h2>
            </div>

            <div className="rounded-lg bg-indigo-100 p-3 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              📝
            </div>
          </div>
        </div>

        {/* Quiz Results */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Quiz Results
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {quizResults?.length || 0}
              </h2>
            </div>

            <div className="rounded-lg bg-pink-100 p-3 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
              📋
            </div>
          </div>
        </div>
      </div>

      {/* Recent Batches */}

      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Recent Batches
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Latest batches added to the system.
          </p>
        </div>

        {recentBatches?.length === 0 ? (
          <div className="p-5 text-sm text-gray-500 dark:text-gray-400">
            No batches found.
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {recentBatches.map((batch) => (
              <div
                key={batch.id}
                className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Batch Information */}

                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {batch?.batch_name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {batch?.course?.course_name ||
                      "Course not available"}
                  </p>
                </div>

                {/* Batch Details */}

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Start Date
                    </p>

                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatDate(
                        batch?.start_date,
                      )}
                    </p>
                  </div>

                  {/* Status */}

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      batch?.status ===
                      "Enrolling Open"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : batch?.status ===
                            "Filling Fast"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : batch?.status ===
                              "Few Seats Left"
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                            : batch?.status ===
                                "Sold Out"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {batch?.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Quiz Results */}

      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Recent Quiz Results
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Latest student quiz attempts and results.
          </p>
        </div>

        {recentQuizResults.length === 0 ? (
          <div className="p-5 text-sm text-gray-500 dark:text-gray-400">
            No quiz results found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    Student
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    Quiz
                  </th>

                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    Attempt
                  </th>

                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    Score
                  </th>

                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    Result
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                    Submitted
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {recentQuizResults.map(
                  (result) => (
                    <tr
                      key={result.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {result.student?.name ||
                            "-"}
                        </p>

                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {result.student?.email ||
                            "-"}
                        </p>
                      </td>

                      <td className="px-5 py-4 font-medium text-gray-800 dark:text-gray-200">
                        {result.quiz?.title ||
                          "-"}
                      </td>

                      <td className="px-5 py-4 text-center text-gray-700 dark:text-gray-300">
                        #{result.attempt_number}
                      </td>

                      <td className="px-5 py-4 text-center font-semibold text-gray-900 dark:text-white">
                        {result.score} /{" "}
                        {result.total_marks}
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            result.passed
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {result.passed
                            ? "Passed"
                            : "Failed"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {result.submitted_at
                          ? new Date(
                              result.submitted_at,
                            ).toLocaleString(
                              "en-IN",
                              {
                                dateStyle:
                                  "medium",
                                timeStyle:
                                  "short",
                              },
                            )
                          : "-"}
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}