import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

const SearchBar = ({ setSearchResults, onSearchInputChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [projects, setProjects] = useState([]);

  const { projectList, setProjectList } = useUser();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);

    if (event.target.value === "") {
      onSearchInputChange();
    }
  };

  useEffect(() => {
    if(projectList){
    const filteredList = projectList.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredList);
    }


  }, [searchTerm]);

  return (
    <>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none outline-none">
        <svg
          className="w-5 h-5 text-gray-500"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"></path>
        </svg>
      </div>
      <input
        type="text"
        id="search-navbar"
        className="block w-96 p-2 pl-10 text-sm text-gray-900 border-2 border-gray-600 rounded-lg focus:ring-rose-400 focus:border-rose-400 bg-gray-100
                  placeholder-gray-500 font-playfair outline-none focus:border-2 "
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </>
  );
};

export default SearchBar;
