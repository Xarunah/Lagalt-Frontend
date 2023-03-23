import { useState } from "react";
import keycloak from "../../keycloak";
import { useUser } from "../../context/UserContext";
import ProfileSkills from "./ProfileSkills";
import { useEffect } from "react";

function ProfileDetails() {
  const [editDesc, setEditDesc] = useState(true);
  const [editPortfolio, setEditPortfolio] = useState(true);
  const { user, setUser } = useUser();

  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [valuePortfolio, setValuePortfolio] = useState("");

  const [profileSkills, setSkills] = useState([]);


  useEffect(() => {
    if(user){
      setValue(user.userDescription)
      setValuePortfolio(user.userPortfolio)
      setSkills(user.userSkill)
    }
  }, []);

  const handlePortfolioChange = (event) => {
    setValuePortfolio(event.target.value);
  };

  const skillsToProfile = (skills) => {
    setSkills(skills);
    console.log(profileSkills);
  };

  const onSaveDetails = () => {
    const newDetails = {
      userDescription: value,
      userPortfolio: valuePortfolio,
      userSkill: profileSkills,
      userVisibility: false, //has to be set by checkbox on profile
    };

    fetch(`http://localhost:8080/api/v1/user/${user.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDetails),
    })
      .then((response) => response.json())
      .then((newDetails) => {
        console.log("Success:", newDetails);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    alert("Profile details saved!");
  };

  return (
    <div className="flex flex-col items-center bg-slate-100 m-3 my-2 space-y-3 rounded-xl p-3 shadow-2xl ">
      <p className="text-2xl font-playfair">
        Welcome back: {keycloak.tokenParsed.name}
      </p>

      <img src="/images/catpc.png" alt="Cat with PC" className="h-28" />

      <form>
        <p className="text-xl font-playfair text-center">Description</p>
        <div className="relative 2xl:flex">
          <textarea
            className="bg-slate-100 resize-none focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none focus:bg-gray-200"
            rows="7"
            cols="50"
            type="text"
            placeholder="Write about yourself"
            value={value}
            onChange={handleChange}
          ></textarea>
        </div>
      </form>

      <form>
        <p className="text-xl font-playfair text-center">Portfolio</p>
        <div className="flex items-center">
          <textarea
            className="bg-slate-100 resize-none focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none focus:bg-gray-200"
            rows="3"
            cols="50"
            type="text"
            placeholder="Add links to portfolio here"
            value={valuePortfolio}
            onChange={handlePortfolioChange}
          ></textarea>
        </div>
      </form>

      <ProfileSkills words={profileSkills} skillsToProfile={setSkills} />

      <button
        className="bg-gradient-to-r from-orange-300 to-rose-300 hover:text-rose-400 text-white font-bold py-2 px-4 rounded font-playfair"
        onClick={onSaveDetails}
      >
        Save Profile
      </button>
    </div>
  );
}

export default ProfileDetails;
