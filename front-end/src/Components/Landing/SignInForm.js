import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../css/SignInForm.css";
import { userGoogleSignIn, userSignIn } from "../../Services/Firebase";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const API = process.env.REACT_APP_API;

function SignInForm() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signIn = async (e) => {
    e.preventDefault();

    try {
      let res = await userSignIn(input.email, input.password);

      if (res === null) {
        toast.error("Wrong email or password. Please try again", {
          toastId: "customId",
        });
        setInput({ email: "", password: "" });
      } else {
        if (res && res.uid) {
          navigate("/dashboard");
        } else {
          toast.error("Wrong email or password. Please try again", {
            toastId: "customId",
          });
          setInput({ email: "", password: "" });
        }
      }
    } catch (e) {
      console.error(e);
      alert(e);
    }
  };

  const signInGoogle = async (e) => {
    try {
      let res = await userGoogleSignIn();
      if (res.email) {
        const { email } = res;
        let checkUser = await axios.get(`${API}/users/${email}`);
        if (checkUser.data.success) {
          navigate("/dashboard");
        } else {
          const newUser = { email: res.email, password: "password" };
          let result = await axios.post(`${API}/users`, newUser);
          if (result.data.success) {
            navigate("/dashboard");
          } else {
            console.warn("could not add new user to backend database");
          }
        }
      } else {
        console.warn("Google user could not sign in");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div className="SignIn-Form ">
      <p> &nbsp; </p>
      <div className=" newForm three-d">
        &nbsp;
        <form onSubmit={signIn}>
          <span className="SignIn-Labels">
            <label htmlFor="Email">Please Enter Your Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="Email"
            />{" "}
            <label htmlFor="Password">Please Enter Your Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="on"
            />{" "}
          </span>
          <button type="submit" className="Login pg-buttons">
            Sign In
          </button>
          <div className="divider"></div>
        </form>
        <button
          type="button"
          className="Login pg-buttons"
          onClick={signInGoogle}
        >
          Sign In with Google
        </button>
        <div className="divider"></div>
        <Link to="/signup" className="SignUp-But">
          <p> Dont have an account? Click Here to make one!</p>
        </Link>
      </div>
      <ToastContainer autoClose={false} position="center" />
    </div>
  );
}

export default SignInForm;
