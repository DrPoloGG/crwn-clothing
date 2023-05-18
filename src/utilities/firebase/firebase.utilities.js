import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDdywwosxhPWbb41dUiOGbP9uRIw94odWU',
  authDomain: 'crwn-clothing-db-f1e8b.firebaseapp.com',
  projectId: 'crwn-clothing-db-f1e8b',
  storageBucket: 'crwn-clothing-db-f1e8b.appspot.com',
  messagingSenderId: '749770346134',
  appId: '1:749770346134:web:0a66025d32b4b9fe873cb7',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Configure auth provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account', // Forces user to select account
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


// Create the database

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt });
        } catch (error) {
            console.log( 'Error creating user', error.message );
        }
    }

    return userDocRef;
}