import { template as templateEve } from "../ChatTemplates/de/eve_de";
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
  // return result.chats;
  // console.log(result);

  const chatData = {};
  chatData.id = +result.chatId;
  chatData.contactName = result.contactName;
  chatData.contactDescription = result.contactDescription;
  chatData.contactAvatar = result.contactAvatar;
  chatData.chatTemplate = result.chatTemplate;
  chatData.language = result.language;
  chatData.unread = result.unread;
  chatData.pinned = result.pinned;
  chatData.lastMessageId =
    result.lastMessageId === undefined ? 0 : +result.lastMessageId;
  chatData.chatNewWords = +result.chatNewWords;
  chatData.dateCreated = result.dateCreated;
  chatData.chatLastActive = result.chatLastActive;

  // console.log(templates[result.chatTemplate].template.messages);
  chatData.messages = templates[result.chatTemplate].template.messages;

  // if (result.chatTemplate === "eve_de") {
  //   chatData.messages = templateEve.messages;
  // } else {
  //   chatData.messages = templateEve.messages;
  // }

  // console.log(chatData.messages);

  // FAKE
  // const chatData = {
  //   id: "twokChat1User1",
  //   contactName: "Eve",
  //   contactAvatar: "/images/botAvatars/eve.jpg",
  //   contactDescription:
  //     "Eve is is a kindergarden teacher. She will help you with your first words.",
  //   language: "german",
  //   unread: false,
  //   pinned: false,
  //   dateCreated: "2022-06-30T12:00:00.000Z",
  //   lastMessageId: 0,
  //   messages: [
  //     {
  //       id: 1,
  //       authorIsUser: false,
  //       isBookmarked: false,
  //       datetime: "2022-06-30T13:11:03.000Z",
  //       type: "chatMessage",
  //       body: "Hallo!",
  //       translation: "Hello!",
  //       words: [{ id: "w1", de: "hallo", en: ["hello"] }],
  //     },
  //     {
  //       id: 2,
  //       authorIsUser: false,
  //       isBookmarked: false,
  //       datetime: "2022-06-30T13:11:09.000Z",
  //       type: "chatMessage",
  //       body: "Schön, dich kennenzulernen!",
  //       translation: "Nice to meet you!",
  //       words: [
  //         { id: "w2", de: "schön", en: ["nice", "good"] },
  //         { id: "w3", de: "dich", en: ["you", "to you"] },
  //         { id: "w4", de: "kennen lernen", en: ["meet", "get to know"] },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       authorIsUser: true,
  //       isBookmarked: false,
  //       datetime: "2022-06-30T13:12:03.000Z",
  //       type: "chatMessage",
  //       body: "Hallo!",
  //       translation: "Hello!",
  //       words: [{ id: "w1", de: "hallo", en: ["hello"] }],
  //     },
  //     {
  //       id: 4,
  //       authorIsUser: false,
  //       isBookmarked: false,
  //       datetime: "2022-06-30T13:12:09.000Z",
  //       type: "chatMessage",
  //       body: "Wie geht es dir heute?",
  //       translation: "How are you today?",
  //       words: [
  //         { id: "w5", de: "wie", en: ["how", "such as", "like"] },
  //         { id: "w6", de: "es geht", en: ["it's going"] },
  //         { id: "w7", de: "dir", en: ["you", "to you"] },
  //       ],
  //     },
  //     {
  //       id: 5,
  //       authorIsUser: true,
  //       isBookmarked: false,
  //       datetime: "2022-06-30T13:13:03.000Z",
  //       type: "chatMessage",
  //       body: "Gut, danke!",
  //       translation: "Good, thank you!",
  //       words: [
  //         { id: "w8", de: "gut", en: ["good", "well", "fine", "nice"] },
  //         { id: "w9", de: "danke", en: ["thank you", "thanks"] },
  //       ],
  //     },
  //     {
  //       id: 6,
  //       authorIsUser: false,
  //       isBookmarked: false,
  //       datetime: "2022-06-30T13:14:09.000Z",
  //       type: "chatMessage",
  //       body: "Ich bin froh das zu hören.",
  //       translation: "I am happy to hear this.",
  //       words: [
  //         { id: "w10", de: "ich", en: ["I", "me"] },
  //         { id: "w11", de: "bin", en: ["be", "am"] },
  //         { id: "w12", de: "froh", en: ["happy", "glad"] },
  //         { id: "w13", de: "das", en: ["this", "it", "the"] },
  //         { id: "w14", de: "zu hören", en: ["to hear", "listen"] },
  //       ],
  //     },
  //     {
  //       id: 7,
  //       authorIsUser: false,
  //       isBookmarked: false,
  //       datetime: "2022-06-30T13:15:09.000Z",
  //       type: "chatMessage",
  //       body: "Mein Name ist Eve.",
  //       translation: "My name is Eve.",
  //       words: [
  //         { id: "w15", de: "mein", en: ["my"] },
  //         { id: "w16", de: "Name", en: ["name"] },
  //         { id: "w17", de: "ist", en: ["is", "be"] },
  //       ],
  //     },
  //     {
  //       id: 8,
  //       authorIsUser: false,
  //       isBookmarked: false,
  //       datetime: "2022-06-30T13:15:15.000Z",
  //       type: "chatMessage",
  //       body: "Ich helfe dir bei dem Lernen.",
  //       translation: "I will help you learn.",
  //       words: [
  //         { id: "w10", de: "ich", en: ["I", "me"] },
  //         { id: "w18", de: "helfen", en: ["help"] },
  //         { id: "w7", de: "dir", en: ["you", "to you"] },
  //         { id: "w19", de: "bei", en: ["at the", "with"] },
  //         { id: "w20", de: "Lernen", en: ["learning", "study"] },
  //       ],
  //     },
  //     {
  //       id: 9,
  //       authorIsUser: false,
  //       isBookmarked: false,
  //       datetime: "2022-06-30T13:15:45.000Z",
  //       type: "chatMessage",
  //       body: "Willst du Deutsch lernen?",
  //       translation: "Do you want to learn German?",
  //       words: [
  //         { id: "w21", de: "wollen", en: ["want", "wish", "desire"] },
  //         { id: "w22", de: "du", en: ["you"] },
  //         { id: "w23", de: "Deutsch", en: ["German"] },
  //         { id: "w24", de: "lernen", en: ["learn", "study"] },
  //       ],
  //     },
  //     {
  //       id: 10,
  //       authorIsUser: true,
  //       isBookmarked: false,
  //       datetime: "2022-06-30T13:13:03.000Z",
  //       type: "chatMessage",
  //       body: "Ja!",
  //       translation: "Yes!",
  //       words: [{ id: "w25", de: "Ja", en: ["Yes"] }],
  //     },
  //     {
  //       id: 11,
  //       type: "chatNotification",
  //       body: "You have already learned 25 words.",
  //     },
  //   ],
  // };

  return chatData;
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
