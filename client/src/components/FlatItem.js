import { Link } from "react-router-dom";
import React from "react";


const FlatItem = ({ property }) => {
  const image = property?.images?.split(",")[0];
  const backendBaseUrl = process.env.REACT_APP_SERVER_KEY;
  const imageUrl = `${backendBaseUrl}/${image.replace(/\\/g, "/")}`;

  return (
    <div className="text-center col-lg-4 col-12 col-md-6 ">
      <div className="item">
        <div className="item-image">
          <img
            className="img-fluid"
            // onLoad={() => setIsLoaded(true)}
            // data-src={imageUrl}
            src={imageUrl}
            loading="lazy"
            alt="flat"
          />
        </div>
        <div className="item-description">
          <div className="d-flex justify-content-between mb-3">
            <span className="item-title">{property.name}</span>
            <span className="item-price">{property.price} TND </span>
          </div>
          <div className="item-icon d-flex alig-items-center justify-content-between">
            <div>
              <i className="fas fa-check-circle"></i>{" "}
              <span>{property?.surface}</span>
            </div>
            <div>
              <i className="fas fa-check-circle"></i>{" "}
              <span> {property?.chambres}</span>
            </div>
            <div>
              <i className="fas fa-check-circle"></i>{" "}
              <span> {property?.sallesDeBains}</span>
            </div>
            <Link
              to={`/detailbiens/${property._id}`}
              className="item-title"
            >
              <button className="btn btn-detail">View</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(FlatItem);
