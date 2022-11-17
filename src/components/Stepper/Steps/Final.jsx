import React, { useEffect, useRef, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useStepperContext } from "../../../contexts/StepperContext";
const REGISTER_URL = "/v1/riders";
import {
  ExclamationCircleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/solid";

const Final = () => {
  const errRef = useRef();

  const { userData, setUserData } = useStepperContext();

  const { errMsg, setErrMsg } = useState("");

  const { loadingState, setLoadingState } = useState("uploading");

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    uploadRiderDetails();
  }, []);

  const uploadImages = async (file, type) => {
    console.log("--------- \n");
    console.log(file.file);
    console.log("--------- \n");

    try {
      var formData = new FormData();
      formData.append("file", file.file);
      formData.append("type", type);
      const uploadResponse = await axiosPrivate.post("/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(uploadResponse);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  const uploadRiderDetails = async () => {
    var licenseImageRes;
    var rcImage;
    var permitImage;
    var emissionImage;
    console.log(userData["licenseImage"]);
    console.log(userData["rcImage"]);
    console.log(userData["permitImage"]);
    console.log(userData["emissionImage"]);

    if (userData["licenseImage"]) {
      licenseImageRes = await uploadImages({
        file: userData["licenseImage"],
        type: "licenseImage",
      });
    }
    if (userData["licenseImage"]) {
      rcImage = await uploadImages({
        file: userData["rcImage"],
        type: "rcImage",
      });
    }
    if (userData["licenseImage"]) {
      permitImage = await uploadImages({
        file: userData["permitImage"],
        type: "permitImage",
      });
    }
    if (userData["licenseImage"]) {
      emissionImage = await uploadImages({
        file: userData["emissionImage"],
        type: "emissionImage",
      });
    }

    try {
      const response = await axiosPrivate.post(
        REGISTER_URL,
        JSON.stringify({
          name: userData["username"],
          email: userData["email"],
          password: userData["password"],
          phoneNumber: userData["phoneNumber"],
          role: "rider",
          birthDate: userData["birthdate"],
          accountNumber: userData["accountNumber"],
          ifscCode: userData["ifscCode"],
          holderName: userData["holderName"],
          upiID: userData["upiID"],
          licenseImage: licenseImageRes?.data.pathName,
          rcImage: rcImage?.data.pathName,
          permitImage: permitImage?.data.pathName,
          emissionImage: emissionImage?.data.pathName,
        })
      );
      setLoadingState("success");
      console.log(response);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
      setLoadingState("error");
    }
  };

  return (
    <div>
      <p
        ref={errRef}
        className={
          errMsg
            ? "errmsg mb-5 p-2 bg-red-400 rounded font-bold text-white"
            : "offscreen"
        }
        aria-live="assertive"
      >
        {errMsg}
      </p>

      {loadingState === "uploading" ? (
        <div>
          <div className="flex justify-center">
            <ColorRing height={100} />
          </div>
          <div className="flex justify-center">
            <div className="text-slate-600 font-bold">Uploading Details</div>
          </div>
        </div>
      ) : loadingState === "error" ? (
        <div>
          <div className="flex justify-center">
            <ExclamationCircleIcon
              height={100}
              className="wpointer-events-none text-red-700"
            />
          </div>
          <div className="flex justify-center">
            <div className="text-slate-600 font-bold">Uploading Details</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center">
            <CheckBadgeIcon
              height={100}
              className="wpointer-events-none text-blue-700"
            />
          </div>
          <div className="flex justify-center">
            <div className="text-slate-600 font-bold">Uploading Details</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Final;
