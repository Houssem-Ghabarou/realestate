import React from "react";
import PropertyItem from "./PropertyItem";

const PropertyInformations = ({ propertyData }) => {
  return (
    <div className='property-main-container'>
      {propertyData?.map((property) => (
        <PropertyItem property={property} key={property?._id} />
      ))}
    </div>
  );
};

export default PropertyInformations;
