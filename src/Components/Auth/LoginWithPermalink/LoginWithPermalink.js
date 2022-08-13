import { useContext } from "react";
import { useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";

import * as chatService from "../../../Services/chatService";
import * as authService from "../../../Services/authService";
import * as storageService from "../../../Services/storageService";


import { AuthContext } from "../../../Contexts/AuthContext";
import { ChatContext } from "../../../Contexts/ChatContext";

import { usernameValidator } from "../../../Utils/validators";

export const LoginWithPermalink = () => {
  const { username } = useParams();
  const { setProfileData, setAuthError } = useContext(AuthContext);
  const { setBookmarks } = useContext(ChatContext)
  
  const navigate = useNavigate();

  useEffect(() => {
    if (usernameValidator(username)) {
      // remove data saved in the local storage before saving the new data, fetched from the server
      storageService.deleteStorage();

      authService.getProfile(username)
        .then(userData => {
          if(!userData || !userData.permalink || userData && userData.permalink.length !== 8) {
            setAuthError("Login was unsuccessful. Please try again.");
            navigate ('/login');
            return;
          }
          setAuthError('');
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
