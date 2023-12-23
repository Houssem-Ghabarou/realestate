import React, { useState } from "react";
import TitleInfoProp from "./TitleInfoProp";
import addImages from "../assets/addImages.svg";

const Step3 = ({ formData, setFormData }) => {
  const handleFileUpload = (event) => {
    // Access the files from the input
    const newFiles = event.target.files;

    // Convert files into Blob URLs for preview
    const filePreviews = Array.from(newFiles).map((file) =>
      URL.createObjectURL(file)
    );

    // Update state with new files, assuming formData.uploads keeps the File objects
    setFormData((prevFormData) => ({
      ...prevFormData,
      uploads: newFiles, // Store the File objects
      uploadedImages: [...prevFormData.uploadedImages, ...filePreviews], // Store Blob URLs for rendering previews
    }));
  };

  const removeImage = (index) => {
    // Create a copy of the uploaded images array
    const updatedImages = [...formData.uploadedImages];

    // Remove the specified image at the given index
    updatedImages.splice(index, 1);

    // Update state with the new array of images
    setFormData((prevFormData) => ({
      ...prevFormData,
      uploadedImages: updatedImages,
    }));
  };

  return (
    <div className='step3'>
      <div
        className={`image-container ${
          formData?.uploadedImages?.length > 0 ? "images-present" : ""
        }`}
      >
        <>
          {formData?.uploadedImages?.map((imageSrc, index) => (
            <div key={index} className='upload-image-wrapper'>
              <img
                src={imageSrc}
                alt={`Uploaded content ${index + 1}`}
                className='uploaded-image'
              />
            </div>
          ))}

          {formData?.uploadedImages?.length > 0 && (
            <label htmlFor='file-upload' className='custom-file-upload'>
              <img
                src={addImages}
                alt='Add Images'
                className='add-images-already-uploaded'
              />
            </label>
          )}
        </>

        {formData?.uploadedImages?.length === 0 && (
          <label htmlFor='file-upload' className='custom-file-upload'>
            <img src={addImages} alt='Add Images' className='add-images' />
            <p>
              Cliquez ou faites glisser le fichier dans cette zone pour
              télécharger
            </p>
          </label>
        )}
        <input
          id='file-upload'
          type='file'
          className='input-image'
          onChange={handleFileUpload}
          multiple
        />
      </div>
      <div className='name-descr'>
        <div className='input-radio-order'>
          <TitleInfoProp title={"Nom"} />
          <input
            type='text'
            className='nom-prop'
            value={formData?.nom}
            onChange={(e) => {
              setFormData({ ...formData, nom: e.target.value });
            }}
          />
        </div>
        <div className='input-radio-order'>
          <TitleInfoProp title={"Description"} />
          <textarea
            className='description-prop'
            value={formData?.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Step3;
