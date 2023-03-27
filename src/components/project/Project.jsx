import ProjectApplication from "./ProjectApplication";
import { useState } from "react";
import keycloak from "../../keycloak";
import { useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../../context/UserContext";
import { API_URL } from "../../utils/apiUrls";
import Comment from "../project/Comment";

const ProjectPage = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [canJoin, setCanJoin] = useState(false);

  const [owner, setOwner] = useState("");
  const [joinedUsers, setJoinedUsers] = useState([]);
  const [fetchAllUsers, setFetchAllUsers] = useState();

  const { user, allUsers } = useUser();

  useEffect(() => {
    // console.log("current user:" + user.userId + " owner of project: " + props.ownerId);
    if (keycloak.authenticated) {
      setCanJoin(true);

      //fetch all users from database and adds them to the project
      const userFetch = async () => {
        const data = await (
          await fetch(`${API_URL}/api/v1/user/`, {
            method: "GET",
            mode: "cors",
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
              "Content-Type": "application/json",
            },
          })
        ).json();
        if (data.data !== null) {
          //get the owner of the project
          if (user.userId === props.ownerId) {
            setOwner(user);
          } else {
            setOwner(data.data[props.ownerId - 1]);
          }

          //get the joined users of the project
          for (let i = 0; i < props.collaborators.length; i++) {
            if (!joinedUsers.includes(data.data[props.collaborators[i] - 1])) {
              joinedUsers.push(data.data[props.collaborators[i] - 1]);
              setJoinedUsers([
                ...joinedUsers,
                data.data[props.collaborators[i] - 1],
              ]);
            }
          }
          setJoinedUsers(joinedUsers);
          setFetchAllUsers([data.data]);
        }
      };
      userFetch();
    } else {
      setCanJoin(false);
    }
  }, []);

  const toggleProject = () => {
    setIsOpen(!isOpen);
  };

  const [isShown, setIsShown] = useState(false);
  const [isShown2, setIsShown2] = useState(false);

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
                <img src={props.image} alt="" />
                Project Description:
                <p className="font-playfair font-thin text-lg">
                  {props.description}
                </p>
                {user && (
                  <>
                    {user.userId == props.ownerId ||
                    props.collaborators.includes(user.userId) ? (
                      <>
                        <p
                          onMouseEnter={() => setIsShown(true)}
                          onMouseLeave={() => setIsShown(false)}
                        >
                          Owner:{" "}
                          <span className="font-thin">{owner.username}</span>
                        </p>

                        {isShown && (
                          <div className="bg-gradient-to-r from-orange-300 to-rose-300 rounded-xl p-1 ">
                            <p>Skills: <span className="font-thin">{owner.userSkill}</span></p>
                            <p>Description: <span className="font-thin">{owner.userDescription}</span></p>
                            <p>Portfolio: <span className="font-thin">{owner.userPortfolio}</span></p>
                          </div>
                        )}
                        {/* <CommentBox></CommentBox> */}
                        {/* <Comment projectId={props.projectId}></Comment> */}

                        {/* collaborators */}
                        {joinedUsers.length > 0 ? (
                          <p>
                            Collaborators: 
                            <span
                              className="font-thin"
                              onMouseEnter={() => setIsShown2(true)}
                              onMouseLeave={() => setIsShown2(false)}
                            >
                              
                              {joinedUsers
                                .map((item, index) => {
                                  return item.username;
                                  // {isShown2 && (
                                  //   <div>
                                  //     <p>Skills: {item.userSkill}</p>
                                  //     <p>
                                  //       Description: {item.userDescription}
                                  //     </p>
                                  //     <p>Portfolio: {item.userPortfolio}</p>
                                  //   </div>
                                  // )}
                                })
                                  .join(", ")} 
                                
                            </span>
                          </p>
                        ) : null}

                        {/* <CommentBox></CommentBox> */}
                        <Comment projectId={props.projectId}></Comment>
                      </>
                    ) : null}

                    {user.userId != props.ownerId &&
                    !props.collaborators.includes(user.userId) ? (
                      <button
                        className="bg-gradient-to-r from-orange-300 to-rose-300 hover:text-rose-400 text-white font-bold py-2 px-4 rounded font-playfair shadow-md"
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
                <p>You have to be logged in in order to join a project</p>
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
