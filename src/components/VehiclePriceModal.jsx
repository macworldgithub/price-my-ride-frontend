import React, { useState } from "react";
import VehiclePriceResultModal from "./VehiclePriceResultModal";

const VehiclePriceModal = ({ isVisible, onClose }) => {
  const [buildYear, setBuildYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [odometer, setOdometer] = useState("");
  const [specification, setSpecification] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    console.log({ buildYear, make, model, odometer, specification });
    onClose(); // Close input modal
    setShowResult(true); // Open result modal
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-4 right-4 z-50 w-[360px] max-w-sm">
          <div className="rounded-xl shadow-lg bg-white overflow-hidden">
            {/* Header */}
            <div className="relative mb-6 px-4 pt-4">
              <div className="absolute inset-x-0 top-0 h-12 bg-blue-600 rounded-t-xl" />
              <h2 className="relative text-2xl font-bold text-white text-center z-10">
                Enter Vehicle Details
              </h2>
            </div>

            {/* Inputs */}
            <div className="flex flex-col gap-4 px-6 pb-6">
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm"
                placeholder="Build Year"
                value={buildYear}
                onChange={(e) => setBuildYear(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm"
                placeholder="Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm"
                placeholder="Odometer (in KM)"
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm"
                placeholder="Specification (optional)"
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
              />

              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm mt-2"
              >
                Get Price
              </button>
            </div>
          </div>
        </div>
      )}

      <VehiclePriceResultModal
        isVisible={showResult}
        onClose={() => setShowResult(false)}
      />
    </>
  );
};

export default VehiclePriceModal;
