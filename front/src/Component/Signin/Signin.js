import React, { useState, useEffect } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import xcode from "../../Images/logo 4.png";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../../Reducers/auth.js";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { errorsignin, successsignin, signupdata } = useSelector(
    (state) => state.user
  );

  const handleSignup = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (successsignin) navigate("/dash");
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
            <button>Login With Google</button>
            <button>Login With Github</button>
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
