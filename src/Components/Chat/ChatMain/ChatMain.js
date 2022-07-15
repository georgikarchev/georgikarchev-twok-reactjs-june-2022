import { useEffect, useState } from "react";

import * as chatService from "../../../Services/chatService";

import { ChatInputBar } from "./ChatInputBar/ChatInputBar";
import styles from "./ChatMain.module.scss";
import { ChatContent } from "./ChatContent/ChatContent";
import { ChatHeader } from "./ChatHeader";

export const ChatMain = ({ chatId }) => {
  const [chatData, setChatData] = useState(null);
  const [showHints, setShowHints] = useState(false);
  const [inputIsEnabled, setInputIsEnabled] = useState(false);

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
      {chatId && chatData && (
        <>
          <header>
            <ChatHeader name={chatData.contactName} avatar={chatData.contactAvatar} desrciption={chatData.contactDescription} />
          </header>
          <main>
            <ChatContent chatData={chatData} />
          </main>
          <footer>
            <ChatInputBar
              showHints={showHints}
              showHintsHandler={showHintsHandler}
              inputIsEnabled={inputIsEnabled}
            />
          </footer>
        </>
      )}
    </div>
  );
};
