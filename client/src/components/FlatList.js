import Title from "./Title";
import FlatItem from "./FlatItem";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProperties,
  getAllvente,
  getAlllocation,
} from "../redux/slices/propertySlice";
import { useEffect } from "react";

const FlatList = ({ type }) => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => {
    if (type === 0) return state.property.properties;
    if (type === 1) return state.property.vente;
    if (type === 2) return state.property.location;
    return [];
  });

  const title = {
    text: type === 1 ? "vente" : type === 2 ? "location" : "Home",

    description: "Lorem ipsum dolor sit ame",
  };

  useEffect(() => {
    if (type === 0) {
      dispatch(getAllProperties());
    } else if (type === 1) {
      dispatch(getAllvente());
    } else if (type === 2) {
      dispatch(getAlllocation());
    }
  }, [type, dispatch]);

  console.log(properties, type, "propertiessssssssss");

  return (
    <section className="section-all-re">
      <div className="container">
        <Title title={title.text} description={title.description} />
        <div className="row">
          <FlatItem slug="lorem-ipsum-1" />
          <FlatItem slug="lorem-ipsum-2" />
          <FlatItem slug="lorem-ipsum-3" />
          <FlatItem slug="lorem-ipsum-4" />
          <FlatItem slug="lorem-ipsum-5" />
          <FlatItem slug="lorem-ipsum-6" />
        </div>
      </div>
    </section>
  );
};

export default FlatList;
