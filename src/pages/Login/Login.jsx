import React, { useRef, useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import useAuth from '../../hooks/useAuth';
import { loginFields } from '../../constants';
import axios from '../../api/axios';
const LOGIN_URL = '/v1/auth/login';

// eslint-disable-next-line react/destructuring-assignment
// const fields = loginFields;
// let fieldsState={};
// fields.forEach(field=>fieldsState[field.id]);
const Login = () => {
  const { auth, setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // const to = "/ecommerce";

  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  },[]);
    
  useEffect(() => {
    setErrMsg('');
  }, [email, password]);
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(email + "   " + password);
        const response = await axios.post(LOGIN_URL, JSON.stringify({'email':email,'password':password}),
        {headers: {'Content-Type':'application/json'}});
        console.log(JSON.stringify(response));

        console.log(JSON.stringify(response?.data));
        const accessToken = response?.data?.tokens.access.token;
        const refreshToken = response?.data?.tokens.refresh.token;
        const role = response?.data?.user.role;
        const isEmailVerified = response?.data?.isEmailVerified;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        setAuth({ email, password, role, accessToken , refreshToken});
        setEmail('');
        setPwd('');
        // setLoading(true);
        // console.log(to);
        console.log(auth);
        navigate(from, {replace:true});
    } catch(err) {
        console.log("error caught");
        console.log(err);
        if(!err?.response) {
            setErrMsg('No Server Response');
        } else if (err?.response?.data?.code === 400) {
            setErrMsg("Missing Username or Password")
        } else if (err.response?.data?.code === 401) {
            setErrMsg(err?.response?.data?.message);
        } else if (err.response?.data?.code === 404) {
            setErrMsg("Login Failed" );
        } else {
            setErrMsg(err?.response?.data?.message);
        }
        errRef.current.focus();
        setLoading(false);
    }
  }

  return (
    <section>
        <div className = 'h-screen w-screen bg-main-dark-bg relative overflow-hidden flex flex-col justify-center items-center'>
        <div className = 'h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56'/> 
        { /* animate-pulse for puling effect */ }
        <div className = 'h-35-r w-35-r bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 rounded-full absolute top-96 -left-20'/>
          <div className = 'container h-96 w-96 bg-white bg-opacity-10 relative z-2 rounded-2xl shadow-5xl border-0.5 border-r-0 border-b-0 border-opacity-30 backdrop-filter backdrop-blur-sm'>
          <form className = 'h-full flex flex-col justify-evenly items-center' onSubmit = {handleSubmit}>
              {/* <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>  */}
            <div className = 'flex flex-row gap-2'>
              <ExclamationCircleIcon ref={errRef} className={errMsg ? 'flex-none h-10 w-10 text-white' : 'offscreen'}></ExclamationCircleIcon>
              <p ref={errRef} className={errMsg ? 'errMsg flex-grow self-center text-white items-center' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            </div> 
              <div className = 'font-poppins text-white text-2xl tracking-wider'>delvery Login</div>         
                  <input 
                    type='text'
                    id='username'
                    ref={userRef}  
                    autoComplete='off'
                    onChange={(e) => setEmail(e.target.value)}
                    className='input-text'
                    placeholder='User Name'
                    value = {email}
                    required
                  />
                  <input 
                    type='password'
                    id='password'
                    onChange={(e) => setPwd(e.target.value)}
                    className='input-text'
                    placeholder='Password'
                    value={password}
                    required
                  />
                 {isLoading ? <input type='Submit' className='font-poppins cursor-pointer px-5 py-1 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80'/> : <input type='Submit' className='font-poppins cursor-pointer px-5 py-1 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80'/>}
              </form>
              </div>
          </div>
    </section>
  );
};

export default Login;
