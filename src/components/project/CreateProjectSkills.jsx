import { useRef, useState } from "react";

function CreateProjectSkills(props) {
  const skillInput = useRef(null);
  const [skills] = useState([]);
  const [skillList, setSkillList] = useState([]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (!skillInput.current.value == "") {
        setSkillList([...skillList, skillInput.current.value]);
        skills.push(skillInput.current.value);
        props.onWordsChange(skillInput.current.value);
        skillInput.current.value = "";
      } else {
        alert("Please enter something!");
      }
    }
  };

  return (
    <div>
      <p className="text-xl font-playfair font-bold">Skills</p>
      <input
        className=" bg-slate-100 resize-none p-2 focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none focus:bg-gray-200"
        ref={skillInput}
        maxLength={20}
        placeholder="Add skill"
        onKeyDown={handleKeyDown}
      />

      {skillList.map((item, index) => (
        <p key={index} className="font-playfair">
          {item}
        </p>
      ))}
    </div>
  );
}

export default CreateProjectSkills;
