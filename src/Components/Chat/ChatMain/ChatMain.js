import { useEffect, useState } from "react";

import { stringToDdMonthYyyy } from "../../../Utils/dateUtils";
import * as chatService from "../../../Services/chatService";

import { ChatInputBar } from "./ChatInputBar";
import styles from "./ChatMain.module.scss";
import { ChatMessage } from "./ChatMessage";
import { ChatNotification } from "./ChatNotification";
import { Spinner } from "../../Common/Spinner";

export const ChatMain = ({ chatId }) => {
  const [chatData, setChatData] = useState(null);
  const [showAllTranslations, setShowAllTranslations] = useState(false);
  const [showHints, setShowHints] = useState(false);

  // Load chat data from server
  useEffect(() => {
    setChatData(null);
    // fake server request
    // const fakeServerResponse = {
    //   id: "twokChat1User1",
    //   contactName: "Eve",
    //   contactAvatar: "./images/botAvatars/eve.jpg",
    //   contactDescription:
    //     "Eve is is a kindergarden teacher. She will help you with your first words",
    //   language: "dutch",
    //   unread: false,
    //   pinned: false,
    //   dateCreated: "2022-06-30T12:00:00.000Z",
    //   messages: [
    //     {
    //       id: "1",
    //       authorIsUser: false,
    //       content: "Hallo! Leuk je ontmoet te hebben.",
    //       translation: "Hello! Nice to meet you!",
    //       isBookmarked: true,
    //       datetime: "2022-06-30T13:10:59.367Z",
    //     },
    //     {
    //       id: "2",
    //       authorIsUser: false,
    //       content: "Laat ons twok!",
    //       translation: "Let us twok!",
    //       isBookmarked: false,
    //       datetime: "2022-06-30T13:10:59.400Z",
    //     },
    //     {
    //       id: "3",
    //       authorIsUser: true,
    //       content: "Hallo!",
    //       answers: [ "Hallo!", "Hello!", "Hey!" ],
    //       translation: "Hello!",
    //       isBookmarked: false,
    //       datetime: "2022-06-30T13:11:00.000Z",
    //       isCorrect: true,
    //     },
    //     {
    //       id: "4",
    //       authorIsUser: true,
    //       content: "Leuk je ontmoet ",
    //       answers: [ "Leuk je ontmoet te hebben" ],
    //       translation: "Nice to meet you!",
    //       isBookmarked: false,
    //       datetime: "2022-06-30T13:11:03.000Z",
    //       isCorrect: false,
    //     },
    //   ],
    //   questions: [
    //     "Hello!",
    //     "Nice to meet you!",
    //     "My name is (Your name)",
    //     "I am a (girl/boy/man/woman/human/alien)",
    //     "I come from (Country)",
    //     "My city is (City)"
    //   ]
    // };
    // Todo remove timer when real server responses arrive - this is currently used merely to fake a delay and to force the spinner to be visible for a moment
    setTimeout(() => {
      chatService.getChat(chatId).then((chatDataResponse) => {
        setChatData(chatDataResponse);
      });
    }, 800);
  }, [chatId]);

  let messages = <Spinner />;
  if (chatData && chatData.messages.length > 0) {
    messages = chatData.messages.map((message) => {
      console.log(Number(message.id) <= Number(chatData.lastMessageId));
      if (Number(message.id) <= Number(chatData.lastMessageId)) {
        if (message.type === "chatMessage") {
          return (
            <ChatMessage
              key={"message_" + chatData.id + "_" + message.id}
              {...message}
              showAllTranslations={showAllTranslations}
            />
          );
        } else if (message.type === "chatNotification") {
          return (
            <ChatNotification
              key={"message_" + chatData.id + "_" + message.id}
              {...message}
            />
          );
        }
      }
    });
  }

  const showAllTranslationsHandler = () => {
    setShowAllTranslations((state) => !state);
  };

  const showHintsHandler = () => {
    setShowHints((state) => !state);
  };

  return (
    <div className={`${styles.chatMain} ${styles.verticalScroll}`}>
      {!chatId && (
        <div className={styles.noChatSelectedMessage}>
          <h2>No chat selected.</h2>
          <p>Choose a chat from the list on the left.</p>
        </div>
      )}
      {chatId && (
        <>
          <div className={styles.chatContent}>
            <main className={styles.chatContent__body}>
              <div className={styles.chatMeta}>
                {chatData && chatData.dateCreated !== "" && (
                  <span className={styles.dateCreated}>
                    {stringToDdMonthYyyy(chatData.dateCreated)}
                  </span>
                )}
                {chatData && chatData.contactDescription !== "" && (
                  <h3 className={styles.description}>
                    {chatData.contactDescription}
                  </h3>
                )}
              </div>
              {messages}
            </main>
          </div>
          <footer>
            <ChatInputBar
              showAllTranslations={showAllTranslations}
              showAllTranslationsHandler={showAllTranslationsHandler}
              showHints={showHints}
              showHintsHandler={showHintsHandler}
            />
          </footer>
        </>
      )}
    </div>
  );
};
