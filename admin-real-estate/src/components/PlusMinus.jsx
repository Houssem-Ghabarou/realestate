import React from "react";
import plus from "../assets/plus.svg";
import minus from "../assets/minus.svg";
import TitleInfoProp from "./TitleInfoProp";

const PlusMinus = ({
  formData,
  setFormData,
  addFunction,
  removeFunction,
  title,
  inputValue,
}) => {
  return (
    <div className='input-radio-order'>
      <TitleInfoProp title={title} />
      <div className='plus-minus-order'>
        <div role='button' tabIndex={0} onClick={addFunction}>
          <img src={plus} alt='plus' className='plus-minus-icon' />
        </div>

        <input
          type='number'
          className='plus-minus-input'
          min='0'
          value={inputValue}
          onChange={(e) => {
            setFormData({ ...formData, inputValue: e.target.value });
          }}
        />

        <div role='button' tabIndex={0} onClick={removeFunction}>
          <img src={minus} alt='minus' className='plus-minus-icon' />
        </div>
      </div>
    </div>
  );
};

export default PlusMinus;
