import React, { useState } from "react";
import { storage, db, auth } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useFormAction } from "react-router-dom";

export default function AddCourse() {
   const [file, setFile] = useState(null);
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const user = auth.currentUser;

   const submitFile = () => {
      if (!file || !title || !description) {
         console.log("Veuillez remplir tous les champs");
         return;
      }

      const fileRef = ref(storage, `courses/${user.uid}/${file.name}`);
      uploadBytes(fileRef, file).then((snapshot) => {
         getDownloadURL(snapshot.ref).then((downloadURL) => {
            const docRef = collection(db, "courses");
            addDoc(docRef, {
               title: title,
               description: description,
               imageUrl: downloadURL,
               usermail: user.email,
            })
               .then(() => {
                  console.log("Cours ajouté avec succès");
               })
               .catch((error) => {
                  console.error("Erreur lors de l'ajout du cours :", error);
               });
         });
      });
   };

   return (
      <div className="flex justify-center items-center min-h-screen flex-col bg-gray-100">
         <div className="mb-4">
            <label className="block text-center text-gray-700 text-sm font-bold mb-2">Titre du cours</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
         </div>
         <div className="mb-4">
            <label className="block text-center text-gray-700 text-sm font-bold mb-2">Description du cours</label>
            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={description} onChange={(e) => setDescription(e.target.value)} />
         </div>
         <div className="mb-4">
            <label className="block text-center text-gray-700 text-sm font-bold mb-2">Image à insérer</label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="file" onChange={(e) => setFile(e.target.files[0])} />
         </div>
         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={submitFile}>Valider</button>
      </div>
   );
}
