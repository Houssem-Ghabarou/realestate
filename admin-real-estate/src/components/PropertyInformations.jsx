import React from "react";
import localisation from "../assets/localisation.svg";
import img from "../assets/img.jpg";
import bed from "../assets/bed.svg";
import bath from "../assets/bath.svg";
import garage from "../assets/garage.svg";
import surface from "../assets/surface.svg";
import date from "../assets/date.svg";
import deleteIcon from "../assets/delete.svg";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { capitalizeFirstLetter } from "../util/capitalizeFirstLetter";
import { formatDate } from "../util/formatDate";
const PropertyInformations = ({ propertyData }) => {
  return (
    <div className='property-main-container'>
      {propertyData?.map((property) => (
        <div key={property?._id} className='property-main'>
          <button className='delete-property'>
            <img src={deleteIcon} alt='delete-button' />
          </button>
          <div className='image-prop-container'>
            <img src={img} alt='property' className='property-image' />

            <button className='go-button background-container-go-button'>
              <IoArrowForwardCircleOutline className='go-button-icon' />
            </button>
          </div>
          <h5>{capitalizeFirstLetter(property?.name)}</h5>
          <div className='property-name-price'>
            <div className='localisation'>
              <img src={localisation} alt='localisation' />
              <h6>{capitalizeFirstLetter(property?.location)}</h6>
            </div>
            <strong>{property?.price} TND</strong>
          </div>
          <div className='property-details'>
            <div>
              <div className='first-prop-details'>
                <div className='prop-order'>
                  <img src={surface} alt='surface' />
                  <h6>{property?.surface}m2</h6>
                </div>
                {property?.chambres && (
                  <div className='prop-order'>
                    <img src={bed} alt='bed' />
                    <h6>{property?.chambres}</h6>
                  </div>
                )}
              </div>
              <hr className='separator-line' />
              <div className='first-prop-details'>
                {property?.parking && (
                  <div className='prop-order'>
                    <img src={garage} alt='garage' />
                    <h6>{property?.parking}</h6>
                  </div>
                )}
                {property?.sallesDeBains && (
                  <div className='prop-order'>
                    <img src={bath} alt='bath' />
                    <h6>{property?.sallesDeBains}</h6>
                  </div>
                )}
              </div>
            </div>
            <div className='property-date'>
              <img src={date} alt='date' />
              <h6>{formatDate(property?.timestamp)}</h6>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyInformations;
