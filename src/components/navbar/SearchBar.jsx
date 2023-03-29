import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

const SearchBar = ({ setSearchResults, onSearchInputChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { projectList, setProjectList } = useUser();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearchInputChange();
  };

  useEffect(() => {
    if (projectList) {
      const filteredList = projectList.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredList);
    }
  }, [searchTerm]);

  return (
    <div className="">
      <div className="relative block">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <img
            className="w-5 h-5 text-gray-500"
            alt="search icon"
            src="images/SearchIcon.svg"
          ></img>
        </div>

        <input
          type="text"
          id="search-navbar"
          className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-rose-400 focus:border-rose-400 placeholder-gray-500 font-playfair"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
