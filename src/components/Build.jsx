import React, { useState } from "react";
import toast from "react-hot-toast";

const Build = () => {
  const [buildYear, setBuildYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [wholesalePrice, setWholesalePrice] = useState("");
  const [retailPrice, setRetailPrice] = useState("");

  const getPrice = () => {
    if(!buildYear||!make||!model){
      toast.error("Please provide all the details")
      return
    }
    // Dummy pricing logic; replace with actual API call or logic
    const wholesale = `$${(Math.random() * 10000 + 10000).toFixed(2)}`;
    const retail = `$${(Math.random() * 15000 + 15000).toFixed(2)}`;
    setWholesalePrice(wholesale);
    setRetailPrice(retail);
  };

  return (
    <>
      <section className="bg-sky-300  min-h-screen flex flex-col  justify-center items-center gap-16  px-5 lg:px-32 py-10">
       <h1 className="text-5xl text-blue-700 font-bold">--------Get Your Vehicle Price--------</h1>
       <div className="flex flex-col items-center gap-6 justify-center">

       <div className="flex flex-row gap-8">
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
            className="bg-white w-72 sm:w-80 h-14  px-6 text-lg sm:text-2xl rounded-3xl border border-black shadow-lg"
          />
          <input
            type="text"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="bg-white w-72 sm:w-80 h-14  px-6 text-lg sm:text-2xl rounded-3xl border border-black shadow-lg"
          />
        
        </div>
        <button
            onClick={getPrice}
            className="bg-blue-600 text-white w-72 sm:w-80 h-14 hover:cursor-pointer text-lg sm:text-2xl rounded-3xl shadow-lg hover:bg-blue-700"
            >
            Get Price
          </button>
            </div>
      
      {wholesalePrice && retailPrice && (
        <div className="bg-sky-300  flex flex-row justify-center items-center gap-10 px-5 ">
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
      )}
</section>
    </>
  );
};

export default Build;
