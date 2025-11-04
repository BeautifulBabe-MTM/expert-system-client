import React, { useEffect, useState } from "react";
import { api } from "../api/api";

export default function SoftwareCatalog() {
    const [softwareList, setSoftwareList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        category: "all",
        os: "all",
        free: "any",
    });

    const fetchSoftware = async () => {
        try {
            const res = await api.get("/software");
            setSoftwareList(res.data);
            setFilteredList(res.data);
        } catch (error) {
            console.error("Помилка отримання ПЗ:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSoftware();
    }, []);

    useEffect(() => {
        let list = [...softwareList];

        if (search.trim()) {
            list = list.filter((sw) =>
                sw.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filters.category !== "all") {
            list = list.filter((sw) => sw.category === filters.category);
        }

        if (filters.os !== "all") {
            list = list.filter((sw) => sw.os?.includes(filters.os));
        }

        if (filters.free !== "any") {
            const isFree = filters.free === "true";
            list = list.filter((sw) => sw.free === isFree);
        }

        setFilteredList(list);
    }, [filters, search, softwareList]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-indigo-600 text-xl font-semibold">
                Завантаження...
            </div>
        );
    }

    const categories = [...new Set(softwareList.map((sw) => sw.category))];
    const allOS = [...new Set(softwareList.flatMap((sw) => sw.os || []))];

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-10 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">
                    Каталог програмного забезпечення
                </h1>

                <div className="flex flex-wrap justify-center gap-4 mb-10 bg-white shadow-md rounded-xl p-4">
                    <input
                        type="text"
                        placeholder="🔍 Пошук за назвою..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border rounded-lg px-4 py-2 w-full sm:w-60 focus:ring-2 focus:ring-indigo-400"
                    />

                    <select
                        value={filters.category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="all">Усі категорії</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.os}
                        onChange={(e) => setFilters({ ...filters, os: e.target.value })}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="all">Усі ОС</option>
                        {allOS.map((os) => (
                            <option key={os} value={os}>
                                {os}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.free}
                        onChange={(e) => setFilters({ ...filters, free: e.target.value })}
                        className="border rounded-lg px-3 py-2"
                    >
                        <option value="any">Будь-яке</option>
                        <option value="true">Безкоштовне</option>
                        <option value="false">Платне</option>
                    </select>
                </div>

                {filteredList.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">
                        Нічого не знайдено 😕
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredList.map((sw) => (
                            <div
                                key={sw._id}
                                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between"
                            >
                                <div>
                                    <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
                                        {sw.name}
                                    </h2>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Категорія: <span className="font-medium">{sw.category}</span>
                                    </p>
                                    <p className="text-sm text-gray-500 mb-1">
                                        ОС: <span className="font-medium">{sw.os?.join(", ")}</span>
                                    </p>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Тип:{" "}
                                        <span
                                            className={`font-medium ${sw.free ? "text-green-600" : "text-amber-600"
                                                }`}
                                        >
                                            {sw.free ? "Безкоштовне" : "Платне"}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Призначення:{" "}
                                        <span className="font-medium">{sw.purpose?.join(", ")}</span>
                                    </p>
                                    <p className="text-gray-700 text-sm line-clamp-3">
                                        {sw.description || "Без опису"}
                                    </p>
                                </div>

                                <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                                    Детальніше
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
