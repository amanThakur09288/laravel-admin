// import DataTable from "react-data-table-component";
// import { useSelector } from "react-redux";

// const formatDate = (date) => {
//   if (!date) {
//     return "-";
//   }

//   const parsedDate = new Date(`${date}T00:00:00`);

//   if (Number.isNaN(parsedDate.getTime())) {
//     return "-";
//   }

//   return parsedDate.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const formatCurrency = (value) => {
//   if (value === null || value === undefined) {
//     return "-";
//   }

//   return `₹${Number(value).toLocaleString("en-IN")}`;
// };

// const getStatusClasses = (status, isDark) => {
//   const statusClasses = {
//     "Enrolling Open": isDark
//       ? "bg-green-900/40 text-green-300"
//       : "bg-green-100 text-green-700",

//     "Filling Fast": isDark
//       ? "bg-orange-900/40 text-orange-300"
//       : "bg-orange-100 text-orange-700",

//     "Few Seats Left": isDark
//       ? "bg-yellow-900/40 text-yellow-300"
//       : "bg-yellow-100 text-yellow-700",

//     "Coming Soon": isDark
//       ? "bg-blue-900/40 text-blue-300"
//       : "bg-blue-100 text-blue-700",

//     "Sold Out": isDark
//       ? "bg-red-900/40 text-red-300"
//       : "bg-red-100 text-red-700",
//   };

//   return (
//     statusClasses[status] ||
//     (isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700")
//   );
// };

// export default function BatchTable({
//   batches,
//   loading = false,
//   deletingId = null,
//   onView,
//   onEdit,
//   onDelete,
// }) {
//   const theme = useSelector((state) => state.theme.mode);

//   const isDark = theme === "dark";

//   const columns = [
//     {
//       name: "#",
//       selector: (row) => row.id,
//       sortable: true,
//       width: "70px",
//     },

//     {
//       name: "Batch",
//       selector: (row) => row.batch_name,
//       sortable: true,
//       grow: 2,
//       cell: (row) => (
//         <div className="py-2">
//           <p
//             className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
//           >
//             {row.batch_name}
//           </p>

//           <p
//             className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
//           >
//             {row.slug}
//           </p>
//         </div>
//       ),
//     },

//     {
//       name: "Course",
//       selector: (row) => row.course_name,
//       sortable: true,
//       grow: 2,
//       wrap: true,
//     },

//     {
//       name: "Start Date",
//       selector: (row) => row.start_date,
//       sortable: true,
//       cell: (row) => formatDate(row.start_date),
//     },

//     {
//       name: "Mode",
//       selector: (row) => row.mode,
//       sortable: true,
//       center: true,
//     },

//     {
//       name: "Seats",
//       selector: (row) => row.available_seats,
//       sortable: true,
//       center: true,
//       cell: (row) => (
//         <span>
//           {row.available_seats} / {row.total_seats}
//         </span>
//       ),
//     },

//     {
//       name: "Fee",
//       selector: (row) => Number(row.fee),
//       sortable: true,
//       right: true,
//       cell: (row) => (
//         <div className="text-right">
//           {row.discounted_fee ? (
//             <>
//               <div className="font-medium">
//                 {formatCurrency(row.discounted_fee)}
//               </div>

//               <div
//                 className={`text-xs line-through ${
//                   isDark ? "text-gray-500" : "text-gray-400"
//                 }`}
//               >
//                 {formatCurrency(row.fee)}
//               </div>
//             </>
//           ) : (
//             <span>{formatCurrency(row.fee)}</span>
//           )}
//         </div>
//       ),
//     },

//     {
//       name: "Status",
//       selector: (row) => row.status,
//       sortable: true,
//       center: true,
//       cell: (row) => (
//         <span
//           className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(
//             row.status,
//             isDark,
//           )}`}
//         >
//           {row.status}
//         </span>
//       ),
//     },

//     {
//       name: "Actions",
//       right: true,
//       width: "210px",
//       cell: (row) => {
//         const isDeleting = deletingId === row.id;

//         return (
//           <div className="flex items-center gap-2">
//             <button
//               type="button"
//               onClick={() => onView(row)}
//               disabled={isDeleting}
//               className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-100 disabled:opacity-50 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
//             >
//               View
//             </button>

//             <button
//               type="button"
//               onClick={() => onEdit(row)}
//               disabled={isDeleting}
//               className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
//             >
//               Edit
//             </button>

//             <button
//               type="button"
//               onClick={() => onDelete(row)}
//               disabled={isDeleting}
//               className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
//             >
//               {isDeleting ? "Deleting..." : "Delete"}
//             </button>
//           </div>
//         );
//       },
//     },
//   ];

//   const lightStyles = {
//     table: {
//       style: {
//         backgroundColor: "#ffffff",
//       },
//     },

//     headRow: {
//       style: {
//         backgroundColor: "#f9fafb",
//         borderBottom: "1px solid #e5e7eb",
//         minHeight: "52px",
//       },
//     },

//     headCells: {
//       style: {
//         color: "#374151",
//         fontSize: "13px",
//         fontWeight: "600",
//       },
//     },

//     rows: {
//       style: {
//         backgroundColor: "#ffffff",
//         color: "#374151",
//         minHeight: "64px",
//         borderBottom: "1px solid #f3f4f6",
//       },

//       highlightOnHoverStyle: {
//         backgroundColor: "#f9fafb",
//         cursor: "pointer",
//       },
//     },

//     cells: {
//       style: {
//         fontSize: "13px",
//       },
//     },

//     pagination: {
//       style: {
//         backgroundColor: "#ffffff",
//         color: "#374151",
//         borderTop: "1px solid #e5e7eb",
//       },
//     },

//     noData: {
//       style: {
//         backgroundColor: "#ffffff",
//         color: "#6b7280",
//         minHeight: "120px",
//       },
//     },

//     progress: {
//       style: {
//         backgroundColor: "#ffffff",
//         color: "#374151",
//       },
//     },
//   };

//   const darkStyles = {
//     table: {
//       style: {
//         backgroundColor: "#111827",
//       },
//     },

//     headRow: {
//       style: {
//         backgroundColor: "#1f2937",
//         borderBottom: "1px solid #374151",
//         minHeight: "52px",
//       },
//     },

//     headCells: {
//       style: {
//         color: "#d1d5db",
//         fontSize: "13px",
//         fontWeight: "600",
//       },
//     },

//     rows: {
//       style: {
//         backgroundColor: "#111827",
//         color: "#d1d5db",
//         minHeight: "64px",
//         borderBottom: "1px solid #1f2937",
//       },

//       highlightOnHoverStyle: {
//         backgroundColor: "#1f2937",
//         cursor: "pointer",
//       },
//     },

//     cells: {
//       style: {
//         fontSize: "13px",
//       },
//     },

//     pagination: {
//       style: {
//         backgroundColor: "#111827",
//         color: "#d1d5db",
//         borderTop: "1px solid #374151",
//       },
//     },

//     noData: {
//       style: {
//         backgroundColor: "#111827",
//         color: "#9ca3af",
//         minHeight: "120px",
//       },
//     },

//     progress: {
//       style: {
//         backgroundColor: "#111827",
//         color: "#d1d5db",
//       },
//     },
//   };

//   return (
//     <DataTable
//       columns={columns}
//       data={batches}
//       pagination
//       paginationPerPage={10}
//       paginationRowsPerPageOptions={[10, 20, 30, 50]}
//       highlightOnHover
//       responsive
//       persistTableHead
//       progressPending={loading}
//       progressComponent={
//         <div className="py-10 text-sm text-gray-500 dark:text-gray-400">
//           Loading batches...
//         </div>
//       }
//       noDataComponent={
//         <div className="py-10 text-center">
//           <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
//             No batches found
//           </p>

//           <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//             Create your first upcoming batch.
//           </p>
//         </div>
//       }
//       customStyles={isDark ? darkStyles : lightStyles}
//     />
//   );
// }

import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

/* =====================================================
   HELPERS
===================================================== */

const formatDate = (date) => {
  if (!date) return "-";

  // Works for "2026-10-09" and "2026-10-09T00:00:00.000000Z"
  const [year, month, day] = String(date).slice(0, 10).split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day);

  if (!year || Number.isNaN(parsedDate.getTime())) return "-";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatCurrency = (value) => {
  if (value === null || value === undefined || value === "") return "-";

  return `₹${Number(value).toLocaleString("en-IN")}`;
};

const getStatusClasses = (status, isDark) => {
  const statusClasses = {
    "Enrolling Open": isDark
      ? "bg-green-900/40 text-green-300"
      : "bg-green-100 text-green-700",

    "Filling Fast": isDark
      ? "bg-orange-900/40 text-orange-300"
      : "bg-orange-100 text-orange-700",

    "Few Seats Left": isDark
      ? "bg-yellow-900/40 text-yellow-300"
      : "bg-yellow-100 text-yellow-700",

    "Coming Soon": isDark
      ? "bg-blue-900/40 text-blue-300"
      : "bg-blue-100 text-blue-700",

    "Sold Out": isDark
      ? "bg-red-900/40 text-red-300"
      : "bg-red-100 text-red-700",
  };

  return (
    statusClasses[status] ||
    (isDark ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700")
  );
};

// Light and dark colours in one place
const getTableStyles = (isDark) => {
  const c = isDark
    ? {
        bg: "#111827",
        headBg: "#1f2937",
        headText: "#d1d5db",
        text: "#d1d5db",
        border: "#374151",
        rowBorder: "#1f2937",
        hover: "#1f2937",
        muted: "#9ca3af",
      }
    : {
        bg: "#ffffff",
        headBg: "#f9fafb",
        headText: "#374151",
        text: "#374151",
        border: "#e5e7eb",
        rowBorder: "#f3f4f6",
        hover: "#f9fafb",
        muted: "#6b7280",
      };

  return {
    table: { style: { backgroundColor: c.bg } },
    headRow: {
      style: {
        backgroundColor: c.headBg,
        borderBottom: `1px solid ${c.border}`,
        minHeight: "52px",
      },
    },
    headCells: {
      style: { color: c.headText, fontSize: "13px", fontWeight: "600" },
    },
    rows: {
      style: {
        backgroundColor: c.bg,
        color: c.text,
        minHeight: "64px",
        borderBottom: `1px solid ${c.rowBorder}`,
      },
      highlightOnHoverStyle: {
        backgroundColor: c.hover,
        cursor: "pointer",
      },
    },
    cells: { style: { fontSize: "13px" } },
    pagination: {
      style: {
        backgroundColor: c.bg,
        color: c.text,
        borderTop: `1px solid ${c.border}`,
      },
    },
    noData: {
      style: { backgroundColor: c.bg, color: c.muted, minHeight: "120px" },
    },
    progress: { style: { backgroundColor: c.bg, color: c.text } },
  };
};

/* =====================================================
   TABLE
===================================================== */

export default function BatchTable({
  batches,
  loading = false,
  deletingId = null,
  onView,
  onEdit,
  onDelete,
}) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const columns = [
    {
      name: "#",
      selector: (row) => row.id,
      sortable: true,
      width: "70px",
    },

    {
      name: "Batch",
      selector: (row) => row.batch_name,
      sortable: true,
      grow: 2,
      cell: (row) => (
        <div className="py-2">
          <p
            className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
          >
            {row.batch_name}
          </p>

          <p
            className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            {row.slug}
          </p>
        </div>
      ),
    },

    {
      name: "Course",
      // The course comes from the relation, and may be missing
      selector: (row) => row.course?.course_name ?? "-",
      sortable: true,
      grow: 2,
      wrap: true,
    },

    {
      name: "Start Date",
      selector: (row) => row.start_date,
      sortable: true,
      cell: (row) => formatDate(row.start_date),
    },

    {
      name: "Mode",
      selector: (row) => row.mode,
      sortable: true,
      center: true,
    },

    {
      name: "Seats",
      selector: (row) => row.available_seats,
      sortable: true,
      center: true,
      cell: (row) => (
        <span>
          {row.available_seats} / {row.total_seats}
        </span>
      ),
    },

    {
      name: "Fee",
      selector: (row) => Number(row.fee),
      sortable: true,
      right: true,
      cell: (row) => (
        <div className="text-right">
          {Number(row.discounted_fee) > 0 ? (
            <>
              <div className="font-medium">
                {formatCurrency(row.discounted_fee)}
              </div>

              <div
                className={`text-xs line-through ${
                  isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {formatCurrency(row.fee)}
              </div>
            </>
          ) : (
            <span>{formatCurrency(row.fee)}</span>
          )}
        </div>
      ),
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      center: true,
      cell: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(
            row.status,
            isDark,
          )}`}
        >
          {row.status}
        </span>
      ),
    },

    {
      name: "Actions",
      right: true,
      width: "210px",
      cell: (row) => {
        const isDeleting = deletingId === row.id;

        return (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onView(row)}
              disabled={isDeleting}
              className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-100 disabled:opacity-50 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
            >
              View
            </button>

            <button
              type="button"
              onClick={() => onEdit(row)}
              disabled={isDeleting}
              className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Edit
            </button>

            <button
              type="button"
              onClick={() => onDelete(row)}
              disabled={isDeleting}
              className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={batches}
      pagination
      paginationPerPage={10}
      paginationRowsPerPageOptions={[10, 20, 30, 50]}
      highlightOnHover
      responsive
      persistTableHead
      progressPending={loading}
      progressComponent={
        <div className="py-10 text-sm text-gray-500 dark:text-gray-400">
          Loading batches...
        </div>
      }
      noDataComponent={
        <div className="py-10 text-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            No batches found
          </p>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Create your first upcoming batch.
          </p>
        </div>
      }
      customStyles={getTableStyles(isDark)}
    />
  );
}
