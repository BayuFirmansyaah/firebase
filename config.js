const firebase = require('firebase/app')
const {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc, query, where,
  orderBy, serverTimestamp, getDoc,updateDoc
} = require('firebase/firestore')

const firebaseConfig = {
  apiKey: "AIzaSyA8gEv2yqa2r93owyqy8i1v2xuKn2MgngM",
  authDomain: "reminderapps-9974e.firebaseapp.com",
  projectId: "reminderapps-9974e",
  storageBucket: "reminderapps-9974e.appspot.com",
  messagingSenderId: "451234794151",
  appId: "1:451234794151:web:bd4cf1fea79a547038e982"
};

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
const agenda = db.collection("Agenda")

module.exports = agenda;


