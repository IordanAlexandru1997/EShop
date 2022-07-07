import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAjzlflSWfFijds1VtDVnnZbXdYE3gNJA",
    authDomain: "eshop-d775d.firebaseapp.com",
    projectId: "eshop-d775d",
    storageBucket: "eshop-d775d.appspot.com",
    messagingSenderId: "193852613499",
    appId: "1:193852613499:web:ebbe4c8c2501a7cc6c53de"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore();
// additional infdisplay name to overwrite the null value 
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    // if user does not exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;

        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user ', error.message);
        }
    }

}

// createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         // ...
//     })
//     .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // ..
//     });

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    // if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}