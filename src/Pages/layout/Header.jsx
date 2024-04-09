import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
   return (
      <header className="h-10vh w-full">
         <div className="flex justify-between p-4 bg-gray-200 text-gray-700">
            <p>tel: 0651967139</p>
            <p>epsi@epsilon.net</p>
            <p>2 rue Alphonse Colas</p>
         </div>
         <nav className="flex justify-around items-center h-3/4 bg-blue-600 text-white">
            <Link to="/acceuil" className="flex-grow text-center py-2 hover:bg-blue-700">
               Page Accueil
            </Link>
            <Link to="/addCourse" className="flex-grow text-center py-2 hover:bg-blue-700">
               Ajouter un cours
            </Link>
         </nav>
      </header>
   );
}