// routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Auth/Login";
import FindEmail from "../pages/FindEmail/FindEmail";
import Signup from "../pages/Auth/Signup";
import EmailSender from "../pages/EmailSender/EmailSender";
import Templates from "../pages/Templates/Templates";
import Template from "../pages/Templates/Template";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import RoleBasedRoute from "./RoleBasedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes - accessible without login */}
      <Route 
        path="/" 
        element={<Navigate to="/login" replace />} 
      />
      
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      
      <Route 
        path="/signup" 
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        } 
      />

      {/* Protected Routes - require login */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/find-email" 
        element={
          <ProtectedRoute>
            <FindEmail />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/email-sender" 
        element={
          <ProtectedRoute>
            <EmailSender />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/templates" 
        element={
          <ProtectedRoute>
            <Templates />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/template/new" 
        element={
          <ProtectedRoute>
            <Template />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/template/:id" 
        element={
          <ProtectedRoute>
            <Template />
          </ProtectedRoute>
        } 
      />

      {/* Role-based route example - only admin can access */}
      <Route 
        path="/admin" 
        element={
          <RoleBasedRoute allowedRoles={['admin', 'superAdmin']}>
            <div>Admin Panel</div>
          </RoleBasedRoute>
        } 
      />

      {/* 404 Page */}
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}