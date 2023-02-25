import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlannerDetails from "./pages/PlannerDetails";
import Destination from "./pages/Destination";

import CreatePlanner from "./pages/CreatePlanner";
import { PlannerContext } from "./PlannerContext";
import { useState, createContext, useContext } from "react";
import { LoginStatus,countStatus } from "./PlannerContext";



//import DestinationDetails from "./pages/DestinationDetails"




function App(){
  const [count,setCount]=useState(0)
  const [plannerData,setPlannerData]=useState()
  const [isLoggedIn,setLoggedIn]=useState(false);


  return (
    <>
    <div className="App">
    <LoginStatus.Provider value={[isLoggedIn,setLoggedIn]}>

      <Header />
      <countStatus.Provider value={[count,setCount]}>
      <PlannerContext.Provider value={[plannerData,setPlannerData]}>
      
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/planner/:_id" element={<PlannerDetails/>} />
          <Route path="/destinations" element={<Destination />} />
          {/* <Route path="/destination/:slug" element={<DestinationDetails/>} /> */}
          <Route path="/planner/create" element={<CreatePlanner/>} />
      </Routes>
      
      </PlannerContext.Provider> 
      </countStatus.Provider>
    </LoginStatus.Provider>
      <Footer />
    </div>
    
    </>
  );
}

export default App;
