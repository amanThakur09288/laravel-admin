export default function ServiceTable({
  services = [],
  deletingId = null,
  onView,
  onEdit,
  onDelete,
}) {
  if (services.length === 0) {
    return (
      <div className="p-10 text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          No services found
        </h3>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Create your first service to display it here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead className="bg-gray-50 dark:bg-gray-950">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Service
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Slug
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Status
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {services.map((service) => (
            <tr
              key={service.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              {/* Service */}
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {service.service_name}
                  </p>

                  <p className="mt-1 max-w-md truncate text-sm text-gray-500 dark:text-gray-400">
                    {service.short_description || "-"}
                  </p>
                </div>
              </td>

              {/* Slug */}
              <td className="px-6 py-4">
                <code className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {service.slug}
                </code>
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                {service.status === "Active" ? (
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-950/40 dark:text-green-400">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                    Inactive
                  </span>
                )}
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onView?.(service)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950/30"
                  >
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() => onEdit?.(service)}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete?.(service)}
                    disabled={deletingId === service.id}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-950/30"
                  >
                    {deletingId === service.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
