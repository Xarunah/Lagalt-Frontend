import ProjectPage from "../project/Project";
import { useState } from "react";

const JoinedProjectCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleProject = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-col items-center bg-gray-50 m-3 my-2 mt-7 space-y-3 rounded-xl p-3 shadow-2xl">
        <h1 className="text-2xl font-playfair font-bold">{props.title}</h1>

        <p className="font-playfair">Category: {props.category}</p>

        <button
          className="bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded font-playfair"
          onClick={toggleProject}
        >
          View Project
        </button>
      </div>
      {isOpen && (
        <ProjectPage
          title={props.title}
          description={props.description}
          skills={props.skills}
          tags={props.tags}
          category={props.category}
          handleClose={toggleProject}
          ownerId={props.userId}
          collaborators={props.collaborators}
          image={props.image}
          projectId={props.projectId}
          status={props.status}
          progress={props.progress}
        ></ProjectPage>
      )}
    </>
  );
};

export default JoinedProjectCard;
