import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../redux/slices/themeSlice";
export default function Header({
    onMenuClick,
}) {
    const dispatch = useDispatch();

    const theme = useSelector(
        (state) => state.theme.mode
    );

    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
                >
                    ☰
                </button>

                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Admin Dashboard
                </h2>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() =>
                        dispatch(toggleTheme())
                    }
                    className="rounded-lg border border-gray-200 px-3 py-2 text-sm dark:border-gray-700"
                >
                    {theme === "light" ? "🌙" : "☀️"}
                </button>

                <div className="hidden text-right sm:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Admin
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Administrator
                    </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                    A
                </div>
            </div>
        </header>
    );
}