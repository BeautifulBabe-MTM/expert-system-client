import React from "react";

export default function Form({ form, onChange, onSubmit }) {
  return (
    <div className="min-h-screen flex items-center justify-center from-indigo-50 to-white px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
      >
        <h2 className="text-2xl font-semibold text-indigo-600 mb-6 text-center">
          Підбір програмного забезпечення
        </h2>

        {/* Операційна система */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Операційна система
          </label>
          <select
            name="os"
            value={form.os}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
          >
            <option value="">Оберіть ОС...</option>
            <option>Windows</option>
            <option>Linux</option>
            <option>macOS</option>
          </select>
        </div>

        {/* Призначення */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Призначення
          </label>
          <select
            name="purpose"
            value={form.purpose}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
          >
            <option value="">Оберіть призначення...</option>
            <option>офіс</option>
            <option>ігри</option>
            <option>розробка</option>
            <option>навчання</option>
            <option>мультимедіа</option>
          </select>
        </div>

        {/* Рівень користувача */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Рівень користувача
          </label>
          <select
            name="level"
            value={form.level}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
          >
            <option value="">Оберіть рівень...</option>
            <option>новачок</option>
            <option>досвідчений</option>
            <option>професіонал</option>
          </select>
        </div>

        {/* Тип програм */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Тип програм
          </label>
          <select
            name="free"
            value={form.free}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
          >
            <option value="any">Будь-які</option>
            <option value="true">Безкоштовні</option>
            <option value="false">Платні</option>
          </select>
        </div>

        {/* Кнопка */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow-md transition-all duration-200 active:scale-95"
        >
          Отримати рекомендації
        </button>
      </form>
    </div>
  );
}
