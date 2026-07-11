import {
  FaHome,
  FaSearch,
  FaEnvelope,
  FaFileAlt,
  FaSignOutAlt,
  FaBars,
  FaUsers,
  FaCog,
  FaChartBar,
  FaUserCog,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { authService } from "../../services/authService";

// ✅ Define menus with role-based access
const menus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FaHome,
    roles: ['user', 'admin', 'superAdmin'], // All roles can access
  },
  {
    title: "Find Email",
    path: "/find-email",
    icon: FaSearch,
    roles: ['user', 'admin', 'superAdmin'],
  },
  {
    title: "Templates",
    path: "/templates",
    icon: FaFileAlt,
    roles: ['user', 'admin', 'superAdmin'],
  },
  {
    title: "Email Sender",
    path: "/email-sender",
    icon: FaEnvelope,
    roles: ['user', 'admin', 'superAdmin'],
  },
  // ✅ Admin only menus
  {
    title: "Users",
    path: "/admin/users",
    icon: FaUsers,
    roles: ['admin', 'superAdmin'],
  },
  {
    title: "Analytics",
    path: "/admin/analytics",
    icon: FaChartBar,
    roles: ['admin', 'superAdmin'],
  },
  // ✅ Super Admin only menus
  {
    title: "System Settings",
    path: "/admin/settings",
    icon: FaCog,
    roles: ['superAdmin'],
  },
  {
    title: "Admin Management",
    path: "/admin/admins",
    icon: FaUserCog,
    roles: ['superAdmin'],
  },
];

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');

  // ✅ Get user data from localStorage
  useEffect(() => {
    const getUserData = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUserRole(userData.role || 'user');
            setUserName(userData.fullName || 'User');
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };

    getUserData();
  }, []);

  // ✅ Check if user has access to menu
  const hasAccess = (menuRoles) => {
    if (!menuRoles || menuRoles.length === 0) return true;
    return menuRoles.includes(userRole);
  };

  // ✅ Get role display name
  const getRoleDisplay = (role) => {
    switch(role) {
      case 'superAdmin': return 'Super Administrator';
      case 'admin': return 'Administrator';
      case 'user': return 'User';
      default: return role || 'User';
    }
  };

  // ✅ Get role color
  const getRoleColor = (role) => {
    switch(role) {
      case 'superAdmin': return 'text-purple-400';
      case 'admin': return 'text-blue-400';
      case 'user': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  // ✅ Filter menus based on user role
  const filteredMenus = menus.filter(menu => hasAccess(menu.roles));

  const handleLogout = async () => {
    try {
      await authService.signout();
      navigate('/login');
      setOpen(false);
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login');
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0
          z-50
          h-screen
          w-80
          bg-slate-900
          text-white
          transition-transform
          duration-300
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="border-b border-slate-800 p-8">
          <h1 className="text-3xl font-bold">
            Email Finder
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <p className="text-sm text-slate-400">
              {getRoleDisplay(userRole)} Dashboard
            </p>
            <span className={`text-xs font-semibold ${getRoleColor(userRole)}`}>
              ●
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Welcome, {userName}
          </p>
        </div>

        <div className="mt-6 px-4">
          {filteredMenus.map((menu) => {
            const Icon = menu.icon;
            const active = location.pathname === menu.path;

            return (
              <Link
                key={menu.path}
                to={menu.path}
                onClick={() => setOpen(false)}
                className={`
                  mb-2
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-5
                  py-4
                  transition
                  ${
                    active
                      ? "bg-blue-600"
                      : "hover:bg-slate-800"
                  }
                `}
              >
                <Icon />
                {menu.title}
                {/* ✅ Show role badge for admin menus */}
                {menu.roles && menu.roles.includes('admin') && !menu.roles.includes('user') && (
                  <span className="ml-auto text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                    Admin
                  </span>
                )}
                {menu.roles && menu.roles.includes('superAdmin') && (
                  <span className="ml-auto text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                    Super
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* ✅ User info at bottom */}
        <div className="absolute bottom-0 w-full">
          <div className="border-t border-slate-800 p-4">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-slate-800/50">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold">
                {userName ? userName.substring(0, 2).toUpperCase() : "U"}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{userName}</p>
                <p className={`text-xs ${getRoleColor(userRole)}`}>
                  {getRoleDisplay(userRole)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-5 pt-2">
            <button
              onClick={handleLogout}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-red-600
                py-3
                hover:bg-red-700
                transition
                duration-200
              "
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}