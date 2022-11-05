import React, { useState, useContext, useEffect, useRef } from "react";
import { useStepperContext } from "../../../contexts/StepperContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { USER_REGEX, PWD_REGEX, EMAIL_REGEX } from "../../../utils/regex";
const REGISTER_URL = "/v1/users";
import { useNavigate, useLocation } from "react-router-dom";
import GenericInput from "../../InputFields/GenericInput";
import PasswordInput from "../../InputFields/PassowrdInput";
import getSubtractedDate from "../../../utils/dateTime";

const BankDetails = () => {
  const { userData, setUserData } = useStepperContext();

  const errRef = useRef(null);

  const [accNum, setAccNum] = useState("");
  const [accFocus, setAccFocus] = useState(false);

  const [ifscCode, setifscCode] = useState("");
  const [validifsc, setValidIFSC] = useState(false);
  const [ifscFocus, setIFSCFocus] = useState(false);

  const [holderName, setHolderName] = useState("");
  const [validHolder, setValidHolder] = useState(false);
  const [holderFocus, setHolderFocus] = useState(false);

  const [upiNo, setUPINo] = useState("");
  const [validUPINo, setValidUPI] = useState(false);
  const [upiNoFocus, setUPINoFocus] = useState(false);

  const [errMsg, setErrMsg] = useState();

  useEffect(() => {
    setErrMsg("");
  }, [accNum, ifscCode, holderName, upiNo]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(e.target.id);
    setUserData({ ...userData, [id]: value });
    console.log(userData);
  };

  return (
    <div>
      <GenericInput
        type="text"
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="accountNumber"
        autoComplete="off"
        onChange={handleChange}
        isRequired={true}
        name="accountNumber"
        value={userData["accountNumber"] || ""}
        placeHolder="Account Number"
        aria-describedby="uninote"
        onFocus={() => {
          setAccFocus(true);
        }}
        onBlur={() => {
          setAccFocus(false);
        }}
        isFocused={accFocus}
        isValid={true}
        invalidText={"Enter a valid email."}
      />

      <GenericInput
        type="text"
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="ifsc"
        autoComplete="off"
        onChange={handleChange}
        isRequired={true}
        value={userData["ifsc"] || ""}
        placeHolder="IFSC Code"
        aria-describedby="uninote"
        onFocus={() => {
          setIFSCFocus(true);
        }}
        onBlur={() => {
          setIFSCFocus(false);
        }}
        isFocused={ifscFocus}
        isValid={true}
        invalidText={"Enter a valid IFSC code."}
      />
      {/* {emailFocus && !validEmail ? (
        <div id="confirmnote" className={"flex flex-row gap-2 -mt-4 mb-3"}>
          <ExclamationCircleIcon
            className={
              "flex-none w-5 text-gray-500 items-center justify-center"
            }
          ></ExclamationCircleIcon>
          <p className={"flex-grow text-black text-sm items-center"}>
            Enter a valid email.
          </p>
        </div>
      ) : (
        <div></div>
      )} */}
      <GenericInput
        type="text"
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="holderName"
        autoComplete="off"
        onChange={handleChange}
        isRequired={true}
        value={userData["holderName"] || ""}
        placeHolder="Acc. Holder Name"
        aria-describedby="uninote"
        onFocus={() => {
          setHolderFocus(true);
        }}
        onBlur={() => {
          setHolderFocus(false);
        }}
        isFocused={holderFocus}
        isValid={true}
        invalidText={"Enter a valid Holder Name."}
      />
      <GenericInput
        type="text"
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="upinumber"
        autoComplete="off"
        onChange={handleChange}
        isRequired={true}
        value={userData["upinumber"] || ""}
        placeHolder="UPI ID"
        aria-describedby="uninote"
        onFocus={() => {
          setUPINoFocus(true);
        }}
        onBlur={() => {
          setUPINoFocus(false);
        }}
        isFocused={upiNoFocus}
        isValid={true}
        invalidText={"Enter a valid UPI Number."}
      />
      {/* <div className="relative flex block form-group mb-6">
        {showPassword ? (
          <EyeIcon
            height={10}
            width={10}
            className="wpointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-3 text-blue-400"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <EyeSlashIcon
            height={12}
            width={12}
            className="wpointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
        <input
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPwd(e.target.value)}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          value={pwd}
          className="form-control w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="password"
          placeholder="Password"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          isFocused={pwdFocus}
          isValid={validEmail}
        />
      </div> */}
      {/* {pwdFocus && !validPwd ? (
        <div id="confirmnote" className={"flex flex-row gap-2 -mt-4 mb-3"}>
          <ExclamationCircleIcon
            className={"flex-none w-5 text-gray-500"}
          ></ExclamationCircleIcon>
          <p
            className={"flex-grow self-center text-black text-sm items-center"}
          >
            Must Containe Uppercase, Lowercase, Special Symbols (!, @, $),
            Number, Length - 8.
          </p>
        </div>
      ) : (
        <div></div>
      )} */}
      {/* <div className="form-group mb-6 relative">
        {showPassword ? (
          <EyeIcon
            height={10}
            width={10}
            className="wpointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-3 text-blue-400"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <EyeSlashIcon
            height={12}
            width={12}
            className="wpointer-events-none w-5 h-5 absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
        <input
          type={showPassword ? "text" : "password"}
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          required
          value={matchPwd}
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="cofirmnote"
          placeholder="Confirm Password"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
      </div>
      {matchFocus && !validMatch ? (
        <div id="confirmnote" className={"flex flex-row gap-2 -mt-4 mb-3"}>
          <ExclamationCircleIcon
            className={"flex-none w-5 text-gray-500"}
          ></ExclamationCircleIcon>
          <p
            className={"flex-grow self-center text-black text-sm items-center"}
          >
            Must match both password field.
          </p>
        </div>
      ) : (
        <div></div>
      )} */}
      {/* <Dropdown> </Dropdown> */}
      {/* <div className="form-group form-check text-center mb-6">
          <input
            type="checkbox"
            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
            id="exampleCheck25"
            onChange={() => {}}
            checked
          />
          <label className="form-check-label inline-block text-gray-800">
            Subscribe to our newsletter
          </label>
        </div> */}
    </div>
  );
};

export default BankDetails;
