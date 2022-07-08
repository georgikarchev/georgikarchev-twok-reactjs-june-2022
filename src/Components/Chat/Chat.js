import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../contexts/ChatContext";

import { ChatsList } from "./ChatsList";
import { ChatMain } from "./ChatMain";
import { ChatMessageInfo } from "./ChatMessageInfo";

import styles from "./Chat.module.scss";

export const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null); //'twokChat1User1'
  const { chatsList, setChatsList } = useContext(ChatContext);

  const selectChatHandler = (selectedChatId) => {
    setCurrentChat(selectedChatId);
  };

  // set default chat list for demo user
  //   useEffect(() => {
  //     setChatsList([
  //       {
  //         chatId: "twokChat1UserAnonymous",
  //         contactName: "Eve",
  //         contactAvatar: "./images/botAvatars/eve.jpg",
  //         contactDescription:
  //           "Eve is is a kindergarden teacher. She will help you with your first words",
  //         language: "dutch",
  //         lastMessage: {
  //           author: "bot",
  //           content: "Hallo! Aangenaam kennis te maken.",
  //           bookmarked: false,
  //           datetime: "2022-06-30T12:00:00.000Z",
  //         },
  //         unread: true,
  //         pinned: false,
  //       },
  //     ]);
  //     // eslint-disable-next-line
  //   }, []);

  useEffect(() => {
    // fake server request that loads the chat list
    setTimeout(() => {
      const chatsListDataFromServer = [
        {
          id: "twokChat1User1",
          contactName: "Eve",
          contactAvatar: "./images/botAvatars/eve.jpg",
          contactDescription:
            "Eve is is a kindergarden teacher. She will help you with your first words",
          language: "dutch",
          lastMessage: {
            author: "bot",
            content: "Hallo! Aangenaam kennis te maken.",
            bookmarked: true,
            datetime: "2022-06-30T13:10:59.367Z",
          },
          unread: false,
          pinned: false,
        },
        {
          id: "twokChat1User2",
          contactName: "Pete",
          contactAvatar: "./images/botAvatars/pete.jpg",
          contactDescription:
            "Pete is a university student. He can teach you about words regarding school and university.",
          language: "dutch",
          lastMessage: {
            author: "bot",
            content: "Laten we het over school hebben.",
            bookmarked: false,
            datetime: "2022-07-07T13:10:59.367Z",
          },
          unread: true,
          pinned: false,
        },
      ];

      // TODO !
      // IF demo user/not registered - load fedault chat list
      // this depends on the server response? or on the state? logged out etc.

      setChatsList(chatsListDataFromServer);
      // console.log(chatsList);
    }, 500);
    //eslint-disable-next-line
  }, []);

  return (
    <div className={`app-chat ${styles.chat}`}>
      <ChatsList
        currentChat={currentChat}
        chatListData={chatsList}
        selectChatHandler={selectChatHandler}
      />
      <ChatMain chatId={currentChat} />
      <ChatMessageInfo />
    </div>
  );
};
