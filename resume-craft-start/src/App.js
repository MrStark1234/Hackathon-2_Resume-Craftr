import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Editor from "./Components/Editor/Editor";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import Resume from "./Components/Resume/Resume";
import ReactToPrint from "react-to-print";
import { ArrowDown } from "react-feather";
import Abt from "./Components/About/Abt";

function App() {
  const sections = {
    profile: "Profile",
    aboutMe: "About Me",
    education: "Education",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
  };

  const resumeRef = useRef();

  const colors = ["#8f23e2", "#e22359", "#012578", "#312f2f", "#ed8936"];
  const [activeColor, setActiveColor] = useState(colors[1]);

  const [resumeInformation, setResumeInformation] = useState({
    [sections.profile]: {
      id: sections.profile,
      sectionTitle: sections.profile,
      detail: {},
    },
    [sections.experience]: {
      id: sections.experience,
      sectionTitle: sections.experience,
      details: [],
    },
    [sections.projects]: {
      id: sections.projects,
      sectionTitle: sections.projects,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.skills]: {
      id: sections.skills,
      sectionTitle: sections.skills,
      points: [],
    },
    [sections.aboutMe]: {
      id: sections.aboutMe,
      sectionTitle: sections.aboutMe,
      detail: "",
    },
  });

  useEffect(() => {
    console.log(resumeInformation);
  }, [resumeInformation]);

  const location = useLocation();

  return (
    <div className="App">
      <Routes>
        {location.pathname === "/about" ? (
          <Route exact path="/about" element={<Abt />} />
        ) : (
          <Route
            exact
            path="/"
            element={
              <Home
                colors={colors}
                setActiveColor={setActiveColor}
                activeColor={activeColor}
              />
            }
          />
        )}

        <Route
          exact
          path="editor"
          element={
            <Editor
              sections={sections}
              information={resumeInformation}
              setInformation={setResumeInformation}
            />
          }
        />
      </Routes>
      {location.pathname !== "/about" && (
        <div className="contain">
          <ReactToPrint
            trigger={() => {
              return (
                <button>
                  Download <ArrowDown />
                </button>
              );
            }}
            content={() => resumeRef.current}
          />
        </div>
      )}
      {location.pathname !== "/about" && (
        <Resume
          ref={resumeRef}
          information={resumeInformation}
          sections={sections}
          activeColor={activeColor}
        />
      )}
    </div>
  );
}

export default App;
