// Profile
export const getProfile = async (userId) => {
    const response = await fetch(`${baseUrl}/user/${userId}`);
    const result = await response.json();
  
    return result.chats;
  };
  
  export const editProfile = async (userId, userData) => {
    // console.log(`${baseUrl}/${userId}`, JSON.stringify(userData));
    const response = await fetch(`${baseUrl}/${userId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
  
    const result = await response.json();
  
    return result;
  };