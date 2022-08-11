import { useContext } from "react";
import { useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

import * as chatService from "../../../Services/chatService";

import { AuthContext } from "../../../Contexts/AuthContext";
import { ChatContent } from "../../Chat/ChatMain/ChatContent/ChatContent";

import { usernameValidator } from "../../../Utils/validators";
import * as authService from "../../../Services/authService";
import * as storageService from "../../../Services/storageService";

export const LoginWithPermalink = () => {
  const { username } = useParams();
  const { profileData, setProfileData } = useContext(AuthContext);
  const { bookmarks, setBookmarks } = useContext(ChatContent)

  useEffect(() => {
    if (usernameValidator(username)) {
      authService.getProfile(username)
        .then(userData => {
          const updatedUserData = {...userData, 'loggedIn': true}
          setProfileData(updatedUserData);
          storageService.saveUser(updatedUserData);
          
          chatService.getBookmarks(updatedUserData.permalink).then((bookmarks) => {
            setBookmarks(bookmarks);
          });
        });
    }
  }, []);

  return (
    // <Navigate to='/profile' replace={true} />
    <Navigate to='/chat' replace={true} />
  );
};
