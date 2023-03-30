import SearchBar from "./SearchBar";
import keycloak from "../../keycloak";

import { Link, useLocation } from "react-router-dom";

import { storageSave } from "../../utils/storage";

const Header = ({ setSearchResults, onSearch }) => {
  const location = useLocation();

  const logout = () => {
    storageSave("lagalt-user", null);
    keycloak.logout();
  };

  const onSearchInputChange = () => {
    onSearch();
  };

  return (
    <nav className="bg-gray-50 sticky top-0">
      <div className="container flex flex-wrap items-center justify-between mx-auto py-2">
        {/* Logo */}
        <div className="flex order-3">
          <ul className="">
            <li>
              {/* Login Icon */}
              {!keycloak.authenticated && (
                <button onClick={() => keycloak.login()}>
                  <img
                    src="images/LoginIcon.svg"
                    className="h-9 mr-3"
                    alt="Login icon"
                  />
                </button>
              )}
              {/* Profile Icon */}
              {keycloak.authenticated && (
                <div className="flex space-x-5">
                  <Link to="/profile">
                    <img
                      src="images/UserIcon.svg"
                      className="h-9 mr-3"
                      alt="User icon"
                    />
                  </Link>
                  {/* Logout Icon */}
                  <button className="" onClick={() => logout()}>
                    <img
                      src="images/LogOutIcon.svg"
                      className="h-9 mr-3 "
                      alt="Login icon"
                    />
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
        {/* Search Bar */}
        <div className="flex order-2">
          {location.pathname != "/profile" && (
            <SearchBar
              setSearchResults={setSearchResults}
              onSearchInputChange={onSearchInputChange}
            />
          )}
        </div>
        {/* Home Button */}
        <div className="order-">
          <Link to="/">
            <img
              src="images/HomeIcon.svg"
              className="h-9 mr-3"
              alt="Login icon"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
