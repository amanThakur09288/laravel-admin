// import { Link } from "react-router-dom";

// export default function QuizTable({
//   quizzes,
//   onDelete,
// }) {
//   if (!quizzes.length) {
//     return (
//       <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500 dark:border-gray-700 dark:bg-gray-900">
//         No quizzes found.
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
//       <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//         <thead className="bg-gray-50 dark:bg-gray-800">
//           <tr>
//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
//               Title
//             </th>

//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
//               Batch
//             </th>

//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
//               Questions
//             </th>

//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
//               Marks
//             </th>

//             <th className="px-4 py-3 text-left text-xs font-semibold uppercase">
//               Status
//             </th>

//             <th className="px-4 py-3 text-right text-xs font-semibold uppercase">
//               Actions
//             </th>
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
//           {quizzes.map((quiz) => (
//             <tr key={quiz.id}>
//               <td className="px-4 py-4 text-sm font-medium text-gray-800 dark:text-white">
//                 {quiz.title}
//               </td>

//               <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
//                 {quiz.batch?.batch_name || "-"}
//               </td>

//               <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
//                 {quiz.questions_count ?? 0}
//               </td>

//               <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-300">
//                 {quiz.total_marks}
//               </td>

//               <td className="px-4 py-4">
//                 <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize dark:bg-gray-800">
//                   {quiz.status}
//                 </span>
//               </td>

//               <td className="px-4 py-4">
//                 <div className="flex justify-end gap-2">
//                   <Link
//                     to={`/quizzes/${quiz.id}`}
//                     className="rounded-lg px-3 py-2 text-sm text-blue-600 hover:bg-blue-50"
//                   >
//                     View
//                   </Link>

//                   <Link
//                     to={`/quizzes/${quiz.id}/edit`}
//                     className="rounded-lg px-3 py-2 text-sm text-green-600 hover:bg-green-50"
//                   >
//                     Edit
//                   </Link>

//                   <button
//                     type="button"
//                     onClick={() => onDelete(quiz)}
//                     className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

export default function QuizTable({
  quizzes,
  loading,
  deletingId,
  onView,
  onEdit,
  onDelete,
}) {
  const theme = useSelector((state) => state.theme?.mode);
  const isDark = theme === "dark";

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
      grow: 2,
      cell: (row) => (
        <span className="font-medium text-gray-800 dark:text-white">
          {row.title}
        </span>
      ),
    },
    {
      name: "Batch",
      selector: (row) => row.batch?.batch_name || "—",
      sortable: true,
      grow: 1.5,
    },
    {
      name: "Questions",
      selector: (row) => row.questions_count ?? 0,
      sortable: true,
      center: true,
      width: "120px",
    },
    {
      name: "Marks",
      selector: (row) => row.total_marks ?? 0,
      sortable: true,
      center: true,
      width: "100px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "120px",
      cell: (row) => (
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium capitalize text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          {row.status}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex flex-wrap gap-2">
          {/* View */}
          <button
            type="button"
            onClick={() => onView(row)}
            className={
              isDark
                ? "rounded-md bg-gray-700 px-3 py-1.5 text-xs font-medium text-gray-200 hover:bg-gray-600"
                : "rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
            }
          >
            View
          </button>

          {/* Edit */}
          <button
            type="button"
            onClick={() => onEdit(row)}
            className={
              isDark
                ? "rounded-md bg-blue-900/50 px-3 py-1.5 text-xs font-medium text-blue-300 hover:bg-blue-900/70"
                : "rounded-md bg-blue-100 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-200"
            }
          >
            Edit
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(row)}
            disabled={deletingId === row.id}
            className={
              isDark
                ? "rounded-md bg-red-900/50 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-900/70 disabled:cursor-not-allowed disabled:opacity-50"
                : "rounded-md bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200 disabled:cursor-not-allowed disabled:opacity-50"
            }
          >
            {deletingId === row.id ? "Deleting..." : "Delete"}
          </button>
        </div>
      ),
      width: "250px",
    },
  ];

  const lightStyles = {
    table: { style: { backgroundColor: "#ffffff" } },
    tableWrapper: { style: { backgroundColor: "#ffffff" } },
    header: { style: { backgroundColor: "#ffffff", color: "#111827" } },
    headRow: {
      style: {
        backgroundColor: "#f9fafb",
        borderBottom: "1px solid #e5e7eb",
        minHeight: "56px",
      },
    },
    headCells: {
      style: {
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "uppercase",
        color: "#6b7280",
      },
    },
    rows: {
      style: {
        minHeight: "64px",
        fontSize: "14px",
        color: "#374151",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #f3f4f6",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#f9fafb",
        cursor: "pointer",
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#ffffff",
        color: "#374151",
        borderTop: "1px solid #e5e7eb",
        minHeight: "60px",
      },
    },
    noData: {
      style: {
        backgroundColor: "#ffffff",
        color: "#6b7280",
        minHeight: "200px",
      },
    },
    progress: { style: { backgroundColor: "#ffffff" } },
  };

  const darkStyles = {
    table: { style: { backgroundColor: "#111827" } },
    tableWrapper: { style: { backgroundColor: "#111827" } },
    header: { style: { backgroundColor: "#111827", color: "#f9fafb" } },
    headRow: {
      style: {
        backgroundColor: "#1f2937",
        borderBottom: "1px solid #374151",
        minHeight: "56px",
      },
    },
    headCells: {
      style: {
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "uppercase",
        color: "#9ca3af",
      },
    },
    rows: {
      style: {
        minHeight: "64px",
        fontSize: "14px",
        color: "#d1d5db",
        backgroundColor: "#111827",
        borderBottom: "1px solid #1f2937",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#1f2937",
        cursor: "pointer",
      },
    },
    cells: {
      style: {
        paddingLeft: "16px",
        paddingRight: "16px",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#111827",
        color: "#d1d5db",
        borderTop: "1px solid #374151",
        minHeight: "60px",
      },
    },
    noData: {
      style: {
        backgroundColor: "#111827",
        color: "#9ca3af",
        minHeight: "200px",
      },
    },
    progress: { style: { backgroundColor: "#111827" } },
  };

  return (
    <DataTable
      columns={columns}
      data={quizzes}
      progressPending={loading}
      pagination
      paginationPerPage={10}
      paginationRowsPerPageOptions={[10, 20, 30, 50]}
      highlightOnHover
      responsive
      persistTableHead
      customStyles={isDark ? darkStyles : lightStyles}
      noDataComponent={
        <div
          className={
            isDark
              ? "py-10 text-center text-gray-400"
              : "py-10 text-center text-gray-500"
          }
        >
          No quizzes found.
        </div>
      }
    />
  );
}
