import React, { useState } from "react";
import addProp from "../assets/addProp.svg";
import searchIcon from "../assets/search.svg";
import Select from "react-select";
import { options } from "../data/propertyType";
import { styles } from "../styles/selectStyles";
import { Link } from "react-router-dom";

const PropertyHead = () => {
  const [search, setSearch] = useState("");
  const [propertyType, setPropertyType] = useState(null);

  const handlePropertyChange = (selectedOption) => {
    setPropertyType(selectedOption);
  };
  return (
    <div className='property-head'>
      <Link to='/ajouter-un-bien'>
        <div className='add-property'>
          <img src={addProp} alt='ajouter-bien' />
          <h4>Ajouter un bien</h4>
        </div>
      </Link>

      <div className='search-box'>
        <img src={searchIcon} alt='search-icon' className='search-icon' />
        <input
          type='text'
          placeholder='Rechercher un bien'
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <Select
        isSearchable={false}
        styles={styles}
        isMulti
        // formatOptionLabel={formatOptionTypeLabel}
        // defaultValue={defaultOption}
        value={propertyType}
        onChange={handlePropertyChange}
        options={options}
        placeholder={"Type de bien"}
      />
    </div>
  );
};

export default PropertyHead;
