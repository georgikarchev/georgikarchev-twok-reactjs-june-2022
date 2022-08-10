// import logo from './images/logo.svg';
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import { AppContext } from "./Contexts/AppContext";
import { ThemeContext } from "./Contexts/ThemeContext";
import { ChatContext } from "./Contexts/ChatContext";
import { AuthContext } from "./Contexts/AuthContext";

// import * as authService from "./Services/authService";
import * as storageService from "./Services/storageService";

import { Header } from "./Components/Header/Header";
import { Login } from "./Components/Auth/Login/Login";
import { Profile } from "./Components/Profile/Profile";
import { Chat } from "./Components/Chat/Chat";
import { LoginWithPermalink } from "./Components/Auth/LoginWithPermalink/LoginWithPermalink";

import "./App.scss";
import { useEffect } from "react";

function App() {
  const [appSettings, setAppSettings] = useState({ appLanguage: "en" });

  const [isDark, setIsDark] = useState(false);
  const [isAutoplayOn, setIsAutoplayOn] = useState(false);
  const [profileData, setProfileData] = useState({ loggedIn: false });
  // { loggedIn: false }
  // userId: "twok_user_1",
  const [showAllMessageTranslations, setShowAllMessageTranslations] =
    useState(false);
  const [selectedMessageData, setSelectedMessageData] = useState(null);
  const [selectedChatLanguage, setSelectedChatLanguage] = useState(null);

  const toggleThemeHandler = (newState) => {
    setIsDark(newState);
  };

  const toggleAutoPlayHandler = (newState) => {
    setIsAutoplayOn(newState);
  };

  useEffect(()=>{
    const userDataFromStorage = storageService.getUser();
    if(!profileData.loggedIn && userDataFromStorage !== null) {
      setProfileData(userDataFromStorage);
    }
  },[]);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ appSettings, setAppSettings }}>
        <div className="app">
          <AuthContext.Provider value={{ profileData, setProfileData }}>
            <ChatContext.Provider
              value={{
                isAutoplayOn,
                toggleAutoPlayHandler,
                showAllMessageTranslations,
                setShowAllMessageTranslations,
                selectedMessageData,
                setSelectedMessageData,
                selectedChatLanguage,
                setSelectedChatLanguage
              }}
            >
              <ThemeContext.Provider value={{ isDark, toggleThemeHandler }}>
                <Header className="app__header" />
                <main className="app__main">
                  <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/chat/:selectedChat" element={<Chat />} />
                    <Route path="/:username" element={<LoginWithPermalink />} />
                    <Route path="/" element={ profileData.loggedIn ? <Profile /> : <Login />} />
                  </Routes>
                </main>
              </ThemeContext.Provider>
            </ChatContext.Provider>
          </AuthContext.Provider>
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
