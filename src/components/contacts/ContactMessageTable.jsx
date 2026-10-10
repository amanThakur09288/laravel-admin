import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

// Light and dark colours in one place
const getTableStyles = (isDark) => {
  const c = isDark
    ? {
        bg: "#111827",
        headBg: "#1f2937",
        headText: "#9ca3af",
        text: "#d1d5db",
        border: "#374151",
        rowBorder: "#1f2937",
        hover: "#1f2937",
        muted: "#9ca3af",
      }
    : {
        bg: "#ffffff",
        headBg: "#f9fafb",
        headText: "#6b7280",
        text: "#374151",
        border: "#e5e7eb",
        rowBorder: "#f3f4f6",
        hover: "#f9fafb",
        muted: "#6b7280",
      };

  return {
    table: { style: { backgroundColor: c.bg } },
    tableWrapper: { style: { backgroundColor: c.bg } },
    header: { style: { backgroundColor: c.bg, color: c.text } },
    headRow: {
      style: {
        backgroundColor: c.headBg,
        borderBottom: `1px solid ${c.border}`,
        minHeight: "56px",
      },
    },
    headCells: {
      style: {
        fontSize: "12px",
        fontWeight: "600",
        textTransform: "uppercase",
        color: c.headText,
      },
    },
    rows: {
      style: {
        minHeight: "64px",
        fontSize: "14px",
        color: c.text,
        backgroundColor: c.bg,
        borderBottom: `1px solid ${c.rowBorder}`,
      },
      highlightOnHoverStyle: {
        backgroundColor: c.hover,
        cursor: "pointer",
      },
    },
    cells: { style: { paddingLeft: "16px", paddingRight: "16px" } },
    pagination: {
      style: {
        backgroundColor: c.bg,
        color: c.text,
        borderTop: `1px solid ${c.border}`,
        minHeight: "60px",
      },
    },
    noData: {
      style: { backgroundColor: c.bg, color: c.muted, minHeight: "200px" },
    },
    progress: { style: { backgroundColor: c.bg } },
  };
};

export default function ContactMessageTable({
  messages,
  loading,
  deletingId,
  onView,
  onDelete,
}) {
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === "dark";

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
      width: "90px",
    },
    {
      name: "Date",
      selector: (row) => row.created_at,
      cell: (row) => formatDateTime(row.created_at),
      sortable: true,
      width: "190px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      grow: 1.5,
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      grow: 2,
      wrap: true,
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
      grow: 2,
      wrap: true,
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
      width: "180px",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={messages}
      progressPending={loading}
      pagination
      paginationPerPage={10}
      paginationRowsPerPageOptions={[10, 20, 30, 50]}
      highlightOnHover
      responsive
      persistTableHead
      customStyles={getTableStyles(isDark)}
      noDataComponent={
        <div
          className={
            isDark
              ? "py-10 text-center text-gray-400"
              : "py-10 text-center text-gray-500"
          }
        >
          No contact messages found.
        </div>
      }
    />
  );
}