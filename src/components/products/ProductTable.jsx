import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";

export default function ProductTable({
  products,
  loading,
  deletingId,
  onView,
  onEdit,
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
      name: "Product",
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
    },

    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      cell: (row) => (
        <span className="font-medium">${Number(row.price).toFixed(2)}</span>
      ),
    },

    {
      name: "Description",
      selector: (row) => row.description || "—",
      grow: 3,
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
      data={products}
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
          No products found.
        </div>
      }
    />
  );
}
