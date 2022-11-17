import React, { useEffect, useState } from "react";
import { ImageSelectors, SquareImageSelector } from "../../ImageSelectors";
import { useStepperContext } from "../../../contexts/StepperContext";

const LegalInformation = () => {
  const [licenseImage, setLicenseImage] = useState(null);
  const [rcImage, setRCImage] = useState(null);
  const [permitImage, setPermitImage] = useState(null);
  const [emissionCertificate, setEmissionCertificate] = useState(null);

  const { userData, setUserData } = useStepperContext();

  const handleChange = ({ imageType, file }) => {
    // const { id, value } = e.target;
    console.log(imageType);
    console.log(file);
    setUserData({ ...userData, [imageType]: file });
    console.log(userData);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Select License Image */}
        <SquareImageSelector
          selectedFile={licenseImage}
          onFileSelect={(licenseImage) => {
            setLicenseImage(licenseImage);
            handleChange({ imageType: "licenseImage", file: licenseImage });
          }}
          imageType={"License"}
        />

        {/* Select RC Image */}
        <SquareImageSelector
          selectedFile={rcImage}
          onFileSelect={(rcImage) => {
            setRCImage(rcImage);
            handleChange({ imageType: "rcImage", file: rcImage });
          }}
          imageType={"RC"}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Select Permit Image */}
        <SquareImageSelector
          selectedFile={permitImage}
          onFileSelect={(permitImage) => {
            setPermitImage(permitImage);
            handleChange({ imageType: "permitImage", file: permitImage });
          }}
          imageType={"Permit"}
        />

        {/* Select Emission Certificate Image */}
        <SquareImageSelector
          selectedFile={emissionCertificate}
          onFileSelect={(emissionCertificate) => {
            setEmissionCertificate(emissionCertificate);
            handleChange({
              imageType: "emissionImage",
              file: emissionCertificate,
            });
          }}
          imageType={"Emission"}
        />
      </div>
    </div>
  );
};

export default LegalInformation;
