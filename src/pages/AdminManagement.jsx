// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// import {
//   getAdmins,
//   createAdmin,
//   updateAdmin,
//   updateAdminStatus,
// } from "../api/adminApi";

// const initialForm = {
//   name: "",
//   username: "",
//   email: "",
//   password: "",
//   password_confirmation: "",
// };

// export default function AdminManagement() {
//   const [admins, setAdmins] = useState([]);
//   const [form, setForm] = useState(initialForm);
//   const [editingAdmin, setEditingAdmin] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   const loadAdmins = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await getAdmins();

//       const list = Array.isArray(response)
//         ? response
//         : Array.isArray(response?.data)
//           ? response.data
//           : [];

//       setAdmins(list);
//     } catch (err) {
//       console.error("Failed to load admins:", err);

//       setError(
//         err?.response?.data?.message || "Unable to load admin accounts.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAdmins();
//   }, []);

//   const handleChange = (event) => {
//     const { name, value } = event.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value,
//     }));
//   };

//   const resetForm = () => {
//     setForm(initialForm);
//     setEditingAdmin(null);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!form.name.trim() || !form.username.trim() || !form.email.trim()) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     if (!editingAdmin && !form.password) {
//       toast.error("Password is required for a new admin.");
//       return;
//     }

//     if (
//       !editingAdmin &&
//       form.password !== form.password_confirmation
//     ) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     const payload = {
//       name: form.name.trim(),
//       username: form.username.trim(),
//       email: form.email.trim(),
//     };

//     if (form.password) {
//       payload.password = form.password;
//       payload.password_confirmation = form.password_confirmation;
//     }

//     try {
//       setSaving(true);

//       if (editingAdmin) {
//         await updateAdmin(editingAdmin.id, payload);
//         toast.success("Admin updated successfully.");
//       } else {
//         await createAdmin(payload);
//         toast.success("Normal Admin created successfully.");
//       }

//       resetForm();
//       await loadAdmins();
//     } catch (err) {
//       console.error("Admin save failed:", err);

//       const validationErrors = err?.response?.data?.errors;
//       const firstValidationError = validationErrors
//         ? Object.values(validationErrors).flat()[0]
//         : null;

//       toast.error(
//         firstValidationError ||
//           err?.response?.data?.message ||
//           "Unable to save admin.",
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEdit = (admin) => {
//     setEditingAdmin(admin);

//     setForm({
//       name: admin.name || "",
//       username: admin.username || "",
//       email: admin.email || "",
//       password: "",
//       password_confirmation: "",
//     });

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const handleStatusChange = async (admin) => {
//     const nextStatus = !admin.is_active;

//     try {
//       await updateAdminStatus(admin.id, nextStatus);

//       toast.success(
//         nextStatus ? "Admin activated." : "Admin deactivated.",
//       );

//       await loadAdmins();
//     } catch (err) {
//       console.error("Admin status update failed:", err);

//       toast.error(
//         err?.response?.data?.message ||
//           "Unable to update admin status.",
//       );
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//           Admin Management
//         </h1>

//         <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//           Create and manage Normal Admin accounts.
//         </p>
//       </div>

//       {/* Create / Edit Admin */}
//       <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
//         <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
//           {editingAdmin ? "Update Admin" : "Create New Admin"}
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <div>
//               <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Full Name
//               </label>

//               <input
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter full name"
//                 className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               />
//             </div>

//             <div>
//               <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Username
//               </label>

//               <input
//                 name="username"
//                 value={form.username}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter username"
//                 className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               />
//             </div>

//             <div>
//               <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Email
//               </label>

//               <input
//                 name="email"
//                 type="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 required
//                 placeholder="Enter email"
//                 className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               />
//             </div>

//             <div>
//               <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 {editingAdmin ? "New Password (optional)" : "Password"}
//               </label>

//               <input
//                 name="password"
//                 type="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required={!editingAdmin}
//                 autoComplete="new-password"
//                 placeholder="Enter password"
//                 className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               />
//             </div>

//             <div>
//               <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Confirm Password
//               </label>

//               <input
//                 name="password_confirmation"
//                 type="password"
//                 value={form.password_confirmation}
//                 onChange={handleChange}
//                 required={Boolean(form.password)}
//                 autoComplete="new-password"
//                 placeholder="Confirm password"
//                 className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//               />
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             <button
//               type="submit"
//               disabled={saving}
//               className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
//             >
//               {saving
//                 ? "Saving..."
//                 : editingAdmin
//                   ? "Update Admin"
//                   : "Create Admin"}
//             </button>

//             {editingAdmin && (
//               <button
//                 type="button"
//                 onClick={resetForm}
//                 className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>
//       </div>

//       {/* Admin List */}
//       <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
//         <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-800">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div>
//               <h2 className="font-semibold text-gray-900 dark:text-white">
//                 Normal Admin Accounts
//               </h2>

//               <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//                 Total: {admins.length}
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={loadAdmins}
//               className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
//             >
//               Refresh
//             </button>
//           </div>
//         </div>

//         {error && (
//           <div className="m-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
//             {error}
//           </div>
//         )}

//         {loading ? (
//           <div className="p-8 text-center text-sm text-gray-500">
//             Loading admin accounts...
//           </div>
//         ) : admins.length === 0 ? (
//           <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
//             No Normal Admin accounts found.
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[750px] text-left text-sm">
//               <thead className="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
//                 <tr>
//                   <th className="px-5 py-3 font-semibold">Name</th>
//                   <th className="px-5 py-3 font-semibold">Username</th>
//                   <th className="px-5 py-3 font-semibold">Email</th>
//                   <th className="px-5 py-3 font-semibold">Status</th>
//                   <th className="px-5 py-3 text-right font-semibold">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//                 {admins.map((admin) => (
//                   <tr key={admin.id}>
//                     <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
//                       {admin.name}
//                     </td>

//                     <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
//                       {admin.username}
//                     </td>

//                     <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
//                       {admin.email}
//                     </td>

//                     <td className="px-5 py-4">
//                       <span
//                         className={`rounded-full px-3 py-1 text-xs font-medium ${
//                           admin.is_active
//                             ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
//                             : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
//                         }`}
//                       >
//                         {admin.is_active ? "Active" : "Inactive"}
//                       </span>
//                     </td>

//                     <td className="px-5 py-4">
//                       <div className="flex justify-end gap-2">
//                         <button
//                           type="button"
//                           onClick={() => handleEdit(admin)}
//                           className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
//                         >
//                           Edit
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() => handleStatusChange(admin)}
//                           className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
//                             admin.is_active
//                               ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400"
//                               : "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-400"
//                           }`}
//                         >
//                           {admin.is_active ? "Deactivate" : "Activate"}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getAdmins,
  createAdmin,
  updateAdmin,
  updateAdminStatus,
} from "../api/adminApi";

const initialForm = {
  name: "",
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingAdmin, setEditingAdmin] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadAdmins = async () => {
    try {
      const response = await getAdmins();
      setError("");

      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      setAdmins(list);
    } catch (err) {
      console.error("Failed to load teachers:", err);

      setError(
        err?.response?.data?.message || "Unable to load teacher accounts.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial API fetch synchronizes this page with server data.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadAdmins();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingAdmin(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.username.trim() || !form.email.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!editingAdmin && !form.password) {
      toast.error("Password is required for a new teacher.");
      return;
    }

    if (form.password && form.password !== form.password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
    };

    if (form.password) {
      payload.password = form.password;
      payload.password_confirmation = form.password_confirmation;
    }

    try {
      setSaving(true);

      if (editingAdmin) {
        await updateAdmin(editingAdmin.id, payload);
        toast.success("Teacher updated successfully.");
      } else {
        await createAdmin(payload);
        toast.success("Teacher created successfully.");
      }

      resetForm();
      await loadAdmins();
    } catch (err) {
      console.error("Teacher save failed:", err);

      const validationErrors = err?.response?.data?.errors;
      const firstValidationError = validationErrors
        ? Object.values(validationErrors).flat()[0]
        : null;

      toast.error(
        firstValidationError ||
          err?.response?.data?.message ||
          "Unable to save teacher.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);

    setForm({
      name: admin.name || "",
      username: admin.username || "",
      email: admin.email || "",
      password: "",
      password_confirmation: "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleStatusChange = async (admin) => {
    const nextStatus = !admin.is_active;

    try {
      await updateAdminStatus(admin.id, nextStatus);

      toast.success(
        nextStatus ? "Teacher activated." : "Teacher deactivated.",
      );

      await loadAdmins();
    } catch (err) {
      console.error("Teacher status update failed:", err);

      toast.error(
        err?.response?.data?.message ||
          "Unable to update teacher status.",
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Teacher Management
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Create and manage teacher accounts.
        </p>
      </div>

      {/* Create / Edit Teacher */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
          {editingAdmin ? "Update Teacher" : "Create New Teacher"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter full name"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
              </label>

              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                placeholder="Enter username"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter email"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {editingAdmin ? "New Password (optional)" : "Password"}
              </label>

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required={!editingAdmin}
                autoComplete="new-password"
                placeholder="Enter password"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>

              <input
                name="password_confirmation"
                type="password"
                value={form.password_confirmation}
                onChange={handleChange}
                required={Boolean(form.password)}
                autoComplete="new-password"
                placeholder="Confirm password"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : editingAdmin
                  ? "Update Teacher"
                  : "Create Teacher"}
            </button>

            {editingAdmin && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Teacher List */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-800">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Teacher Accounts
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Total: {admins.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setLoading(true);
                loadAdmins();
              }}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
            >
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="m-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
            {error}
          </div>
        )}

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">
            Loading teacher accounts...
          </div>
        ) : admins.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
            No teacher accounts found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                <tr>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Username</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="px-5 py-3 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">
                      {admin.name}
                    </td>

                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {admin.username}
                    </td>

                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {admin.email}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          admin.is_active
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {admin.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(admin)}
                          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusChange(admin)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-medium ${
                            admin.is_active
                              ? "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400"
                              : "bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-950/30 dark:text-green-400"
                          }`}
                        >
                          {admin.is_active ? "Deactivate" : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}