import * as firebase from "firebase";

//import variables from "./firebaseVariables";
console.log(process.env.NODE_ENV);
let variables;
let firebaseConfig;

console.log("not production");
if(process.env.API_KEY) {
  firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STOREAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
  };
} else {
  variables = require("./firebaseVariables").default;
  console.log(variables);
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
