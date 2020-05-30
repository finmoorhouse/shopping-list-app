import * as firebase from "firebase";
import variables from "./firebaseVariables";

const firebaseConfig = {
    apiKey: variables.apiKey,
    authDomain: variables.authDomain,
    databaseURL: variables.databaseURL,
    projectId: variables.projectId,
    storageBucket: variables.storageBucket,
    messagingSenderId: variables.messagingSenderId,
    appId: variables.appId
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {firebase, googleAuthProvider, database as default};
