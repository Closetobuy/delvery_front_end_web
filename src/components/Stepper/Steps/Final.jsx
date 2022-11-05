import React, { useEffect, useRef, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useStepperContext } from "../../../contexts/StepperContext";
const REGISTER_URL = "/v1/riders";

const Final = () => {
  const errRef = useRef();

  const { userData, setUserData } = useStepperContext();

  const { errMsg, setErrMsg } = useState("");

  const { isLoading, setLoading } = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    uploadRiderDetails();
  }, []);

  const uploadRiderDetails = async (e) => {
    setLoading(true);

    try {
      const response = await axiosPrivate.post(
        REGISTER_URL,
        JSON.stringify({
          name: userData["username"],
          email: userData["email"],
          password: userData["password"],
          phoneNumber: userData["phoneNumber"],
          role: "rider",
        })
      );
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
    }

    setLoading(false);
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

      <div>
        <div className="flex justify-center">
          <ColorRing height={100} />
        </div>
        <div className="flex justify-center">
          <div className="text-slate-600 font-bold">Uploading Details</div>
        </div>
      </div>
    </div>
  );
};

export default Final;
