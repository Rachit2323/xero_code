import React, { useEffect, useState } from "react";
import "./Dash.css";
import Navbar from "./Navbar.js";
import Topbar from "./Topbar.js";
import Card from "./Card.js";
import Pie from "./Pie.js";
import CardSelect from "./Cardselect.js";

import { useDispatch, useSelector } from "react-redux";
import { carddata, userdetails } from "../../Reducers/auth.js";

import { ecosystem } from "./data.js";

const Dash = () => {
  const [isToggled, setToggle] = useState(false);
  const [count, setCount] = useState(0);
  const [selectedSystem, setSelectedSystem] = useState([
    { cloud: null, img: null },
    { source: null, img: null },
    { data: null, img: null },
  ]);

  const { userdata } = useSelector((state) => state.user);

  const {
    cloud = "",
    cloud_img = "",
    sourceCode = "",
    sourceCode_img = "",
    dataSource = "",
    dataSource_img = "",
    counted ,
  } = userdata || {};

  const dispatch = useDispatch();

  useEffect(() => {
    if (userdata) {
        const countedAsNumber = parseInt(counted);

      // console.log(countedAsNumber,typeof(countedAsNumber));
setCount(countedAsNumber);


      setSelectedSystem([
        {
          cloud: cloud,
          img: cloud_img,
        },
        {
          source: sourceCode,
          img: sourceCode_img,
        },
        {
          data: dataSource,
          img: dataSource_img,
        },
      ]);
    }
  }, [userdata]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) dispatch(userdetails());
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (count >= 3 && token) {
      dispatch(carddata(selectedSystem));
    }
  }, [count]);

  const handleCardSelect = (system, name, img) => {
    setSelectedSystem((prevSelectedSystem) =>
      prevSelectedSystem.map((item, index) => {
        if (system === "Cloud" && index === 0) {
          setCount(count + 1);
          return { ...item, cloud: name, img: img };
        } else if (system === "Source Code" && index === 1) {
          setCount(count + 1);
          return { ...item, source: name, img: img, cloud: null, data: null };
        } else if (system === "Data Source" && index === 2) {
          setCount(count + 1);
          return { ...item, data: name, img: img, cloud: null, source: null };
        }
        return item;
      })
    );
  };

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
                <h1>Hi {userdata?.firstName} !</h1>
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
                  {ecosystem.map((system, index) => (
                    <div key={index} className="section_card">
                      <section>
                        <span>
                          <h1>Step {index + 1}</h1>
                          <p>Connect to {system.name}</p>
                        </span>
                      </section>
                      <div className="card_all_section">
                        {system.options.map((item, innerIndex) => (
                          <div
                            className="indi_card"
                            key={innerIndex}
                            onClick={() =>
                              handleCardSelect(system.name, item.name, item.img)
                            }
                          >
                            <Card name={item.name} url={item.img} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section_right">
                <span>
                  <h1>Your Progress </h1>
                  <p>towards XeroCodee</p>
                </span>
                <Pie
                  score={
                    count === 1 ? 40 : count === 2 ? 80 : count === 0 ? 0 : 100
                  }
                />

                <p>View Details</p>
                <section>
                  {selectedSystem.map((item, index) => (
                    <span key={index}>
                      <p>Step {index + 1}</p>
                      <CardSelect
                        key={index}
                        name={item.cloud || item.source || item.data}
                        status="Complete"
                        img={item.img}
                      />
                    </span>
                  ))}
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
