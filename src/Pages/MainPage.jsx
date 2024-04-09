import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
   const [nom, setNom] = useState("");
   const [prenom, setPrenom] = useState("");
   const [cours, setCours] = useState([]); // État pour stocker les cours
   const navigate = useNavigate();
   const [selectedCourse, setSelectedCourse] = useState(null);

   const downloadFile = (url, filename) => {
      const a = document.createElement("a");
      a.href = url;
      a.download = filename || "download";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
   };
   
   useEffect(() => {
      // Récupération des données de l'utilisateur
      const fetchUserData = async () => {
         try {
            const user = auth.currentUser;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
               setNom(docSnap.data().nom);
               setPrenom(docSnap.data().prenom);
            }
         } catch (err) {
            console.log("Erreur affichage donnée : ", err.message);
         }
      };
      
      // Récupération des cours
      const fetchCourses = async () => {
         const coursesSnapshot = await getDocs(collection(db, "courses"));
         const coursesList = coursesSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
         }));
         setCours(coursesList);
      };

      fetchUserData();
      fetchCourses();
   }, []);

   const handleSignOut = () => {
      signOut(auth)
         .then(() => {
            navigate("/")
         })
         .catch((error) => {
            // An error happened.
         });
   };
   const selectCourse = (course) => {
      setSelectedCourse(course);
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
         <p className="text-xl font-semibold mb-4">
            Bonjour : {nom} {prenom} !
         </p>
         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={handleSignOut}>
            Se déconnecter !
         </button>
         <Link className="text-blue-500 hover:text-blue-800 mb-4" to="/addCourse">
            Voulez-vous ajouter un cours ?
         </Link>
         {/* Affichage des cours */}
         <div className="w-full">
            {cours.map((course) => (
               <div key={course.id} className="mb-4 p-4 shadow-lg rounded-lg bg-white cursor-pointer" onClick={() => selectCourse(course)}>
                  <h3 className="text-lg font-bold">{course.title}</h3>
                  <p className="text-gray-700">{course.description}</p>
                  <img className="my-4 w-full object-cover h-48" src={course.imageUrl} alt={course.title} />
                  <p className="text-sm">Créé par: {course.usermail}</p>
               </div>
            ))}
         </div>
         {/* Vue agrandie du cours sélectionné */}
         {selectedCourse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
               <div className="bg-white p-4 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold">{selectedCourse.title}</h3>
                  <p className="text-gray-700">{selectedCourse.description}</p>
                  <img className="my-4 w-full object-cover" src={selectedCourse.imageUrl} alt={selectedCourse.title} />
                  <p className="text-sm">Créé par: {selectedCourse.usermail}</p>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setSelectedCourse(null)}>
                     Fermer
                  </button>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => downloadFile(selectedCourse.fileUrl, selectedCourse.fileName)}>
                     Télécharger
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}
