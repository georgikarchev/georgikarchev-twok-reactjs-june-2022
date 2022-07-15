import { useContext, useEffect, useState } from "react";

import * as chatService from "../../Services/chatService";

import { ChatContext } from "../../Contexts/ChatContext";
import { AuthContext } from "../../Contexts/AuthContext";

import { ChatsList } from "./ChatList/ChatsList";
import { ChatMain } from "./ChatMain/ChatMain";
import { ChatMessageInfo } from "./ChatMessageInfo/ChatMessageInfo";

import styles from "./Chat.module.scss";

export const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null); //'twokChat1User1'
  const [ chatsList, setChatsList ] = useState();
  const { profileData } = useContext(AuthContext);

  const selectChatHandler = (selectedChatId) => {
    setCurrentChat(selectedChatId);
  };

  useEffect(() => {
    setTimeout(() => {
      chatService.getChatsList(profileData.userId)
        .then((chats) => {
          setChatsList(chats);
        });
    }, 500);

    //eslint-disable-next-line
  }, []);

  return (
    <div className={`app-chat ${styles.chat}`}>
      <ChatsList
        currentChat={currentChat}
        chatsListData={chatsList}
        selectChatHandler={selectChatHandler}
      />
      <ChatMain chatId={currentChat} />
      <ChatMessageInfo />
    </div>
  );
};
