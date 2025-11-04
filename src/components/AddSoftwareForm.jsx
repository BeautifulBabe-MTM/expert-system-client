import React, { useState } from "react";
import axios from "axios";
import { api } from "../api/api";

export default function AddSoftwareForm() {
    const [form, setForm] = useState({
        name: "",
        category: "",
        os: [],
        free: true,
        suitableFor: [],
        purpose: [],
        description: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setForm((prev) => {
                const arr = prev[name];
                if (checked) return { ...prev, [name]: [...arr, value] };
                else return { ...prev, [name]: arr.filter((v) => v !== value) };
            });
        } else if (type === "radio") {
            setForm({ ...form, [name]: value === "true" });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post("/software", form, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        alert("✅ Програму успішно додано!");
        setForm({
            name: "",
            category: "",
            os: [],
            free: true,
            suitableFor: [],
            purpose: [],
            description: "",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-10 px-4 flex justify-center items-start">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-6"
            >
                <h2 className="text-2xl font-bold text-indigo-600 text-center mb-4">
                    ➕ Додати нове програмне забезпечення
                </h2>

                {/* Назва */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">
                        Назва програми
                    </label>
                    <input
                        name="name"
                        placeholder="Наприклад: Visual Studio Code"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                </div>

                {/* Категорія */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">
                        Категорія
                    </label>
                    <input
                        name="category"
                        placeholder="Наприклад: Розробка, Офіс, Ігри"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                </div>

                {/* Операційна система */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">
                        Підтримувані ОС
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {["Windows", "macOS", "Linux"].map((os) => (
                            <label key={os} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="os"
                                    value={os}
                                    checked={form.os.includes(os)}
                                    onChange={handleChange}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span>{os}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Безкоштовна чи ні */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">
                        Тип ліцензії
                    </label>
                    <div className="flex space-x-6">
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="free"
                                value="true"
                                checked={form.free === true}
                                onChange={handleChange}
                                className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>Безкоштовна</span>
                        </label>

                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="free"
                                value="false"
                                checked={form.free === false}
                                onChange={handleChange}
                                className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>Платна</span>
                        </label>
                    </div>
                </div>

                {/* Рівень користувача */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">
                        Підходить для користувачів
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {["новачок", "досвідчений", "професіонал"].map((level) => (
                            <label key={level} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="suitableFor"
                                    value={level}
                                    checked={form.suitableFor.includes(level)}
                                    onChange={handleChange}
                                    className="text-indigo-600 focus:ring-indigo-500"
                                />
                                <span>{level}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Призначення */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">
                        Призначення
                    </label>
                    <div className="flex flex-wrap gap-3">
                        {["офіс", "ігри", "навчання", "розробка", "мультимедіа"].map(
                            (purpose) => (
                                <label key={purpose} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="purpose"
                                        value={purpose}
                                        checked={form.purpose.includes(purpose)}
                                        onChange={handleChange}
                                        className="text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span>{purpose}</span>
                                </label>
                            )
                        )}
                    </div>
                </div>

                {/* Опис */}
                <div>
                    <label className="block font-medium text-gray-700 mb-1">Опис</label>
                    <textarea
                        name="description"
                        placeholder="Коротко опишіть функціонал та переваги програми..."
                        value={form.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-400 outline-none"
                    />
                </div>

                {/* Кнопка */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                    ✅ Додати програму
                </button>
            </form>
        </div>
    );
}
