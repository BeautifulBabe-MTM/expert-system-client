import React, { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Form({ form, onChange, onSubmit }) {
    const [meta, setMeta] = useState({ osList: [], purposes: [], categories: [] });

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                console.log("Відправляю запит на метадані...");
                const res = await api.get("/software/meta");
                setMeta(res.data);
            } catch (error) {
                console.error("Помилка завантаження метаданих:", error);
            }
        };
        fetchMeta();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            {/* <div className="absolute w-[500px] h-[500px] bg-indigo-500/30 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
            <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl bottom-0 right-0 animate-pulse"></div> */}

            <form
                onSubmit={onSubmit}
                className="relative z-10 w-full max-w-md bg-gray-200/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-400 p-8 animate-fadeIn"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Підбір програмного забезпечення
                </h2>

                <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">
                        Операційна система
                    </label>
                    <select
                        name="os"
                        value={form.os}
                        onChange={onChange}
                        className="w-full bg-gray-100 text-gray-800 border border-gray-400 rounded-lg p-2.5 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
                    >
                        <option value="">Оберіть ОС...</option>
                        {meta.osList.map((os) => (
                            <option key={os}>{os}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">
                        Призначення
                    </label>
                    <select
                        name="purpose"
                        value={form.purpose}
                        onChange={onChange}
                        className="w-full bg-gray-100 text-gray-800 border border-gray-400 rounded-lg p-2.5 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
                    >
                        <option value="">Оберіть призначення...</option>
                        {meta.purposes.map((p) => (
                            <option key={p}>{p}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-2">
                        Рівень користувача
                    </label>
                    <select
                        name="level"
                        value={form.level}
                        onChange={onChange}
                        className="w-full bg-gray-100 text-gray-800 border border-gray-400 rounded-lg p-2.5 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
                    >
                        <option value="">Оберіть рівень...</option>
                        <option>Новачок</option>
                        <option>Досвідчений</option>
                        <option>Професіонал</option>
                    </select>
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                        Тип програм
                    </label>
                    <select
                        name="free"
                        value={form.free}
                        onChange={onChange}
                        className="w-full bg-gray-100 text-gray-800 border border-gray-400 rounded-lg p-2.5 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition"
                    >
                        <option value="any">Будь-які</option>
                        <option value="true">Безкоштовні</option>
                        <option value="false">Платні</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2.5 rounded-lg shadow-lg shadow-gray-700/30 transition-all duration-200 active:scale-95"
                >
                    Отримати рекомендації
                </button>
            </form>
        </div>
    );
}
