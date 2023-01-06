import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCQpmfeGc2IqKaJEmBY77lqefTpjkazKP0",
  authDomain: "adda-18bc3.firebaseapp.com",
  databaseURL: "https://adda-18bc3-default-rtdb.firebaseio.com",
  projectId: "adda-18bc3",
  storageBucket: "adda-18bc3.appspot.com",
  messagingSenderId: "166422652348",
  appId: "1:166422652348:web:d6d35246ab891d7f84f7b9"
};
const app = initializeApp(firebaseConfig);
export {getAuth,createUserWithEmailAndPassword, updateProfile,getDatabase, ref, set,signInWithEmailAndPassword,onAuthStateChanged};