import { useState } from "react";
import ProjectApplicationCard from "../cards/ProjectApplicationCard";
import { useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL } from "../../utils/apiUrls";
import keycloak from "../../keycloak";
import { useUser } from "../../context/UserContext";
import { storageRead } from "../../utils/storage";

const Admin = (props) => {
  const [projectApplications, setApplications] = useState([]);

  const [status, setStatus] = useState("");

  const [progress, setProgress] = useState("");

  const onProgressChange = (event) => {
    setProgress(event.target.value);
  };

  const onStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const closeApplication = (id) => {
    const newList = projectApplications.filter(
      (item) => item.projectApplicationId !== id
    );

    setApplications(newList);
  };

  const onSaveProgress = () => {
    const newProgress = {
      progress: progress,
      status: status,
    };

    fetch(`${API_URL}/api/v1/project/${props.projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keycloak.token}`,
      },
      body: JSON.stringify(newProgress),
    })
      .then((response) => response.json())
      .then((newProgress) => {
        console.log("Success:", newProgress);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    alert("Project progress saved!");
  };

  useEffect(() => {


    const dataFetch = async () => {
      const data = await (
        await fetch(
          `${API_URL}/api/v1/projectApplication/whereProjectId=${props.projectId}`,
          {
            method: "GET",
            mode: "cors",
            headers: {
              Authorization: `Bearer ${keycloak.token}`,
              "Content-Type": "application/json",
            },
          }
        )
      ).json();
      if (data !== null) {
        console.log(data);

        setApplications(data);
      }
    };
    dataFetch();

    console.log(projectApplications);

    setStatus(props.status);
    setProgress(props.progress);

    console.log("status:" + props.status);
  }, []);

  return (
    <div className="fixed flex-auto bg-black bg-opacity-50 h-screen w-screen top-0 left-0 z-50">
      <div className="w-5/6 h-3/4 my-44 mx-auto overflow-y-scroll space-y-3 bg-slate-100 rounded-xl px-16 pb-5 shadow-2xl ">
        <button
          className="float-right text-5xl pt-6"
          onClick={props.handleClose}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h1 className="text-6xl text-center font-playfair font-bold pb-10">
          {props.title}
        </h1>

        <p className="font-bold font-playfair text-2xl">Progress</p>

        <div className="relative 2xl:flex">
          <div>
            <textarea
              className="resize-none focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none"
              rows="7"
              cols="100"
              type="text"
              placeholder="Edit progress info here"
              value={progress}
              onChange={onProgressChange}
            ></textarea>
          </div>
        </div>

        <div className="font-bold font-playfair text-2xl ">
          <h2 className="">Status:</h2>
          <input
            className="bg-slate-100 resize-none focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none focus:bg-gray-200 my-2 "
            type="text"
            maxLength={40}
            placeholder="Enter title here"
            value={status}
            onChange={onStatusChange}
          />

          <div>
            <button
              className="bg-gradient-to-r from-orange-300 to-rose-300 hover:text-rose-400 text-white font-bold py-2 px-4 rounded font-playfair"
              onClick={onSaveProgress}
            >
              Save Progress
            </button>
          </div>

          <h2 className="">Project applications</h2>
        </div>
        {projectApplications
          ? projectApplications.map((element, index) => {
              if (!element.reviewed)
                return (
                  <ProjectApplicationCard
                    key={index}
                    userId={element.userId}
                    projectId={element.projectId}
                    projectApplicationId={element.projectApplicationId}
                    projectTitle={props.title}
                    motivation={element.motivation}
                    handleClose={closeApplication}
                  />
                );
            })
          : null}
      </div>
    </div>
  );
};

export default Admin;
