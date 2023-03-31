import { API_URL } from "../../utils/apiUrls";
import keycloak from "../../keycloak";
import { useEffect, useState } from "react";
import { storageRead } from "../../utils/storage";

const ProjectApplicationCard = (props) => {
  // State to store the user who submitted the project application.
  const [theUser, setTheUser] = useState();

  // In this useEffect all the users are read from storage
  // Then the user that submitted the application is found by their id
  useEffect(() => {
    const allUsers = storageRead("lagalt-allUsers");
    let _user;
    for (const user of allUsers) {
      if (user.userId === props.userId) {
        _user = user;
      }
    }
    setTheUser(_user);
  }, []);

  // When the user accepts a project application.
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

  // When the user declines a project application.
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

  // Method that uses the fetch API to PUT the new info about the porject application to the API.
  const putData = (isAccepted) => {
    // Object to be sent to the API is defined.
    const data = {
      projectId: props.projectId,
      userId: props.userId,
      reviewed: true,
      accepted: isAccepted,
    };

    // Fetch API used to PUT the new data to the API.
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

    // If the owner has accepted the applcation then the applicant sholud be added to the project
    if (isAccepted) {
      // Defines object to PUT to the API
      const userObj = {
        userId: props.userId,
      };
      // Uses fetch to PUT the data to the API.
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
      <div className="flex flex-col bg-slate-200 space-y-3 rounded-xl p-3">
        <div className="font-playfair font-bold">
          {theUser && (
            <p className="text-2xl">
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

        {/* Button for accepting the project application. */}
        <div className="space-x-2 text-center">
          <button
            className="bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded shadow-md font-playfair"
            onClick={onAccept}
          >
            Accept
          </button>

          {/* Button for declining the project application. */}
          <button
            className="bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded shadow-md font-playfair"
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
