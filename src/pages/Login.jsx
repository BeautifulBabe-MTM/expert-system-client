import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const loginRes = await api.post("/auth/login", form);
            const token = loginRes.data.token;

            localStorage.setItem("token", token);

            const meRes = await api.get("/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log(meRes.data.user.isAdmin);

            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Невірний email або пароль");
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-indigo-600 text-center mb-6">
                    Вхід у систему
                </h1>

                {error && (
                    <p className="text-red-500 bg-red-50 border border-red-200 p-2 rounded mb-3 text-sm">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Пароль
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        Увійти
                    </button>
                </form>

                <p className="text-center text-gray-600 text-sm mt-4">
                    Немає акаунта?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-600 hover:underline font-medium"
                    >
                        Зареєструватися
                    </Link>
                </p>
            </div>
        </div>
    );
}
