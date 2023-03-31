import "./App.css";
import Main from "./views/Main";
import Header from "./components/navbar/Header";
import Profile from "./views/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import KeycloakRoute from "./routes/KeycloakRoutes";
import { ROLES } from "./roles";
import { useEffect } from "react";


function App() {
  const [searchResults, setSearchResults] = useState([]);
 // const [projects, setProjects] = useState();

  //const {setProjectsList} = useProjects();

  useEffect(() => {
 
  }, []);

  const [isSearching, setIsSearching] = useState(false);

  const onSearch = () => {
    setIsSearching(true);
  };

  const setSearching = (bolan) => {
    setIsSearching(bolan);
  };

  return (
    <div className="h-full min-h-screen bg-fixed bg-slate-200">
      {/* <Header projects={projects} setSearchResults={setSearchResults} onSearch={onSearch}/> */}
      <BrowserRouter>
        <Header setSearchResults={setSearchResults} onSearch={onSearch} />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                searchResults={searchResults}
                isSearching={isSearching}
                setSearching={setSearching}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <KeycloakRoute role={ROLES.User}>
                <Profile pageId="hej" />
              </KeycloakRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
