import React, { useState } from "react";
import PropertyItem from "./PropertyItem";
import ReactPaginate from "react-paginate";
const ITEMS_PER_PAGE = 12; // Number of properties to display per page

const PropertyInformations = ({ propertyData, setDeleteSucess }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const properties = propertyData;
  const pageCount = Math.ceil(properties?.length / ITEMS_PER_PAGE);

  const visibleProperties = properties?.slice(startIndex, endIndex);

  const scrollTo = () => {
    window.scrollTo(0, 5);
  };
  return (
    <div>
      <div className='property-main-container'>
        {visibleProperties?.map((property) => (
          <PropertyItem
            property={property}
            key={property?._id}
            setDeleteSucess={setDeleteSucess}
          />
        ))}
      </div>
      <ReactPaginate
        onClick={scrollTo}
        breakLabel='...'
        previousLabel='<'
        nextLabel='>'
        pageCount={pageCount}
        pageRangeDisplayed={3}
        renderOnZeroPageCount={null}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        containerClassName='pagination'
        pageLinkClassName='page-num'
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active-link'
        activeClassName='active'
      />
    </div>
  );
};

export default PropertyInformations;
