const baseUrl = "https://demo.twok.app";

// Profile
export const getProfile = async (permalink) => {
  const response = await fetch(`${baseUrl}/${permalink}`);
  const result = await response.json();
  return result;
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
