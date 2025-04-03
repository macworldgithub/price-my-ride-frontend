import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { SERVER_URL } from "../config";

const Build = () => {
  const [buildYear, setBuildYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [odometer, setOdometer] = useState("");
  const [specs, setSpecs] = useState("");

  const [ResponsebuildYear, setResponseBuildYear] = useState("");
  const [Responsemake, setResponseMake] = useState("");
  const [Responsemodel, setResponseModel] = useState("");
  const [ResponseSpecs, setResponseSpecs] = useState("");
  const [ResponseOdometer, setResponseOdometer] = useState("");

  const [wholesalePrice, setWholesalePrice] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const getPrice = async () => {
    if (!buildYear || !make || !model||!odometer ) {
      toast.error("Please provide all details including Odometer (Specs is optional).");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/predict/price`,
        {
          make,
          model,
          year: buildYear,
          odometer,
          specs,
        }
      );

      if (response.data) {
        await axios.post(
        `${SERVER_URL}/api/record/create`,
          {
            make,
            model,
            year: buildYear,
            odometer,
            specifications:specs,
            wholesale:response.data.wholesale_price,
            retail:response.data.retail_price
          }
        );
        setWholesalePrice(response.data.wholesale_price || "N/A");
        setRetailPrice(response.data.retail_price || "N/A");
        setResponseBuildYear(response.data.year || "N/A");
        setResponseMake(response.data.make || "N/A");
        setResponseModel(response.data.model || "N/A");
        setResponseSpecs(response.data.specs || "N/A");
        setResponseOdometer(response.data.odometer || "N/A");
      } else {
        toast.error("Failed to fetch price data.");
      }
    } catch (error) {
      console.error("Error fetching car price:", error);
      toast.error("Error fetching price. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const SendEmail = async () => {
    if (!name || !email || !phone||!Responsemodel||!Responsemake||!ResponseOdometer||!ResponsebuildYear||!ResponseSpecs ) {
      toast.error("Please provide all details including email, phone and name");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${SERVER_URL}/api/email/send`,
        {
          name,email,phone,
          modal:Responsemodel,make:Responsemake,odometer:ResponseOdometer,buildYear:ResponsebuildYear,specs:ResponseSpecs
        }
      );
      setName("")
      setEmail("")
      setPhone("")
      setIsModalOpen(false)

      toast.success("Request Has Been Saved");
      
    } catch (error) {
      console.error("Error fetching car price:", error);
      toast.error("Error fetching price. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-sky-300 min-h-screen flex flex-col justify-center items-center gap-16 px-5 py-10">
      <h1 className="text-3xl md:text-5xl flex flex-col lg:flex-row text-blue-700 font-bold">
        <span>------------------------</span> Get Your Vehicle Price{" "}
        <span>------------------------</span>
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

        <div className="flex flex-col lg:flex-row gap-8">
          <input
            type="number"
            placeholder="Odometer (Km)"
            value={odometer}
            onChange={(e) => setOdometer(e.target.value)}
            className="bg-white w-72 sm:w-80 h-14 px-6 text-lg sm:text-2xl rounded-3xl border border-black shadow-lg"
          />
          <input
            type="text"
            placeholder="Specifications (Trim, Fuel Type, etc.)"
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
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
          <h1 className="text-3xl text-center md:text-5xl flex flex-col lg:flex-row font-bold">
            Pricing for {Responsemake} {Responsemodel} {ResponsebuildYear}
          </h1>
          <p className="text-xl font-bold text-center mt-2">With Kilometer Driven: {ResponseOdometer} Km</p>
          <p className="text-xl font-bold text-center mt-1">Including Specs: {ResponseSpecs}</p>

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
          <div className="w-ful flex justify-center">

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-5 bg-green-600 cursor-pointer hover:bg-green-700 text-white px-6 py-3 rounded-lg text-xl"
            >
            Would you like to sell your vehicle now?
          </button>
            </div>
        </div>
      )}
            {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/80 bg-opacity-90">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[420px]">
            <h2 className="text-2xl text-center font-bold mb-6">Enter Your Details</h2>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full py-3 px-4 border rounded mb-3"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 px-4  border rounded mb-3"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full py-3 px-4 border rounded mb-3"
            />
            <div className="flex justify-between mt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
              onClick={()=>SendEmail()}
                className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Build;
