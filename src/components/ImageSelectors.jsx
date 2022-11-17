import React from "react";

const ImageSelectors = ({ selectedFile, onFileSelect }) => {
  const handleFileInput = (e) => {
    onFileSelect(e.target.files[0]);
  };

  return (
    <div className="mb-5 text-center">
      <div className="mx-auto w-32 h-32 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
        <img
          id="image"
          className="object-cover w-full h-32 rounded-full"
          src={selectedFile ? URL.createObjectURL(selectedFile) : " "}
        />
      </div>

      <label
        htmlFor="fileInput"
        type="button"
        className="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
          <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
          <circle cx="12" cy="13" r="3" />
        </svg>
        Browse Photo
      </label>

      <div className="mx-auto w-48 text-gray-500 text-xs text-center mt-1">
        Click to add profile picture
      </div>

      <input
        name="photo"
        id="fileInput"
        accept="image/*"
        className="hidden"
        type="file"
        onChange={handleFileInput}
      />
    </div>
  );
};

const SquareImageSelector = ({ selectedFile, onFileSelect, imageType }) => {
  const handleFileInput = (e) => {
    console.log(e.target.files);
    onFileSelect(e.target.files[0]);
  };

  return (
    <div className="mb-5 text-center" id={imageType}>
      <div className="mx-auto w-32 h-32 mb-2 border rounded-md relative bg-gray-100 mb-4 shadow-inset">
        <img
          className="object-cover w-full h-32 rounded-md"
          src={selectedFile ? URL.createObjectURL(selectedFile) : " "}
        />
      </div>

      <label
        htmlFor={"fileInput " + imageType}
        type="button"
        className="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline-flex flex-shrink-0 w-6 h-6 -mt-1 mr-1"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="0" y="0" width="24" height="24" stroke="none"></rect>
          <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
          <circle cx="12" cy="13" r="3" />
        </svg>
        Browse Photo
      </label>

      <div className="mx-auto w-48 text-gray-500 text-xs text-center mt-1">
        Click to add {imageType} picture
      </div>

      <input
        name="photo"
        id={"fileInput " + imageType}
        accept="image/*"
        className="hidden"
        type="file"
        onChange={handleFileInput}
        // onChange={(e) => onFileSelect(e.target.files[0])}
      />
    </div>
  );
};

export { ImageSelectors, SquareImageSelector };
