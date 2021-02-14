import React from "react";

const Rank = ({ userName, userEntries }) => {
  return (
    <div className="">
      <div className="text-2xl">{`${userName}, your current entry count is...`}</div>
      <div className="text-5xl">{userEntries}</div>
    </div>
  );
};

export default Rank;
