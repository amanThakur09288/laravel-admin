import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

export default function QuizResultTable({ results, loading = false, onView }) {
  const theme = useSelector((state) => state.theme.mode);

  const isDark = theme === "dark";

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "80px",
    },

    {
      name: "Student",
      selector: (row) => row.student?.name || "—",
      sortable: true,
      grow: 2,
    },

    {
      name: "Quiz",
      selector: (row) => row.quiz?.title || "—",
      sortable: true,
      grow: 2,
    },

    {
      name: "Attempt",
      selector: (row) => row.attempt_number,
      sortable: true,
      center: true,
      cell: (row) => <span className="font-medium">#{row.attempt_number}</span>,
    },

    {
      name: "Score",
      selector: (row) => Number(row.score || 0),
      sortable: true,
      center: true,
      cell: (row) => (
        <span className="font-semibold">
          {row.score} / {row.total_marks}
        </span>
      ),
    },

    {
      name: "Correct",
      selector: (row) => row.correct_answers,
      sortable: true,
      center: true,
      cell: (row) => (
        <span
          className={
            isDark
              ? "font-semibold text-green-400"
              : "font-semibold text-green-600"
          }
        >
          {row.correct_answers}
        </span>
      ),
    },

    {
      name: "Wrong",
      selector: (row) => row.wrong_answers,
      sortable: true,
      center: true,
      cell: (row) => (
        <span
          className={
            isDark ? "font-semibold text-red-400" : "font-semibold text-red-600"
          }
        >
          {row.wrong_answers}
        </span>
      ),
    },

    {
      name: "Unanswered",
      selector: (row) => row.unanswered,
      sortable: true,
      center: true,
    },

    {
      name: "Attempts",
      selector: (row) => row.used_attempts,
      sortable: true,
      center: true,
      cell: (row) => (
        <span className="font-medium">
          {row.used_attempts} / {row.attempts_allowed}
        </span>
      ),
      width: "110px",
    },

    {
      name: "Left",
      selector: (row) => row.left_attempts,
      sortable: true,
      center: true,
      cell: (row) => (
        <span
          className={
            row.left_attempts > 0
              ? isDark
                ? "font-semibold text-green-400"
                : "font-semibold text-green-600"
              : isDark
                ? "font-semibold text-red-400"
                : "font-semibold text-red-600"
          }
        >
          {row.left_attempts}
        </span>
      ),
      width: "80px",
    },

    {
      name: "Result",
      selector: (row) => (row.passed ? "Passed" : "Failed"),
      sortable: true,
      center: true,
      cell: (row) => (
        <span
          className={
            row.passed
              ? isDark
                ? "rounded-full bg-green-900/40 px-3 py-1 text-xs font-semibold text-green-400"
                : "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
              : isDark
                ? "rounded-full bg-red-900/40 px-3 py-1 text-xs font-semibold text-red-400"
                : "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700"
          }
        >
          {row.passed ? "Passed" : "Failed"}
        </span>
      ),
    },

    {
      name: "Submitted",
      selector: (row) => row.submitted_at || "",
      sortable: true,
      cell: (row) => {
        if (!row.submitted_at) {
          return "—";
        }

        return new Date(row.submitted_at).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
      width: "130px",
    },

    {
      name: "Actions",
      cell: (row) => (
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
      ),
      width: "100px",
    },
  ];

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
      data={results || []}
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
          No quiz results found.
        </div>
      }
    />
  );
}
