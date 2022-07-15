// A Utils file, containing helper functions that include data formatting.

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

const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const utcNowDate = () => {
  return new Date(new Date().toISOString());
};

export const stringToDdMonthYyyy = (dateString) => {
  const date = new Date(dateString);
  return (
    date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear()
  );
};

export const lastActive = (datetimeString) => {
  let lastActive = "now";
  const utcLastActiveDate = dateFromUtcString(datetimeString);
  const utcNow = utcNowDate();

  const days = diffDays(utcNow, utcLastActiveDate);
  const hours = diffHours(utcNow, utcLastActiveDate);
  const minutes = diffMinutes(utcNow, utcLastActiveDate);

  if (days > 6) {
    lastActive =
      utcLastActiveDate.getUTCDate() +
      " " +
      month[utcLastActiveDate.getUTCMonth()].substring(0, 3);
  } else if (days > 1) {
    lastActive = weekday[utcLastActiveDate.getUTCDay()].substring(0, 3);
  } else if (days > 0 || utcLastActiveDate.getUTCDay() !== utcNow.getUTCDay()) {
    // lastActive = "Yesterday"; // too big for interface
    lastActive = weekday[utcLastActiveDate.getUTCDay()].substring(0, 3);
  } else if (hours > 1) {
    lastActive =
      utcLastActiveDate.getUTCHours() + ":" + utcLastActiveDate.getUTCMinutes();
  } else if (minutes > 1) {
    lastActive = minutes + "m";
  }

  return lastActive;
}

// Helpers
const dateFromUtcString = (utcString) => {
  return new Date(new Date(utcString.toString()).toISOString());
};

const diffDates = (date1, date2) => {
  return Math.abs(date1 - date2);
};

const diffDays = (date1, date2) => {
  return Math.floor(diffDates(date1, date2) / (1000 * 60 * 60 * 24));
};

const diffHours = (date1, date2) => {
  return Math.floor(diffDates(date1, date2) / (1000 * 60 * 60));
};

const diffMinutes = (date1, date2) => {
  return Math.floor(diffDates(date1, date2) / (1000 * 60));
};
