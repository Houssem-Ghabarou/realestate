import React from "react";

const TitleInfoProp = ({ title, type }) => {
  return (
    <div className='title-input-order'>
      <h5>
        {title}
        <span className='etoile'>*</span>
      </h5>
      <hr />
    </div>
  );
};

export default TitleInfoProp;
