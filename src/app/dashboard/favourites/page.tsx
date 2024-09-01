import FileBrowser from "../_components/file-browser";
export const runtime = 'edge';
const Favourites = () => {
  return (
    <>
      <FileBrowser title="Favourites" favourites={true}  />
    </>
  );
};

export default Favourites;
