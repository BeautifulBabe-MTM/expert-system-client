import React from "react";

export default function Recommendations({ data }) {
  return (
    <div className="w-full max-w-2xl mt-10">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
        Рекомендації
      </h2>

      {data.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500 border border-gray-100">
          <p>Заповніть анкету та натисніть <b>«Отримати рекомендації»</b>.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {data.map((soft) => (
            <div
              key={soft._id}
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {soft.name}
              </h3>

              {soft.description && (
                <p className="text-gray-600 mb-3">{soft.description}</p>
              )}

              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <span className="font-medium text-gray-800">Категорія:</span>{" "}
                  {soft.category}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Платформа:</span>{" "}
                  {Array.isArray(soft.os) ? soft.os.join(", ") : soft.os}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Безкоштовне:</span>{" "}
                  {soft.free ? (
                    <span className="text-green-600 font-semibold">Так</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Ні</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
