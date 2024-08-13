import "./LoginPage.css";
import React, { useContext, useState } from "react";
import envelope from "../../assets/envelope.svg";
import lock from "../../assets/lock.svg";
import person from "../../assets/person-circle.svg";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../UserContext";
import MainPageFooter from "../Footer/MainPageFooter";

function LoginPage() {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  async function register(e) {
    e.preventDefault();
    try {
      console.log("resgister clicked");
      await axios.post("http://localhost:4000/register", {
        name,
        email,
        password,
      });
      alert("Registration Successfull. Now you can log in");
    } catch (e) {
      alert("Registration Failed");
    }
  }

  async function login(e) {
    e.preventDefault();
    try {
      console.log("login clicked");
      const { data } = await axios.post("http://localhost:4000/login", {
        email,
        password,
        // startDate,
        // endDate,
      });
      setUser(data.UserDoc);
      alert("Successfully LoggedIn");
      setRedirect(true);
    } catch (e) {
      alert("Login Failed");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <form>
        <div className="container97 mt-10">
          <div className="header97">
            <div className="text97">{action}</div>
            <div className="underline97"></div>
          </div>
          <div className="inputs97">
            {action === "Login" ? null : (
              <div className="input97">
                <img src={person} alt="personicon" />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            )}
            <div className="input97">
              <img src={envelope} alt="emailicon" />
              <input
                type="email"
                placeholder="Email Id"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="input97">
              <img src={lock} alt="lockicon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          {action === "Sign Up" ? null : (
            <div className="forgot-password97">
              Lost password? <span>Click Here!</span>
            </div>
          )}
          <div className="submit-container97">
            <button>
              <Link
                to={"/register"}
                className={action === "Login" ? "submit97 gray" : "submit97"}
                onClick={(e) => {
                  if (action === "Login") {
                    setAction("Sign Up");
                  } else {
                    register(e);
                  }
                }}
              >
                Sign Up
              </Link>
            </button>
            <button>
              <Link
                to={"/login"}
                className={action === "Sign Up" ? "submit97 gray" : "submit97"}
                onClick={(e) => {
                  if (action === "Sign Up") {
                    setAction("Login");
                  } else {
                    login(e);
                  }
                }}
              >
                Login
              </Link>
            </button>
          </div>
        </div>
      </form>
      <MainPageFooter />
    </>
  );
}

export default LoginPage;
