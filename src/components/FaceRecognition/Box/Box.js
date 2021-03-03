import React from 'react';

const Box = ({ data }) => {
  return (
    <div
      className='bounding-box'
      style={{
        top: data.topRow,
        right: data.rightCol,
        bottom: data.bottomRow,
        left: data.leftCol,
      }}
    ></div>
  );
};

export default Box;
