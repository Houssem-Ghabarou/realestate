import React, { useEffect, useState, useContext } from "react";
import propertyService from "../redux/services/propertyService";
import ReactPaginate from "react-paginate";
import Title from "./Title";
import FlatItem from "./FlatItem";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router-dom";
import { SearchResultContext } from "../context/SearchContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTranslation } from "react-i18next";
import NotAvailbale from "./NotAvailbale";

const ITEMS_PER_PAGE = 12; // Number of properties to display per page

const FlatList = ({ type }) => {
  const history = useHistory();
  const currentPath = history.location.pathname;
  const { t } = useTranslation();
  const [loading, setloading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);
  // Extract the id from the path, assuming it's a route like "/detailbiens/:id"
  const match = currentPath.match(/\/bien\/details\/(.+)/);
  const isDetailBiensRoute = match !== null;
  const { isSearching, searchResults } = useContext(SearchResultContext);

  const {
    getLastSixProperties,
    getAllvente,
    getAlllocation,
    getLastSixLocationProperties,
    getLastSixVenteProperties,
    getPropByCategoryType,
  } = propertyService;
  let text = "";
  const [prop, setProp] = useState([]);
  const { category, proptype } = useParams();
  // Initialize the current page state
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const properties = prop;

  const pageCount = Math.ceil(properties?.length / ITEMS_PER_PAGE);

  const visibleProperties = properties?.slice(startIndex, endIndex);

  switch (type) {
    case 1:
      if (!isSearching) {
        text = t("flatlist.bienEnVente");
      } else {
        text = t("flatlist.resultatRecherche");
      }
      break;
    case 2:
      if (!isSearching) {
        text = t("flatlist.bienEnLocation");
      } else {
        text = t("flatlist.resultatRecherche");
      }
      break;
    case 0:
      text = t("flatlist.recement");
      break;
    case 3:
      text = t("flatlist.recementVente");
      break;
    case 4:
      text = t("flatlist.recementLocation");
      break;
    case 5:
      if (!isSearching) {
        text = t("message", {
          category: t(`categories.${category}`),
          proptype: t(`type.${proptype}`),
        });
      }

      if (isSearching) {
        text = t("flatlist.resultatRecherche");
      }

      break;
    case 6:
      if (isSearching) {
        text = t("flatlist.resultatRecherche");
      }
      break;

    default:
      break;
  }

  const title = {
    text,
  };

  const fetchData = async (type) => {
    setloading(true);
    setDataFetched(false); // Reset dataFetched when starting a new API call

    try {
      let data = null;
      switch (type) {
        case 0:
          data = await getLastSixProperties();
          break;
        case 1:
          if (!isSearching) {
            data = await getAllvente();
          } else {
            data = searchResults;
          }
          break;
        case 2:
          if (!isSearching) {
            data = await getAlllocation();
          } else {
            data = searchResults;
          }
          break;
        case 3:
          data = await getLastSixVenteProperties();
          break;
        case 4:
          data = await getLastSixLocationProperties();
          break;
        case 5:
          if (!isSearching) {
            data = await getPropByCategoryType(category, proptype);
          } else {
            data = searchResults;
          }
          break;
        case 6:
          data = searchResults;
          break;
        default:
          // Handle other cases if needed
          break;
      }
      setloading(false);
      setDataFetched(true); // Set dataFetched to true when the API call is completed
      return data;
    } catch (error) {
      console.error(error);
      setloading(false);
      setDataFetched(true); // Set dataFetched to true even in case of an error
      return null; // Handle the error and return null or an error object
    }
  };

  useEffect(() => {
    const fetchDataAndSetData = async () => {
      const data = await fetchData(type);

      if (data !== null) {
        setProp(data);
      }
    };

    fetchDataAndSetData();
  }, [type, category, proptype, searchResults, isSearching]);

  const scrollTo = () => {
    window.scrollTo(0, 5);
  };

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
    );
  }
  if (dataFetched && properties?.length === 0) {
    return <NotAvailbale />;
  }

  return (
    <section className="section-all-re bakcground-section-color">
      <div className="container">
        {(type === 0 ||
          type === 3 ||
          type === 4 ||
          (type === 5 && !isDetailBiensRoute) ||
          type === 6 ||
          type === 1 ||
          type === 2) &&
          properties?.length > 0 && (
            <Title
              title={title?.text}
              propertiesLength={properties?.length}
              type={type}
            />
          )}
        <div className="row">
          {visibleProperties?.map((property) => (
            <FlatItem key={property._id} property={property} />
          ))}
        </div>
        {type !== 0 && type !== 3 && type !== 4 && properties?.length > 0 && (
          <ReactPaginate
            onClick={scrollTo}
            breakLabel="..."
            previousLabel="<"
            nextLabel=">"
            pageCount={pageCount}
            pageRangeDisplayed={3}
            renderOnZeroPageCount={null}
            onPageChange={({ selected }) => setCurrentPage(selected)}
            containerClassName="pagination"
            pageLinkClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            activeLinkClassName="active-link"
            activeClassName="active"
          />
        )}
      </div>
    </section>
  );
};

export default FlatList;
