import React, { useRef, useState, useEffect } from 'react';
import Tilt from 'react-parallax-tilt';
import useAuth from '../../hooks/useAuth';
import { loginFields } from '../../constants';
import axios from '../../api/axios';
const LOGIN_URL = '/v1/auth/login';

// eslint-disable-next-line react/destructuring-assignment
// const fields = loginFields;
// let fieldsState={};
// fields.forEach(field=>fieldsState[field.id]);
const Login = () => {
  const { setAuth } = useAuth();
  const userRef=useRef();
  const errRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState('');

    //   useEffect(() => {
    //     userRef.current.focus();
    //   }, [])
    
  useEffect(() => {
    setErrMsg('');
  }, [email, password])
   

  const handleSubmit = async (e) => {
    e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({'email':email,'password':password}),
            {headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'true'}, withCredentials:false});
            console.log(JSON.stringify(response?.data));
            const accessToken = respnse?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, accessToken});
            setEmail('');
            setPwd('');
            setSuccess(ture)
        } catch(err) {
            if(!err?.response) {
                setErrMsg('No Server Response');
            } else if (err?.response?.code === 400) {
                setErrMsg("Missing Username or Password")
            } else if (err.response?.code === 401) {

            } else if (err.response?.code === 404) {
                setErrMsg("Login Failed hehehe" );

            } else {
                setErrMsg("Login Failed");
            }
            console.log(err?.response);
            console.log(err?.response?.stack);
            console.log("Hello");


            errRef.current.focus();
        }
        console.log(email, password);
        setEmail('');
        setPwd('');
        setSuccess(true);
    }

  return (
    <section>
        <div className = 'h-screen w-screen bg-main-dark-bg relative overflow-hidden flex flex-col justify-center items-center'>
        <div className = 'h-40-r w-40-r bg-gradient-to-r from-green-400 to-blue-500 rounded-full absolute left-2/3 -top-56'/> 
        { 
        // animate pulse for puling effect 
        }
        <div className = 'h-35-r w-35-r bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 rounded-full absolute top-96 -left-20'/>
        <Tilt>
            <div className = 'container h-96 w-96 bg-white bg-opacity-10 relative z-2 rounded-2xl shadow-5xl border-0.5 border-r-0 border-b-0 border-opacity-30 backdrop-filter backdrop-blur-sm'>
            <form className = 'h-full flex flex-col justify-evenly items-center' onSubmit = {handleSubmit}>
                <div className = 'font-poppins text-white text-2xl tracking-wider'>Login</div>  
                    <>{
                        success ? (
                            <section>
                            {/* <h1> You are logged in!</h1>
                            <br/>
                            <p>
                                <a>Go to home</a>
                            </p> */}
                              <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
           
                            </section>) : (
                                <div>
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
                            </div>
                            )
                        }</>
                    <input type='Submit' className='font-poppins cursor-pointer px-5 py-1 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80'/>
                </form>
                </div>
            </Tilt>
            </div>
      </section>
        
     
       
            /* <section>
            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor='username'>UserName:</label>
              <input type='text' id='username' ref={userRef} autoComplete='off' onChange={(e) => setEmail(e.target.value)} value={user} required/>
              <label htmlFor='password'>Password:</label>
              <input type='password' id='password' onChange={(e) => setPwd(e.target.value)} value={pwd} required/>
              <button>Sign In</button>
            </form>
        </section> */
  );
};

export default Login;
