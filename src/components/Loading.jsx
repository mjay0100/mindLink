import BarLoader from "react-spinners/BarLoader";
const override = {
  display: "block",
  margin: "5rem auto",
};
const Loading = () => {
  return (
    <BarLoader
      color="#6495ED"
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
  );
};

export default Loading;
