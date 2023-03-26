import { useState } from "react";
import { useEffect } from "react";
import { API_URL } from "../../utils/apiUrls";
import keycloak from "../../keycloak";

const ProjectApplicationCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  // const [name, setName] = useState("");

  // const [skills, setSkills] = useState([]);

  const toggleProject = () => {
    setIsOpen(!isOpen);
  };

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

    //update projectapplication
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

  // const dataFetch = async () => {
  //   const data = await (
  //     await fetch(`${API_URL}/api/v1/user/${props.userId}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${keycloak.token}`,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //   ).json();
  //   if (data.data !== null) {
  //     setName(data.data.username);
  //     setSkills(data.data.userSkill);
  //   }
  // };

  // useEffect(() => {
  //   dataFetch();
  // }, []);

  return (
    <>
      <div className="flex flex-col  items-center bg-gray-300 space-y-3 rounded-xl p-3">
        <div className="font-playfair font-bold">
          <p className="text-2xl ">
            Submitted by: <span className="font-thin">{props.username}</span>
          </p>
          <p className="">
            Motivation: <span className="font-thin">{props.motivation}</span>
          </p>
        
        <p>
          Skills: <span className="font-thin">
            {props.skills
              .map((item, index) => {
                return item;
              })
              .join(", ")}
          </span>
        </p>
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