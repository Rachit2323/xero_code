import React from "react";
import "./Navbar.css";
import logo from "../../Images/logo 4.png";
import xero from "./svg/xerocode.svg";
import build from "./svg/build.svg";
import service from "./svg/service.svg";
import cluster from "./svg/cluster.svg";
import db from "./svg/database.svg";
import envi from "./svg/envi.svg";
import work from "./svg/workflow.svg";
import monitor from "./svg/monitor.svg";

import security from "./svg/security.svg";
import hook from "./svg/hook.svg";
import log from "./svg/log.svg";
import { useNavigate } from "react-router-dom";
import {
 logout
} from "../../Reducers/auth.js";
import { useDispatch, useSelector } from "react-redux";
const Navbar = () => {
  const navigate = useNavigate();
  const data = [
    {
      id: 1,
      img: xero,
      name: "XeroCodee",
    },
    {
      id: 2,
      img: build,
      name: "Builder Center",
    },
    {
      id: 3,
      img: service,
      name: "Service Board",
    },
    {
      id: 4,
      img: cluster,
      name: "Clusters",
    },
    {
      id: 5,
      img: db,
      name: "Databases ",
    },
    { id: 6, img: envi, name: "Environment " },
    { id: 7, img: work, name: "Workflow" },
    { id: 8, img: monitor, name: "Monitoring" },
    { id: 9, img: security, name: "Security " },
    { id: 10, img: hook, name: "Web Hooks " },
    { id: 11, img: log, name: "Log Error " },
  ];

  const dispatch=useDispatch();


  return (
    <div className="navbar_outer">
      <img src={logo} />
      <section>
      {data.map((item) => (
          <div key={item.id}>
         <span key={item.id} className={item.id === 1 ? 'selected_tag' : ''}>
           <img src={item.img} />
           <p style={item.id === 1 ? { color: '#0c5bc6' } : {}}>{item.name}</p>
         </span>
         <p id={item.id === 1 ? 'react_tag' : ''}></p>
         </div>
       ))}
       {/* <button className="logout" onClick={()=>handleLogout()}>Logout </button> */}
      </section>
    </div>
  );
};

export default Navbar;
