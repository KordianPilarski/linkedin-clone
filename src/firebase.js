import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAP5RjcCC-Sva0j4FZVJaGw0AqbIzudXTE",
  authDomain: "linkedin-clone-5cce7.firebaseapp.com",
  projectId: "linkedin-clone-5cce7",
  storageBucket: "linkedin-clone-5cce7.appspot.com",
  messagingSenderId: "568166278925",
  appId: "1:568166278925:web:6494d23a44ce345df6b244",
  measurementId: "G-YGVSNYJ7W0",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
