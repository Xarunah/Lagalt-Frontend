import { useState } from "react";
import ProjectApplicationCard from "../cards/ProjectApplicationCard";
import { useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_URL } from "../../utils/apiUrls";

const ProjectAdminPopup = (props) => {
  //const [editProgress, setEditProgress] = useState(true);

  const [projectApplications, setApplications] = useState([]);

  const closeApplication = () => {
    console.log("AYAYY");
    //FIX THIS!!!!
    setApplications([]);
  };

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (
        await fetch(
          `${API_URL}/api/v1/projectApplication/whereProjectId=${props.projectId}`
        )
      ).json();
      if (data !== null) {
        console.log(data);
        setApplications(data);
      }
    };
    dataFetch();

    console.log(projectApplications);
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
            ></textarea>
          </div>
        </div>

        <div className="font-bold font-playfair text-2xl">
          <h2 className="">Status:</h2>
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

export default ProjectAdminPopup;
