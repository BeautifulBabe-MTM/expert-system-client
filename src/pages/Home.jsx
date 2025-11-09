import React, { useState } from "react";
import Form from "../components/Form";
import Recommendations from "../components/Recommendations";
import { getRecommendations } from "../api/api";

export default function Home() {
    const [form, setForm] = useState({
        os: "Windows",
        purpose: "Офіс",
        level: "Новачок",
        free: "any",
    });

    const [recommendations, setRecommendations] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await getRecommendations(form);
        setRecommendations(res.data);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center px-4">
            <div className="w-full max-w-2xl bg-gray-100 shadow-lg rounded-2xl p-8 border border-gray-100">
                <h1 className="text-3xl font-bold text-indigo-600 text-center mb-8">
                    Експертна система вибору програмного забезпечення
                </h1>

                <Form form={form} onChange={handleChange} onSubmit={handleSubmit} />

                <Recommendations data={recommendations} />
            </div>
        </div>
    );
}
