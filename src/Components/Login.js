import React, { useRef, useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
    let reEmail = localStorage.getItem("reEmail"); //when user reset password and came to login then email is populated from ResetPassword page as reEmail
    if (reEmail) {
      setEmail(reEmail); //by this email field is pre populated
      passwordRef.current.focus(); // by this if reEmail exist then user came to login after password reset then focus should be on password
      localStorage.clear()
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("email", email);
  }, [email]);

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
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <input
        type="password"
        required
        value={password}
        style={{ width: "200px" }}
        placeholder="ReEnter Your password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button>Login</button>
      <br />
    </div>
  );
};

export default Login;
