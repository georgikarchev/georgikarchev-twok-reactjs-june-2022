export const template = {
    messages: [
      {
        id: 1,
        authorIsUser: false,
        isBookmarked: false,
        datetime: "2022-06-30T13:11:03.000Z",
        type: "chatMessage",
        body: 'Hallo! 👋',
        translation: 'Hello!',
        words: [{ id: "w1", de: "hallo", en: ["hello"] }],
      },
      {
        id: 2,
        authorIsUser: false,
        isBookmarked: false,
        datetime: "2022-06-30T13:11:09.000Z",
        type: "chatMessage",
        body: "Schön, dich kennenzulernen!",
        translation: "Nice to meet you!",
        words: [
          { id: "w2", de: "schön", en: ["nice", "good"] },
          { id: "w3", de: "dich", en: ["you", "to you"] },
          { id: "w4", de: "kennen lernen", en: ["meet", "get to know"] },
        ],
      },
      {
        id: 3,
        authorIsUser: true,
        isBookmarked: false,
        datetime: "2022-06-30T13:12:03.000Z",
        type: "chatMessage",
        body: "Hallo!",
        translation: "Hello!",
        words: [{ id: "w1", de: "hallo", en: ["hello"] }],
      },
      {
        id: 4,
        authorIsUser: false,
        isBookmarked: false,
        datetime: "2022-06-30T13:12:09.000Z",
        type: "chatMessage",
        body: "Wie geht es dir heute?",
        translation: "How are you today?",
        words: [
          { id: "w5", de: "wie", en: ["how", "such as", "like"] },
          { id: "w6", de: "es geht", en: ["it's going"] },
          { id: "w7", de: "dir", en: ["you", "to you"] },
        ],
      },
      {
        id: 5,
        authorIsUser: true,
        isBookmarked: false,
        datetime: "2022-06-30T13:13:03.000Z",
        type: "chatMessage",
        body: "Gut, danke!",
        translation: "Good, thank you!",
        words: [
          { id: "w8", de: "gut", en: ["good", "well", "fine", "nice"] },
          { id: "w9", de: "danke", en: ["thank you", "thanks"] },
        ],
      },
      {
        id: 6,
        authorIsUser: false,
        isBookmarked: false,
        datetime: "2022-06-30T13:14:09.000Z",
        type: "chatMessage",
        body: "Ich bin froh das zu hören.",
        translation: "I am happy to hear this.",
        words: [
          { id: "w10", de: "ich", en: ["I", "me"] },
          { id: "w11", de: "bin", en: ["be", "am"] },
          { id: "w12", de: "froh", en: ["happy", "glad"] },
          { id: "w13", de: "das", en: ["this", "it", "the"] },
          { id: "w14", de: "zu hören", en: ["to hear", "listen"] },
        ],
      },
      {
        id: 7,
        authorIsUser: false,
        isBookmarked: false,
        datetime: "2022-06-30T13:15:09.000Z",
        type: "chatMessage",
        body: "Mein Name ist Eve.",
        translation: "My name is Eve.",
        words: [
          { id: "w15", de: "mein", en: ["my"] },
          { id: "w16", de: "Name", en: ["name"] },
          { id: "w17", de: "ist", en: ["is", "be"] },
        ],
      },
      {
        id: 8,
        authorIsUser: false,
        isBookmarked: false,
        datetime: "2022-06-30T13:15:15.000Z",
        type: "chatMessage",
        body: "Ich helfe dir bei dem Lernen.",
        translation: "I will help you learn.",
        words: [
          { id: "w10", de: "ich", en: ["I", "me"] },
          { id: "w18", de: "helfen", en: ["help"] },
          { id: "w7", de: "dir", en: ["you", "to you"] },
          { id: "w19", de: "bei", en: ["at the", "with"] },
          { id: "w20", de: "Lernen", en: ["learning", "study"] },
        ],
      },
      {
        id: 9,
        authorIsUser: false,
        isBookmarked: false,
        datetime: "2022-06-30T13:15:45.000Z",
        type: "chatMessage",
        body: "Willst du Deutsch lernen?",
        translation: "Do you want to learn German?",
        words: [
          { id: "w21", de: "wollen", en: ["want", "wish", "desire"] },
          { id: "w22", de: "du", en: ["you"] },
          { id: "w23", de: "Deutsch", en: ["German"] },
          { id: "w24", de: "lernen", en: ["learn", "study"] },
        ],
      },
      {
        id: 10,
        authorIsUser: true,
        isBookmarked: false,
        datetime: "2022-06-30T13:13:03.000Z",
        type: "chatMessage",
        body: "Ja!",
        translation: "Yes!",
        words: [{ id: "w25", de: "Ja", en: ["Yes"] }],
      },
      {
        id: 11,
        type: "chatNotification",
        body: "25 new words learned",
        achievement: "You learned you first 25 words in German.",
        newWordsLearned: 25
      },
    ],
  };