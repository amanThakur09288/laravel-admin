import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, onClose }) {
  const links = [
    { name: "Dashboard", path: "/", icon: "📊" },
    { name: "Products", path: "/products", icon: "📦" },
    { name: "Upcoming Batches", path: "/batches", icon: "📅" },
    { name: "Courses", path: "/courses", icon: "📅" },
    { name: "Contact Messages", path: "/contact-messages", icon: "✉️" },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 transform border-r border-gray-200 bg-white transition-transform dark:border-gray-800 dark:bg-gray-900 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-800">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            AdminPanel
          </h1>

          <button onClick={onClose} className="text-xl lg:hidden">
            ×
          </button>
        </div>

        <nav className="space-y-2 p-4">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`
              }
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
