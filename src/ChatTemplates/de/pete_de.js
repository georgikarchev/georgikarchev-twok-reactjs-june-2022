export const template = {
    messages: [
      {
        id: 1,
        authorIsUser: false,
        isBookmarked: false,
        type: "chatMessage",
        body: "Reden wir über die Schule!",
        translation: "Let's talk about school!",
        words: [
            { id: "w1", de: "Reden wir", en: ["Let's talk"] },
            { id: "w2", de: "über", en: ["about"] },
            { id: "w3", de: "die Schule", en: ["school"] }
        ],
      },
      {
        id: 2,
        authorIsUser: false,
        isBookmarked: false,
        type: "chatMessage",
        body: "Ich studiere an einer Universität in Frankfurt.",
        translation: "I study in a university in Frankfurt.",
        words: [
          { id: "w1", de: "Ich", en: ["I"] },
          { id: "w2", de: "studiere", en: ["study"] },
          { id: "w3", de: "an einer Universität", en: ["in a university"] },
          { id: "w4", de: "in", en: ["in"] },
          { id: "w5", de: "Frankfurt", en: ["Frankfurt"] },
        ],
      },
      {
        id: 3,
        authorIsUser: true,
        isBookmarked: false,
        type: "chatMessage",
        body: "Hallo!",
        translation: "Hello!",
        words: [{ id: "w1", de: "hallo", en: ["hello"] }],
      },
      {
        id: 4,
        authorIsUser: true,
        isBookmarked: false,
        type: "chatMessage",
        body: "Ich auch.",
        translation: "Me too.",
        words: [
            { id: "w1", de: "Ich", en: ["I", "Me"] },
            { id: "w3", de: "auch", en: ["also", "too"] },
        ],
      },
      {
        id: 5,
        authorIsUser: false,
        isBookmarked: false,
        type: "chatMessage",
        body: "Echt? Wo?",
        translation: "Really? Where?",
        words: [
          { id: "w1", de: "Echt?", en: ["Really?"] },
          { id: "w2", de: "Wo?", en: ["Where?"] },
        ],
      },
      {
        id: 6,
        authorIsUser: true,
        isBookmarked: false,
        type: "chatMessage",
        body: "An der Uni Darmstadt.",
        translation: "At the university Darmstadt.",
        words: [
          { id: "w1", de: "An", en: ["At"] },
          { id: "w2", de: "die Uni", en: ["university"] },
          { id: "w3", de: "Darmstadt", en: ["Darmstadt", "a city in central germany"] },
        ],
      },
      {
        id: 7,
        authorIsUser: false,
        isBookmarked: false,
        type: "chatMessage",
        body: "Echt? Meine Schwester studiert dort auch.",
        translation: "Really? My sister studies there too.",
        words: [
          { id: "w1", de: "Echt ?", en: ["Really ?"] },
          { id: "w2", de: "meine", en: ["my"] },
          { id: "w3", de: "sister", en: ["die Schwester"] },
          { id: "w4", de: "studiert", en: ["studies"] },
          { id: "w5", de: "dort", en: ["there"] },
          { id: "w6", de: "auch", en: ["too", "also"] },
        ],
      },
      {
        id: 8,
        authorIsUser: false,
        isBookmarked: false,
        type: "chatMessage",
        body: "Ich muss gehen! Ich komme zu spät zum Bus.",
        translation: "Got to go! I am late for the bus.",
        words: [
          { id: "w1", de: "Ich", en: ["I"] },
          { id: "w2", de: "muss", en: ["must"] },
          { id: "w3", de: "gehen", en: ["go", "going", "walking"] },
          { id: "w4", de: "Ich komme zu spät", en: ["I am late"] },
          { id: "w5", de: "der Bus", en: ["bus"] },
        ],
      },
      {
        id: 9,
        authorIsUser: true,
        isBookmarked: false,
        type: "chatMessage",
        body: "Wiedersehen!",
        translation: "Bye!",
        words: [{ id: "w1", de: "wiedersehen", en: ["bye"] }],
      },
      {
        id: 10,
        type: "chatNotification",
        body: "50 new words learned",
        achievement: "You learned you first 50 words in German.",
        newWordsLearned: 25
      },
    ],
  };