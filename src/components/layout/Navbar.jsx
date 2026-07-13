import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function Navbar({ setOpen }) {
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    // ✅ Get user data from localStorage
    const getUserData = () => {
      try {
        // Get token to check if user is logged in
        const token = localStorage.getItem('token');
        
        if (token) {
          // Try to get user data from stored user object
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            setFullName(userData.fullName || "User");
            setRole(userData.role || "User");
          } else {
            // If no user data, try to decode from token (if needed)
            setFullName("Ahmad");
            setRole("Administrator");
          }
        } else {
          setFullName("");
          setRole("");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        setFullName("Guest");
        setRole("User");
      }
    };

    getUserData();
  }, []);

  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div className="flex items-center gap-5">
        <button
          onClick={() => setOpen(true)}
          className="text-2xl lg:hidden"
        >
          <FaBars />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <button className="text-xl">
          <FaBell />
        </button>

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold">
              {fullName ? fullName.substring(0, 2).toUpperCase() : "U"}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
          </div>

          <div>
            <h3 className="font-semibold">
              {fullName || "User"}
            </h3>
            <p className="text-sm text-slate-500">
              {role || "User"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}