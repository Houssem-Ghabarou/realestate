import backgroundVilla from "../assets/backgrounds/bg7.jpg";
import Search from "./Search";
import Header from "./Header";
const Banner = ({ setProgress }) => {
  return (
    <section
      className='banner d-flex align-items-center background-image'
      style={{
        backgroundImage: `url(${backgroundVilla})`,
        // clipPath: "inset(0 0 0 0 round 0% 0% 20% 20%)",
      }}
    >
      <div className='bg-custom'>
        <Header setProgress={setProgress} />

        <div className='container'>
          <div className='row'>
            <Search setProgress={setProgress} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
