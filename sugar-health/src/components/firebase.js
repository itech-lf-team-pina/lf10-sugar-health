import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
// ... other firebase imports

const firebaseConfig = {
    apiKey: "AIzaSyAj8wxTvg2PKUUH1sBzg5-9JF_ryfQUA6g",
    authDomain: "lf10-sugar-health.firebaseapp.com",
    projectId: "lf10-sugar-health",
    storageBucket: "lf10-sugar-health.appspot.com",
    messagingSenderId: "298066233633",
    appId: "1:298066233633:web:d2fefbff1dc1720c441660"
    }

export const firebaseApp = initializeApp(firebaseConfig)


// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')