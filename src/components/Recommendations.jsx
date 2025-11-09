import React from "react";
import jsPDF from "jspdf";

export default function Recommendations({ data }) {
    const exportPDF = async () => {
        const doc = new jsPDF();

        const fontUrl = "/Roboto-Regular.ttf";
        const fontData = await fetch(fontUrl).then(res => res.arrayBuffer());
        const uint8Array = new Uint8Array(fontData);
        const binaryString = Array.from(uint8Array, byte => String.fromCharCode(byte)).join("");

        doc.addFileToVFS("Roboto-Regular.ttf", btoa(binaryString));
        doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
        doc.setFont("Roboto");

        doc.setFontSize(16);
        doc.text("Рекомендації ПЗ", 14, 20);

        let y = 30;
        data.forEach((soft, index) => {
            doc.setFontSize(14);
            doc.text(`${index + 1}. ${soft.name}`, 14, y);
            y += 7;
            if (soft.description) {
                doc.setFontSize(12);
                doc.text(soft.description, 16, y);
                y += 7;
            }
            doc.setFontSize(12);
            doc.text(`Категорія: ${soft.category}`, 16, y);
            y += 5;
            doc.text(`Платформа: ${Array.isArray(soft.os) ? soft.os.join(", ") : soft.os}`, 16, y);
            y += 5;
            doc.text(`Безкоштовне: ${soft.free ? "Так" : "Ні"}`, 16, y);
            y += 10;

            if (y > 280) { // новая страница
                doc.addPage();
                y = 20;
            }
        });

        doc.save("recommendations.pdf");
    };

    const exportText = () => {
        let text = "Рекомендації ПЗ\n\n";
        data.forEach((soft, index) => {
            text += `${index + 1}. ${soft.name}\n`;
            if (soft.description) text += `   ${soft.description}\n`;
            text += `   Категорія: ${soft.category}\n`;
            text += `   Платформа: ${Array.isArray(soft.os) ? soft.os.join(", ") : soft.os}\n`;
            text += `   Безкоштовне: ${soft.free ? "Так" : "Ні"}\n\n`;
        });

        const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "recommendations.txt";
        link.click();
    };

    const printRecommendations = () => {
        const printContent = document.getElementById("recommendations-print");
        const newWin = window.open("", "_blank");
        newWin.document.write("<html><head><title>Рекомендації ПЗ</title></head><body>");
        newWin.document.write(printContent.innerHTML);
        newWin.document.write("</body></html>");
        newWin.document.close();
        newWin.focus();
        newWin.print();
        newWin.close();
    };

    return (
        <div className="w-full max-w-2xl mt-10">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4 text-center">
                Рекомендації
            </h2>

            {data.length === 0 ? (
                <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500 border border-gray-100">
                    <p>
                        Заповніть анкету та натисніть <b>«Отримати рекомендації»</b>.
                    </p>
                </div>
            ) : (
                <>
                    <div className="flex justify-end gap-2 mb-4">
                        <button
                            onClick={exportPDF}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Зберегти PDF
                        </button>
                        <button
                            onClick={exportText}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                        >
                            Зберегти TXT
                        </button>
                        <button
                            onClick={printRecommendations}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Друк
                        </button>
                    </div>

                    <div id="recommendations-print" className="grid gap-4">
                        {data.map((soft) => (
                            <div
                                key={soft._id}
                                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
                            >
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{soft.name}</h3>
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
                </>
            )}
        </div>
    );
}
