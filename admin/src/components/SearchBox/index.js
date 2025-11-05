import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  return (
    <div className="searchBox d-flex justify-content-between align-items-center">
      <input type="text" placeholder="Search name here .... " />
      <FaSearch className="mr-2 FaSearch" />
    </div>
  );
};

export default SearchBox;
