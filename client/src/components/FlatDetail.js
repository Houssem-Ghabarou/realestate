import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { useParams, useLocation } from "react-router-dom"; // Import useParams
import proeprtyService from "../redux/services/propertyService";
import "react-image-gallery/styles/css/image-gallery.css";
import ClipLoader from "react-spinners/ClipLoader";
import ContactDetails from "./ContactDetails";
import FlatList from "./FlatList";
import {
  capitalizeFirstLetter,
  capitalizeEachWord,
} from "../utils/capitalizeFirstLetter";
import { IoLocationSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import ref from "../assets/ref.svg";
import bathroom from "../assets/bathroom.svg";
import bedroom from "../assets/bedroom.svg";
import surface from "../assets/surface.svg";
import garage from "../assets/garage.svg";
import furniture from "../assets/furniture.svg";
import { FaCheck } from "react-icons/fa";
import PriceChanger from "./PriceChanger";
import useProgressBar from "./useProgressBar";
import HelmetSeo from "./HelmetSeo";
import PropNotFound from "./PropNotFound";
const FlatDetail = ({ setProgress }) => {
  useProgressBar(setProgress);
  const { t } = useTranslation();

  const { state } = useLocation();
  const propertyDetailsFromProps = state?.propertyData;
  const [propertyDetails, setPropertyDetails] = useState(
    propertyDetailsFromProps
  );
  const [loading, setLoading] = useState(true); // Add a loading state

  const [imagesLoaded, setImagesLoaded] = useState(false);
  const { propIdName } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Adjust this function to check whether it is passed from the props,
    // or it needs to be fetched from the API.
    const fetchPropertyDetailsIfNeeded = async () => {
      if (propertyDetailsFromProps) {
        setPropertyDetails(propertyDetailsFromProps);
        setLoading(false); // Data is immediately available, turn off loading.
      } else if (propIdName) {
        try {
          setLoading(true); // Begin loading since we're fetching data.
          let data = await proeprtyService.getPropertyDetails(propIdName);
          setPropertyDetails(data);
          setLoading(false); // Data fetched, turn off loading.
        } catch (error) {
          setLoading(false); // Turn off loading even if there's an error.
        }
      }
    };

    fetchPropertyDetailsIfNeeded();
  }, [propIdName, propertyDetailsFromProps]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    // While loading, render a spinner or any loading indicator you prefer.
    return (
      <div className='loader'>
        <ClipLoader
          color={"#333"}
          loading={!imagesLoaded}
          size={100}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      </div>
    );
  }

  const backendBaseUrl = process.env.REACT_APP_SERVER_KEY;
  const imageFilenames = propertyDetails?.images
    ? propertyDetails?.images?.split(",")
    : [];
  const imageUrls = imageFilenames.map((filename) => ({
    original: `${backendBaseUrl}/${filename?.replace(/\\/g, "/")}`,
    thumbnail: `${backendBaseUrl}/${filename?.replace(/\\/g, "/")}`,
  }));

  const propertyDetailsData = [
    { key: "reference", label: t("propertiesDetails.reference"), icon: ref },
    { key: "type", label: t("propertiesDetails.type"), icon: ref },
    { key: "surface", label: t("propertiesDetails.surface"), icon: surface },
    { key: "chambres", label: t("propertiesDetails.chambre"), icon: bedroom },
    {
      key: "sallesDeBains",
      label: t("propertiesDetails.salledebains"),
      icon: bathroom,
    },
    { key: "parking", label: t("propertiesDetails.parking"), icon: garage },
  ];

  const style = { color: "#DAA520" };

  const translatedCate = t(`categories.${propertyDetails?.category}`);

  if (!propertyDetails || !propertyDetails?.length === 0) {
    return <PropNotFound />;
  }
  return (
    <div className='flat-detail'>
      <HelmetSeo
        title={`${translatedCate} - ${capitalizeEachWord(
          propertyDetails?.name
        )} - ${t("flatDetail")}`}
        url={`${process.env.REACT_APP_WEBSITE_URL}/bien/details/${propIdName}`}
        description={`${propertyDetails?.description}`}
        image={`${imageUrls?.[0]?.original}`}
      />

      <div className='container mb-5'>
        <div className='row'>
          <>
            <div className='col-lg-8'>
              <div className='fd-top flat-detail-content'>
                <div>
                  <h3 className='flat-detail-title'>
                    {capitalizeFirstLetter(propertyDetails?.name)}
                  </h3>
                  <p className='fd-address'>
                    <IoLocationSharp />
                    {capitalizeFirstLetter(propertyDetails?.location)}
                  </p>
                </div>
                <div>
                  <span className='fd-price'>
                    <PriceChanger propertyPrice={propertyDetails?.price} />
                  </span>
                </div>
              </div>
              {!imagesLoaded ? (
                <div className='loader'>
                  <ClipLoader
                    color={"#333"}
                    loading={!imagesLoaded}
                    size={100}
                    aria-label='Loading Spinner'
                    data-testid='loader'
                  />
                </div>
              ) : (
                <ImageGallery
                  flickThreshold={0.5}
                  slideDuration={0}
                  items={imageUrls}
                  showNav={true}
                  showFullscreenButton={true}
                  showPlayButton={false}
                  originalAlt={`immobilier-${propertyDetails?.name}`}
                />
              )}
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='fd-item fd-property-detail'>
                    <h4>{t("propertiesDetails.details")}</h4>
                    <div className='details-architecture'>
                      {propertyDetailsData?.map(
                        ({ key, label, icon }) =>
                          (propertyDetails?.[key] ||
                            propertyDetails?.[key]?.length > 0) && (
                            <div className='details-container' key={key}>
                              <>
                                <div className='image-container'>
                                  <img src={icon} alt={key} />
                                </div>
                                <div>
                                  <h6>{label}</h6>
                                  <span>{propertyDetails[key] || "N/A"}</span>
                                </div>
                              </>
                            </div>
                          )
                      )}
                      <div className='details-container'>
                        {propertyDetails?.ammeublement && (
                          <>
                            <div className='image-container'>
                              <img src={furniture} alt='ammeublement' />
                            </div>
                            <div>
                              <h6>{t("ammeublement")}</h6>
                              <span>
                                {t(
                                  `ammeubl.${propertyDetails?.ammeublement}`
                                ) || "N/A"}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='fd-item'>
                    <h4>{t("description")}</h4>
                    <p>{propertyDetails?.description}</p>
                  </div>
                  <div className='fd-item fd-features'>
                    <h4>{t("caractéristiques")}</h4>
                    <div className='row'>
                      {propertyDetails?.characteristics?.map(
                        (characteristic) => (
                          <div className='col-lg-4' key={characteristic}>
                            <FaCheck style={style} />
                            <span>{t(`features.${characteristic}`)}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <ContactDetails propertyId={propertyDetails?._id} />
              {/* Add any other content for the right column here */}
            </div>
          </>

          <FlatList type={0} />
        </div>
      </div>
    </div>
  );
};

export default FlatDetail;
