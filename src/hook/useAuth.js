import React from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

import { auth } from "../../firebase";
export default function useAuth() {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
         if (user && user.emailVerified) {
            setUser(user);
         } else {
            setUser(null);
         }
      });
      return unsub;
   }, []);
   return { user };
}
