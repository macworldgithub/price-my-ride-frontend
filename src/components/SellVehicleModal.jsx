import React, { useState } from "react";
import { Modal } from "antd";

const SellVehicleModal = ({ isVisible, onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    console.log({ name, email, phone });
    onClose();
  };

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
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
            onClick={onClose}
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
  );
};

export default SellVehicleModal;
