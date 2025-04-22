import React, { useState } from "react";
import VehiclePriceModal from "./VehiclePriceModal"; // Adjust path as needed

const PriceMyRide = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-start pt-10"
      style={{
        backgroundImage: "url('./background.png')",
      }}
    >
      {/* LOGO */}
      <img
        src="./pricemyride.png"
        alt="Price My Ride Logo"
        className="w-[320px] md:w-[340px] lg:w-[360px] mb-8"
      />

      {/* BUTTONS */}
<div className="flex flex-col items-center gap-5 w-full px-4 max-w-[800px]">
  {[
    "INSTANT LIVE MARKETS APPRAISALS",
    "NO MORE JUMPING THROUGH HOOPS",
    "BONUS INSTANT CASH OFFER*",
  ].map((text, index) => (
    <div
      key={index}
      className="
        bg-[#3da4fb]
        font-sans       /* Inter, sans-serif */
        font-normal     /* Weight 400 */
        text-[29px]     /* Size 11px */
        leading-[16px]  /* Line-height 16px */
        text-yellow/90   /* rgba(255,255,255,0.9) */
        px-9 py-9
        rounded-xl
        text-center
        uppercase
        w-full
        shadow-xl
        tracking-wide
        //color- #ffffffe6
      "
    >
      {text}
    </div>
        ))}
      </div>

      {/* CALCULATOR HOVER BOX */}
      <div className="absolute bottom-6 right-6 group w-[110px] h-[130px] bg-[#3da4fb] rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300">
        {/* TOOLTIP - use onClick to open modal */}
        <div
          onClick={() => setIsModalVisible(true)}
          className="absolute bottom-30 right-0 bg-[#3da4fb] text-white text-lg w-56 px-2 py-1 text-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
        >
          Calculator Price
        </div>

        {/* CALCULATOR ICON */}
        <img
          src="./calculator-icon.png"
          alt="Calculator Icon"
          className="w-[80px] h-[110px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
<div className="absolute bottom-40 ">
  {/* Vehicle Price Modal */}
  <VehiclePriceModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
</div>
      
    </section>
  );
};

export default PriceMyRide;
