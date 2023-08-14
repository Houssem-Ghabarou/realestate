import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLastSixProperties,
  getAllvente,
  getAlllocation,
  getLastSixLocationProperties,
  getLastSixVenteProperties,
} from "../redux/slices/propertySlice";
import ReactPaginate from "react-paginate";
import Title from "./Title";
import FlatItem from "./FlatItem";
import ClipLoader from "react-spinners/ClipLoader";

const ITEMS_PER_PAGE = 12; // Number of properties to display per page

const FlatList = ({ type }) => {
  const dispatch = useDispatch();
  // Initialize the current page state
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const properties = useSelector((state) => {
    if (type === 0) return state.property.lastSixProperties;
    if (type === 1) return state.property.vente;
    if (type === 2) return state.property.location;
    if (type === 3) return state.property.lastSixVenteProperties;
    if (type === 4) return state.property.lastSixLocationProperties;

    return [];
  });

  // Calculate the total number of pages based on properties length and items per page
  const pageCount = Math.ceil(properties?.length / ITEMS_PER_PAGE);

  const visibleProperties = properties?.slice(startIndex, endIndex);

  const loading = useSelector((state) => state.property.loading);

  const title = {
    text:
      type === 1
        ? "vente"
        : type === 2
        ? "location"
        : type === 0
        ? "Biens récemment mis en ligne"
        : type === 3
        ? "Parcourez nos biens mis en vente"
        : "Parcourez nos biens mis en locations",
    description: "Lorem ipsum dolor sit ame",
  };

  useEffect(() => {
    if (type === 0) {
      dispatch(getLastSixProperties());
    } else if (type === 1) {
      dispatch(getAllvente());
    } else if (type === 2) {
      dispatch(getAlllocation());
    } else if (type === 3) {
      dispatch(getLastSixVenteProperties());
    } else if (type === 4) {
      dispatch(getLastSixLocationProperties());
    }
    // eslint-disable-next-line
  }, [type]);

  if (loading) {
    return (
      <div className="loader">
        <ClipLoader
          color={"#333"}
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    ); // Show loading indicator if data is being fetched
  }

  return (
    <section className="section-all-re">
      <div className="container">
        <Title title={title.text} description={title.description} />
        <div className="row">
          {visibleProperties?.map((property) => (
            <FlatItem key={property._id} property={property} />
          ))}
        </div>
        {type !== 0 && type !== 3 && type !== 4 && properties?.length > 0 && (
          <ReactPaginate
            breakLabel="..."
            previousLabel="< previous"
            nextLabel="next >"
            pageCount={pageCount}
            pageRangeDisplayed={3}
            renderOnZeroPageCount={null}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeClassName="active"
          />
        )}
      </div>
    </section>
  );
};

export default FlatList;
