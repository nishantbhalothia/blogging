import { useState } from "react";
import Blog from "./Components/Blog";
// import Login from "./Components/Login";
// import Reset from "./Components/ResetPassword";

function App() {
  const [form, setForm] = useState("login");
  return (
    <div
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      //   height: "100vh",
      // }}
    >
      <Blog />
      {/* <h1> {form === "login" ? "Welcome" : "Remember Password for future login"} </h1>
      {form === "login" ? <Login /> : <Reset />}
      <button onClick={(e) => setForm(form === "login" ? "reset" : "login")}>
        {" "}
        {form === "login" ? "Reset Password " : "Back to login"}{" "}
      </button> */}
    </div>
  );
}

export default App;
