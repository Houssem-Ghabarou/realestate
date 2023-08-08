import FlatList from "./FlatList";
import Banner from "./Banner";
import React from "react";
import TeamList from "./TeamList";
import References from "./References";
import Subscribe from "./Subscribe";
import BestFlatList from "./BestFlatList";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties } from "../redux/slices/propertySlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const allProperties = useSelector((state) => state.property.properties);
  const vente = useSelector((state) => state.property.vente);
  const location = useSelector((state) => state.property.location);

  useEffect(() => {
    const getAllProps = async () => {
      await dispatch(getAllProperties());
    };
    getAllProps();
  }, []);

  console.log(allProperties, "alllllllllllll properties");

  return (
    <React.Fragment>
      <Banner/>
      <FlatList />
      <BestFlatList />
      {/* <Subscribe/> */}
      <TeamList />
      <References />
    </React.Fragment>
  );
};

export default Home;
