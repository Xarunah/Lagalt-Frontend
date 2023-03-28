import ProjectApplication from "./ProjectApplication";
import { useState } from "react";
import keycloak from "../../keycloak";
import { useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../../context/UserContext";
import { API_URL } from "../../utils/apiUrls";
import Comment from "../project/Comment";
import { storageRead } from "../../utils/storage";

const ProjectPage = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [canJoin, setCanJoin] = useState(false);
  const [owner, setOwner] = useState("");
  const [joinedUsers, setJoinedUsers] = useState([]);
  // const [fetchAllUsers, setFetchAllUsers] = useState();

  const { user } = useUser();

  useEffect(() => {

    if (keycloak.authenticated) {
      setCanJoin(true);

      //fetch all users from database and adds them to the project
      // const userFetch = async () => {
      //   const data = await (
      //     await fetch(`${API_URL}/api/v1/user/`, {
      //       method: "GET",
      //       mode: "cors",
      //       headers: {
      //         Authorization: `Bearer ${keycloak.token}`,
      //         "Content-Type": "application/json",
      //       },
      //     })
      //   ).json();
      //   if (data.data !== null) {
      //     //get the owner of the project
      //     if (keycloak.tokenParsed === props.ownerId) {
      //       setOwner(user);
      //     } else {
      //       setOwner(data.data[props.ownerId - 1]);
      //     }

      //     //get the joined users of the project
      //     for (let i = 0; i < props.collaborators.length; i++) {
      //       if (!joinedUsers.includes(data.data[props.collaborators[i] - 1])) {
      //         joinedUsers.push(data.data[props.collaborators[i] - 1]);
      //         setJoinedUsers([
      //           ...joinedUsers,
      //           data.data[props.collaborators[i] - 1],
      //         ]);
      //       }
      //     }
      //     setJoinedUsers(joinedUsers);
      //     setFetchAllUsers([data.data]);
      //   }
      // };
      // userFetch();
      const allUsers = storageRead("lagalt-allUsers");
      // const allUsers = storageRead ("lagalt-allUsers");
      if (allUsers !== null) {
        let _joinedUsers = [];
        for (const user of allUsers) {
          if (user.userId === props.ownerId) {
            setOwner(user);
          } 
          if (props.collaborators.includes(user.userId)) {
            _joinedUsers.push(user);
            setJoinedUsers(_joinedUsers);
          }
        }
      }
    }
  }, []);

  const toggleProject = () => {
    setIsOpen(!isOpen);
  };

  const [showOwnerDetails, setShowOwnerDetails] = useState(false);
  const [showCollaboratorDetails, setShowCollaboratorDetails] = useState(false);

  return (
    <>
      <div className="fixed bg-black bg-opacity-50 h-screen w-screen top-0 left-0 z-50">
        <div className="w-5/6 h-3/4 m-auto my-24 overflow-y-scroll space-y-3 rounded-xl px-16 shadow-2xl bg-slate-100">
          {!isOpen && (
            <>
              <button
                className="float-right text-5xl pt-6"
                onClick={props.handleClose}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>

              <h1 className="text-6xl text-center font-playfair font-bold pb-10">
                {props.title}
              </h1>

              <div className="font-bold font-playfair text-2xl">
                <div className="space-y-1">
                  <p>
                    Category:{" "}
                    <span className="font-thin">{props.category}</span>
                  </p>

                  <p>
                    Status: <span className="font-thin">{props.status}</span>
                  </p>

                  <p>
                    Progress:{" "}
                    <span className="font-thin">{props.progress}</span>
                  </p>

                  <p className="">
                    Skills:{" "}
                    <span className="font-thin">
                      {props.skills
                        .map((item, index) => {
                          return item;
                        })
                        .join(", ")}
                    </span>
                  </p>

                  <p className="">
                    Tags:{" "}
                    <span className="font-thin">
                      {props.tags
                        .map((item, index) => {
                          return item;
                        })
                        .join(", ")}
                    </span>
                  </p>
                </div>
                <img src={props.image} alt="" className="mt-2" />
                Project Description:
                <p className="font-playfair font-thin text-lg">
                  {props.description}
                </p>
                {user && (
                  <>
                    {keycloak.tokenParsed.sub == props.ownerId ||
                    props.collaborators.includes(keycloak.tokenParsed.sub) ? (
                      <>
                        <p
                          onMouseEnter={() => setShowOwnerDetails(true)}
                          onMouseLeave={() => setShowOwnerDetails(false)}
                        >
                          Owner:{" "}
                          <span className="font-thin">{owner.username}</span>
                        </p>

                        {showOwnerDetails && (
                          <div className="bg-gradient-to-r from-orange-300 to-rose-300 rounded-xl p-1 ">
                            <p>
                              Skills:{" "}
                              <span className="font-thin">
                                {owner.userSkill}
                              </span>
                            </p>
                            {!owner.userVisibility && (
                            <>
                            <p>
                              Description:{" "}
                              <span className="font-thin">
                                {owner.userDescription}
                              </span>
                            </p>
                            <p>
                              Portfolio:{" "}
                              <span className="font-thin">
                                {owner.userPortfolio}
                              </span>
                            </p>
                            </>
                            )}
                          </div>
                        )}

                        {/* collaborators */}
                        {joinedUsers.length > 0 ? (
                          <div className="">
                            Collaborators:{" "}
                            {joinedUsers.map((item, index) => (
                              <span className="font-thin"
                                key={index}
                                onMouseEnter={() => setShowCollaboratorDetails(true)}
                                onMouseLeave={() => setShowCollaboratorDetails(false)}
                              >
                                {item.username}
                                {joinedUsers.length > 1 &&
                                index < joinedUsers.length - 1
                                  ? ", "
                                  : ""}
                                <span>
                                  {showCollaboratorDetails && (
                                    <ul className="bg-gradient-to-r from-orange-300 to-rose-300 rounded-xl p-1 font-bold">
                                      <p>Skills: <span className="font-thin">{item.userSkill}</span></p>
                                      <p>Description: <span className="font-thin">{item.userDescription}</span></p>
                                      <p>Portfolio: <span className="font-thin">{item.userPortfolio}</span></p>
                                    </ul>
                                  )}
                                </span>
                              </span>
                            ))}
                          </div>
                        ) : null}

                        {/* <CommentBox></CommentBox> */}
                        <Comment projectId={props.projectId}></Comment>
                      </>
                    ) : null}

                    {user.userId != props.ownerId &&
                    !props.collaborators.includes(user.userId) ? (
                      <button
                        className="bg-gradient-to-r from-orange-300 to-rose-300 hover:text-rose-400 text-white font-bold py-2 px-4 rounded font-playfair shadow-md mt-2"
                        onClick={toggleProject}
                        disabled={!canJoin}
                      >
                        Join Project
                      </button>
                    ) : null}
                  </>
                )}
              </div>

              {!keycloak.authenticated && (
                <p className="font-playfair font-bold text-xl">You have to be logged in in order to join a project</p>
              )}
            </>
          )}

          {isOpen && (
            <ProjectApplication
              title={props.title}
              projectId={props.projectId}
              handleClose={props.handleClose}
            ></ProjectApplication>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
