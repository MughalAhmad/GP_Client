import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Auth/Login";
import FindEmail from "../pages/FindEmail/FindEmail";
import Signup from "../pages/Auth/Signup";
import EmailSender from "../pages/EmailSender/EmailSender";
import Templates from "../pages/Templates/Templates";
import Template from "../pages/Templates/Template";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/find-email" element={<FindEmail />} />
      <Route path="/email-sender" element={<EmailSender />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/template/new" element={<Template />} />
      <Route path="/template/:id" element={<Template />} />

      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}
