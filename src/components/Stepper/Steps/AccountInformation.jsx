import React, { useContext, useRef, useState, useEffect } from "react";
import { useStepperContext } from "../../../contexts/StepperContext";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { USER_REGEX, PWD_REGEX, EMAIL_REGEX } from "../../../utils/regex";
const REGISTER_URL = "/v1/users";
import { useNavigate, useLocation } from "react-router-dom";
import GenericInput from "../../InputFields/GenericInput";
import PasswordInput from "../../InputFields/PassowrdInput";
import getSubtractedDate from "../../../utils/dateTime";

const AccountInformation = () => {
  const { userData, setUserData } = useStepperContext();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");

  const [userFocus, setUserFocus] = useState(false);

  const [role, setRole] = useState("");
  const [validRole, setValidRole] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [dob, setDOB] = useState("");
  const [validDOB, setValidDOB] = useState(false);
  const [dobFocus, setDOBFocus] = useState(false);

  const [phoneNo, setPhoneNo] = useState();
  const [validPhoneNo, setValidPhoneNo] = useState(false);
  const [phoneNoFocus, setPhoneNoFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const current = new Date().toISOString().split("T")[0];

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(userData["email"]);
    setValidEmail(result);
  }, [userData["email"]]);

  useEffect(() => {
    const result = PWD_REGEX.test(userData["password"]);
    setValidPwd(result);
    setValidMatch(userData["password"] === userData["confirmpwd"]);
  }, [userData["password"], userData["confirmpwd"]]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, email]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData({ ...userData, [id]: value });
    console.log(userData);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div className="form-group mb-6">
          <input
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={handleChange}
            value={userData["username"] || ""}
            placeholder="Full name"
            required
            aria-describedby="uninote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
          />
        </div>
        <div className="form-group mb-6">
          <div className="form-control block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none">
            <p className="z-10 h-full font-sm absolute text-center text-black absolute bg-transparent rounded text-base items-center justify-center w-8 pl-2 pt-1.5">
              +91
            </p>
            <input
              type="text"
              placeholder="Phone Number"
              maxLength={10}
              onChange={handleChange}
              id="phoneNumber"
              value={userData["phoneNumber"] || ""}
              className="relative bg-white text-sm rounded form-control border-0 shadow outline-none border-solid focus:text-gray-700 focus:bg-white focus:border focus:border-blue-600 w-full pl-10"
            />
          </div>
        </div>
      </div>
      <div className="form-group mb-6">
        <input
          type="date"
          placeholder="Enter BirthDate"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          value={userData["birthdate"] || ""}
          autoComplete="off"
          required
          onChange={handleChange}
          id="birthdate"
          onFocus={() => {
            setDOBFocus(true);
          }}
          onBlur={() => {
            setDOBFocus(false);
          }}
          max={getSubtractedDate()}
        />
      </div>
      <GenericInput
        type="text"
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="email"
        autoComplete="off"
        onChange={handleChange}
        isRequired={true}
        value={userData["email"] || ""}
        placeHolder="Email address"
        aria-describedby="uninote"
        onFocus={() => {
          setEmailFocus(true);
        }}
        onBlur={() => {
          setEmailFocus(false);
        }}
        isFocused={emailFocus}
        isValid={validEmail}
        invalidText={"Enter a valid email."}
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
      <PasswordInput
        type={showPassword ? "text" : "password"}
        onChange={handleChange}
        required
        aria-invalid={validPwd ? "false" : "true"}
        aria-describedby="pwdnote"
        value={userData["password"] || ""}
        className="form-control w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="password"
        placeHolder="Password"
        onFocus={() => setPwdFocus(true)}
        onBlur={() => setPwdFocus(false)}
        isFocused={pwdFocus}
        isValid={validPwd}
        invalidText={
          "Must Containe Uppercase, Lowercase, Special Symbols (!, @, $),Number, Length - 8."
        }
        showPassword={showPassword}
        setShowPassword={() => setShowPassword(!showPassword)}
      />
      <PasswordInput
        type={showPassword ? "text" : "password"}
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        id="confirmpwd"
        onChange={handleChange}
        required
        value={userData["confirmpwd"] || ""}
        aria-invalid={validMatch ? "false" : "true"}
        aria-describedby="cofirmnote"
        placeHolder="Confirm Password"
        onFocus={() => setMatchFocus(true)}
        onBlur={() => setMatchFocus(false)}
        isFocused={matchFocus}
        isValid={validMatch}
        invalidText={"Must match both password field."}
        showPassword={showPassword}
        setShowPassword={() => setShowPassword(!showPassword)}
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

export default AccountInformation;
