import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import logo from "./brain.png";

const Logo = () => {
  return (
    <Tilt
      className="Tilt rounded shadow-md flex justify-center"
      options={{ max: 55 }}
      style={{ height: 120, width: 120 }}
    >
      <div className="Tilt-inner self-center">
        <img src={logo} alt="brain logo" />
      </div>
    </Tilt>
  );
};

export default Logo;
