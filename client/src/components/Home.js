import FlatList from "./FlatList";
// import Banner from "./Banner";
import React from "react";
import TeamList from "./TeamList";
import References from "./References";
// import Subscribe from "./Subscribe";
import BestFlatList from "./BestFlatList";

<<<<<<< HEAD
const Home=()=>{
    return (
        <React.Fragment>
            {/* <Banner/> */}
            <FlatList/>
            <BestFlatList/>
            {/* <Subscribe/> */}
            <TeamList/>
            <References/>
        </React.Fragment>
    )
}
=======
const Home = () => {
>>>>>>> dev


  return (
    <React.Fragment>
      {/* <Banner/> */}
      <FlatList type={0} />
      <FlatList type={3} />
      <FlatList type={4} />
      <BestFlatList />
      {/* <Subscribe/> */}
      <TeamList />
      <References />
    </React.Fragment>
  );
};

export default Home;
