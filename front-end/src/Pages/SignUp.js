import React, { useState } from "react";
import { userSignUp } from "../Services/Firebase";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const API = process.env.REACT_APP_API;

export default function SignUp() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await userSignUp(input.email, input.password, input.userName);
      
      if (res) {
        const newUser = { email: input.email, password: input.password };
        const result = await axios.post(`${API}/users`, newUser);

        if (result.data.success) {
          navigate("/dashboard");
        } else {
          console.warn("Could not add new user to the backend database");
        }
      } else {
        toast.error("Please enter all required info", { toastId: "customId" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="Landing-Container">
      <div className="SignIn-Form ">
        <p> &nbsp; </p>
        <div className=" newForm three-d">
          &nbsp;
          <form onSubmit={handleSignUp}>
            <span className="SignIn-Labels">
              <label htmlFor="userName">Please Enter Your Name</label>
              <input
                type="text"
                id="userName"
                value={input.userName}
                onChange={handleChange}
                placeholder="Name"
              />
              <label htmlFor="email">Please Enter your Email</label>
              <input
                type="email"
                id="email"
                value={input.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <label htmlFor="password">Select a Password (min 6 characters)</label>
              <input
                type="password"
                id="password"
                value={input.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </span>
            <button type="submit" className="Login SignUp pg-buttons">
              Sign Up
            </button>
          </form>
          <ToastContainer autoClose={false} position="center" />
        </div>
      </div>
    </div>
  );
}
