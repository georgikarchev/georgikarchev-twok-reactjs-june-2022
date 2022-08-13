import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as chatService from "../../Services/chatService";

// import { ChatContext } from "../../Contexts/ChatContext";
import { AuthContext } from "../../Contexts/AuthContext";

import { ChatsList } from "./ChatList/ChatsList";
import { ChatMain } from "./ChatMain/ChatMain";
import { ChatMessageInfo } from "./ChatMessageInfo/ChatMessageInfo";

import styles from "./Chat.module.scss";

export const Chat = () => {
  const [currentChatId, setCurrentChat] = useState(null); //'twokChat1User1'
  const [chatsList, setChatsList] = useState(null);
  const { profileData } = useContext(AuthContext);

  const navigate = useNavigate();

  // console.log("profileData:", profileData);
  const { selectedChat } = useParams();

  const selectChatHandler = (selectedChatId) => {
    // console.log(Array.from(chatsList.list.values()).filter(el => el.chatId === currentChatId)[0]);
    // setCurrentChat(selectedChatId);
    navigate(`/chat/${selectedChatId}`)
  };

  // FAKE
  // useEffect(() => {
  //   setTimeout(() => {
  //     chatService.getChatsList(profileData.userId)
  //       .then((chats) => {
  //         setChatsList(chats);
  //       });
  //   }, 500);
  //   //eslint-disable-next-line
  // }, []);

  useEffect(() => {
    if(profileData.permalink) {
      if(selectedChat) {
        // mark selected chat read if unread
        
        chatService
          .updateChatRead(profileData.permalink, currentChatId)
          .then((chatUnread) => {
            // console.log(chatUnread);
            chatService.getChatsList(profileData.permalink)
              .then((chats) => {
                setChatsList(chats);
              })
              .catch(err=>console.error(err));
          })
          .catch(err=>console.error(err));
        
      } else {
        chatService.getChatsList(profileData.permalink)
              .then((chats) => {
                setChatsList(chats);
              })
              .catch(err=>console.error(err));
      }
      
    }
  }, [profileData.permalink,currentChatId]); //, [profileData]

  useEffect(() => {
    setCurrentChat(selectedChat);
  },[selectedChat]);

  return (
    <div className={`app-chat ${styles.chat}`}>
      <ChatsList
        currentChatId={currentChatId}
        chatsListData={chatsList}
        selectChatHandler={selectChatHandler}
      />
      <ChatMain currentChatId={currentChatId} />
      <ChatMessageInfo />
    </div>
  );
};
