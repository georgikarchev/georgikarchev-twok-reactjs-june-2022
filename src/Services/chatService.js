import { templates } from "../ChatTemplates/templates";

const baseUrl = "https://demo.twok.app";

// CHAT
export const getChatsList = async (username) => {
  const response = await fetch(`${baseUrl}/${username}/chats`);
  const result = await response.json();
  return { list: result.list, count: result.count };
};

export const getChat = async (username, chatId) => {
  const response = await fetch(`${baseUrl}//${username}/chat/${chatId}`);
  const result = await response.json();

  const chatData = {};
  chatData.id = +result.chatId.split('-')[1];
  chatData.contactName = result.contactName;
  chatData.contactDescription = result.contactDescription;
  chatData.contactAvatar = result.contactAvatar;
  chatData.chatTemplate = result.chatTemplate;
  chatData.language = result.language;
  chatData.unread = result.unread;
  chatData.pinned = result.pinned;
  chatData.lastMessageId = result.lastMessageId === undefined ? 0 : +result.lastMessageId;
  chatData.chatNewWords = +result.chatNewWords;
  chatData.dateCreated = result.dateCreated;
  chatData.chatLastActive = result.chatLastActive;
  chatData.messages = templates[result.chatTemplate].template.messages;

  return chatData;
};

export const getMessageFromChatTemplate = (messageId, chatTemplate) => {
  console.log(">>>", messageId, chatTemplate, templates[chatTemplate]);
  if(!templates && templates[chatTemplate] === undefined) {
    return null;
  }
  return templates[chatTemplate].template.messages.find(m=>{
    return +m.id === +messageId;
  });
};

export const updateChat = async (
  username,
  chatId,
  lastMessageId,
  lastMessageBody
) => {
  if (
    username === undefined ||
    chatId === undefined ||
    lastMessageId === undefined ||
    lastMessageBody === undefined
  ) {
    console.error('Chat service  -> updateChat :: parameters are not defined.');
    return false;
  }

  
  const chatUpdates = {
    userPermalink: username,
    chatId: chatId,
    lastMessageId: lastMessageId,
    lastMessageBody: lastMessageBody,
  };
  
  // console.log("updateChat: lastMessageId = ", lastMessageId);
  // console.log(`${baseUrl}/update-user-chat`);
  // console.log(chatUpdates);

  const response = await fetch(`${baseUrl}/update-user-chat`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(chatUpdates),
  }).catch(err => {
    console.error(err);
  });

  const result = await response.json();
  return result;
};

export const updateChatRead = async (username, chatId) => {
  if (
    username === undefined ||
    chatId === undefined
  ) {
    console.error('Chat service  -> update Chat Read / Unread :: parameters are not defined.');
    return false;
  }

  
  const chatUpdates = {
    userPermalink: username,
    chatId: chatId
  };
  const response = await fetch(`${baseUrl}/update-chat-read`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(chatUpdates),
  }).catch(err => {
    console.error(err);
  });

  const result = await response.json();
  return result;
};

// BOOKMARKS
export const getBookmarks = async (username) => {
  const response = await fetch(`${baseUrl}/${username}/bookmarks`);
  const result = await response.json();
  return { list: result.list, count: result.count };
};

export const createBookmark = async (username, chatId, messageId, messageBody) => {
  if (
    username === undefined ||
    chatId === undefined ||
    messageId === undefined ||
    messageBody === undefined
  ) {
    console.error('Chat service  -> Create Bookmark :: parameters are not defined.');
    return false;
  }

  const postData = {
    userPermalink: username,
    chatId: chatId,
    messageId: messageId,
    body: messageBody
  };

  const response = await fetch(`${baseUrl}/new-bookmark`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(postData),
  }).catch(err => {
    console.error(err);
  });

  const result = await response.json();
  return result;
};

export const deleteBookmark = async (username, chatId, messageId) => {
  if (
    username === undefined ||
    chatId === undefined ||
    messageId === undefined
  ) {
    console.error('Chat service  -> Delete Bookmark :: parameters are not defined.');
    return false;
  }

  const postData = {
    userPermalink: username,
    chatId: chatId,
    messageId: messageId
  };

  const response = await fetch(`${baseUrl}/delete-bookmark`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(postData),
  }).catch(err => {
    console.error(err);
  });

  const result = await response.json();
  return result;
};

// export const sendMessage = async (messageData) => {
//   const response = await fetch(baseUrl, {
//     method: "POST",
//     headers: {
//       "content-type": "application/json",
//     },
//     body: JSON.stringify(messageData),
//   });

//   if (response.ok) {
//     const result = await response.json();

//     return result;
//   } else {
//     throw { message: "Unable to save send message to server." };
//   }
// };
