import { useSelector } from "react-redux";

export default function Dashboard() {
    const products = useSelector(
        (state) => state.products.items
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Welcome to your admin panel.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Products
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        {products.length}
                    </h2>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Orders
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        0
                    </h2>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Customers
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        0
                    </h2>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Revenue
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                        $0
                    </h2>
                </div>
            </div>
        </div>
    );
}