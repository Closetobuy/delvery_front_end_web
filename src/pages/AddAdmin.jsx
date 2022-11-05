import React, { useState, useEffect, useRef } from "react";
import { Header } from "../components";
import Dropdown from "../components/Dropdown";
import { ColorRing } from "react-loader-spinner";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { USER_REGEX, PWD_REGEX, EMAIL_REGEX } from "../utils/regex";
const REGISTER_URL = "/v1/users";
import { useNavigate, useLocation } from "react-router-dom";
import { ImageSelectors } from "../components/ImageSelectors";

const AddAdmin = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [userFocus, setUserFocus] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [role, setRole] = useState("");
  const [validRole, setValidRole] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidRole(role === "Admin" || role === "User");
  }, [role]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = role === "Admin" || role === "User" ? true : false;
    setValidRole(result);
  }, [role]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v2 = PWD_REGEX.test(pwd);
    if (!v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    if (!role) {
      setErrMsg("Please select role");
      errRef.current.focus();
      return;
    }
    setLoading(true);
    try {
      const response = await axiosPrivate.post(
        REGISTER_URL,
        JSON.stringify({
          name: user,
          email: email,
          password: pwd,
          role: role === "Admin" ? "admin" : "user",
        })
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser("");
      setPwd("");
      setMatchPwd("");
      setEmail("");
      setRole("");
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
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Add" title="Admin" />
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

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 mb-6">
          <div>
            <ImageSelectors
              selectedFile={selectedFile}
              onFileSelect={(file) => setSelectedFile(file)}
            />
          </div>
          <div className="grid gap-6">
            <div className="form-group md:grid-cols-2 flex flex-col justify-center items-center">
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                placeholder="Full name"
                min={4}
                required
                aria-describedby="uninote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
            </div>
            <div>
              <Dropdown selectRole={setRole} role={role}>
                {" "}
              </Dropdown>
              {emailFocus && !validEmail ? (
                <div
                  id="confirmnote"
                  className={"flex flex-row gap-2 -mt-4 mb-3"}
                >
                  <ExclamationCircleIcon
                    className={"w-5 text-gray-500 items-center justify-center"}
                  ></ExclamationCircleIcon>
                  <p className={"flex-grow text-black text-sm items-center"}>
                    Enter a valid email.
                  </p>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>

        <div className="form-group mb-6">
          <input
            type="email"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            value={email}
            placeholder="Email address"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
        </div>
        {emailFocus && !validEmail ? (
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
        )}
        <div className="relative flex block form-group mb-6">
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
          />
          {/* <label
            onClick={() => setShowPassword(!showPassword)}
            class="bg-transparent hover:bg-gray-400 cursor-pointer "
            for="toggle"
          > */}

          {/* </label> */}
        </div>
        {pwdFocus && !validPwd ? (
          <div id="confirmnote" className={"flex flex-row gap-2 -mt-4 mb-3"}>
            <ExclamationCircleIcon
              className={"flex-none w-5 text-gray-500"}
            ></ExclamationCircleIcon>
            <p
              className={
                "flex-grow self-center text-black text-sm items-center"
              }
            >
              Must Containe Uppercase, Lowercase, Special Symbols (!, @, $),
              Number, Length - 8.
            </p>
          </div>
        ) : (
          <div></div>
        )}
        <div className="form-group mb-6 relative">
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
              className={
                "flex-grow self-center text-black text-sm items-center"
              }
            >
              Must match both password field.
            </p>
          </div>
        ) : (
          <div></div>
        )}
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
        <div className="flex flex-col items-center">
          {isLoading ? (
            <ColorRing height={35} />
          ) : (
            <button
              type="submit"
              disabled={
                !validPwd || !validMatch || !validEmail || !validRole
                  ? true
                  : false
              }
              className="mt-5 px-6 py-2.5 bg-blue-600 text-white text-center font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Add Admin
            </button>
          )}
        </div>
      </form>

      {/* <button onClick={() => refresh()}>Refresh</button> */}
      {/* <GridComponent
        dataSource={employeesData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective> */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      {/* {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />

      </GridComponent> */}
    </div>
  );
};

export default AddAdmin;
