import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
  EXPO_PUBLIC_API_KEY,
  EXPO_PUBLIC_AUTH_DOMAIN,
  EXPO_PUBLIC_PROJECT_ID,
  EXPO_PUBLIC_STORAGE_BUCKET,
  EXPO_PUBLIC_MSG_SENDER_ID,
  EXPO_PUBLIC_APP_ID
} from '@env';

console.log("API Key:", EXPO_PUBLIC_API_KEY); // Tarkista että muuttujat latautuvat oikein

const firebaseConfig = {
  apiKey: EXPO_PUBLIC_API_KEY,
  authDomain: EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: EXPO_PUBLIC_PROJECT_ID,
  storageBucket: EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: EXPO_PUBLIC_MSG_SENDER_ID,
  appId: EXPO_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const TODOS_REF = 'todos';
