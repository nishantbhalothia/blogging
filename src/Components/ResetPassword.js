import React, { useRef, useEffect, useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();
  useEffect(() => {
    passwordRef.current.focus();
  }, []);

  useEffect(()=>{
    let email = localStorage.getItem("email");
    if (email){
        setEmail(email)
        localStorage.setItem("reEmail", email)
    }else{
        emailRef.current.focus();
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("reEmail", email)
  },[email])

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Login Page</h1>
      <input
        type="text"
        required
        placeholder="Enter Your email"
        style={{ width: "200px" }}
        ref={emailRef}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        required
        style={{ width: "200px" }}
        ref={passwordRef}
        value={password}
        placeholder="Enter Your password"
      />
      <br />
      <button>Reset Password</button>
      <br />
    </div>
  );
};

export default ResetPassword;
