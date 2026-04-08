import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Doctors from "./pages/doctors/Doctors";
import Departments from "./pages/services/Departments";
import ServicesList from "./pages/services/ServicesList";
import Diagnostics from "./pages/services/Diagnostics";
import PatientCare from "./pages/services/PatientCare";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtectedRoute from "./pages/admin/AdminProtectedRoute";
import { GLOBAL_PATH } from "./config";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from './components/admin/AdminLayout';
import AdminDoctors from './pages/admin/AdminDoctors';
import AdminPaients from './pages/admin/AdminPaients';
import AdminAppointments from './pages/admin/AdminAppointments';
import AdminDepartments from './pages/admin/AdminDepartments';
import AdminSettings from "./pages/admin/AdminSettings";

const routes = (
    <Routes>
        {/* Public Routes */}
        <Route path={`${GLOBAL_PATH}`} element={<Home />} />
        <Route path={`${GLOBAL_PATH}about`} element={<About />} />
        <Route path={`${GLOBAL_PATH}contact`} element={<Contact />} />
        <Route path={`${GLOBAL_PATH}doctors`} element={<Doctors />} />
        <Route path={`${GLOBAL_PATH}services/departments`} element={<Departments />} />
        <Route path={`${GLOBAL_PATH}services/list`} element={<ServicesList />} />
        <Route path={`${GLOBAL_PATH}services/diagnostics`} element={<Diagnostics />} />
        <Route path={`${GLOBAL_PATH}services/patientCare`} element={<PatientCare />} />
        <Route path={`${GLOBAL_PATH}login`} element={<Login />} />
        <Route path={`${GLOBAL_PATH}register`} element={<Register />} />

        {/* Admin Login - No Layout */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Layout - Protected */}
        <Route path="/admin" element={<AdminLayout />}>
            <Route
                index
                element={
                    <AdminProtectedRoute>
                        <AdminDashboard />
                    </AdminProtectedRoute>
                }
            />
            <Route
                path="dashboard"
                element={
                    <AdminProtectedRoute>
                        <AdminDashboard />
                    </AdminProtectedRoute>
                }
            />

            <Route
                path="doctors"
                element={
                    <AdminProtectedRoute>
                        <AdminDoctors />
                    </AdminProtectedRoute>
                }
            />

            <Route
                path="patients"
                element={
                    <AdminProtectedRoute>
                        <AdminPaients />
                    </AdminProtectedRoute>
                }
            />

            <Route
                path="appointments"
                element={
                    <AdminProtectedRoute>
                        <AdminAppointments />
                    </AdminProtectedRoute>
                }
            />

            <Route
                path="departments"
                element={
                    <AdminProtectedRoute>
                        <AdminDepartments />
                    </AdminProtectedRoute>
                }
            />

            <Route
                path="settings"
                element={
                    <AdminProtectedRoute>
                        <AdminSettings />
                    </AdminProtectedRoute>
                }
            />
        </Route>
    </Routes>
);

export default routes;