
import { initializeApp } from "firebase/app";
import {getAuth} from  'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.storageBucket,
  messagingSenderId: import.meta.env.messagingSenderId,
  appId: import.meta.env.appId
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)