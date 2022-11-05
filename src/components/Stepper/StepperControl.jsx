import React from "react";

const StepperControl = ({ handleChange, currentStep, steps }) => {
  return (
    <div className="flex justify-between mt-4 mb-10">
      {/* back button */}
      <button
        onClick={() => handleChange()}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-500 hover:text-white transition duration-200 ease-in-out w-30 ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Previous
      </button>

      {/* next button */}
      <button
        onClick={() => handleChange("next")}
        className={`bg-slate-500 text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-green-500 hover:text-white transition duration-200 ease-in-out `}
      >
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;
