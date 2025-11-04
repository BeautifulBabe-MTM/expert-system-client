import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { api } from "../api/api";

export default function ManageSoftware() {
    const [softwareList, setSoftwareList] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    const fetchSoftware = async () => {
        try {
            const res = await api.get("/software", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSoftwareList(res.data);
        } catch (error) {
            console.error("Помилка отримання ПЗ:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Ви впевнені, що хочете видалити цю програму?")) return;
        try {
            await api.delete(`/software/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSoftwareList(softwareList.filter((item) => item._id !== id));
        } catch (error) {
            alert("Помилка видалення");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSoftware();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-indigo-600 text-xl font-semibold">
                Завантаження...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-10 px-4 flex flex-col items-center">
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-indigo-600">Управління ПЗ</h1>
                    <Link
                        to="/add"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                    >
                        ➕ Додати нове
                    </Link>
                </div>

                {softwareList.length === 0 ? (
                    <p className="text-gray-500 text-center">Немає доданих програм</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200 rounded-lg">
                            <thead className="bg-indigo-100 text-indigo-700">
                                <tr>
                                    <th className="p-3 text-left">Назва</th>
                                    <th className="p-3 text-left">Категорія</th>
                                    <th className="p-3 text-left">ОС</th>
                                    <th className="p-3 text-left">Тип</th>
                                    <th className="p-3 text-left">Призначення</th>
                                    <th className="p-3 text-center">Дії</th>
                                </tr>
                            </thead>
                            <tbody>
                                {softwareList.map((sw) => (
                                    <tr
                                        key={sw._id}
                                        className="border-t hover:bg-gray-50 transition"
                                    >
                                        <td className="p-3 font-medium">{sw.name}</td>
                                        <td className="p-3">{sw.category}</td>
                                        <td className="p-3">{sw.os?.join(", ")}</td>
                                        <td className="p-3">
                                            {sw.free ? "Безкоштовне" : "Платне"}
                                        </td>
                                        <td className="p-3">{sw.purpose?.join(", ")}</td>
                                        <td className="p-3 text-center space-x-2">
                                            <Link
                                                to={`/edit/${sw._id}`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                ✏️ Редагувати
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(sw._id)}
                                                className="text-red-600 hover:underline"
                                            >
                                                ❌ Видалити
                                            </button>
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
