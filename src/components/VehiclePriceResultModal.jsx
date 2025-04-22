import React, { useState, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import SellVehicleModal from "./SellVehicleModal";

const VehiclePriceResultModal = ({ isVisible, onClose }) => {
  const [isSellModalVisible, setIsSellModalVisible] = useState(false);
  const [isVisibleWithAnimation, setIsVisibleWithAnimation] = useState(false);

  // Handle showing the modal with fade-in and slide-up
  useEffect(() => {
    if (isVisible) {
      setIsVisibleWithAnimation(true); // Start the animation when the modal is shown
    } else {
      // If modal is hidden, use a timeout to ensure the modal fades out and slides down before removing from DOM
      setTimeout(() => setIsVisibleWithAnimation(false), 500); // Animation duration must match
    }
  }, [isVisible]);

  // Handle the close action with fade-out and slide-down
  const handleClose = () => {
    setIsVisibleWithAnimation(false); // Start fade-out and slide-down animation
    setTimeout(() => {
      onClose(); // Close modal after the animation
    }, 500); // Match this with the fade-out duration
  };

  const handleSellVehicleModalOpen = () => {
    setIsSellModalVisible(true);
    handleClose(); // Close this modal when opening Sell modal
  };

  const handleSellVehicleModalClose = () => {
    setIsSellModalVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div
          className={`fixed bottom-4 right-4 z-50 w-[360px] max-w-md transition-all duration-500 ease-out ${
            isVisibleWithAnimation
              ? "opacity-100 translate-y-0" // Visible and animated
              : "opacity-0 translate-y-10" // Hidden with slide down and fade out
          }`}
        >
          <div className="rounded-xl shadow-lg bg-white overflow-hidden">
            {/* Header */}
            <div className="bg-blue-600 rounded-t-xl px-4 py-3 relative">
              <h2 className="text-white font-semibold text-lg text-center">
                Get Your Vehicle Price
              </h2>
              <CloseOutlined
                onClick={handleClose}
                className="text-white absolute top-3 right-4 text-lg cursor-pointer hover:text-gray-200"
              />
            </div>

            {/* Content */}
            <div className="bg-white px-6 py-4 rounded-b-xl">
              <p className="text-black font-semibold text-base mb-1">Price for your car</p>
              <p className="text-sm mb-1">With Kilometer Driven: 8 Km</p>
              <p className="text-sm mb-4">Including Specs: xxxxxx</p>

              <div className="mb-4">
                <p className="font-bold mb-1">Wholesale Value</p>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="$ XX,XXX - $ XX,XXX"
                  readOnly
                />
              </div>

              <div className="mb-4">
                <p className="font-bold mb-1">Retail Value</p>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 text-sm"
                  placeholder="$ XX,XXX - $ XX,XXX"
                  readOnly
                />
              </div>

              <button
                onClick={handleSellVehicleModalOpen}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded"
              >
                Would you like to sell your vehicle now?
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SellVehicleModal */}
      {isSellModalVisible && (
        <SellVehicleModal
          isVisible={isSellModalVisible}
          onClose={handleSellVehicleModalClose}
        />
      )}
    </>
  );
};

export default VehiclePriceResultModal;
