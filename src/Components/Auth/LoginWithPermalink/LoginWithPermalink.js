import { useContext } from "react";
import { useEffect } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext";

import { usernameValidator } from "../../../Utils/validators";
import * as authService from "../../../Services/authService";
import * as storageService from "../../../Services/storageService";

export const LoginWithPermalink = () => {
  const { username } = useParams();
  const { profileData, setProfileData } = useContext(AuthContext);

  useEffect(() => {
    if (usernameValidator(username)) {
      authService.getProfile(username)
        .then(userData => {
          const updatedUserData = {...userData, 'loggedIn': true}
          setProfileData(updatedUserData);
          storageService.saveUser(updatedUserData);
        });
    }
  }, []);

  return (
    // <Navigate to='/profile' replace={true} />
    <Navigate to='/chat' replace={true} />
  );
};
