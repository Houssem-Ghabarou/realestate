import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import propertyService from "../redux/services/propertyService";

import ReactPaginate from "react-paginate";
import Title from "./Title";
import FlatItem from "./FlatItem";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router-dom";

const ITEMS_PER_PAGE = 12; // Number of properties to display per page

const FlatList = ({ type }) => {
  const {
    getLastSixProperties,
    getAllvente,
    getAlllocation,
    getLastSixLocationProperties,
    getLastSixVenteProperties,
    getPropByCategoryType,
  } = propertyService;
  const [prop, setProp] = useState([]);
  const { category, proptype } = useParams();
  // Initialize the current page state
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const properties = prop;

  // console.log(properties, "propertiesssssssssssssss");
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
        ? "Biens récemment mis en vente"
        : type === 4
        ? "Biens récemment mis en location"
        : "property",

    description: "Lorem ipsum dolor sit ame",
  };

  const fetchData = async (type) => {
    try {
      let data = null;
      switch (type) {
        case 0:
          data = await getLastSixProperties();
          break;
        case 1:
          data = await getAllvente();
          break;
        case 2:
          data = await getAlllocation();
          break;
        case 3:
          data = await getLastSixVenteProperties();
          break;
        case 4:
          data = await getLastSixLocationProperties();
          break;
        case 5:
          data = await getPropByCategoryType(category, proptype);
          break;
        default:
          // Handle other cases if needed
          break;
      }

      return data;
    } catch (error) {
      console.error(error);
      return null; // Handle the error and return null or an error object
    }
  };

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const data = await fetchData(type);
      if (data !== null) {
        // Only set the data if it's not null
        setProp(data);
      }
    };

    fetchDataAndSetData();
  }, [type, category, proptype]);

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
        <Title title={title?.text} description={title?.description} />
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
