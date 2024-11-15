// src/routes/index.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Courses from '../pages/Courses';

import CourseDetails from '../pages/CourseDetails'
import CoursePlayer from '../pages/CoursePlayer';
import Checkout from '../pages/Checkout';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/home" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                {/* <Route path="/course/:courseId" element={<CourseDetails />} /> */}
                <Route path="/course/:id" element={<CourseDetails />} />
                <Route path="/coursePlayer" element={<CoursePlayer />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="/sobre" element={<Checkout />} /> */}
                {/* 
                <Route path="/sucesso" component={Sucesso} />
                <Route path="/fracasso" component={Fracasso} />
                <Route path="/pendente" component={Pendente} /> */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;
