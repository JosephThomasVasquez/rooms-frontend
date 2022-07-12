import ContentLoader from "./ContentLoader";

const createLoaders = (count) => {
  return (
    <>
      <div className="col-12 col-xl-3 col-lg-4 col-md-6 col-sm-12">
        <ContentLoader />
      </div>
      <div className="col-12 col-xl-3 col-lg-4 col-md-6 col-sm-12">
        <ContentLoader />
      </div>
      <div className="col-12 col-xl-3 col-lg-4 col-md-6 col-sm-12">
        <ContentLoader />
      </div>
      <div className="col-12 col-xl-3 col-lg-4 col-md-6 col-sm-12">
        <ContentLoader />
      </div>
      <div className="col-12 col-xl-3 col-lg-4 col-md-6 col-sm-12">
        <ContentLoader />
      </div>
      <div className="col-12 col-xl-3 col-lg-4 col-md-6 col-sm-12">
        <ContentLoader />
      </div>
    </>
  );
};

export default createLoaders;
