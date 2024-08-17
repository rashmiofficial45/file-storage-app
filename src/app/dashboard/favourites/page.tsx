import FileBrowser from "../_components/file-browser";

const Favourites = () => {
  return (
    <>
      <FileBrowser title="Favourites" favourites={true}  />
    </>
  );
};

export default Favourites;
