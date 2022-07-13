import ContentLoader from "./ContentLoader";

const createLoaders = (count, type) => {
  const loaders = [];

  for (let i = 0; i <= count; i++) {
    const generatedLoaders = [
      <div
        key={`loader-${i}`}
        className="col-12 col-xl-3 col-lg-4 col-md-6 col-sm-12 my-2"
      >
        <ContentLoader />
      </div>,
      <div key={`loader-${i}`} className="col-12 my-2">
        <ContentLoader />
      </div>,
    ];

    if (type === "checklist") {
      loaders.push(generatedLoaders[0]);
    } else if (type === "template") {
      loaders.push(generatedLoaders[1]);
    }
  }

  return <>{loaders}</>;
};

export default createLoaders;
