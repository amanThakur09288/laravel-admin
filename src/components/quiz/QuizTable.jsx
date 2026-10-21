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
  const theme = useSelector(
    (state) => state.theme.mode
  );

  const isDark = theme === "dark";

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "90px",
    },

    {
      name: "Quiz",
      selector: (row) => row.title,
      sortable: true,
      grow: 2,
      wrap: true,
    },

    {
      name: "Batch",
      selector: (row) =>
        row.batch?.batch_name || "—",
      sortable: true,
      grow: 2,
      wrap: true,
    },

    {
      name: "Duration",
      selector: (row) => row.duration_minutes,
      sortable: true,
      cell: (row) => (
        <span className="font-medium">
          {row.duration_minutes} min
        </span>
      ),
      width: "130px",
    },

    {
      name: "Marks",
      selector: (row) => row.total_marks,
      sortable: true,
      cell: (row) => (
        <span className="font-medium">
          {row.total_marks}
        </span>
      ),
      width: "100px",
    },

    {
      name: "Passing",
      selector: (row) => row.passing_marks,
      sortable: true,
      cell: (row) => (
        <span className="font-medium">
          {row.passing_marks}
        </span>
      ),
      width: "110px",
    },

    {
      name: "Attempts",
      selector: (row) => row.attempts_allowed,
      sortable: true,
      cell: (row) => (
        <span className="font-medium">
          {row.attempts_allowed}
        </span>
      ),
      width: "110px",
    },

    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => {
        const statusClasses = {
          draft: isDark
            ? "bg-yellow-900/50 text-yellow-300"
            : "bg-yellow-100 text-yellow-700",

          published: isDark
            ? "bg-green-900/50 text-green-300"
            : "bg-green-100 text-green-700",

          closed: isDark
            ? "bg-red-900/50 text-red-300"
            : "bg-red-100 text-red-700",
        };

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              statusClasses[row.status] ||
              (isDark
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-100 text-gray-700")
            }`}
          >
            {row.status}
          </span>
        );
      },
      width: "120px",
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
            {deletingId === row.id
              ? "Deleting..."
              : "Delete"}
          </button>
        </div>
      ),

      width: "270px",
    },
  ];

  /*
   * LIGHT THEME
   */
  const lightStyles = {
    table: {
      style: {
        backgroundColor: "#ffffff",
      },
    },

    tableWrapper: {
      style: {
        backgroundColor: "#ffffff",
      },
    },

    header: {
      style: {
        backgroundColor: "#ffffff",
        color: "#111827",
      },
    },

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

    progress: {
      style: {
        backgroundColor: "#ffffff",
      },
    },
  };

  /*
   * DARK THEME
   */
  const darkStyles = {
    table: {
      style: {
        backgroundColor: "#111827",
      },
    },

    tableWrapper: {
      style: {
        backgroundColor: "#111827",
      },
    },

    header: {
      style: {
        backgroundColor: "#111827",
        color: "#f9fafb",
      },
    },

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

    progress: {
      style: {
        backgroundColor: "#111827",
      },
    },
  };

  return (
    <DataTable
      columns={columns}
      data={quizzes}
      progressPending={loading}
      pagination
      paginationPerPage={10}
      paginationRowsPerPageOptions={[
        10,
        20,
        30,
        50,
      ]}
      highlightOnHover
      responsive
      persistTableHead
      customStyles={
        isDark ? darkStyles : lightStyles
      }
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