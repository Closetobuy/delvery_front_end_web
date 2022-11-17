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
    </div>
  );
};

export default AccountInformation;
