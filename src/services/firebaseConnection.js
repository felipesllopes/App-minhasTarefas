import firebase from "firebase";
import "firebase/auth"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyDaw5PwhwGPfX6htLMj3ESyFVFPELQrqBQ",
    authDomain: "tarefas-56888.firebaseapp.com",
    projectId: "tarefas-56888",
    storageBucket: "tarefas-56888.appspot.com",
    messagingSenderId: "310620744781",
    appId: "1:310620744781:web:2fcc61ee42a5c45dd10004",
    measurementId: "G-CRSYFVJLZ5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;