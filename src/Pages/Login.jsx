import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
   const [mail, setMail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();

   const handleLogin = () => {
      signInWithEmailAndPassword(auth, mail, password)
         .then((userCredentials) => {
            const user = userCredentials.user;
            if (!user.emailVerified) {
               alert("Email non vérifié");
            } else {
               console.log("Logged in with:", user.email);
               navigate("/acceuil");
            }
         })
         .catch((error) => alert(error.message));
   };

   const handleResetPassword = () => {
      if (!mail) {
         alert("Veuillez entrer votre adresse e-mail pour réinitialiser votre mot de passe.");
         return;
      }
      sendPasswordResetEmail(auth, mail)
         .then(() => {
            alert("Un e-mail de réinitialisation de mot de passe a été envoyé.");
         })
         .catch((error) => {
            alert(error.message);
         });
   };

   return (
      <div className="flex justify-center items-center min-h-screen flex-col bg-gray-100">
         <h1 className="text-2xl font-bold mb-6">Se connecter à notre magnifique site !</h1>

         <div className="mb-4 w-full max-w-xs">
            <label className="block text-center text-gray-700 text-sm font-bold mb-2">Adresse e-mail</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" value={mail} onChange={(e) => setMail(e.target.value)} />
         </div>
         <div className="mb-6 w-full max-w-xs">
            <label className="block text-center text-gray-700 text-sm font-bold mb-2">Mot de passe</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
         </div>
         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" onClick={handleLogin}>Valider</button>
         <button className="text-sm text-blue-500 hover:text-blue-800" onClick={handleResetPassword}>Mot de passe oublié ?</button>
         <Link className="text-sm text-blue-500 hover:text-blue-800 mt-4" to="/register">S'inscrire ?</Link>
      </div>
   );
}