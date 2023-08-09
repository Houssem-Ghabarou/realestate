import FlatList from "./FlatList";
import Banner from "./Banner";
import React from "react";
import TeamList from "./TeamList";
import References from "./References";
import Subscribe from "./Subscribe";
import BestFlatList from "./BestFlatList";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  

  // useEffect(() => {
  //   const getAllProps = async () => {
  //     await dispatch(getAllProperties());
  //   };
  //   getAllProps();
  // }, []);

  // console.log(allProperties, "alllllllllllll properties");

  return (
    <React.Fragment>
      <Banner/>
      <FlatList type={0} />
      <BestFlatList />
      {/* <Subscribe/> */}
      <TeamList />
      <References />
    </React.Fragment>
  );
};

export default Home;
