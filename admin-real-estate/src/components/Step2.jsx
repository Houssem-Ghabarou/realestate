import React, { useEffect } from "react";
import TitleInfoProp from "./TitleInfoProp";

import { features } from "../data/features";
import PlusMinus from "./PlusMinus";

const requiredChambreSallesDeBain = ["maison", "villa", "appartement"];

const Step2 = ({ formData, setFormData }) => {
  const className =
    !requiredChambreSallesDeBain.includes(formData.propertyType) &&
    "required-chambre-salles-de-bain";
  const addChambre = () => {
    setFormData({ ...formData, chambres: formData.chambres + 1 });
  };
  const removeChambre = () => {
    if (formData.chambres > 0) {
      setFormData({ ...formData, chambres: formData.chambres - 1 });
    }
  };

  const addSalleDeBain = () => {
    setFormData({ ...formData, sallesDeBain: formData.sallesDeBain + 1 });
  };
  const removeSalleDeBain = () => {
    if (formData.sallesDeBain > 0) {
      setFormData({ ...formData, sallesDeBain: formData.sallesDeBain - 1 });
    }
  };

  const addParking = () => {
    setFormData({ ...formData, parking: formData.parking + 1 });
  };
  const removeParking = () => {
    if (formData.parking > 0) {
      setFormData({ ...formData, parking: formData.parking - 1 });
    }
  };

  const handleCheckboxChange = (feature) => {
    let updatedSelectedFeatures;
    if (formData?.selectedFeatures?.includes(feature)) {
      updatedSelectedFeatures = formData?.selectedFeatures.filter(
        (item) => item !== feature
      );
    } else {
      updatedSelectedFeatures = [...formData?.selectedFeatures, feature];
    }
    setFormData({ ...formData, selectedFeatures: updatedSelectedFeatures });
  };
  useEffect(() => {
    if (!requiredChambreSallesDeBain.includes(formData.propertyType)) {
      setFormData({
        ...formData,
        chambres: 0,
        sallesDeBain: 0,
        parking: 0,
        selectedFeatures: [],
      });
    }
  }, [formData.propertyType, requiredChambreSallesDeBain, setFormData]);
  return (
    <div className='step1'>
      <div className={`step1-children ${className}`}>
        <div className='input-radio-order'>
          <TitleInfoProp title={"Surface"} />
          <input
            type='text'
            placeholder='| m²'
            min='0'
            className='input-step2'
            value={formData.surface}
            onChange={(e) => {
              setFormData({ ...formData, surface: e.target.value });
            }}
          />
        </div>
        <div className='input-radio-order'>
          <TitleInfoProp title={"Prix"} />
          <input
            type='text'
            placeholder='| TND'
            className='input-step2'
            value={formData.prix}
            onChange={(e) => {
              setFormData({ ...formData, prix: e.target.value });
            }}
          />
        </div>
        {requiredChambreSallesDeBain.includes(formData.propertyType) && (
          <div className='plus-minus-container'>
            {/* chambre */}
            <PlusMinus
              formData={formData}
              setFormData={setFormData}
              addFunction={addChambre}
              removeFunction={removeChambre}
              title={"Chambres"}
              inputValue={formData.chambres} // Pass the dynamic input value
            />
            {/* salle de bain */}
            <PlusMinus
              formData={formData}
              setFormData={setFormData}
              addFunction={addSalleDeBain}
              removeFunction={removeSalleDeBain}
              inputValue={formData.sallesDeBain}
              title={"Salles de bain"}
            />
          </div>
        )}

        {/* Parking */}
        {requiredChambreSallesDeBain.includes(formData.propertyType) && (
          <PlusMinus
            formData={formData}
            setFormData={setFormData}
            addFunction={addParking}
            removeFunction={removeParking}
            inputValue={formData.parking}
            title={"Parking"}
          />
        )}
      </div>
      {/* Caractéristiques */}
      {requiredChambreSallesDeBain.includes(formData.propertyType) && (
        <div className='input-radio-order'>
          <TitleInfoProp title={"Caractéristiques"} />
          <ul className='unstyled centered'>
            {features?.map((feature, index) => (
              <li key={feature}>
                <input
                  className='styled-checkbox'
                  id={`styled-checkbox-${index}`}
                  type='checkbox'
                  value={feature}
                  checked={formData?.selectedFeatures?.includes(feature)}
                  onChange={() => handleCheckboxChange(feature)}
                />
                <label htmlFor={`styled-checkbox-${index}`}>{feature}</label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Step2;
