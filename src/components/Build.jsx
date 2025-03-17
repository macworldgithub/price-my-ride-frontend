import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Build = () => {
  const [buildYear, setBuildYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [ResponsebuildYear, setResponseBuildYear] = useState("");
  const [Responsemake, setResponseMake] = useState("");
  const [Responsemodel, setResponseModel] = useState("");
  const [wholesalePrice, setWholesalePrice] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const getPrice = async () => {
    if (!buildYear || !make || !model) {
      toast.error("Please provide all the details");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://car-evaluation-backend.vercel.app/api/predict/price", {
        make,
        model,
        year: buildYear,
      });

      if (response.data) {
        setWholesalePrice(response.data.wholesale_price || "N/A");
        setRetailPrice(response.data.retail_price || "N/A");
        setResponseBuildYear(response.data.year || "N/A");
        setResponseMake(response.data.make || "N/A");
        setResponseModel(response.data.model || "N/A");
      } else {
        toast.error("Failed to fetch price data");
      }
    } catch (error) {
      console.error("Error fetching car price:", error);
      toast.error("Error fetching price. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-sky-300 min-h-screen flex flex-col justify-center items-center gap-16 px-5  py-10">
        <h1 className="text-3xl md:text-5xl gap-3 flex flex-col lg:flex-row text-blue-700 font-bold">
          <span>------------------------</span>Get Your Vehicle Price<span>------------------------</span>
        </h1>
        <div className="flex flex-col items-center gap-6 justify-center">
          <div className="flex flex-col lg:flex-row gap-8">
            <input
              type="text"
              placeholder="Build Year"
              value={buildYear}
              onChange={(e) => setBuildYear(e.target.value)}
              className="bg-white w-72 sm:w-80 h-14 px-6 text-lg sm:text-2xl rounded-3xl border border-black shadow-lg"
            />
            <input
              type="text"
              placeholder="Make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="bg-white w-72 sm:w-80 h-14 px-6 text-lg sm:text-2xl rounded-3xl border border-black shadow-lg"
            />
            <input
              type="text"
              placeholder="Model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="bg-white w-72 sm:w-80 h-14 px-6 text-lg sm:text-2xl rounded-3xl border border-black shadow-lg"
            />
          </div>
          <button
            onClick={getPrice}
            disabled={loading}
            className={`w-72 sm:w-80 h-14 text-lg sm:text-2xl rounded-3xl shadow-lg ${
              loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {loading ? "Fetching Price..." : "Get Price"}
          </button>
        </div>

        {wholesalePrice && retailPrice && (
          <div>
             <h1 className="text-3xl text-center md:text-5xl gap-3 flex flex-col lg:flex-row  font-bold">
             Pricing For {Responsemake} {Responsemodel} {ResponsebuildYear}
        </h1>
          <div className="bg-sky-300 flex flex-col mt-6 md:flex-row justify-center items-center gap-10 px-5">
           
            <div className="flex flex-col items-center gap-6">
              <h1 className="text-2xl md:text-3xl font-bold">Wholesale Value</h1>
              <p className="bg-white w-72 sm:w-96 h-16 px-6 flex items-center justify-center text-lg sm:text-2xl rounded-3xl border border-black shadow-lg">
                {wholesalePrice}
              </p>
            </div>
            <div className="flex flex-col items-center gap-6">
              <h1 className="text-2xl md:text-3xl font-bold">Retail Value</h1>
              <p className="bg-white w-72 sm:w-96 h-16 px-6 flex items-center justify-center text-lg sm:text-2xl rounded-3xl border border-black shadow-lg">
                {retailPrice}
              </p>
            </div>
          </div>
          </div>

        )}
      </section>
    </>
  );
};

export default Build;
