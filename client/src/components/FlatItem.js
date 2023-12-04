import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import surface from "../assets/surface.svg";
import bedroom from "../assets/bedroom.svg";
import bathroom from "../assets/bathroom.svg";
import { LuArrowRightCircle } from "react-icons/lu";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";
import { IoLocationSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const FlatItem = ({ property }) => {
  const { t } = useTranslation();

  const image = property?.images?.split(",")[0];
  const backendBaseUrl = process.env.REACT_APP_SERVER_KEY;
  const imageUrl = `${backendBaseUrl}/${image.replace(/\\/g, "/")}`;

  const name = capitalizeFirstLetter(property?.name);
  const category = capitalizeFirstLetter(property?.category);
  const type = capitalizeFirstLetter(t(`type.${property?.type}`));
  return (
    <div className="text-center col-lg-4 col-12 col-md-6 ">
      <div className="item">
        <Link
          to={{
            pathname: `/detailbiens/${property?._id}`,
            state: { propertyData: property },
          }}
          className="item-title"
        >
          <div className="item-image">
            <div className="item-image" style={{ position: "relative" }}>
              <img
                className="property-image"
                src={imageUrl}
                loading="lazy"
                alt="flat"
              />
              <div className="type-property">{type}</div>{" "}
              <div
                className={`best-estate-state ${
                  property?.category === "location" ? "bg-green" : "bg-red"
                }`}
              >
                {category === "location" ? t("forRent") : t("forSale")}
              </div>
            </div>
          </div>
        </Link>

        <div className="item-description">
          <div className="d-flex justify-content-between ">
            <span className="item-title">{name}</span>
            <span className="item-price">{property.price} TND </span>
          </div>
          <div className="d-flex item-location">
            <div style={{ marginRight: "0.3rem" }}>
              <IoLocationSharp />{" "}
            </div>
            <div> {property?.location}</div>
          </div>
          <div className="item-icon d-flex alig-items-center justify-content-between">
            <div>
              <img src={surface} alt="surface" className="img-highlights" />
              <span>
                {property?.surface} {t("m²")}
              </span>
            </div>
            {property?.chambres && (
              <div>
                <img src={bedroom} alt="bedroom" className="img-highlights" />
                <span> {property?.chambres}</span>
              </div>
            )}
            {property?.sallesDeBains && (
              <div>
                <img src={bathroom} alt="bedroom" className="img-highlights" />
                <span> {property?.sallesDeBains}</span>
              </div>
            )}
            <Link
              to={{
                pathname: `/detailbiens/${property._id}`,
                state: { propertyData: property },
              }}
              className="item-title"
            >
              {/* <button className="btn btn-detail">View</button> */}
              <LuArrowRightCircle
                style={{ color: "#DAA520", height: "23px", width: "23px" }}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add prop validation
FlatItem.propTypes = {
  property: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    location: PropTypes.string.isRequired,
    surface: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    chambres: PropTypes.number,
    sallesDeBains: PropTypes.number,
    images: PropTypes.string,
  }).isRequired,
};

export default React.memo(FlatItem);
