import React, { useState, useEffect } from "react";
import {
  categoryInputs,
  typeInputs,
  ammenagementInputs,
  localisationInputs,
} from "../data/Step1Inputs";
import CreatableSelect from "react-select/creatable";
import { singleStyle } from "../styles/stylesForSingleSelect";
import TitleInfoProp from "./TitleInfoProp";
const typesRequiringAmeublement = [
  "maison",
  "villa",
  "appartement",
  "bureau",
  "immeuble",
];
const Step1 = ({ formData, setFormData }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (newValue, actionMeta) => {
    setSelectedOptions(newValue);
    setFormData({ ...formData, location: newValue.value });
  };

  const handleCreate = (inputValue) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    setSelectedOptions(newOption);
    setFormData({ ...formData, location: newOption.value });
  };

  const handleInputChange = (inputValue, actionMeta) => {
    setInputValue(inputValue);
  };

  const handleBlur = () => {
    if (
      inputValue &&
      !localisationInputs.some((option) => option.value === inputValue)
    ) {
      handleCreate(inputValue);
    }
  };
  useEffect(() => {
    if (!typesRequiringAmeublement.includes(formData.propertyType)) {
      setFormData({
        ...formData,
        ammeublement: "",
      });
    }
  }, [formData.propertyType, typesRequiringAmeublement, setFormData]);
  return (
    <div className='step1'>
      <div className='step1-children'>
        <div className='input-radio-order'>
          <TitleInfoProp title={"Catégory"} />
          <div className='radio-order'>
            {categoryInputs.map((inp) => (
              <div key={inp.value}>
                <input
                  onChange={(event) =>
                    setFormData({ ...formData, category: event.target.value })
                  }
                  type='radio'
                  id={inp.id}
                  name={inp.name}
                  value={inp.value}
                  checked={formData.category === inp.value}
                />
                <label htmlFor={inp.value}>{inp.labelName}</label>
              </div>
            ))}
          </div>
        </div>
        <div className='input-radio-order'>
          <TitleInfoProp title={"Type de bien"} />

          <div className='radio-order'>
            {typeInputs.map((inp) => {
              if (
                !(formData.category === "location" && inp.value === "terrain")
              ) {
                return (
                  <div key={inp.value}>
                    <input
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          propertyType: event.target.value,
                        })
                      }
                      type='radio'
                      id={inp.id}
                      name={inp.name}
                      value={inp.value}
                      checked={formData.propertyType === inp.value}
                    />
                    <label htmlFor={inp.value}>{inp.labelName}</label>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        <div className='input-radio-order'>
          <TitleInfoProp title={"Ameublement"} />

          {typesRequiringAmeublement.includes(formData.propertyType) ? (
            <div className='radio-order'>
              {ammenagementInputs.map((inp) => (
                <div key={inp.value}>
                  <input
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        ammeublement: event.target.value,
                      })
                    }
                    type='radio'
                    id={inp.id}
                    name={inp.name}
                    value={inp.value}
                    checked={formData.ammeublement === inp.value}
                  />
                  <label htmlFor={inp.value}>{inp.labelName}</label>
                </div>
              ))}
            </div>
          ) : (
            <p>Desactiver pour ce type de bien</p>
          )}
        </div>
      </div>
      <div className='location-select input-radio-order'>
        <TitleInfoProp title={"Localisation"} />
        <CreatableSelect
          styles={singleStyle}
          onChange={handleChange}
          onCreateOption={handleCreate}
          onInputChange={handleInputChange}
          onBlur={handleBlur}
          options={localisationInputs}
          value={
            selectedOptions.length > 0
              ? selectedOptions
              : formData?.location
              ? { value: formData.location, label: formData.location }
              : null
          }
          placeholder={"Localisation"}
        />
      </div>
    </div>
  );
};

export default Step1;
