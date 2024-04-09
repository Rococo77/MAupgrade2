import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
export default function Register() {
   const [mail, setMail] = useState("");
   const [password, setPassword] = useState("");
   const [nom, setNom] = useState("");
   const [prenom, setPrenom] = useState("");
   const navigate = useNavigate();

   const handleCreate = async () => {
      if (mail && password) {
         try {
            const userCredentials = await createUserWithEmailAndPassword(auth, mail, password);

            const user = userCredentials.user;
            console.log("Logged in with:", user.email);
            const userRef = doc(db, "users", user.uid);
            sendEmailVerification(userCredentials.user).then(() => {
               console.log("Email de vérification envoyé !");
            });
            try {
               await setDoc(userRef, {
                  nom: nom,
                  prenom: prenom,
               });
            } catch (err) {
               console.log("erreur d'insertion dans firestore : ", err.message);
            }
            navigate("/");
         } catch (err) {
            console.log("error : ", err.message);
         }
      }
      
   };
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
         <h1 className="text-2xl font-bold mb-6">S'inscrire à notre magnifique site !</h1>
         <div className="mb-4 w-full max-w-xs">
            <label className="block text-center text-gray-700 text-sm font-bold mb-2">Adresse e-mail</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
         </div>
         <div className="mb-4 w-full max-w-xs">
            <label className="block text-center text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
         </div>
         <div className="mb-4 w-full max-w-xs">
            <label className="block text-center text-gray-700 text-sm font-bold mb-2">Nom</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
         </div>
         <div className="mb-4 w-full max-w-xs">
            <label className="block text-center text-gray-700 text-sm font-bold mb-2">Prénom</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
         </div>

         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleCreate}>Valider</button>
         <Link className="text-blue-500 hover:text-blue-800 mt-4" to="/">Se connecter ?</Link>
      </div>
   );
}
