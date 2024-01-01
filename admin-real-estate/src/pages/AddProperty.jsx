import React, { useState, useEffect } from "react";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import { useAddProperty } from "../hooks/useAddProperty";
import { useEditProperty } from "../hooks/useEditProperty";
import { checkPass } from "../util/checkPass";
import AddPrpoertyFooter from "../components/AddPropertyFooter";
import { filterFormData } from "../util/filterFormatData";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import WaitingImagesLoad from "../components/WaitingImagesLoad";
const apiUrl = import.meta.env.VITE_API_KEY_IMAGE_SERVER; // Ensure this points to your server's URL
// const MAX_IMAGES_ALLOWED = 15;
const AddProperty = () => {
  const navigate = useNavigate();
  const { addProperty, isSuccess, error, isLoading } = useAddProperty();
  const { editProperty, isSuccessEditing, errorEditing, isLoadingEditing } =
    useEditProperty();

  const FormTitles = ["Étape 1", "Étape 2", "Étape 3"];
  const [page, setPage] = useState(0);
  const { state } = useLocation();
  const isEdit = state?.isEdit;
  const property = state?.propertyData;
  const [waitingImages, setIsWaitingImages] = useState(isEdit);
  const [formData, setFormData] = useState({
    nom: "",
    category: "",
    propertyType: "",
    ammeublement: "",
    location: "",
    selectedFeatures: [],
    prix: "",
    surface: "",
    chambres: 0,
    sallesDeBain: 0,
    parking: 0,
    uploadedImages: [],
    uploads: [],
    description: "",
  });
  const addPropData = filterFormData(formData);

  console.log(addPropData, "addPropData");
  useEffect(() => {
    const fetchImages = async () => {
      if (property && property.images) {
        try {
          // Clear existing uploads and uploadedImages arrays
          setFormData((prevFormData) => ({
            ...prevFormData,
            uploads: [],
            uploadedImages: [],
            // ... other properties
          }));
          // Split the string into an array of paths
          const paths = property.images.split(",");

          // Map each server path to a fetch request to get the blob
          const filesAndUrls = await Promise.all(
            paths.map(async (path) => {
              const response = await fetch(`${apiUrl}/${path}`);
              if (!response.ok) throw new Error("Network response was not ok");
              const blob = await response.blob();

              // Create a local URL for the blob
              const url = URL.createObjectURL(blob);

              // Extract the file name from the path and create a file object
              const fileName = path.slice(path.lastIndexOf("/") + 1);

              const fileType = blob.type; // Dynamically set the image MIME type
              const file = new File([blob], fileName, { type: fileType });

              return { url, file };
            })
          );

          // Extract urls and files to separate arrays
          const uploadedImages = filesAndUrls.map((item) => item.url);
          const uploads = filesAndUrls.map((item) => item.file);

          // Update the formData state with the fetched images and files
          setFormData({
            nom: property?.name,
            category: property?.category,
            propertyType: property?.type,
            ammeublement: property?.ammeublement,
            location: property?.location,
            selectedFeatures: property?.characteristics,
            prix: property?.price,
            surface: property?.surface,
            chambres: property?.chambres,
            sallesDeBain: property?.sallesDeBains,
            parking: property?.parking,
            uploadedImages: uploadedImages,
            uploads: uploads,
            description: property?.description,
          });
        } catch (e) {
          console.error("Error fetching files: ", e);
        }
      }
    };

    if (isEdit && property) {
      fetchImages();
    }

    // Make sure to list all dependencies for useEffect
  }, [isEdit, property, setFormData]);

  const PageDisplay = () => {
    if (page === 0) {
      return <Step1 formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <Step2 formData={formData} setFormData={setFormData} />;
    } else {
      return <Step3 formData={formData} setFormData={setFormData} />;
    }
  };
  // useEffect(() => {
  //   if (formData?.uploadedImages?.length > MAX_IMAGES_ALLOWED) {
  //     toast.error(
  //       `Vous pouvez télécharger un maximum de ${MAX_IMAGES_ALLOWED} images. Veuillez supprimer quelques images et réessayer.`
  //     );
  //   }
  // }, [formData?.uploadedImages]);

  useEffect(() => {
    if (error?.imageError) {
      toast.error(error?.imageError);
    }
  }, [error]);
  useEffect(() => {
    if (errorEditing?.imageError) {
      toast.error(errorEditing?.imageError);
    }
  }, [errorEditing]);

  useEffect(() => {
    if (isSuccess) {
      const udemySuccessStyle = {
        background: "rgba(46, 125, 50, 0.9)",
        color: "#ffffff",
      };

      toast.success("Bien ajouté avec succès", {
        style: udemySuccessStyle,
      });
      navigate("/");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isSuccessEditing) {
      const udemySuccessStyle = {
        background: "rgba(46, 125, 50, 0.9)",
        color: "#ffffff",
      };

      toast.success("Bien modifié avec succès", {
        style: udemySuccessStyle,
      });
      navigate("/");
    }
  }, [isSuccessEditing, errorEditing, isLoadingEditing]);
  useEffect(() => {
    // Check if formData is not empty
    const isFormDataEmpty =
      formData.uploadedImages.length === 0 || formData.uploads.length === 0;

    // If it's edit mode and formData is empty, set isLoading to true
    if (page === 0) {
      setIsWaitingImages(isEdit && isFormDataEmpty);
    }
  }, [isEdit, formData]);

  if (waitingImages) {
    return <WaitingImagesLoad />;
  }
  return (
    <div className='form'>
      <div className='header'>
        <h4>
          {!isEdit ? "Ajouter un bien" : "Modifier un bien"} :
          <span>{FormTitles[page]}</span>
        </h4>
      </div>
      <div className='progressbar'>
        <div className={`progress-circle ${page >= 0 ? "active-circle" : ""}`}>
          1
        </div>
        <div
          className={`progress-bar ${
            page >= 1 ? "active-bar" : "inactive-bar"
          }`}
        ></div>
        <div className={`progress-circle ${page >= 1 ? "active-circle" : ""}`}>
          2
        </div>
        <div
          className={`progress-bar ${
            page >= 2 ? "active-bar" : "inactive-bar"
          }`}
        ></div>
        <div className={`progress-circle ${page >= 2 ? "active-circle" : ""}`}>
          3
        </div>
      </div>
      <div className='form-container'>
        <div className='form-body-add-property'>{PageDisplay()}</div>
        <AddPrpoertyFooter
          navigate={navigate}
          isEdit={isEdit}
          page={page}
          totalPages={FormTitles.length}
          isLoading={isLoading}
          setPage={setPage}
          isLoadingEditing={isLoadingEditing}
          goNext={checkPass}
          formData={formData}
          submitEdit={() => editProperty(addPropData, property?._id)}
          submitForm={() => addProperty(addPropData)}
        />
      </div>
    </div>
  );
};

export default AddProperty;
