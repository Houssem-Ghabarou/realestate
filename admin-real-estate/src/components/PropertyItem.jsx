import React, { useEffect, useState } from "react";
import localisation from "../assets/localisation.svg";
import bed from "../assets/bed.svg";
import bath from "../assets/bath.svg";
import garage from "../assets/garage.svg";
import surface from "../assets/surface.svg";
import date from "../assets/date.svg";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/edit.svg";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { capitalizeFirstLetter } from "../util/capitalizeFirstLetter";
import { formatDate } from "../util/formatDate";
import { useNavigate } from "react-router-dom";
import { useDeleteProperty } from "../hooks/useDeleteProperty";
import toast from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal";
const backendBaseUrl = import.meta.env.VITE_API_KEY_IMAGE_SERVER;

const PropertyItem = ({ property, setDeleteSucess }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const {
    deleteProperty,
    isSuccessDeleting,
    errorDeleting,
    isLoadingDeleting,
  } = useDeleteProperty();
  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate("/bien", { state: { propertyData: property, isEdit: true } });
  };
  const image = property?.images?.split(",")[0];

  const imageUrl = `${backendBaseUrl}/${image?.replace(/\\/g, "/")}`;

  const handleDeleteClick = (propertyId) => {
    setShowDeleteModal(true);
    setPropertyToDelete(propertyId);
  };

  const handleConfirmDelete = async () => {
    if (propertyToDelete) {
      deleteProperty(property?._id);
      setShowDeleteModal(false);
      setPropertyToDelete(null);
    }
  };

  useEffect(() => {
    if (isSuccessDeleting) {
      toast.success("La propriété a été supprimée avec succès");
      setDeleteSucess(true);
    }
    if (errorDeleting) {
      toast.error(errorDeleting);
    }
  }, [isSuccessDeleting, errorDeleting]);
  return (
    <div key={property?._id} className='property-main'>
      {showDeleteModal && (
        <ConfirmationModal
          message='Êtes-vous sûr de vouloir supprimer cette propriété ?'
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
      <button
        className='delete-property'
        onClick={() => handleDeleteClick(property?._id)}
      >
        <img src={deleteIcon} alt='delete-button' />
      </button>
      <button className='edit-property' onClick={handleEditClick}>
        <img src={editIcon} alt='edit-button' />
      </button>

      <div className='image-prop-container'>
        <img src={imageUrl} alt='property' className='property-image' />
        <div className='reference-property'>{property?.reference}</div>
        <button className='go-button background-container-go-button'>
          <IoArrowForwardCircleOutline className='go-button-icon' />
        </button>
      </div>
      <h5>{`${capitalizeFirstLetter(property?.name)}`}</h5>
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
  );
};

export default PropertyItem;
