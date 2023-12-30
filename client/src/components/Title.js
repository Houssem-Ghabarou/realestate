const Title = (props) => {
  const { title, propertiesLength, type } = props;
  return (
    <div className='row'>
      <div className='col-lg-6 mx-auto'>
        <div className='title-area text-center'>
          <h2 className='title'>
            {title}{" "}
            {(type === 6 || type === 1 || type === 2 || type === 5) &&
              propertiesLength}
          </h2>
          {/* <p className="title-description">{description}</p> */}
        </div>
      </div>
    </div>
  );
};

export default Title;
