import React from "react";
import { Link } from "react-router-dom";

const PriceMyRide = () => {
  return (
    <section className="bg-sky-300 min-h-screen flex flex-col lg:flex-row justify-center items-center gap-10 px-5 lg:px-20 py-10">
      <div className="w-full max-w-lg lg:max-w-xl">
        <img
          src="./pricemyride.jpg"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
          alt="Price My Ride"
        />
      </div>
      <div>

      <div className="flex flex-col justify-center items-center gap-6 w-full max-w-2xl">
        {[
          "INSTANT LIVE MARKETS APPRAISALS",
          "NO MORE JUMPING THROUGH HOOPS",
          "BONUS INSTANT CASH OFFER*",
        ].map((text, index) => (
          <div
            key={index}
            className="h-32 sm:h-36 md:h-40 w-full max-w-[800px] rounded-2xl bg-white flex items-center justify-center shadow-md px-5"
          >
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-500 uppercase text-center">
              {text}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
      <Link to={"/calculate-price"} className="bg-blue-400 text-white px-4 py-2 w-fit rounded-3xl">
        Calculate Price
      </Link>
      </div>
      </div>

    </section>
  );
};

export default PriceMyRide;
