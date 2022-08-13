const baseUrl = "https://demo.twok.app";

// Achievements
export const createAchievement = async (username, language, description) => {
  if (
    username === undefined ||
    language === undefined ||
    description === undefined
  ) {
    console.error(
      "Language service  -> Create Achievement :: parameters are not defined."
    );
    return false;
  }

  const postData = {
    userPermalink: username,
    language: language,
    description: description,
  };

  const response = await fetch(`${baseUrl}/new-achievement`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(postData),
  }).catch((err) => {
    console.error(err);
  });

  const result = await response.json();
  return result;
};

export const getAchievementsList = async (username) => {
  const response = await fetch(`${baseUrl}/${username}/achievements`);
  const result = await response.json();
  return { list: result.list, count: result.count };
};


// Words Learned
export const updateWordsLearnedCount = async (
  username,
  language,
  newWordsLearned
) => {
  if (
    username === undefined ||
    language === undefined ||
    newWordsLearned === undefined
  ) {
    console.error("Language service  -> Update Words Learned :: parameters are not defined.");
    return false;
  }

  const chatUpdates = {
    userPermalink: username,
    language: language,
    newWordsLearned: newWordsLearned
  };

  const response = await fetch(`${baseUrl}/update-language-words-learned`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(chatUpdates),
  }).catch((err) => {
    console.error(err);
  });

  const result = await response.json();
  return result;
};
