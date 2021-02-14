import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav>
        <p
          className="underline cursor-pointer hover:text-gray-700 flex justify-end"
          onClick={() => onRouteChange("signin")}
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav className="flex justify-end">
        <p
          className="underline cursor-pointer hover:text-gray-700 flex justify-end mr-3"
          onClick={() => onRouteChange("signin")}
        >
          Sign In
        </p>
        <p
          className="underline cursor-pointer hover:text-gray-700 flex justify-end"
          onClick={() => onRouteChange("register")}
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
