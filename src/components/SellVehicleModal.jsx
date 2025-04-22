import React, { useState, useEffect } from "react";
import { Modal } from "antd";

const SellVehicleModal = ({ isVisible, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isVisibleWithAnimation, setIsVisibleWithAnimation] = useState(false);

  // Handle showing the modal with fade-in and slide-up
  useEffect(() => {
    if (isVisible) {
      setIsVisibleWithAnimation(true); // Start the animation when modal becomes visible
    } else {
      // If modal is hidden, use a timeout to ensure the modal fades out and slides down before removing from DOM
      setTimeout(() => setIsVisibleWithAnimation(false), 500); // Animation duration must match
    }
  }, [isVisible]);

  // Handle the close action with fade-out and slide-down
  const handleClose = () => {
    setIsVisibleWithAnimation(false); // Start fade-out and slide-down animation
    setTimeout(() => {
      onClose(); // Close modal after animation
    }, 500); // Match this with the fade-out duration
  };

  const handleSubmit = () => {
    console.log({ name, email, phone });
    handleClose();
  };

  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center ${
        isVisibleWithAnimation
          ? "opacity-100 translate-y-0" // Visible with fade-in and slide-up
          : "opacity-0 translate-y-10" // Hidden with fade-out and slide-down
      } transition-all duration-500 ease-out`}
    >
      <Modal
        open={isVisible}
        onCancel={handleClose}
        footer={null}
        centered // ✅ Ensures modal appears in the center of the screen
        closable
        maskClosable
        width={420}
        bodyStyle={{
          padding: "30px",
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
      >
        <h2 className="text-xl font-bold text-center mb-6">Enter Your Details</h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border border-black rounded px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-black rounded px-4 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="border border-black rounded px-4 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="flex justify-between mt-6">
            <button
              onClick={handleClose}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SellVehicleModal;
