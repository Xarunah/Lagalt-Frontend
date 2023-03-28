import { API_URL } from "../../utils/apiUrls";
import keycloak from "../../keycloak";
import { useEffect, useState } from "react";
import { storageRead } from "../../utils/storage";

const ProjectApplicationCard = (props) => {
  const [theUser, setTheUser] = useState();

  useEffect(() => {
    console.log("hej");

    const allUsers = storageRead("lagalt-allUsers");

    let _user;

    console.log("alle brugere: " + allUsers);
    for (const user of allUsers) {
      if (user.userId === props.userId) {
        _user = user;
      }
    }
    setTheUser(_user);
  }, []);

  const onAccept = () => {
    putData(true);
    alert(
      "You accepted the application from: " +
        props.username +
        " to join: " +
        props.projectTitle
    );
    props.handleClose(props.projectApplicationId);
  };

  const onDecline = () => {
    putData(false);
    alert(
      "You declined the application from: " +
        props.username +
        " to join: " +
        props.projectTitle
    );
    props.handleClose(props.projectApplicationId);
  };

  const putData = (isAccepted) => {
    const data = {
      projectId: props.projectId,
      userId: props.userId,
      reviewed: true,
      accepted: isAccepted,
    };

    //update project application
    fetch(
      `${API_URL}/api/v1/projectApplication/${props.projectApplicationId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    if (isAccepted) {
      const userObj = {
        userId: props.userId,
      };
      fetch(`${API_URL}/api/v1/project/join/${props.projectId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
      })
        .then((response) => response.json())
        .then((userObj) => {
          console.log("Success:", userObj);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <>
      <div className="flex flex-col  items-center bg-gray-300 space-y-3 rounded-xl p-3">
        <div className="font-playfair font-bold">
          {theUser && (
            <p className="text-2xl ">
              Submitted by:{" "}
              <span className="font-thin">{theUser.username}</span>
            </p>
          )}
          <p className="">
            Motivation: <span className="font-thin">{props.motivation}</span>
          </p>

          {theUser && (
            <p>
              Skills:{" "}
              <span className="font-thin">
                {theUser.userSkill
                  .map((item, index) => {
                    return item;
                  })
                  .join(", ")}
              </span>
            </p>
          )}
        </div>

        <div className="space-x-2">
          <button
            className="bg-gradient-to-r from-orange-300 to-rose-300 hover:text-rose-400 text-white font-bold py-2 px-4 rounded shadow-md font-playfair"
            onClick={onAccept}
          >
            Accept
          </button>
          <button
            className="bg-gradient-to-r from-orange-300 to-rose-300 hover:text-rose-400 text-white font-bold py-2 px-4 rounded shadow-md font-playfair"
            onClick={onDecline}
          >
            Decline
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectApplicationCard;
