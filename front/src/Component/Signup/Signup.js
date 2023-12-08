import React, { useEffect, useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import xcode from "../../Images/logo 4.png";
import { signupUser, signinGoogle, gitsign,gitdataUser } from "../../Reducers/auth.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useGoogleLogin } from "@react-oauth/google";
import { useParams, useLocation } from "react-router-dom";
const Signup = () => {
  const [typei, setType] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputtype, setInputType] = useState(true);

  // console.log(user);

 

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

  
  }, [location.search]);

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const {  successsignup, gitdata ,successsignin} = useSelector(
    (state) => state.user
  );


   console.log(successsignup);

  const GIT_CLIENT = "88591916336e1bc18179";
  // const gitHubRedirectURL = "http://localhost:3000/callback";
  // const path = "/";
  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;

    dispatch(signinGoogle(accessToken, navigate));
  }

  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  useEffect(() => {
    const query_ = window.location.search;

    const url = new URLSearchParams(query_);
    const code = url.get("code");

    if (code) {
      dispatch(gitsign(code));

    }
  }, []);

  function githubLogin() {

    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=` + GIT_CLIENT
    );
  }

 useEffect(()=>{
  localStorage.setItem("accesstoken", gitdata);
     if(gitdata)
     {
      dispatch(gitdataUser())
     }
 },[gitdata])


  const handleTypehosting = () => {
    navigate("/dash");
  };


  const handleSubmitInput = async () => {

    setInputType(false);

    if (typei === "organisation") {
      // dispatch({ organisation: inputValue });
    } else if (typei === "company") {
      // dispatch({ company: inputValue });
    } else {
      // dispatch({ developer: "developer" });
    }
  };

  const handleType = (type_) => {
    setType(type_);

  };
  const handleLogin = () => {
    navigate("/");
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser(formData));
  };
  return (
    <div className="outer_signup">
      {!successsignup && (
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
              <button onClick={() => login()}>Sign Up With Google</button>
              <button onClick={githubLogin}>Sign Up With Github</button>
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

      {successsignup && (
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
          {inputtype && (
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
