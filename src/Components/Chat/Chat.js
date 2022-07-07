import { ChatsList } from "./ChatsList";
import { ChatContent } from "./ChatContent";
import { ChatMessageInfo } from "./ChatMessageInfo";

import styles from "./Chat.module.scss";
import { useState } from "react";

export const Chat = () => {
    const [currentChat, setCurrentChat] = useState('twokChat1User1'); //'twokChat1User1'

    const selectChatHandler = (selectedChatId) => {
        setCurrentChat(selectedChatId);
        console.log("New chat selected: ", selectedChatId);
    };

    return (
        <div className={`app-chat ${styles.chat}`}>
            <ChatsList currentChat={currentChat} selectChatHandler={selectChatHandler} />
            <ChatContent />
            <ChatMessageInfo />
        </div>
    );
}