# twok - Learn to speak likea a five year old
## A SoftUni Project - ReactJS - June 2022

The following page describes a **SoftUni** project for **ReactJS - June 2022** by **@georgi.k**.
The app created is a *hybrid language learning messenger* **SPA**, which connects the user with a chatbot instead of real users.
During their communication the chatbot introduces new words and expressions.
The user progress, their achievements and bookmarks are saved on a remote server, by tapping to an API created for this demo project. All data persists on the server.

[![twok-home](https://twok.app/screenshot-home.png "twok-home")](http://twok.app "twok-home")

## React SPA - Architecture Overview
	└── /src
		├── /chat
		├── /Components
		|	├── /Auth
		|	|	├── /Login
		|	|	├── /LoginWithPermalink
		|	|	└── /NewUser
		|	├── /Bookmarks
		|	├── /Chat
		|	|	├── /Chat
		|	|	├── /ChatList
		|	|	|	├── /ChatsList
		|	|	|	├── /ChatThumbnail
		|	|	├── /ChatMain
		|	|	|	├── /ChatMain
		|	|	|	├── /ChatContent
		|	|	|	├── /ChatInputBar
		|	|	|	├── /ChatHeader
		|	|	|	└── /images
		|	|	└── /ChatMessageInfo
		|	├── /Common
		|	|	├── /BookmarkToggleButton
		|	|	├── /Modal
		|	|	|	├── /Modal
		|	|	|	└── /Prompt
		|	|	├── /Timeline
		|	|	├── /Spinner
		|	|	├── /SpinnerTyping
		|	├── /Dashboard
		|	├── /Header
		|	|	├── /Header
		|	|	├── /GlobalSettingsWidget
		|	|	├── /Navigation
		|	|	├── /images
		|	├── /Home
		|	├── /Profile
		├── /Contexts
		├── /images
		├── /Services
		|	├── /authService
		|	├── /chatService
		|	├── /languageService
		|	├── /storageService
		├── /Utils
		|	├── /dateUtils
		|	├── /languageCodes
		|	├── /validators
		├── App.js
		└── index.js

## API

The API lives at https://demo.twok.app

**base URL:** https://demo.twok.app 
**endpoints:**

### Create
### `https://demo.twok.app/signup`
### `https://demo.twok.app/enroll`
### `https://demo.twok.app/new-bookmark`
### `https://demo.twok.app/new-achievement`


### Read
### `https://demo.twok.app/chats`
### `https://demo.twok.app/chat`
### `https://demo.twok.app/achievements`


### Update
### `https://demo.twok.app/update-user-chat`
### `https://demo.twok.app/update-chat-read`
### `https://demo.twok.app/update-chat-unread`
### `https://demo.twok.app/update-language-words-learned`


### Delete
### `https://demo.twok.app/delete-bookmark`
### `https://demo.twok.app/delete-user`


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
