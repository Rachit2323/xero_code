import React, { useEffect, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import xcode from "../../Images/logo 4.png";
import { signupUser } from "../../Reducers/auth.js";

const Signup = () => {
  const [typei, setType] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputtype, setInputType] = useState(true);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleTypehosting = () => {};

  // useEffect(() => {
  //   console.log(inputtype);
  //   if (!inputtype) setInputType(true);
  // }, [inputtype]);

  const handleSubmitInput = async() => {
    console.log("check");
    setInputType(false);

    if (typei === "organisation") {
      // dispatch({ organisation: inputValue });
    } else if (typei === "company") {
      // dispatch({ company: inputValue });
    } else {
      // dispatch({ developer: "developer" });
    }
  };

  const { errorsignup, successsignup } = useSelector((state) => state.user);

  const handleType = (type_) => {
    setType(type_);
    console.log(type_);
  };
  const handleLogin = () => {
    navigate("/");
  };

  useEffect(() => {
    if (successsignup) navigate("/dash");
  }, [successsignup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };
  return (
    <div className="outer_signup">
      {successsignup && (
        <div className="signup_inside">
          <div className="left_signup">
            <img src={xcode} />
            <span>Hello!</span>
            <section>
              <p></p>
              <span>Create your Account</span>
              <p></p>
            </section>
            <div className="all_input">
              <input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
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
              <input
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />

              <button onClick={handleSubmit}>SIGN UP</button>
            </div>
            <p>OR</p>
            <div className="buttons_signup">
              <button>Sign Up With Google</button>
              <button>Sign Up With Github</button>
            </div>
            <h3>
              Already have an Account ?{" "}
              <strong onClick={handleLogin}>LOGIN</strong>{" "}
            </h3>
          </div>
          <p></p>
          <div className="right_signup"></div>
        </div>
      )}

      {!successsignup && (
        <div className="signup_inside1">
          <img src={xcode} />
          <span>Welcome !</span>
          <section>
            <p></p>
            <span>
              {inputtype === false
                ? "Choose from the following"
                : "Choose from the following Deployment options"}
            </span>
            <p></p>
          </section>
          {inputtype ? (
            <div className="all_button_select">
              <button
                style={{
                  background: typei === "developer" ? "#1F64FF" : "",
                  color: typei === "developer" ? "white" : "",
                }}
                // onClick={() => handleType("developer")}
                onClick={handleSubmitInput}
              >
                Developer
              </button>

              <button
                style={{
                  background: typei === "organisation" ? "#1F64FF" : "",
                  color: typei === "organisation" ? "white" : "",
                }}
                onClick={() => handleType("organisation")}
              >
                Organisation
              </button>
              <button
                style={{
                  background: typei === "company" ? "#1F64FF" : "",
                  color: typei === "company" ? "white" : "",
                }}
                onClick={() => handleType("company")}
              >
                Company
              </button>
            </div>
          ) : (
            <div className="all_button_select">
              <button className="hover_buton" onClick={handleTypehosting}>
                Self Hosting
              </button>

              <button className="hover_buton" onClick={handleTypehosting}>
                XeroCodee Hosting
              </button>
            </div>
          )}
          {(inputtype) && (
            <div className="input_button_types">
              <input
                placeholder={
                  typei === "organisation"
                    ? "Organisation Name"
                    : "Company Name"
                }
                type="text"
                id="inputField"
                value={inputValue}
                onChange={handleInputChange}

                // value={formData.firstName}
              />
              <button onClick={handleSubmitInput}>SUBMIT</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Signup;
