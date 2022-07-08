// import logo from './images/logo.svg';
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { ThemeContext } from "./contexts/ThemeContext";
import { ChatContext } from "./contexts/ChatContext";
import { AuthContext } from "./contexts/AuthContext";
import { Route, Routes } from "react-router";

import { Header } from "./Components/Header";
import { Profile } from "./Components/Profile/Profile";
import { Chat } from "./Components/Chat/Chat";

import "./App.scss";

function App() {
  const [isDark, setIsDark] = useState(false);
  const [isAutoplayOn, setIsAutoplayOn] = useState(false);
  const [profileData, setProfileData] = useState({ loggedIn: false });
  const [chatsList, setChatsList] = useState(null);

  const toggleThemeHandler = (newState) => {
    setIsDark(newState);
  };

  const toggleAutoPlayHandler = (newState) => {
    setIsAutoplayOn(newState);
  };

  const logInTestHandler = () => {
    setProfileData((oldState) => {
      if (oldState.loggedIn) {
        return { loggedIn: false };
      } else {
        return {
          ...oldState,
          loggedIn: !oldState.loggedIn,
          profileImage: "./images/test-avatar.jpg",
          profileDisplayName: "GtoTheK",
          publicKey: "gtwokAi8x9asfaA",
          privateKey: "???",
          registeredOn: "2022-06-30 12:00:01",
          languages: ["german", "dutch"],
        };
      }
    });
  };

  // const [isAutoplayOn, setIsAutoplayOn] = useState(false);

  return (
    <BrowserRouter>
      <div className="app">
        <AuthContext.Provider value={{ profileData, logInTestHandler }}>
          <ChatContext.Provider
            value={{
              isAutoplayOn,
              toggleAutoPlayHandler,
              chatsList,
              setChatsList,
            }}
          >
            <ThemeContext.Provider value={{ isDark, toggleThemeHandler }}>
              <Header className="app__header" />
              <main className="app__main">
                <Routes>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/chat" element={<Chat />} />
                </Routes>
              </main>
            </ThemeContext.Provider>
          </ChatContext.Provider>
        </AuthContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
