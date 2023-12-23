import toast from "react-hot-toast";
import MoonLoaderSpinner from "../components/MoonLoaderSpinner";

const AddPrpoertyFooter = ({
  page,
  totalPages,
  isLoading,
  goNext,
  setPage,
  submitForm,
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
    if (page === totalPages - 1) {
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
  return (
    <div className='footer'>
      <button
        className='prev-btn'
        disabled={page === 0}
        onClick={handlePreviousClick}
      >
        Retour
      </button>
      {!isLoading ? (
        <button className='next-btn' type='button' onClick={handleNextClick}>
          {page === totalPages - 1 ? "Ajouter" : "Suivant"}
        </button>
      ) : (
        <MoonLoaderSpinner />
      )}
    </div>
  );
};

export default AddPrpoertyFooter;
