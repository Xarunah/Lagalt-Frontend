import { useState } from "react";
import ProjectPage from "../project/Project";

const ProjectCard = (props) => {
  // State for toggling the project popup.
  const [isOpen, setIsOpen] = useState(false);

  // Method for setting the isOpen state.
  const toggleProject = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="container flex flex-auto my-6" onClick={toggleProject}>
        <div className="w-full max-w-full mr-20 ">
          <div className="bg-gray-50 rounded-xl p-6 shadow-2xl z-50">
            <div className=" float-right">
              {/* Shows the details about the project. */}
              <img className="h-44 items-end" src={props.image} alt="" />
            </div>
            <h1 className="text-3xl font-playfair font-bold">{props.title}</h1>
            <p className="font-playfair mb-2">{props.shortDescription}</p>
            <div className=" font-playfair font-bold space-y-0.5">
              <p>
                Skills:{" "}
                <span className="font-thin">
                  {/* Uses to map function to show an array of skills in comma seperated form. */}
                  {props.skills
                    .map((item, index) => {
                      return item;
                    })
                    .join(", ")}
                </span>
              </p>
              <p>
                Tags:{" "}
                <span className="font-thin">
                  {/* Uses to map function to show an array of tags in comma seperated form. */}
                  {props.tags
                    .map((item, index) => {
                      return item;
                    })
                    .join(", ")}
                </span>
              </p>
              <p>
                Category: <span className="font-thin">{props.category}</span>
              </p>
              <p>
                Status: <span className="font-thin">{props.status}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Shows the project popup if isOpen is true. */}
      {isOpen && (
        <ProjectPage
          title={props.title}
          projectId={props.projectId}
          description={props.description}
          category={props.category}
          skills={props.skills}
          tags={props.tags}
          handleClose={toggleProject}
          ownerId={props.userId}
          collaborators={props.collaborators}
          status={props.status}
          progress={props.progress}
          image={props.image}
        ></ProjectPage>
      )}
    </>
  );
};

export default ProjectCard;
