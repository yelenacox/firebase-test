// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { Route, Routes } from "react-router-dom";
import CatList from "./CatList";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { CatDetail } from "./CatDetail";
import { Upload } from "./Upload";

export const myContext = createContext();
function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyA0ac9FlF8JpXv-jjQypHOxiINmHrHmgG4",
    authDomain: "locutus-test-90d7a.firebaseapp.com",
    projectId: "locutus-test-90d7a",
    storageBucket: "locutus-test-90d7a.appspot.com",
    messagingSenderId: "374206910982",
    appId: "1:374206910982:web:010eba223f8d6ff9fde987",
  };

  // const firebaseConfig = import.meta.env.VITE_FIREBASE_CONFIG

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return (
    <myContext.Provider
      value={{
        db,
      }}
    >
      <Routes>
        <Route index element={<CatList />} />
        <Route path={"/cat/:catId"} element={<CatDetail />} />
        <Route path={"/upload_file"} element={<Upload />} />
      </Routes>
    </myContext.Provider>
  );
}

export default App;
