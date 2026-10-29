// export default function CourseTable({
//   courses,
//   loading = false,
//   deletingId = null,
//   onView,
//   onEdit,
//   onDelete,
// }) {
//   if (loading) {
//     return (
//       <div className="p-6 text-center text-sm text-gray-500">
//         Loading courses...
//       </div>
//     );
//   }

//   if (!courses.length) {
//     return (
//       <div className="p-10 text-center">
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           No courses found.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="w-full min-w-[900px]">
//         <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
//           <tr>
//             <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//               Course
//             </th>

//             <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//               Category
//             </th>

//             <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//               Level
//             </th>

//             <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//               Duration
//             </th>

//             <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//               Status
//             </th>

//             <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
//               Actions
//             </th>
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//           {courses.map((course) => (
//             <tr
//               key={course.id}
//               className="hover:bg-gray-50 dark:hover:bg-gray-800/40"
//             >
//               <td className="px-6 py-4">
//                 <div>
//                   <p className="font-medium text-gray-900 dark:text-white">
//                     {course.course_name}
//                   </p>

//                   {course.short_description && (
//                     <p className="mt-1 max-w-sm truncate text-sm text-gray-500 dark:text-gray-400">
//                       {course.short_description}
//                     </p>
//                   )}
//                 </div>
//               </td>

//               <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
//                 {course.category}
//               </td>

//               <td className="px-6 py-4">
//                 <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
//                   {course.level}
//                 </span>
//               </td>

//               <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
//                 {course.duration || "-"}
//               </td>

//               <td className="px-6 py-4">
//                 <span
//                   className={`rounded-full px-3 py-1 text-xs font-medium ${
//                     course.status === "Active"
//                       ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
//                       : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
//                   }`}
//                 >
//                   {course.status}
//                 </span>
//               </td>

//               <td className="px-6 py-4">
//                 <div className="flex justify-end gap-2">
//                   <button
//                     type="button"
//                     onClick={() => onView(course)}
//                     className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
//                   >
//                     View
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => onEdit(course)}
//                     className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     type="button"
//                     onClick={() => onDelete(course)}
//                     disabled={deletingId === course.id}
//                     className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
//                   >
//                     {deletingId === course.id ? "Deleting..." : "Delete"}
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

export default function CourseTable({
  courses,
  loading = false,
  deletingId = null,
  onView,
  onEdit,
  onDelete,
}) {
  console.log({courses})
  if (loading) {
    return (
      <div className="p-6 text-center text-sm text-gray-500">
        Loading courses...
      </div>
    );
  }

  if (!courses.length) {
    return (
      <div className="p-10 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No courses found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1100px]">
        <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Course
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Category
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Level
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Sections
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Lessons
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Duration
            </th>

            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Status
            </th>

            <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {courses?.map((course) => {
            const sections = Array.isArray(course.sections)
              ? course.sections
              : [];

            const totalLessons = sections.reduce((total, section) => {
              const lessons = Array.isArray(section.lessons)
                ? section.lessons
                : [];

              return total + lessons.length;
            }, 0);

            return (
              <tr
                key={course.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/40"
              >
                {/* Course */}

                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {course.course_name}
                    </p>

                    {course.short_description && (
                      <p className="mt-1 max-w-sm truncate text-sm text-gray-500 dark:text-gray-400">
                        {course.short_description}
                      </p>
                    )}
                  </div>
                </td>

                {/* Category */}

                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {course.category}
                </td>

                {/* Level */}

                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    {course.level}
                  </span>
                </td>

                {/* Sections */}

                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {sections.length}
                  </span>

                  <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                    {sections.length === 1 ? "section" : "sections"}
                  </span>
                </td>

                {/* Lessons */}

                <td className="px-6 py-4">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {totalLessons}
                  </span>

                  <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                    {totalLessons === 1 ? "lesson" : "lessons"}
                  </span>
                </td>

                {/* Duration */}

                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {course?.duration || "-"}
                </td>

                {/* Status */}

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      course.status === "Active"
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>

                {/* Actions */}

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(course)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                    >
                      View
                    </button>

                    <button
                      type="button"
                      onClick={() => onEdit(course)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => onDelete(course)}
                      disabled={deletingId === course.id}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
                    >
                      {deletingId === course.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
