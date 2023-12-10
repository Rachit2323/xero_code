import React, { useState, useEffect } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import xcode from "../../Images/logo 4.png";
import { useDispatch, useSelector } from "react-redux";
import {
  signinUser,
  signinGoogle,
  gitsign,
  gitdataUser,
  logout,
} from "../../Reducers/auth.js";
import { useGoogleLogin } from "@react-oauth/google";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const GIT_CLIENT = "88591916336e1bc18179";
  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    dispatch(signinGoogle(accessToken, navigate));
 
        navigate("/signup");
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });
  function githubLogin() {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=` + GIT_CLIENT
    );
       console.log("done");
    navigate("/signup");
           console.log("done");
  }
  const { errorsignin, successsignin, gitdata, signupdata, successsignup } =
    useSelector((state) => state.user);

  useEffect(() => {
    const query_ = window.location.search;

    const url = new URLSearchParams(query_);
    const code = url.get("code");

    if (code) {
      dispatch(gitsign(code));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("accesstoken", gitdata);
    if (gitdata) {
      dispatch(gitdataUser());
    }
  }, [gitdata]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSignup = () => {
    navigate("/signup");
  };
  useEffect(() => {

     if(successsignin)
      navigate("/dash");
    else 
           navigate("/signup");

  
  }, [successsignin]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signinUser(formData));
  };

  return (
    <div className="outer_signin">
      <div className="signin_inside">
        <div className="left_signin">
          <img src={xcode} />
          <span>Welcome {signupdata} !</span>
          <section>
            <p></p>
            <span>Login to your Account</span>
            <p></p>
          </section>
          <div className="all_input">
            <input
              placeholder="Email-id"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <button onClick={handleSubmit}>SIGN IN</button>
          </div>
          <p>OR</p>
          <div className="buttons_signin">
            <button onClick={() => login()}>Login With Google</button>
            <button onClick={githubLogin}>Login With Github</button>
          </div>
          <h3>
            Don’t have an Account ?{" "}
            <strong onClick={handleSignup}>SIGN UP</strong>{" "}
          </h3>
        </div>
        <p></p>
        <div className="right_signin"></div>
      </div>
    </div>
  );
};

export default Signin;
