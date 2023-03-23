import { useState } from "react";
import ProjectPage from "../project/Project";
import { useEffect } from "react";

const ProjectCard = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleProject = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="container flex flex-auto my-6" onClick={toggleProject}>
        <div className="w-full max-w-full mr-20 ">
          <div className="bg-gray-200 rounded-xl p-6 shadow-2xl z-50">
            <h1 className="text-3xl font-playfair font-bold">{props.title}</h1>
            {/* <div className="text-blue-600 leading-relaxed">
              {props.owner && <p className="text-3xl">YOU ARE OWNER</p>}

              {props.joined && !props.owner && (
                <p className="text-3xl">YOU HAVE JOINED</p>
              )}
            </div> */}

            <p className="font-playfair mb-2">{props.shortDescription}</p>

            <div className=" font-playfair font-bold space-y-0.5">
              <p>
                Skills:{" "}
                <span className="font-thin">
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

              <p>
               Progress: <span className="font-thin">{props.progress}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

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
        ></ProjectPage>
      )}
    </>
  );
};

export default ProjectCard;
