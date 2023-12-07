import React, { useState } from "react";
import "./Dash.css";
import Navbar from "./Navbar.js";
import Topbar from "./Topbar.js";
import Card from "./Card.js";
import Pie from "./Pie.js";
import CardSelect from "./Cardselect.js";
// import Hole from "./svg/holecircle.svg";
const Dash = () => {
  const [isToggled, setToggle] = useState(false);
  const Circlehole = () => {
    return (
      <svg width="35" height="35">
        <circle cx="17.5" cy="17.5" r="17.5" fill="blue" />
        <circle cx="17.5" cy="17.5" r="7.5" fill="white" />
      </svg>
    );
  };
  const toggle = () => {
    setToggle(!isToggled);
  };
  return (
    <>
      <div className="dash_outer">
        <Navbar />
        <div className="signle_dash">
          <Topbar />
          <div className="dash_main">
            <div className="dash_name">
              <span>
                <h1>Hi Rachit !</h1>
                <h6>Welcome to XeroCodee Ecosystem 😎</h6>
              </span>
              <div className="switch-container">
                <span className="switch-text">Test Mode</span>
                <label className={`switch ${isToggled ? "on" : ""}`}>
                  <input type="checkbox" onClick={toggle} />
                  <span className="slider round"></span>
                </label>
                <span className="switch-text">Production Mode</span>
              </div>
            </div>
            <div className="section_dash">
              <div className="section_left">
                <section>
                  <Circlehole />
                  <span></span>
                  <Circlehole />
                  <span></span>
                  <Circlehole />
                  <span></span>
                </section>
                <div className="section_display">
                  <div className="section_card">
                    <section>
                      <span>
                        <h1>Step 1</h1>
                        <p>Connect to cloud</p>
                      </span>
                    </section>
                    <div className="card_all_section">
                      <Card />
                      <Card />
                    </div>
                  </div>
                  <div className="section_card">
                    <section>
                      <span>
                        <h1>Step 2</h1>
                        <p>Connect to Source code</p>
                      </span>
                    </section>
                    <div className="card_all_section">
                      <Card />
                      <Card />
                      <Card />
                    </div>
                  </div>
                  <div className="section_card">
                    <section>
                      <span>
                        <h1>Step 3</h1>
                        <p>Connect to Data Source</p>
                      </span>
                    </section>
                    <div className="card_all_section">
                      <Card />
                      <Card />
                      <Card />
                    </div>
                  </div>
                </div>
              </div>
              <div className="section_right">
                <span>
                  <h1>Your Progress </h1>
                  <p>towards XeroCodee</p>
                </span>
                <Pie score={1} />
                <p>View Details</p>
                <section>
                  <span>
                    <p>Step 1</p>
                    <CardSelect />
                  </span>
                  <span>
                    <p>Step 2</p>
                    <CardSelect />
                  </span>
                  <span>
                    <p>Step 3</p>
                    <CardSelect />
                  </span>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dash;
