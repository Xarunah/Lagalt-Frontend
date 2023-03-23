import { useContext, createContext, useState } from "react";
import { storageRead } from "../utils/storage";

// Creating a new context.
const UserContext = createContext();

// Creating a custom hook called useUser.
export const useUser = () => {
  return useContext(UserContext);
};

// The provder for the user is declared.
const UserProvider = ({ children }) => {
  // User and setUser are declared, and the user is read from session storage.
  const [user, setUser] = useState(storageRead("lagalt-user"));
  const [projectList, setProjectList] = useState(
    storageRead("lagalt-projects")
  );
  const [allUsers, setAllUsers] = useState(storageRead("lagalt-allUsers"));

  // State object is created.
  const state = {
    user,
    setUser,
    projectList,
    setProjectList,
    allUsers,
    setAllUsers,
  };
  // Returning the provider element for the user context.
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
};

export default UserProvider;
