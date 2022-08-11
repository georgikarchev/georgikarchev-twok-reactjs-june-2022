import bookmark from "../../../images/bookmark.svg";
import bookmarkOff from "../../../images/bookmarkOff.svg";

import styles from "./BookmarkToggleButton.module.scss";

export const BookmarkToggleButton = ({isBookmarked, onClick}) => {
    return (
        <button className={styles.bookmarkButton} onClick={onClick}>
            {isBookmarked && <img src={bookmark} alt="bookmark" />}
            {!isBookmarked && <img src={bookmarkOff} alt="bookmark" />}
        </button>
    );
}