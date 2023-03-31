import { useState } from "react";
import keycloak from "../../keycloak";
import ProfileSkills from "./ProfileSkills";
import { useEffect } from "react";
import { API_URL } from "../../utils/apiUrls";
import { storageSave } from "../../utils/storage";

function ProfileDetails() {
  const [value, setValue] = useState("");
  const [valuePortfolio, setValuePortfolio] = useState("");

  const [profileSkills, setSkills] = useState(null);

  const [hiddenMode, setHiddenMode] = useState(false);

  useEffect(() => {
    const userFetch = async () => {
      const data = await (
        await fetch(`${API_URL}/api/v1/user/${keycloak.tokenParsed.sub}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${keycloak.token}`,
            "Content-Type": "application/json",
          },
        })
      ).json();
      if (data.data !== null) {
        setValue(data.data.userDescription);
        setValuePortfolio(data.data.userPortfolio);
        setSkills(data.data.userSkill);
        setHiddenMode(data.data.userVisibility);
      }
    };
    userFetch();
  }, []);

  const toggleHiddenMode = (e) => {
    if (e.target.checked === true) {
      setHiddenMode(true);
    } else {
      setHiddenMode(false);
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handlePortfolioChange = (event) => {
    setValuePortfolio(event.target.value);
  };

  const onSaveDetails = () => {
    const newDetails = {
      userDescription: value,
      userPortfolio: valuePortfolio,
      userSkill: profileSkills,
      userVisibility: hiddenMode,
    };

    fetch(`${API_URL}/api/v1/user/${keycloak.tokenParsed.sub}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${keycloak.token}`,
      },
      body: JSON.stringify(newDetails),
    })
      .then((response) => response.json())
      .then((newDetails) => {
        console.log("Success:", newDetails);

        const allUsersFetch = async () => {
          const data = await (
            await fetch(`${API_URL}/api/v1/user/`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${keycloak.token}`,
                "Content-Type": "application/json",
              },
            })
          ).json();
          if (data.data !== null) {
            storageSave("lagalt-allUsers", data.data);
          }
        };
        allUsersFetch();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    alert("Profile details saved!");
  };

  return (
    <div className="flex flex-col items-center bg-gray-50 m-3 my-2 space-y-3 rounded-xl p-3 shadow-2xl">
      <p className="text-2xl font-playfair">
        Welcome back: {keycloak.tokenParsed.name}
      </p>

      {!hiddenMode && (
        <img src="/images/catpc.png" alt="Cat with PC" className="h-28" />
      )}
      {hiddenMode && (
        <img src="/images/catpc_thug.png" alt="Cat with PC" className="h-28" />
      )}

      <div className="flex items-center pl-3">
        <input
          type="checkbox"
          value="Hidden"
          onChange={toggleHiddenMode}
          checked={hiddenMode}
          className="w-4 h-4  bg-gray-100 border-gray-300 rounded text-rose-400"
        />
        <label className="w-full py-3 ml-2 text-gray-900 font-playfair ">
          Hidden mode
        </label>
      </div>

      <form>
        <p className=" text-xl font-playfair text-center">Description</p>
        <div className="2xl:flex">
          <textarea
            className="w-full bg-gray-50 resize-none focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none focus:bg-gray-200"
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
        <div className=" items-center">
          <textarea
            className="w-full bg-gray-50 resize-none focus:border-rose-400 focus:border-2 rounded-lg font-playfair border-gray-300 border-2 outline-none focus:bg-gray-200"
            rows="3"
            cols="50"
            type="text"
            placeholder="Add links to portfolio here"
            value={valuePortfolio}
            onChange={handlePortfolioChange}
          ></textarea>
        </div>
      </form>

      {profileSkills && (
        <ProfileSkills words={profileSkills} skillsToProfile={setSkills} />
      )}

      <button
        className="bg-rose-400 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded font-playfair"
        onClick={onSaveDetails}
      >
        Save Profile
      </button>
    </div>
  );
}

export default ProfileDetails;
