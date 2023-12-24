import toast from "react-hot-toast";
import MoonLoaderSpinner from "../components/MoonLoaderSpinner";
const AddPrpoertyFooter = ({
  isEdit,
  navigate,
  page,
  totalPages,
  isLoading,
  isLoadingEditing,
  goNext,
  setPage,
  submitForm,
  submitEdit,
  formData,
}) => {
  const handleNextClick = () => {
    const canProceed = goNext(page, formData);
    if (!canProceed.pass) {
      // If the check does not pass, show an alert and do not proceed
      toast.error(canProceed.error);
      return; // Stop the function from doing anything else
    }
    // Check if it's the last page and if so, call the submit function
    if (page === totalPages - 1 && isEdit) {
      const canProceed = goNext(page, formData);
      if (!canProceed.pass) {
        // If the check does not pass, show an alert and do not proceed
        toast.error(canProceed.error);
        return; // Stop the function from doing anything else
      }
      submitEdit();
    } else if (page === totalPages - 1) {
      const canProceed = goNext(page, formData);
      if (!canProceed.pass) {
        // If the check does not pass, show an alert and do not proceed
        toast.error(canProceed.error);
        return; // Stop the function from doing anything else
      }
      submitForm();
    } else {
      // Otherwise, proceed to the next page
      setPage((currPage) => currPage + 1);
    }
  };
  const handlePreviousClick = () => {
    setPage((currPage) => currPage - 1);
  };

  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className='footer'>
      <button
        className='prev-btn'
        onClick={page !== 0 ? handlePreviousClick : navigateHome}
      >
        {page === 0 ? "Annuler" : "Retour"}
      </button>
      {!isLoading && !isLoadingEditing ? (
        <button className='next-btn' type='button' onClick={handleNextClick}>
          {page === totalPages - 1
            ? isEdit
              ? "Editer ce bien"
              : "Ajouter"
            : "Suivant"}
        </button>
      ) : (
        <MoonLoaderSpinner />
      )}
    </div>
  );
};

export default AddPrpoertyFooter;
