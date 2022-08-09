// import { useContext } from "react";
// import { ChatContext } from "../../contexts/ChatContext";
import { Spinner } from "../../Common/Spinner";
import { ChatThumbnail } from "./ChatThumbnail";

import styles from "./ChatsList.module.scss";

export const ChatsList = ({ currentChatId, selectChatHandler, chatsListData }) => {
  // const {chatsList} = useContext(ChatContext)

  let list = (
    <div className={styles.mt3rem}>
      <Spinner />
    </div>
  );
  if (chatsListData !== null && chatsListData && chatsListData.list.length > 0) {
    // TODO order chats by date (date last message/date last update)
    list = chatsListData.list.map((chat) => {
      return (
        <ChatThumbnail
          key={`twokChatThumbnail_${chat.chatId}_${chat.language}`}
          chat={chat}
          isCurrent={chat.chatId === currentChatId}
          onSelectChat={selectChatHandler}
        />
      );
    });
  }

  return <div className={styles.chatsList}>{list}</div>;
};
