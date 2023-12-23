import React, { useState } from "react";
import Step1 from "../components/Step1";
import Step2 from "../components/Step2";
import Step3 from "../components/Step3";
import { useAddProperty } from "../hooks/useAddProperty";
import { checkPass } from "../util/checkPass";
import AddPrpoertyFooter from "../components/AddPropertyFooter";
import { filterFormData } from "../util/filterFormatData";
const AddProperty = () => {
  const { addProperty, isSuccess, error, isLoading } = useAddProperty();
  const [page, setPage] = useState(0);
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
  console.log(formData, "fomrdata");

  const addPropData = filterFormData(formData);

  console.log(addPropData);
  const FormTitles = ["Étape 1", "Étape 2", "Étape 3"];

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

  //  if (error) {
  //   toast.error(error);
  // }, [third])

  return (
    <div className='form'>
      <div className='header'>
        <h4>
          Ajouter un bien : <span>{FormTitles[page]}</span>
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
          page={page}
          totalPages={FormTitles.length}
          isLoading={isLoading}
          setPage={setPage}
          goNext={checkPass}
          formData={formData}
          submitForm={() => addProperty(addPropData)}
        />
      </div>
    </div>
  );
};

export default AddProperty;
