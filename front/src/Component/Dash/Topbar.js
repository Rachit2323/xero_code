import React from "react";
import "./TopBar.css";
import search from "../../Images/search_black_24dp 1.png";
import gift from "../../Images/giftcard_black_24dp 1.jpg";
import bell from "./svg/bell.svg";
import setting from "./svg/setting.svg";
import msg from "./svg/msg.svg";
import user from "./svg/user.svg";
import arrow from "./svg/arrow.svg";
const Topbar = () => {
  return (
    <div className="outer_topbar">
      <div className="search_bar">
        <input className="input-style" placeholder="Search" />

        <section>
          <img src={search} />
        </section>
      </div>
      <div className="right_bar">
        <section>
          <img src={gift} />

          <p>Upgrade Plan</p>
        </section>
        <span>
          <img src={bell} />
        </span>
        <span>
          <img src={msg} />
        </span>
        <span>
          <img src={setting} />
        </span>
        <span
          style={{ background: "transparent", boxShadow: "0px 0px 0px 0px" }}
        >
          <p>XeroCodee</p>
          <img src={arrow} />
        </span>
        <span>
          <img src={user} />
        </span>
      </div>
    </div>
  );
};

export default Topbar;
