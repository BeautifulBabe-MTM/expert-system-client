import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    let isAdmin = false;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            isAdmin = decoded.isAdmin;
        } catch (err) {
            console.error("Помилка декодування токена:", err);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-indigo-600 text-white shadow-md">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-14">
                    <div className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className="text-lg font-semibold hover:text-indigo-200 transition"
                        >
                            🧠 Expert System
                        </Link>

                        {isAdmin && (
                            <>
                                <Link
                                    to="/add"
                                    className="hover:text-indigo-200 transition font-medium"
                                >
                                    ➕ Додати ПЗ
                                </Link>

                                <Link
                                    to="/manage"
                                    className="hover:text-indigo-200 transition font-medium"
                                >
                                    ⚙️ Управління ПЗ
                                </Link>
                            </>
                        )}
                        <Link
                            to="/catalog"
                            className="text-lg font-semibold hover:text-indigo-200 transition"
                        >
                            Каталог
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {!token ? (
                            <>
                                <Link
                                    to="/login"
                                    className="hover:text-indigo-200 font-medium transition"
                                >
                                    Увійти
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-white text-indigo-600 px-3 py-1.5 rounded-md font-medium hover:bg-indigo-100 transition"
                                >
                                    Реєстрація
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={handleLogout}
                                className="bg-indigo-500 hover:bg-indigo-700 transition px-3 py-1.5 rounded-md font-medium"
                            >
                                Вихід
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
