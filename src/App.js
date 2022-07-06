// import logo from './images/logo.svg';
import React, { useState, useContext } from "react";

import { ThemeContext } from "./contexts/ThemeContext";
import { ChatContext } from "./contexts/ChatContext";

import { Header } from "./Components/Header";
import "./App.scss";
import { Profile } from "./Components/Profile";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isAutoplayOn, setIsAutoplayOn] = useState(false);

  const toggleThemeHandler = (newState) => {
    setIsDark(newState);
  };

  const toggleAutoPlayHandler = (newState) => {
    setIsAutoplayOn(newState);
  };

  // const [isAutoplayOn, setIsAutoplayOn] = useState(false);

  return (
    <div className="app">
      <ChatContext.Provider value={{ isAutoplayOn, toggleAutoPlayHandler }}>
        <ThemeContext.Provider value={{ isDark, toggleThemeHandler }}>
          <Header className="app__header" />
          <main className="app__main">
            <Profile />
          </main>
        </ThemeContext.Provider>
      </ChatContext.Provider>
    </div>
  );
}

export default App;
