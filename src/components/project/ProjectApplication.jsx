import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../../context/UserContext";
import { API_URL } from "../../utils/apiUrls";

const ProjectApplication = (props) => {
  const [agreeIsCheck, setAgreeCheckbox] = useState();

  const [motivationText, setMotivationText] = useState("");

  const { user } = useUser();

  const onCheckBoxChange = (isChecked) => {
    setAgreeCheckbox(isChecked.target.value);
  };

  const onMotivationTextChange = (text) => {
    setMotivationText(text.target.value);
  };

  const onSubmitApplication = () => {
    if (agreeIsCheck && motivationText.length > 0) {
      props.handleClose();
      alert("Application sucessfully submited!");
      const toReturn = {
        userId: user.userId, //get user to retrieve id
        projectId: props.projectId,
        motivation: motivationText,
      };

      fetch(`${API_URL}/api/v1/projectApplication/`, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toReturn),
      })
        .then((response) => response.json())
        .then((toReturn) => {
          console.log("Success:", toReturn);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      alert("Please write a motivation and agree om the terms");
    }
  };

  return (
    <div className="flex-col z-50 space-y-3 mx-auto font-playfair">
      <button className="float-right text-5xl pt-6" onClick={props.handleClose}>
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <div className="text-center ">
        <h1 className="text-6xl text-center font-bold pb-10">
          You are about to join: {props.title}{" "}
        </h1>

        <div className="text-center">
          <textarea
            className="bg-slate-100 resize-none focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none focus:bg-gray-200 mb-2"
            id="w3review"
            name="w3review"
            rows="7"
            cols="100"
            onChange={onMotivationTextChange}
            placeholder="Write a short motivation"
          ></textarea>

          <div className="text-center font-bold space-x-2">
            <input
              type="checkbox"
              className="rounded text-rose-400 mb-1"
              onChange={onCheckBoxChange}
            />
            <label>
              I accept that the owner(s) of the project can view my profile info
            </label>
          </div>

          <button
            className="bg-gradient-to-r from-orange-300 to-rose-300 hover:text-rose-400 text-white font-bold py-2 px-4 rounded font-playfair shadow-md mt-2"
            onClick={onSubmitApplication}
          >
            Submit application
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectApplication;
