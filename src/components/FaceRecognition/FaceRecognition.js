import React from 'react';
import './FaceRecognition.css';
import Box from './Box/Box';

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className='flex justify-center'>
      <div className='relative'>
        <img
          id='inputimage'
          src={imageURL}
          alt=''
          width='500px'
          height='auto'
        />
        {box.map((data, i) => (
          <Box key={i} data={data} />
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
