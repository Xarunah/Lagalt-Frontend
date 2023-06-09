import ProjectPage from "../project/Project";
import { useState } from "react";
import Admin from "../profile/Admin";

const OwnedProjectCard = (props) => {
  // States defined for toggling between opening and closing the project and admin popups.
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdmin, setIsOpenAdmin] = useState(false);

  // Methods for toggling the above states.
  const toggleProject = () => {
    setIsOpen(!isOpen);
  };
  const toggleProjectAdmin = () => {
    setIsOpenAdmin(!isOpenAdmin);
  };

  return (
    <>
      <div className="flex flex-col items-center bg-gray-50 m-3 my-2 mt-7 space-y-3 rounded-xl p-3 shadow-2xl">
        <h1 className="text-2xl font-playfair font-bold">{props.title}</h1>
        <p className="font-playfair">Category: {props.category}</p>

        {/* Buttons for toggling the project and admin popups. */}
        <p className="space-x-6">
          <button
            className="bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded font-playfair"
            onClick={toggleProjectAdmin}
          >
            Admin Page
          </button>
          <button
            className="bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded font-playfair"
            onClick={toggleProject}
          >
            View Project
          </button>
        </p>
      </div>
      {/* Show the project page if isOpen is true */}
      {isOpen && (
        <ProjectPage
          title={props.title}
          description={props.description}
          skills={props.skills}
          tags={props.tags}
          category={props.category}
          ownerId={props.userId}
          collaborators={props.collaborators}
          image={props.image}
          handleClose={toggleProject}
          projectId={props.projectId}
          status={props.status}
          progress={props.progress}
        />
      )}
      {/* Show the admin page if isOpenAdmin is true */}
      {isOpenAdmin && (
        <Admin
          handleClose={toggleProjectAdmin}
          projectId={props.projectId}
          title={props.title}
          description={props.description}
          skills={props.skills}
          tags={props.tags}
          category={props.category}
          progress={props.progress}
          status={props.status}
        />
      )}
    </>
  );
};

export default OwnedProjectCard;
