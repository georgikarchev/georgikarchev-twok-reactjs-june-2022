import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";

import styles from "./ChatsList.module.scss";
import { ChatThumbnail } from "./ChatThumbnail";

export const ChatsList = ({currentChat, selectChatHandler}) => {
    const {chatsList} = useContext(ChatContext)

    

    // TODO add spinner
    let list = 'No chats yet';
    if(chatsList !== undefined && chatsList.length > 0) {
        // TODO order chats by date (date last message/date last update)
        list = chatsList.map((chat)=>{
            console.log(currentChat === chat.id);
            return (
                <ChatThumbnail key={`twokChatThumbnail_${chat.id}`} chat={chat} isCurrent={chat.id === currentChat}/>
            );
        })
    }


    return (
        <div className={styles.chatsList}>
            {list}
        </div>
    );
}