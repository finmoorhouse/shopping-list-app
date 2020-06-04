import * as firebase from "firebase";

//import variables from "./firebaseVariables";
//console.log(process.env.API_KEY);
let variables;
let firebaseConfig;

if(process.env.NODE_ENV==='production') {
  firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STOREAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  };
} else {
  variables = require("./firebaseVariables").default;
  //console.log(variables);
  firebaseConfig = {
    apiKey: variables.apiKey,
    authDomain: variables.authDomain,
    databaseURL: variables.databaseURL,
    projectId: variables.projectId,
    storageBucket: variables.storageBucket,
    messagingSenderId: variables.messagingSenderId,
    appId: variables.appId,
  };
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };
