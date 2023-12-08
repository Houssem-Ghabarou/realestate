import backgroundVilla from "../assets/bg.webp";
import Search from "./Search";
import Header from "./Header";
const Banner = () => {
  return (
    <div
      className="banner d-flex align-items-center background-image"
      style={{
        backgroundImage: `url(${backgroundVilla})`,
        // clipPath: "inset(0 0 0 0 round 0% 0% 20% 20%)",
      }}
    >
      <div className="bg-custom">
        <Header />

        <div className="container">
          <div className="row">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
