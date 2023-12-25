import React, { useState } from "react";
import TitleInfoProp from "./TitleInfoProp";
import addImages from "../assets/addImages.svg";
import deleteImage from "../assets/deleteImage.svg";
const Step3 = ({ formData, setFormData }) => {
  const [dragging, setDragging] = useState(false);

  const handleFileDrop = (event) => {
    const newFiles = event.dataTransfer.files;

    const filePreviews = Array.from(newFiles).map((file) =>
      URL.createObjectURL(file)
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      uploads: newFiles,
      uploadedImages: [...prevFormData.uploadedImages, ...filePreviews],
    }));
  };

  const handleFileUpload = (event) => {
    const newFiles = event.target.files;

    // Convert files into Blob URLs for preview
    const filePreviews = Array.from(newFiles).map((file) =>
      URL.createObjectURL(file)
    );

    setFormData((prevFormData) => ({
      ...prevFormData,
      uploads: newFiles,
      uploadedImages: [...prevFormData.uploadedImages, ...filePreviews],
    }));
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formData.uploadedImages];
    const uploads = [...formData.uploads];
    uploads.splice(index, 1);
    updatedImages.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      uploadedImages: updatedImages,
      uploads: uploads,
    }));
  };

  return (
    <div className='step3'>
      <div
        className={`image-container ${
          formData?.uploadedImages?.length > 0 ? "images-present" : ""
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleFileDrop(e);
        }}
        style={{
          border: dragging ? "2px dashed #1890ff" : "2px dashed #d9d9d9",
        }}
      >
        <>
          {formData?.uploadedImages?.map((imageSrc, index) => (
            <div key={index} className='upload-image-wrapper'>
              <div className='image-and-delete-container'>
                <img
                  onClick={handleRemoveImage}
                  src={deleteImage}
                  alt='delete-image'
                  className='delete-image'
                />
                <img
                  src={imageSrc}
                  alt={`Uploaded content ${index + 1}`}
                  className='uploaded-image'
                />
              </div>
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
