import SearchBar from "./SearchBar";
import keycloak from "../../keycloak";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { storageSave } from "../../utils/storage";
// import UserIcon from "../../../public/images";

const Header = ({ setSearchResults, onSearch }) => {
  // const location = useLocation();

  // const logout = () => {
  //   storageSave("lagalt-user", null);
  //   keycloak.logout();
  // };

  // const onSearchInputChange = () => {
  //   onSearch();
  // };

  return (
    // <>
    //   <nav className="h-16 top-0 z-100 fixed w-full border-gray-200 px-2 py-2.5 rounded bg-slate-100 backdrop-filter backdrop-blur-lg bg-opacity-30 firefox:bg-opacity-30 z-50">
    //     <div className="container flex flex-wrap items-center justify-between mx-auto">
    //       <Link className="flex items-center scale-150" to="/">
    //         <FontAwesomeIcon icon={faHouse} />
    //       </Link>

    //       <div className="flex order-2 justify-between">
    //         <ul>
    //           <li>
    //             {!keycloak.authenticated && (
    //               <button
    //                 className="scale-150"
    //                 onClick={() => keycloak.login()}
    //               >
    //                 <FontAwesomeIcon icon={faRightToBracket} />
    //               </button>
    //             )}

    //             {keycloak.authenticated && (
    //               <div className="flex space-x-12 my-2">
    //                 <Link to="/profile" className="scale-150">
    //                   <FontAwesomeIcon icon={faUser} />
    //                 </Link>
    //                 <button className="scale-150" onClick={() => logout()}>
    //                   <FontAwesomeIcon icon={faRightFromBracket} />
    //                 </button>
    //               </div>
    //             )}
    //           </li>
    //         </ul>
    //       </div>

    //       <div className="items-center" id="navbar-search">
    //         <div className="flex flex-col">
    //           <div className="relative ">
    //             {location.pathname != "/profile" && (
    //               <SearchBar
    //                 setSearchResults={setSearchResults}
    //                 onSearchInputChange={onSearchInputChange}
    //               />
    //             )}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>
    // </>
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
      <div class="container flex flex-wrap items-center justify-between mx-auto">
        
        {/* Logo */}
        <div className="order-3">
        <a href="https://flowbite.com/" class="flex items-center">
          <img
            src="images/UserIcon.svg"
            class="h-6 mr-3 sm:h-9"
            alt="User icon"
          />
          <img src="images/LoginIcon.svg" 
          class="h-6 mr-3 sm:h-9"
          alt="Login icon" />
           {/* <img src="images/HomeIcon.svg" 
          class="h-6 mr-3 sm:h-9"
          alt="Login icon" /> */}
          {/* <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span> */}
        </a>
        </div>
        
        {/* Search bar */}
        <div class="flex order-2">
          <button
            type="button"
            data-collapse-toggle="navbar-search"
            aria-controls="navbar-search"
            aria-expanded="false"
            class="md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 mr-1"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Search</span>
          </button>
          <div class="relative hidden md:block">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Timeglas i search bar */}
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Search icon</span>
            </div>
            {/* Search bar input field */}
            <input
              type="text"
              id="search-navbar"
              class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
            />
          </div>

          {/* Hamburger menu når vinduet bliver resized */}
          {/* <button
            data-collapse-toggle="navbar-search"
            type="button"
            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
          >
            <span class="sr-only">Open menu</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button> */}
        </div>

        {/*Categories*/}
        <div
          class="items-center justify-between hidden w-full md:flex md:w-auto order-1"
          id="navbar-search"
        >
          <div class="relative mt-3 md:hidden">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-500"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
            />
          </div>

          

          <ul class="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white">
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                aria-current="page"
              >
                Film
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Music
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Game
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
              >
                Web
              </a>
            </li>
          </ul>
        </div>
        <div className="order-"> 
          <img src="images/HomeIcon.svg" 
          class="h-6 mr-3 sm:h-9"
          alt="Login icon" />
          </div>
      </div>
    </nav>
  );
};

export default Header;
