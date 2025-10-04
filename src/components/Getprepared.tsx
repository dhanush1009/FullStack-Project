import React, { useState } from "react";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const FeaturesPDF = () => {
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");
  const [featuresList, setFeaturesList] = useState([]);
  const navigate = useNavigate();

  const addFeature = () => {
    const title = titleInput.trim();
    const description = descInput.trim();
    if (!title || !description) {
      alert("⚠️ Please enter both title and description.");
      return;
    }
    setFeaturesList((prev) => [...prev, { title, description }]);
    setTitleInput("");
    setDescInput("");
  };

  const generatePDF = () => {
    if (featuresList.length === 0) {
      alert("⚠️ No features to download. Please add some first.");
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 10;
    const maxLineWidth = pageWidth - margin * 2;

    let y = 20;
    doc.setFontSize(18);
    doc.text("📝 Features List", margin, y);
    y += 15;
    doc.setFontSize(14);

    featuresList.forEach(({ title, description }, idx) => {
      const titleLines = doc.splitTextToSize(`${idx + 1}. ${title}`, maxLineWidth);
      if (y + titleLines.length * 10 > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.setFont(undefined, "bold");
      doc.text(titleLines, margin, y);
      y += titleLines.length * 10 + 2;

      const descLines = doc.splitTextToSize(description, maxLineWidth);
      if (y + descLines.length * 10 > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.setFont(undefined, "normal");
      doc.text(descLines, margin + 8, y);
      y += descLines.length * 10 + 12;
    });

    doc.save("features-list.pdf");
    alert("✅ Your features list PDF is downloading!");
  };

  return (
    <div className="min-h-screen bg-[#d6d5c9] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        🚀 Add Features & Download PDF
      </h1>

      {/* Input Form */}
      <div className="flex flex-col w-full max-w-xl gap-4 mb-6">
        <input
          type="text"
          placeholder="✨ Feature Title"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          className="p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
        />
        <textarea
          placeholder="📝 Feature Description"
          value={descInput}
          onChange={(e) => setDescInput(e.target.value)}
          rows={4}
          className="p-3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 resize-none"
        />
        <button
          onClick={addFeature}
          className="self-start px-8 py-3 bg-gray-700 text-white rounded hover:bg-gray-800 transition flex items-center gap-2"
        >
          ➕ Add Feature
        </button>
      </div>

      {/* Features Cards */}
      <div className="w-full max-w-xl space-y-6 mb-10">
        {featuresList.length === 0 ? (
          <p className="text-gray-700 italic text-center">😴 No features added yet.</p>
        ) : (
          featuresList.map(({ title, description }, idx) => (
            <div
              key={idx}
              className="rounded-xl p-6 shadow-lg border border-gray-400 cursor-default hover:shadow-xl transition-shadow duration-300"
              style={{ backgroundColor: "#d6d5c9" }}
            >
              <h2 className="font-bold text-xl mb-2 text-gray-900">
                {idx + 1}. {title} ⭐
              </h2>
              <p className="text-gray-800 whitespace-pre-wrap">💡 {description}</p>
            </div>
          ))
        )}
      </div>

      {/* Download PDF Button */}
      <button
        onClick={generatePDF}
        className="px-10 py-3 bg-gray-700 text-white rounded-full font-semibold hover:bg-gray-800 transition mb-4 flex items-center gap-2 justify-center"
      >
        📄 Download as PDF
      </button>

      {/* Navigate to Home Button */}
      <button
        onClick={() => navigate("/index")}
        className="px-10 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition flex items-center gap-2 justify-center"
      >
        🏠 Go to Home
      </button>

      <Header />
    </div>
  );
};

export default FeaturesPDF;
