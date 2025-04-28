import React, { useState, useEffect } from "react";
import VehiclePriceResultModal from "./VehiclePriceResultModal";

const VehiclePriceModal = ({ isVisible, onClose }) => {
  const [buildYear, setBuildYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [odometer, setOdometer] = useState("");
  const [specification, setSpecification] = useState("");
  const [wholesale, setWholesale] = useState("");
  const [retail, setRetail] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isVisibleWithAnimation, setIsVisibleWithAnimation] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState({});

  useEffect(() => {
    if (isVisible) {
      setIsVisibleWithAnimation(true);
    } else {
      setTimeout(() => setIsVisibleWithAnimation(false), 500);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsVisibleWithAnimation(false);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleSubmit = async () => {
    const payload = {
      year: buildYear,
      make,
      model,
      odometer,
      specifications: specification,
      wholesale,
      retail,
    };

    setVehicleDetails(payload);  // Save vehicle details for second modal

    try {
      const response = await fetch("http://localhost:3000/api/record/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Record added successfully:", data);
        setShowResult(true);
      } else {
        alert(`❌ Error: ${data.error || "Something went wrong!"}`);
      }
    } catch (error) {
      console.error("🚨 API Error:", error);
      alert("Failed to connect to the server.");
    }

    onClose();
  };

  return (
    <>
      {isVisible && (
        <div
          className={`fixed bottom-4 right-4 z-50 w-[420px] max-w-sm transition-all duration-500 ease-out ${isVisibleWithAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="rounded-xl shadow-lg bg-white overflow-hidden">
            <div className="relative mb-6 px-4 pt-4">
              <div className="absolute inset-x-0 top-0 h-12 bg-blue-600 rounded-t-xl" />
              <button onClick={handleClose} className="absolute top-2 right-3 text-white text-xl font-bold z-20">
                &times;
              </button>
              <h2 className="relative text-2xl font-bold text-white text-center z-10">
                Enter Vehicle Details
              </h2>
            </div>

            <div className="flex flex-col gap-4 px-6 pb-6">
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-600"
                placeholder="Build Year"
                value={buildYear}
                onChange={(e) => setBuildYear(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-600"
                placeholder="Make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-600"
                placeholder="Model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-600"
                placeholder="Odometer (in KM)"
                value={odometer}
                onChange={(e) => setOdometer(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-600"
                placeholder="Specification (optional)"
                value={specification}
                onChange={(e) => setSpecification(e.target.value)}
              />
              {/* <input
                className="border border-gray-300 rounded px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-600"
                placeholder="Wholesale Price Range (e.g. $1000 - $2000)"
                value={wholesale}
                onChange={(e) => setWholesale(e.target.value)}
              />
              <input
                className="border border-gray-300 rounded px-4 py-2 text-sm shadow-md focus:ring-2 focus:ring-blue-600"
                placeholder="Retail Price Range (e.g. $1500 - $2500)"
                value={retail}
                onChange={(e) => setRetail(e.target.value)}
              /> */}

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
        vehicleDetails={vehicleDetails}  // Passing the vehicle details to second modal
      />
    </>
  );
};

export default VehiclePriceModal;
