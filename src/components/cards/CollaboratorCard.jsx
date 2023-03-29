import ProjectPage from "../project/Project";
import { useState } from "react";

// The cards used to list the projects the user has joined on the profile page.
const JoinedProjectCard = (props) => {
  // State and method for toggling between opening the popup and not.
  const [isOpen, setIsOpen] = useState(false);
  const toggleProject = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex flex-col items-center bg-slate-100 m-3 my-2 mt-7 space-y-3 rounded-xl p-3 shadow-2xl">
        {/* Shows basic info about the project. */}
        <h1 className="text-2xl font-playfair font-bold">{props.title}</h1>
        <p className="font-playfair">Category: {props.category}</p>

        {/* Button that brings up the project popup on click. */}
        <button
          className="bg-gradient-to-r from-orange-300 to-rose-300 hover:text-rose-400 text-white font-bold py-2 px-4 rounded font-playfair"
          onClick={toggleProject}
        >
          View Project
        </button>
      </div>
      {/* Shows project page if the "View Project" button is clicked. */}
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
