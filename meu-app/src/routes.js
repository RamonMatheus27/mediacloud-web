import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from './auth/login/Login';
import Register from './auth/register/Register';

const Routes1 = () => {
   return(
    <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
    </Routes>
   )
}

export default Routes1;