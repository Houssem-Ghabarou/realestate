import React, { useEffect } from "react";

import { useProperty } from "../hooks/useProperty";
import MoonLoaderSpinner from "../components/MoonLoaderSpinner";
import PropertyInformations from "../components/PropertyInformations";
import PropertyHead from "../components/PropertyHead";
const Properties = () => {
  const { getAllProperties, propertyData, isLoading, error } = useProperty();
  useEffect(() => {
    const getProperties = async () => {
      await getAllProperties();
    };

    getProperties();
  }, []);

  if (isLoading) {
    return <MoonLoaderSpinner type={1} />;
  }

  return (
    <div className='property-container'>
      <PropertyHead />
      <PropertyInformations propertyData={propertyData} />
    </div>
  );
};

export default Properties;
