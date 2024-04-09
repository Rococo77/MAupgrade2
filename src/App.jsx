import { BrowserRouter, Routes } from "react-router-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import useAuth from "../src/hook/useAuth";

import Login from "./Pages/Login";
import Register from "./Pages/Register";

import Header from "./Pages/layout/Header";
import Footer from "./Pages/layout/Footer";

import MainPage from "./Pages/MainPage";
import AddCourse from "./Pages/AddCourse";

function App() {
   const { user } = useAuth();

   if (!user) {
      return (
         <BrowserRouter>
            <div style={{ boxShadow: "0 0 0 1px" }}>
               <Header />
               <div style={{ flex: "1", minHeight: "85vh" }}>
                  <Routes>
                     <Route path="/" Component={Login}></Route>
                     <Route path="/register" Component={Register}></Route>
                  </Routes>
               </div>

               <Footer />
            </div>
         </BrowserRouter>
      );
   } else {
      return (
         <BrowserRouter>
            <div style={{ boxShadow: "0 0 0 1px" }}>
               <Header />
               <div style={{ flex: "1", minHeight: "85vh" }}>
                  <Routes>
                     <Route path= "/" Component={Login}></Route>
                     <Route path="/acceuil" Component={MainPage}></Route>
                     <Route path="/register" Component={Register}></Route>
                     <Route path="/addCourse" Component={AddCourse}></Route>
                  </Routes>
               </div>

               <Footer />
            </div>
         </BrowserRouter>
      );
   }
}

export default App;
