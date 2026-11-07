// import { useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// import Sidebar from "./Sidebar";
// import Header from "./Header";

// export default function AdminLayout() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const theme = useSelector((state) => state.theme.mode);

//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", theme === "dark");
//   }, [theme]);

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
//       <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
//       <div className="lg:ml-64">
//         <Header onMenuClick={() => setSidebarOpen(true)} />
//         <main className="p-4 sm:p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import Header from "./Header";
import PageLoader from "../common/PageLoader";

import { getCurrentUser } from "../../api/authApi";
import { setUser, clearUser } from "../../redux/slices/authSlice";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    let mounted = true;

    const checkAuthentication = async () => {
      try {
        const response = await getCurrentUser();

        const currentUser =
          response?.user || response?.data?.user || response?.data || null;

        if (
          !currentUser ||
          !["admin", "teacher"].includes(currentUser.role) ||
          currentUser.is_active === false
        ) {
          throw new Error("Unauthorized admin access.");
        }

        if (mounted) {
          dispatch(setUser(currentUser));
          setAuthenticated(true);
        }
      } catch {
        if (mounted) {
          dispatch(clearUser());
          setAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setCheckingAuth(false);
        }
      }
    };

    checkAuthentication();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  if (checkingAuth) {
    return <PageLoader />;
  }

  if (!authenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}