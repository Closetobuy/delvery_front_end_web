import React, { useRef, useState, useEffect } from 'react';

// eslint-disable-next-line react/destructuring-assignment

const Login = () => {

    const userRef=useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [user, pwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        setUser('');
        setPwd('');
        setSuccess(true);
    }

    return (
        // <h1> Hello World! </h1>
        <section>
            <p ref={errRef} className={errMsg ? 'errMsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <form onSubmit={handleSubmit}>
              <label htmlFor='username'>UserName:</label>
              <input type='text' id='username' ref={userRef} autoComplete='off' onChange={(e) => setUser(e.target.value)} value={user} required/>
              <label htmlFor='password'>Password:</label>
              <input type='password' id='password' onChange={(e) => setPwd(e.target.value)} value={pwd} required/>
              <button>Sign In</button>
            </form>
        </section>
    );
}

export default Login;
