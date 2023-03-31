import { useState } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateProjectSkills from "./CreateProjectSkills";
import CreateProjectTags from "./CreateProjectTags";
import keycloak from "../../keycloak";

const CreateProject = ({ onProjectCreate, handleClose }) => {
  const [projectName, setName] = useState("");
  const [projectCategory, setCategory] = useState("");
  const [projectSkills] = useState([]);
  const [projectTags] = useState([]);
  const [projectDescription, setDescription] = useState("");
  const [projectShortDescription, setProjectShortDescription] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const onSkillsChange = (skills) => {
    projectSkills.push(skills);
  };

  const onTagsChange = (tag) => {
    projectTags.push(tag);
  };

  const onDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const onShortDescriptionChange = (event) => {
    setProjectShortDescription(event.target.value);
  };

  const createProjectObj = () => {
    if (
      projectName.length > 0 &&
      projectDescription.length > 0 &&
      projectCategory.length > 0 &&
      projectSkills.length > 0 &&
      projectTags.length > 0 &&
      projectShortDescription.length > 0
    ) {
      const newProject = {
        userId: keycloak.tokenParsed.sub,
        title: projectName,
        category: projectCategory,
        description: projectDescription,
        skills: projectSkills,
        tags: projectTags,
        shortDescription: projectShortDescription,
        project_is_active: true,
        progress: "",
        status: "",
        collaborators: [],
      };

      onProjectCreate(newProject);
      alert("Project successfully created!");
      handleClose();
    } else {
      alert("Please fill out all of the required fields.");
    }
  };

  return (
    <>
      <div className="fixed bg-black bg-opacity-50 h-screen w-screen top-0 left-0 z-50">
        <div className="w-5/6 h-3/4 m-auto my-24 overflow-y-scroll space-y-3 rounded-xl px-16 shadow-2xl bg-gray-50">
          <button className="float-right text-5xl pt-6" onClick={handleClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>

          <h1 className="text-6xl text-center font-playfair font-bold pb-10">Create Project</h1>

          <div><h1 className="text-2xl font-playfair font-bold">Title</h1>
          <input
            className="bg-gray-50 resize-none focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none focus:bg-gray-200 p-1 "
            type="text"
            maxLength={40}
            placeholder="Enter title here"
            onChange={onNameChange}
          /></div>

          <h1 className="text-2xl font-playfair font-bold">Category</h1>
          <div className=" flex items-center mb-4 w-4 h-4 font-playfair text-sm">
            <input
              className="form-checkbox rounded text-rose-400"
              type="checkbox"
              name="sorting"
              value="Film"
              id="film"
              onChange={onCategoryChange}
              checked={projectCategory === "Film"}
            />
            <label className="ml-1 mr-3 text-sm">Film</label>

            <input
              className="form-checkbox rounded text-rose-400"
              type="checkbox"
              name="sorting"
              value="Music"
              id="music"
              onChange={onCategoryChange}
              checked={projectCategory === "Music"}
            />
            <label className="ml-1 mr-3">Music</label>

            <input
              className="form-checkbox rounded text-rose-400"
              type="checkbox"
              name="sorting"
              value="Game"
              id="game"
              onChange={onCategoryChange}
              checked={projectCategory === "Game"}
            />
            <label className="ml-1 mr-3">Game</label>

            <input
              className="form-checkbox rounded text-rose-400"
              type="checkbox"
              name="sorting"
              value="Web"
              id="web"
              onChange={onCategoryChange}
              checked={projectCategory === "Web"}
            />
            <label className="ml-1 mr-3">Web</label>
          </div>

         <div>
         <h1 className="text-2xl font-playfair font-bold">Short Description</h1>
          <form>
            <textarea
              className="bg-gray-50 resize-none focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none focus:bg-gray-200"
              rows="2"
              cols="50"
              type="text"
              maxLength={150}
              placeholder="Write a short description"
              onChange={onShortDescriptionChange}
            />
          </form>
         </div>

          <div>
          <h1 className="text-2xl font-playfair font-bold">Description</h1>
          <form>
            <textarea
              className="bg-gray-50 resize-none focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none focus:bg-gray-200"
              rows="8"
              cols="50"
              type="text"
              placeholder="Write a description"
              onChange={onDescriptionChange}
            />
          </form>
          </div>

          <CreateProjectSkills onWordsChange={onSkillsChange} />

          <CreateProjectTags onWordsChange={onTagsChange} />

          <div>
          <button
            className="my-2 bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded font-playfair"
            onClick={createProjectObj}
          >
            Create Project
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProject;
