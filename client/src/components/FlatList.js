import Title from "./Title";
import FlatItem from "./FlatItem";
import { useDispatch, useSelector } from "react-redux";

const FlatList = ({ type }) => {
  const title = {
    text: "vente",
    description: "Lorem ipsum dolor sit ame",
  };

//   let properties;
//   if (type === 0) {
//     properties = useSelector((state) => state.property.properties);
//   } else if (type === 1) {
//     properties = "vente";
//   } else {
//     properties = "location";
//   }

  console.log(properties,"propppppppppppp");

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
