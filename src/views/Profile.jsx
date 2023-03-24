import ProfileDetails from "../components/profile/ProfileDetails";
import JoinedProjectCard from "../components/cards/CollaboratorCard";
import OwnedProjectCard from "../components/cards/OwnerCard";
import { useState } from "react";
import CreateProject from "../components/project/CreateProject";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { storageSave } from "../utils/storage";
import { useUser } from "../context/UserContext";
import keycloak from "../keycloak";
import { API_URL } from "../utils/apiUrls";

const Profile = (props) => {
  const [projectCreate, setProjectCreate] = useState(false);

  const {user, setUser, projectList, setProjectList} = useUser();

  const [joinedList, setJoinedList] = useState([]);

  const [ownedList, setOwnedList] = useState([]);

  const [state, setState] = useState();

  const toggleProjectCreation = () => {
    setProjectCreate(!projectCreate);
  };

  useEffect(() => {
    // const allUsersFetch = async () => {
    //   const data = await (
    //     await fetch(`http://${API_URL}/api/v1/user/`)
    //   ).json();
    //   if (data.data !== null) {
    //     storageSave("lagalt-allUsers", data.data);
    //   }
    // };
    // allUsersFetch();

    // if (keycloak.authenticated /*and email already exists*/) {
    //   const userFetch = async () => {
    //     const data = await (
    //       await fetch(
    //         `http://${API_URL}/api/v1/user/whereEmail=${keycloak.tokenParsed.email}`
    //       )
    //     ).json();
    //     if (data.data !== null) {
    //       storageSave("lagalt-user", data.data);
    //       setUser(data.data);
    //     }
    //   };
    //   userFetch(); //get from user list instead
    // }

    // if (keycloak.authenticated /*and email does NOT exist*/) {
    //   const userInfo = {
    //     username: keycloak.tokenParsed.name,
    //     email: keycloak.tokenParsed.email,
    //   };
    //   fetch("http://${API_URL}/api/v1/user/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(userInfo),
    //   });

    //   const userFetch = async () => {
    //     const data = await (
    //       await fetch(
    //         `http://${API_URL}/api/v1/user/whereEmail=${keycloak.tokenParsed.email}`
    //       )
    //     ).json();
    //     if (data.data !== null) {
    //       storageSave("lagalt-user", data.data);
    //       setUser(data.data);
    //     }
    //   };
    //   userFetch();
    // }

  
    if(projectList){
    for (let j = 0; j < projectList.length; j++) {
      if (
        user.userId === projectList[j].userId &&
        !ownedList.includes(projectList[j])
      ) {
        ownedList.push(projectList[j]);
      }
    }
    for (let i = 0; i < projectList.length; i++) {
      for (let j = 0; j < projectList[i].collaborators.length; j++) {
        if (
          projectList[i].collaborators[j] === user.userId &&
          !joinedList.includes(projectList[i])
        ) {
          joinedList.push(projectList[i]);
        }
      }
    }
  }


    setState(false);
  }, []);

  const onProjectCreate = (project) => {
    setProjectList([...projectList, project]);
    storageSave("lagalt-projects", projectList)
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
