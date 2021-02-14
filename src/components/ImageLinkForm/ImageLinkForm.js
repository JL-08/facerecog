import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onBtnClick }) => {
  return (
    <div className="flex flex-col justify-center my-5">
      <p>{"This brain will detect faces from images. Give it a try!"}</p>
      <div className="flex justify-center m-3">
        <div className="bg-container p-10 shadow-lg md:w-2/4 flex">
          <input
            type="text"
            className="input-link mr-2"
            placeholder="Image link here"
            onChange={onInputChange}
          />
          <button className="btn" onClick={onBtnClick}>
            DETECT
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
