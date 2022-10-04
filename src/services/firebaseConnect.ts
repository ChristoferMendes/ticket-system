import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDv8rrN5pH5y1xcNHmZqYH-rfLCP10fyiI",
  authDomain: "ticket-system-dde18.firebaseapp.com",
  projectId: "ticket-system-dde18",
  storageBucket: "ticket-system-dde18.appspot.com",
  messagingSenderId: "495155308625",
  appId: "1:495155308625:web:9251479745e607fe513070",
  measurementId: "G-PMW87NTG3N"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
