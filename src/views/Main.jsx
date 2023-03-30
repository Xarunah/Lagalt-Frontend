import ProjectCard from "../components/cards/ProjectCard";
import { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { storageSave, storageRead } from "../utils/storage";
import keycloak from "../keycloak";
import { API_URL } from "../utils/apiUrls";

const Main = ({ searchResults, isSearching, setSearching }) => {
  const [selectedCategoryList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [projectsList, setProjectsList] = useState();
  const { user, setUser } = useUser();

  useEffect(() => {
    const allUsers = storageRead("lagalt-allUsers");
    //const user = storageRead("lagalt-user");

    //  if (!allUsers) {
    console.log("fetch all users");
    const allUsersFetch = async () => {
      const data = await (
        await fetch(`${API_URL}/api/v1/user/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
            "Content-Type": "application/json",
          },
        })
      ).json();
      if (data.data !== null) {
        storageSave("lagalt-allUsers", data.data);
      }
    };
    allUsersFetch();
    // }

    let hasUser = false;
    if (keycloak.authenticated && !user && allUsers) {
      for (const user of allUsers) {
        if (keycloak.tokenParsed.sub === user.userId) {
          setUser(user);
          hasUser = true;
        }
      }
      if (!user && !hasUser) {
        const toSave = {
          userId: keycloak.tokenParsed.sub,
          username: keycloak.tokenParsed.name,
          userEmail: keycloak.tokenParsed.email,
        };

        const toSaveV2 = {
          userId: keycloak.tokenParsed.sub,
          username: keycloak.tokenParsed.name,
          userEmail: keycloak.tokenParsed.email,
          userDescription: "",
          userPortfolio: "",
          userSkill: [],
          userVisibility: false,
        };

        fetch(`${API_URL}/api/v1/user/`, {
          method: "POST",

          headers: {
            Authorization: `Bearer ${keycloak.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(toSave),
        })
          .then((response) => response.json())
          .then((toSave) => {
            console.log("Success:", toSave);
            setUser(toSaveV2);

            storageSave("lagalt-user", toSaveV2);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }

    const dataFetch = async () => {
      const data = await (await fetch(`${API_URL}/api/v1/project/list`)).json();

      storageSave("lagalt-projects", data.data);
      setProjectsList(data.data);
      setFilteredList(data.data);
    };

    dataFetch();
  }, []);

  const handleCategoryChange = (category) => {
    if (category.target.checked) {
      if (!selectedCategoryList.includes(category.target.value)) {
        selectedCategoryList.push(category.target.value);
        setSearching(false);
      }
    } else {
      if (selectedCategoryList.includes(category.target.value)) {
        selectedCategoryList.splice(
          selectedCategoryList.indexOf(category.target.value),
          1
        );
        setSearching(false);
      }
    }
    setFilteredList(getFilteredList());
  };

  const getFilteredList = () => {
    if (selectedCategoryList.length == 0) {
      return projectsList;
    }
    return projectsList.filter(function (currentElement) {
      return selectedCategoryList.includes(currentElement.category);
    });
  };

  return (
    <>
      <div className="flex">
        <aside className="h-screen fixed  w-44 left-0 flex-auto max-h-full mr-24 bg-gray-50 text-xl text-gray-900 border-gray-200 font-playfair font-bold ">
          <div>
            <ul>
              <li>
                <div className="flex items-center px-3">
                  <input
                    id="film"
                    type="checkbox"
                    value="Film"
                    onChange={handleCategoryChange}
                    className="w-4 h-4 hidden bg-gray-100 border-gray-300 rounded text-rose-400"
                  />
                  <label
                    htmlFor="film"
                    className={`w-full py-2 rounded-md text-gray-900 hover:bg-gray-200 px-3 ${selectedCategoryList.includes('Film') ? 'bg-gray-200' : ''}`}
                  >
                    Film
                  </label>
                </div>
              </li>

              <li>
                <div className="flex items-center px-3">
                  <input
                    id="music"
                    type="checkbox"
                    value="Music"
                    onChange={handleCategoryChange}
                    className="w-4 h-4 bg-gray-100 hidden rounded text-rose-400"
                  />
                  <label
                    htmlFor="music"
                    className={`w-full py-2 rounded-md text-gray-900 hover:bg-gray-200 px-3 ${selectedCategoryList.includes('Music') ? 'bg-gray-200' : ''}`}
                  >
                    Music
                  </label>
                </div>
              </li>

              <li>
                <div className="flex items-center px-3">
                  <input
                    id="game"
                    type="checkbox"
                    value="Game"
                    onChange={handleCategoryChange}
                    className="w-4 h-4 hidden bg-gray-100 border-gray-300  text-rose-400"
                  />
                  <label
                    htmlFor="game"
                    className={`w-full py-2 rounded-md text-gray-900 hover:bg-gray-200 px-3 ${selectedCategoryList.includes('Game') ? 'bg-gray-200' : ''}`}
                  >
                    Game
                  </label>
                </div>
              </li>

              <li>
                <div className="flex items-center px-3">
                  <input
                    id="web"
                    type="checkbox"
                    value="Web"
                    onChange={handleCategoryChange}
                    className="hidden w-4 h-4 bg-gray-100 border-gray-300 rounded text-rose-400"
                  />
                  <label
                    htmlFor="web"
                    className={`w-full py-2 rounded-md text-gray-900 hover:bg-gray-200 px-3 ${selectedCategoryList.includes('Web') ? 'bg-gray-200' : ''}`}
                  >
                    Web
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </aside>

        <div className="flex-auto ml-96 mt-16 ">
          {filteredList ? (
            <div className="">
              {!isSearching &&
                filteredList.map((element, index) => (
                  <ProjectCard {...element} key={index} />
                ))}

              {isSearching &&
                searchResults.map((element, index) => (
                  <ProjectCard {...element} />
                ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Main;
