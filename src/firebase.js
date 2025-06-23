import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
    /*
      Put Your Firebase Config Here
    */
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // console.log("Persistence set to local.");
  })
  .catch((error) => {
    console.error("Failed to set persistence:", error);
  });

export {auth, db, analytics};

