import { useRef, useState } from "react";

function ProfileSkills(props) {
  const skillInput = useRef(null);

  const [skills, setSkills] = useState(props.words);

  const [skillList, setSkillList] = useState(props.words);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (!skillInput.current.value == "") {
        setSkillList([...skillList, skillInput.current.value]);
        skills.push(skillInput.current.value);
        skillInput.current.value = "";
      } else {
        alert("Please enter something!");
      }

      props.skillsToProfile(skills);
      //  props.onWordsChange(skillInput.current.value);
    }
  };

  return (
    <div>
      <p className="text-xl font-playfair text-center">Skills</p>
      <input
        className="bg-slate-100 resize-none p-2 focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none focus:bg-gray-200"
        ref={skillInput}
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

export default ProfileSkills;
