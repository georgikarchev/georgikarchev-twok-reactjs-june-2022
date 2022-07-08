// import { useContext } from "react";
// import { ChatContext } from "../../contexts/ChatContext";
import { Spinner } from "../Spinner";
import { ChatThumbnail } from "./ChatThumbnail";

import styles from "./ChatsList.module.scss";

export const ChatsList = ({currentChat, selectChatHandler, chatListData}) => {
    // const {chatsList} = useContext(ChatContext)

    

    // TODO add spinner
    let list = <div className={styles.mt3rem}><Spinner /></div>;
    if(chatListData && chatListData.length > 0) {
        // TODO order chats by date (date last message/date last update)
        list = chatListData.map((chat)=>{
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