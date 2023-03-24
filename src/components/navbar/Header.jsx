import React, { useState } from "react";
import SearchBar from "./SearchBar";
import keycloak from "../../keycloak";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../context/UserContext";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { storageSave } from "../../utils/storage";

const Header = ({ setSearchResults, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();

  const location = useLocation()

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => { 
    storageSave("lagalt-user", null);
    keycloak.logout();
  };

  const onSearchInputChange = () => {
    onSearch();
  };

  return (
    <>
      <nav className="h-16 top-0 z-100 fixed w-full border-gray-200 px-2 py-2.5 rounded bg-slate-100 backdrop-filter backdrop-blur-lg bg-opacity-30 firefox:bg-opacity-30 z-50">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <Link className="flex items-center scale-150" to="/">
            <FontAwesomeIcon icon={faHouse} />
          </Link>

          <div className="flex order-2">
            <ul>
              <li>
                {!keycloak.authenticated && (
                  <button
                    className="scale-150"
                    onClick={() => keycloak.login()}
                  >
                    <FontAwesomeIcon icon={faRightToBracket} />
                  </button>
                )}

                {keycloak.authenticated && (
                  <div className="flex space-x-12">
                    <Link to="/profile" className="scale-150">
                      <FontAwesomeIcon icon={faUser} />
                    </Link>
                    <button
                      className="scale-150"
                      onClick={() => logout()}
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} />
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>

          <div className="items-center justify-between " id="navbar-search">
            <div className="flex flex-col">
              <div className="relative ">


              {location.pathname != "/profile" &&
                <SearchBar
                  setSearchResults={setSearchResults}
                  onSearchInputChange={onSearchInputChange}
                />
                }
                
              </div>
            </div>
          </div>



        </div>
      </nav>
    </>
  );
};

export default Header;
