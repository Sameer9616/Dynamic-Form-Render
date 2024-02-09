import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from './component/LandingPage';
import DynamicComponent from "./component/DyanmicComponent";
function RouteList() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/view/:viewname" element={<LandingPage/>} /> 
          <Route path="/view/:viewname/:id" element={<LandingPage/>} />
        </Routes>
      </BrowserRouter>
    );
  }
  
export default RouteList;
