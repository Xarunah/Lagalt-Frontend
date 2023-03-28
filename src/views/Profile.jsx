import ProfileDetails from "../components/profile/ProfileDetails";
import JoinedProjectCard from "../components/cards/CollaboratorCard";
import OwnedProjectCard from "../components/cards/OwnerCard";
import { useState } from "react";
import CreateProject from "../components/project/CreateProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { storageRead, storageSave } from "../utils/storage";
import { useUser } from "../context/UserContext";
import keycloak from "../keycloak";
import { API_URL } from "../utils/apiUrls";

const Profile = (props) => {
  const [projectCreate, setProjectCreate] = useState(false);
  const { user, setUser, projectList, setProjectList } = useUser();
  const [joinedList] = useState([]);
  const [ownedList] = useState([]);
  const [state, setState] = useState();

  const toggleProjectCreation = () => {
    setProjectCreate(!projectCreate);
  };

  const getJoinedAndOwned = () => {
    setProjectList(storageRead("lagalt-projects"));

    console.log(projectList);

    for (let j = 0; j < projectList.length; j++) {
      if (
        keycloak.tokenParsed.sub === projectList[j].userId &&
        !ownedList.includes(projectList[j])
      ) {
        ownedList.push(projectList[j]);
      }
    }
    for (let i = 0; i < projectList.length; i++) {
      for (let j = 0; j < projectList[i].collaborators.length; j++) {
        if (
          projectList[i].collaborators[j] === keycloak.tokenParsed.sub &&
          !joinedList.includes(projectList[i])
        ) {
          joinedList.push(projectList[i]);
        }
      }
    }
  };

  useEffect(() => {
    const userFetch = async () => {
      const data = await (
        await fetch(`${API_URL}/api/v1/user/${keycloak.tokenParsed.sub}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
            "Content-Type": "application/json",
          },
        })
      ).json();
      if (data.data !== null) {
        storageSave("lagalt-user", data.data);
        setUser(data.data);
      }
    };
    userFetch(); //get from user list instead

    getJoinedAndOwned();

    setState(false);
  }, []);

  const onProjectCreate = (project) => {
    setProjectList([...projectList, project]);
    ownedList.push(project);
    storageSave("lagalt-projects", projectList);
    console.log(project);

    fetch(`${API_URL}/api/v1/project/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keycloak.token}`,
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((project) => {
        console.log("Success:", project);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div>
        <div className="flex flex-wrap min-h-screen bg-fixed bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-200 via-green-200 to-green-500">
          <div className=" text-black w-4/12 mt-16">
            <p className="text-4xl text-center font-playfair mt-4">
              Joined Projects
            </p>

            {joinedList.map((element, index) => (
              <JoinedProjectCard key={index} {...element} />
            ))}
          </div>

          <div className=" text-black w-4/12 relative mt-16">
            <p className="text-4xl text-center font-playfair mt-4 relative">
              Owned Projects
            </p>
            {ownedList.map((element, index) => (
              <OwnedProjectCard key={index} {...element} />
            ))}
            <button
              className="scale-150 absolute right-36 top-6"
              onClick={toggleProjectCreation}
            >
              <FontAwesomeIcon icon={faFolderPlus} />
            </button>
          </div>

          <div className=" text-black w-4/12 mt-20 ">
            <ProfileDetails />
          </div>
        </div>
      </div>

      {projectCreate && (
        <CreateProject
          onProjectCreate={onProjectCreate}
          handleClose={toggleProjectCreation}
        />
      )}
    </>
  );
};
export default Profile;
