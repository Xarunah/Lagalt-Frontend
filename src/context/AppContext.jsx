import UserProvider from "./UserContext";

// Creating a function for the app context.
const AppContext = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default AppContext;
