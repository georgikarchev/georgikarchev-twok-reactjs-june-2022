import { useEffect, useState } from "react";
import { Spinner } from "../Spinner";

import styles from "./ChatContent.module.scss";
import { ChatMessage } from "./ChatMessage";

export const ChatContent = ({ chatId }) => {
  const [chatData, setChatData] = useState(null);
  const [dateCreated, setDateCreated] = useState(null);

  // Load chat data from server
  useEffect(() => {
    // fake server request
    const fakeServerResponse = {
      id: "twokChat1User1",
      contactName: "Eve",
      contactAvatar: "./images/botAvatars/eve.jpg",
      contactDescription:
        "Eve is is a kindergarden teacher. She will help you with your first words",
      language: "dutch",
      unread: false,
      pinned: false,
      dateCreated: "2022-06-30T12:00:00.000Z",
      messages: [
        {
          id: "1",
          authorIsUser: false,
          content: "Hallo! Leuk je ontmoet te hebben.",
          translation: "Hello! Nice to meet you!",
          isBookmarked: true,
          datetime: "2022-06-30T13:10:59.367Z",
        },
        {
          id: "2",
          authorIsUser: false,
          content: "Laat ons twok!",
          translation: "Let us twok!",
          isBookmarked: false,
          datetime: "2022-06-30T13:10:59.400Z",
        },
        {
          id: "3",
          authorIsUser: true,
          content: "Hallo!",
          answers: [ "Hallo!", "Hello!", "Hey!" ],
          translation: "Hello!",
          isBookmarked: false,
          datetime: "2022-06-30T13:11:00.000Z",
          isCorrect: true,
        },
        {
          id: "4",
          authorIsUser: true,
          content: "Leuk je ontmoet ",
          answers: [ "Leuk je ontmoet te hebben" ],
          translation: "Nice to meet you!",
          isBookmarked: false,
          datetime: "2022-06-30T13:11:03.000Z",
          isCorrect: false,
        },
      ],
    };

    setTimeout(() => {
      setChatData(fakeServerResponse);
      setDateCreated(fakeServerResponse.dateCreated);
    }, 800);
  }, [chatId]);

  //   TODO ! - move this logic to an external file and import it  (service)
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateCreated);
  const dateOutput =
    date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();

  let messages = <Spinner />;
  if (chatData && chatData.messages.length > 0) {
    messages = chatData.messages.map((message) => {
      console.log(message);
      return (
        <ChatMessage
          key={"message_" + chatData.id + "_" + message.id}
          {...message}
        />
      );
    });
  }

  return (
    <div className={styles.chatContent}>
      <header>
        {chatData && dateOutput !== "" && (
          <span className={styles.dateCreated}>{dateOutput}</span>
        )}
        {chatData && chatData.contactDescription !== "" && (
          <h3 className={styles.description}>{chatData.contactDescription}</h3>
        )}
      </header>
      <main>{messages}</main>
    </div>
  );
};
