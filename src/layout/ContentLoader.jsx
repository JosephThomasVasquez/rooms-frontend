import React from "react";
import "./loader.styles.css";

const ContentLoader = () => {
  return (
    <div className="shimmer">
      <div className="faux-image-wrapper">
        <div className="d-flex align-items-center pt-3">
          <div className="faux-text"></div>
          <div className="faux-button"></div>
        </div>
        <div className="faux-text short"></div>
        <div className="faux-text short"></div>
        <div className="faux-text"></div>
      </div>
    </div>
  );
};

export default ContentLoader;
