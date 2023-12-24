import React, { useEffect, useState } from "react";
import { useProperty } from "../hooks/useProperty";
import MoonLoaderSpinner from "../components/MoonLoaderSpinner";
import PropertyInformations from "../components/PropertyInformations";
import PropertyHead from "../components/PropertyHead";
import { useSearchProperties } from "../hooks/useSearchProperties";
const Properties = () => {
  const [deleteSucess, setDeleteSucess] = useState(false);
  const { getAllProperties, propertyData, isLoading, error } = useProperty();
  const {
    searchProperties,
    searchedProperties,
    errorSearching,
    isLoadingSearching,
    resetSearch,
    succesSearching,
  } = useSearchProperties();
  const [showNoPropertyMessage, setShowNoPropertyMessage] = useState(false);

  useEffect(() => {
    const getProperties = async () => {
      await getAllProperties();
    };

    getProperties();
  }, []);

  useEffect(() => {
    if (deleteSucess) {
      getAllProperties();
    }
    setDeleteSucess(false);
  }, [deleteSucess]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isLoading && propertyData.length === 0) {
        setShowNoPropertyMessage(true);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [isLoading, propertyData]);

  if (isLoading) {
    return <MoonLoaderSpinner type={1} />;
  }

  if (isLoadingSearching) {
    return (
      <div className='property-container'>
        <PropertyHead searchProperties={searchProperties} />
        <MoonLoaderSpinner type={1} />
      </div>
    );
  }
  if (succesSearching && searchedProperties.length === 0) {
    return (
      <div className='property-container'>
        <PropertyHead searchProperties={searchProperties} />
        <h1 className='no-property'>Aucune propriété trouvée.</h1>
      </div>
    );
  }

  if (succesSearching && searchedProperties.length > 0) {
    return (
      <div className='property-container'>
        <PropertyHead searchProperties={searchProperties} />
        <PropertyInformations
          propertyData={searchedProperties}
          setDeleteSucess={setDeleteSucess}
          resetSearch={resetSearch}
        />
      </div>
    );
  }

  return (
    <div className='property-container'>
      <PropertyHead searchProperties={searchProperties} />
      {showNoPropertyMessage ? (
        <h1 className='no-property'>
          Aucune propriété trouvée. Veuillez ajouter une propriété.
        </h1>
      ) : (
        <PropertyInformations
          propertyData={propertyData}
          setDeleteSucess={setDeleteSucess}
        />
      )}
    </div>
  );
};

export default Properties;
