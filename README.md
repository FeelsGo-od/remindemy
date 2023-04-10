# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# TODO *** FRONT-END.

<!-- 1. (done) Configure all project prerequisites(database, redux store etc.)
    - mongodb connection string: "mongodb+srv://Admin:LoraGaf998@remindemycluster.zwcs7hc.mongodb.net/?retryWrites=true&w=majority" -->
2. Make AddUser redux feature {name: "Username", email: "usersemail@..", topics: obj}
<!-- 3. AddTopic in UserPage feature
    1. Add some fake topics objects like {name: "topic name", link: "link to the topic", stage: "today" / "tomorrow" / "third day" / "7th day" / "remembered", date: 'date of the next message'}
    2. Show all these topics in UserPage
6. Show status(stage) of each topic right behind it in topicsList component
8. Make the link in topic to be optional -->

<!-- # TODO *** BACK-END.

1. Display users from db in UsersList
    1. Make api call to db in topicsSlice thunk to receive all users
2. Make post request to login user.
3. Display user's topics from database in UserPage
    1. Make api call to that db in topicsSlice thunk to receive all topics
4. Send scheduled messages to user's email with info like "Hi Username, today is the day to repeat this topic: a.href=topics.link>topics.name<"
5. Get stage of each topic from db and display it right behind each topic in topicsList component
6. Deploy it to the vercel -->