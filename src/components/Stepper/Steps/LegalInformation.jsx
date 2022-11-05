import React, { useEffect, useState } from "react";
import { ImageSelectors, SquareImageSelector } from "../../ImageSelectors";

const LegalInformation = () => {
  const [licenseImage, setLicenseImage] = useState(null);
  const [rcImage, setRCImage] = useState(null);
  const [permitImage, setPermitImage] = useState(null);
  const [emissionCertificate, setEmissionCertificate] = useState(null);

  useEffect(() => {
    console.log(licenseImage);
    console.log(rcImage);
    console.log(permitImage);
    console.log(emissionCertificate);
  }, [licenseImage, rcImage, permitImage, emissionCertificate]);

  return (
    <div>
      {/* Select License Image */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <SquareImageSelector
          selectedFile={licenseImage}
          onFileSelect={(licenseImage) => setLicenseImage(licenseImage)}
          imageType={"License"}
        />

        {/* <div>{"Hello World"}</div> */}

        {/* Select RC Image */}
        {/* <div>{"Hello World"}</div> */}

        <SquareImageSelector
          selectedFile={rcImage}
          onFileSelect={(rcImage) => {
            console.log(rcImage);
            setRCImage(rcImage);
          }}
          imageType={"RC"}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Select Permit Image */}
        <SquareImageSelector
          selectedFile={permitImage}
          onFileSelect={(permitImage) => setPermitImage(permitImage)}
          imageType={"Permit"}
        />

        {/* Select Emission Certificate Image */}
        <SquareImageSelector
          selectedFile={emissionCertificate}
          onFileSelect={(emissionCertificate) =>
            setEmissionCertificate(emissionCertificate)
          }
          imageType={"Emission"}
        />
      </div>
    </div>
  );
};

export default LegalInformation;
