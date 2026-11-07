// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import { getProducts } from "../api/productApi";
// import { getCourses } from "../api/courseApi";
// import { getBatches } from "../api/batchApi";
// import { getQuizzes } from "../api/quizApi";
// import { getQuizResults } from "../api/quizResultApi";
// import { getAdmins } from "../api/adminApi";

// const getList = (response) => {
//   if (Array.isArray(response)) return response;
//   if (Array.isArray(response?.data)) return response.data;
//   return [];
// };

// export default function SuperAdminDashboard() {
//   const [stats, setStats] = useState({
//     admins: 0,
//     products: 0,
//     courses: 0,
//     batches: 0,
//     quizzes: 0,
//     results: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     let mounted = true;

//     const loadDashboard = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const [
//           adminsResponse,
//           productsResponse,
//           coursesResponse,
//           batchesResponse,
//           quizzesResponse,
//           resultsResponse,
//         ] = await Promise.all([
//           getAdmins(),
//           getProducts(),
//           getCourses(),
//           getBatches(),
//           getQuizzes(),
//           getQuizResults(),
//         ]);

//         const admins = getList(adminsResponse);
//         const products = getList(productsResponse);
//         const courses = getList(coursesResponse);
//         const batches = getList(batchesResponse);
//         const quizzes = getList(quizzesResponse);
//         const results = getList(resultsResponse);

//         const activeBatches = batches.filter((batch) =>
//           ["Enrolling Open", "Filling Fast", "Few Seats Left"].includes(
//             batch.status,
//           ),
//         );

//         if (mounted) {
//           setStats({
//             admins: admins.length,
//             products: products.length,
//             courses: courses.length,
//             batches: batches.length,
//             activeBatches: activeBatches.length,
//             quizzes: quizzes.length,
//             results: results.length,
//           });
//         }
//       } catch (err) {
//         console.error("Super Admin dashboard error:", err);

//         if (mounted) {
//           setError(
//             err?.response?.data?.message ||
//               "Unable to load Super Admin dashboard.",
//           );
//         }
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     loadDashboard();

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   const cards = [
//     {
//       label: "Normal Admins",
//       value: stats.admins,
//       icon: "👥",
//       color: "blue",
//     },
//     {
//       label: "Total Courses",
//       value: stats.courses,
//       icon: "📚",
//       color: "indigo",
//     },
//     {
//       label: "Total Batches",
//       value: stats.batches,
//       icon: "🎓",
//       color: "purple",
//     },
//     {
//       label: "Active Batches",
//       value: stats.activeBatches || 0,
//       icon: "✓",
//       color: "green",
//     },
//     {
//       label: "Total Products",
//       value: stats.products,
//       icon: "📦",
//       color: "orange",
//     },
//     {
//       label: "Total Quizzes",
//       value: stats.quizzes,
//       icon: "📝",
//       color: "pink",
//     },
//     {
//       label: "Quiz Results",
//       value: stats.results,
//       icon: "📋",
//       color: "cyan",
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Super Admin Dashboard
//           </h1>

//           <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//             Overall overview and management of your LMS.
//           </p>
//         </div>

//         <Link
//           to="/admin-management"
//           className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
//         >
//           + Manage Admins
//         </Link>
//       </div>

//       {error && (
//         <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
//           {error}
//         </div>
//       )}

//       {loading ? (
//         <div className="flex min-h-[250px] items-center justify-center text-sm text-gray-500 dark:text-gray-400">
//           Loading Super Admin dashboard...
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//             {cards.map((card) => (
//               <div
//                 key={card.label}
//                 className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
//               >
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">
//                       {card.label}
//                     </p>

//                     <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
//                       {card.value}
//                     </h2>
//                   </div>

//                   <div className="rounded-lg bg-gray-100 p-3 text-xl dark:bg-gray-800">
//                     {card.icon}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
//             <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Admin Accounts
//               </h2>

//               <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                 Create Normal Admin accounts and control their access to the
//                 LMS.
//               </p>

//               <Link
//                 to="/admin-management"
//                 className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
//               >
//                 Open Admin Management
//               </Link>
//             </div>

//             <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//                 Contact Messages
//               </h2>

//               <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
//                 Review and manage messages submitted through the public
//                 website.
//               </p>

//               <Link
//                 to="/contact-messages"
//                 className="mt-5 inline-flex rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
//               >
//                 View Messages
//               </Link>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../api/productApi";
import { getCourses } from "../api/courseApi";
import { getBatches } from "../api/batchApi";
import { getQuizzes } from "../api/quizApi";
import { getQuizResults } from "../api/quizResultApi";
import { getAdmins } from "../api/adminApi";
import { getStudents } from "../api/studentApi";

const getList = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState({
    admins: 0,
    students: 0,
    products: 0,
    courses: 0,
    batches: 0,
    quizzes: 0,
    results: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          adminsResponse,
          productsResponse,
          coursesResponse,
          batchesResponse,
          quizzesResponse,
          resultsResponse,
          studentsResponse,
        ] = await Promise.all([
          getAdmins(),
          getProducts(),
          getCourses(),
          getBatches(),
          getQuizzes(),
          getQuizResults(),
          getStudents(),
        ]);

        const admins = getList(adminsResponse);
        const products = getList(productsResponse);
        const courses = getList(coursesResponse);
        const batches = getList(batchesResponse);
        const quizzes = getList(quizzesResponse);
        const results = getList(resultsResponse);
        const students = getList(studentsResponse);

        const activeBatches = batches.filter((batch) =>
          ["Enrolling Open", "Filling Fast", "Few Seats Left"].includes(
            batch.status,
          ),
        );

        if (mounted) {
          setStats({
            admins: admins.length,
            students: students.length,
            products: products.length,
            courses: courses.length,
            batches: batches.length,
            activeBatches: activeBatches.length,
            quizzes: quizzes.length,
            results: results.length,
          });
        }
      } catch (err) {
        console.error("Main Admin dashboard error:", err);

        if (mounted) {
          setError(
            err?.response?.data?.message ||
              "Unable to load Main Admin dashboard.",
          );
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  const cards = [
    {
      label: "Total Teachers",
      value: stats.admins,
      icon: "👥",
      color: "blue",
    },
    {
      label: "Total Students",
      value: stats.students,
      icon: "🎓",
      color: "cyan",
    },
    {
      label: "Total Courses",
      value: stats.courses,
      icon: "📚",
      color: "indigo",
    },
    {
      label: "Total Batches",
      value: stats.batches,
      icon: "🎓",
      color: "purple",
    },
    {
      label: "Active Batches",
      value: stats.activeBatches || 0,
      icon: "✓",
      color: "green",
    },
    {
      label: "Total Products",
      value: stats.products,
      icon: "📦",
      color: "orange",
    },
    {
      label: "Total Quizzes",
      value: stats.quizzes,
      icon: "📝",
      color: "pink",
    },
    {
      label: "Quiz Results",
      value: stats.results,
      icon: "📋",
      color: "cyan",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Main Admin Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Overall overview and management of your LMS.
          </p>
        </div>

        <Link
          to="/admin-management"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + Manage Teachers
        </Link>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex min-h-[250px] items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          Loading Main Admin dashboard...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {card.label}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                      {card.value}
                    </h2>
                  </div>

                  <div className="rounded-lg bg-gray-100 p-3 text-xl dark:bg-gray-800">
                    {card.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Teacher Accounts
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Create and manage teacher accounts and control their access to
                the LMS.
              </p>

              <Link
                to="/admin-management"
                className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Open Teacher Management
              </Link>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Student Accounts
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Review registrations, update student details and control account
                access while preserving quiz history.
              </p>

              <Link
                to="/students"
                className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
              >
                Open Student Management
              </Link>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Contact Messages
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Review and manage messages submitted through the public website.
              </p>

              <Link
                to="/contact-messages"
                className="mt-5 inline-flex rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                View Messages
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
