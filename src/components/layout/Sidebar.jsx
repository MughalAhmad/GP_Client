// import {
//   FaHome,
//   FaSearch,
//   FaEnvelope,
//   FaFileAlt,
//   FaSignOutAlt,
//   FaBars,
//   FaUsers,
//   FaCog,
//   FaChartBar,
//   FaUserCog,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { Link, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { authService } from "../../services/authService";

// // ✅ Define menus with role-based access
// const menus = [
//   {
//     title: "Dashboard",
//     path: "/dashboard",
//     icon: FaHome,
//     roles: ['user', 'admin', 'superAdmin'], // All roles can access
//   },
//   {
//     title: "Find Email",
//     path: "/find-email",
//     icon: FaSearch,
//     roles: ['user', 'admin', 'superAdmin'],
//   },
//   {
//     title: "Templates",
//     path: "/templates",
//     icon: FaFileAlt,
//     roles: ['user', 'admin', 'superAdmin'],
//   },
//   {
//     title: "Email Sender",
//     path: "/email-sender",
//     icon: FaEnvelope,
//     roles: ['user', 'admin', 'superAdmin'],
//   },
//   // ✅ Admin only menus
//   {
//     title: "Users",
//     path: "/admin/users",
//     icon: FaUsers,
//     roles: ['admin', 'superAdmin'],
//   },
//   {
//     title: "Analytics",
//     path: "/admin/analytics",
//     icon: FaChartBar,
//     roles: ['admin', 'superAdmin'],
//   },
//   // ✅ Super Admin only menus
//   {
//     title: "System Settings",
//     path: "/admin/settings",
//     icon: FaCog,
//     roles: ['superAdmin'],
//   },
//   {
//     title: "Admin Management",
//     path: "/admin/admins",
//     icon: FaUserCog,
//     roles: ['superAdmin'],
//   },
// ];

// export default function Sidebar({ open, setOpen }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [userRole, setUserRole] = useState('');
//   const [userName, setUserName] = useState('');

//   // ✅ Get user data from localStorage
//   useEffect(() => {
//     const getUserData = () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (token) {
//           const storedUser = localStorage.getItem('user');
//           if (storedUser) {
//             const userData = JSON.parse(storedUser);
//             setUserRole(userData.role || 'user');
//             setUserName(userData.fullName || 'User');
//           }
//         }
//       } catch (error) {
//         console.error('Error loading user data:', error);
//       }
//     };

//     getUserData();
//   }, []);

//   // ✅ Check if user has access to menu
//   const hasAccess = (menuRoles) => {
//     if (!menuRoles || menuRoles.length === 0) return true;
//     return menuRoles.includes(userRole);
//   };

//   // ✅ Get role display name
//   const getRoleDisplay = (role) => {
//     switch(role) {
//       case 'superAdmin': return 'Super Administrator';
//       case 'admin': return 'Administrator';
//       case 'user': return 'User';
//       default: return role || 'User';
//     }
//   };

//   // ✅ Get role color
//   const getRoleColor = (role) => {
//     switch(role) {
//       case 'superAdmin': return 'text-purple-400';
//       case 'admin': return 'text-blue-400';
//       case 'user': return 'text-green-400';
//       default: return 'text-slate-400';
//     }
//   };

//   // ✅ Filter menus based on user role
//   const filteredMenus = menus.filter(menu => hasAccess(menu.roles));

//   const handleLogout = async () => {
//     try {
//       await authService.signout();
//       navigate('/login');
//       setOpen(false);
//     } catch (error) {
//       console.error('Logout error:', error);
//       navigate('/login');
//     }
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {open && (
//         <div
//           className="fixed inset-0 z-40 bg-black/40 lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed lg:static
//           top-0 left-0
//           z-50
//           h-screen
//           w-80
//           bg-slate-900
//           text-white
//           transition-transform
//           duration-300
//           ${
//             open
//               ? "translate-x-0"
//               : "-translate-x-full lg:translate-x-0"
//           }
//         `}
//       >
//         <div className="border-b border-slate-800 p-8">
//           <h1 className="text-3xl font-bold">
//             Email Finder
//           </h1>
//           <div className="mt-2 flex items-center gap-2">
//             <p className="text-sm text-slate-400">
//               {getRoleDisplay(userRole)} Dashboard
//             </p>
//             <span className={`text-xs font-semibold ${getRoleColor(userRole)}`}>
//               ●
//             </span>
//           </div>
//           <p className="mt-1 text-xs text-slate-500">
//             Welcome, {userName}
//           </p>
//         </div>

//         <div className="mt-6 px-4">
//           {filteredMenus.map((menu) => {
//             const Icon = menu.icon;
//             const active = location.pathname === menu.path;

//             return (
//               <Link
//                 key={menu.path}
//                 to={menu.path}
//                 onClick={() => setOpen(false)}
//                 className={`
//                   mb-2
//                   flex
//                   items-center
//                   gap-4
//                   rounded-xl
//                   px-5
//                   py-4
//                   transition
//                   ${
//                     active
//                       ? "bg-blue-600"
//                       : "hover:bg-slate-800"
//                   }
//                 `}
//               >
//                 <Icon />
//                 {menu.title}
//                 {/* ✅ Show role badge for admin menus */}
//                 {menu.roles && menu.roles.includes('admin') && !menu.roles.includes('user') && (
//                   <span className="ml-auto text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
//                     Admin
//                   </span>
//                 )}
//                 {menu.roles && menu.roles.includes('superAdmin') && (
//                   <span className="ml-auto text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
//                     Super
//                   </span>
//                 )}
//               </Link>
//             );
//           })}
//         </div>

//         {/* ✅ User info at bottom */}
//         <div className="absolute bottom-0 w-full">
//           <div className="border-t border-slate-800 p-4">
//             <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-slate-800/50">
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold">
//                 {userName ? userName.substring(0, 2).toUpperCase() : "U"}
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-semibold">{userName}</p>
//                 <p className={`text-xs ${getRoleColor(userRole)}`}>
//                   {getRoleDisplay(userRole)}
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="p-5 pt-2">
//             <button
//               onClick={handleLogout}
//               className="
//                 flex
//                 w-full
//                 items-center
//                 justify-center
//                 gap-3
//                 rounded-xl
//                 bg-red-600
//                 py-3
//                 hover:bg-red-700
//                 transition
//                 duration-200
//               "
//             >
//               <FaSignOutAlt />
//               Logout
//             </button>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }

import {
  FaHome,
  FaSearch,
  FaEnvelope,
  FaFileAlt,
  FaSignOutAlt,
  FaUsers,
  FaCog,
  FaChartBar,
  FaUserCog,
  FaBell,
  FaChevronDown,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { authService } from "../../services/authService";

const menus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FaHome,
    roles: ['user', 'admin', 'superAdmin'],
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
  {
    title: "System Settings",
    path: "/admin/settings",
    icon: FaCog,
    roles: ['superAdmin'],
  },
  {
    title: "Admin Management",
    path: "/admin",
    icon: FaUserCog,
    roles: ['superAdmin'],
  },
];

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  // ✅ Ref for dropdown menu
  const userMenuRef = useRef(null);

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

  // ✅ Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const hasAccess = (menuRoles) => {
    if (!menuRoles || menuRoles.length === 0) return true;
    return menuRoles.includes(userRole);
  };

  const getRoleDisplay = (role) => {
    switch(role) {
      case 'superAdmin': return 'Super Admin';
      case 'admin': return 'Admin';
      case 'user': return 'User';
      default: return role || 'User';
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'superAdmin': return 'bg-purple-500';
      case 'admin': return 'bg-blue-500';
      case 'user': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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

  // Group menus by category
  const mainMenus = filteredMenus.filter(menu => 
    ['Dashboard', 'Find Email', 'Templates', 'Email Sender'].includes(menu.title)
  );
  const adminMenus = filteredMenus.filter(menu => 
    ['Users', 'Analytics', 'System Settings', 'Admin Management'].includes(menu.title)
  );

  // ✅ Toggle dropdown
  const toggleUserMenu = (e) => {
    e.stopPropagation();
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // ✅ Close dropdown when navigating
  const handleNavigation = (path) => {
    setIsUserMenuOpen(false);
    setOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
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
          w-[280px]
          bg-gradient-to-b from-slate-900 to-slate-800
          text-white
          transition-all
          duration-300
          flex flex-col
          shadow-2xl
          ${
            open
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* Brand Header */}
        <div className="flex-shrink-0 px-6 py-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">EmailFinder</h1>
              <p className="text-[10px] uppercase tracking-wider text-slate-400">
                {getRoleDisplay(userRole)}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Main Menu */}
          {mainMenus.length > 0 && (
            <div>
              <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Main
              </p>
              <div className="mt-2 space-y-1">
                {mainMenus.map((menu) => {
                  const Icon = menu.icon;
                  const active = location.pathname === menu.path;
                  return (
                    <Link
                      key={menu.path}
                      to={menu.path}
                      onClick={() => setOpen(false)}
                      className={`
                        group flex items-center gap-3 px-3 py-2.5 rounded-lg
                        transition-all duration-200
                        ${active 
                          ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10' 
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }
                      `}
                    >
                      <Icon className={`h-5 w-5 ${active ? 'text-blue-400' : 'text-slate-400 group-hover:text-white'}`} />
                      <span className="text-sm font-medium">{menu.title}</span>
                      {active && (
                        <div className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Admin Menu */}
          {adminMenus.length > 0 && (
            <div>
              <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Administration
              </p>
              <div className="mt-2 space-y-1">
                {adminMenus.map((menu) => {
                  const Icon = menu.icon;
                  const active = location.pathname === menu.path;
                  const isSuperAdmin = menu.roles?.includes('superAdmin');
                  
                  return (
                    <Link
                      key={menu.path}
                      to={menu.path}
                      onClick={() => setOpen(false)}
                      className={`
                        group flex items-center gap-3 px-3 py-2.5 rounded-lg
                        transition-all duration-200
                        ${active 
                          ? isSuperAdmin 
                            ? 'bg-purple-500/20 text-purple-400 shadow-lg shadow-purple-500/10'
                            : 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }
                      `}
                    >
                      <Icon className={`h-5 w-5 ${active ? (isSuperAdmin ? 'text-purple-400' : 'text-blue-400') : 'text-slate-400 group-hover:text-white'}`} />
                      <span className="text-sm font-medium">{menu.title}</span>
                      {isSuperAdmin && (
                        <span className="ml-auto text-[8px] font-bold uppercase bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">
                          Super
                        </span>
                      )}
                      {active && (
                        <div className={`ml-auto h-1.5 w-1.5 rounded-full ${isSuperAdmin ? 'bg-purple-400' : 'bg-blue-400'}`}></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        {/* ✅ User Footer with Fixed Dropdown */}
        <div className="flex-shrink-0 border-t border-white/5 px-4 py-4">
          <div className="relative" ref={userMenuRef}>
            {/* User Profile Button */}
            <button
              onClick={toggleUserMenu}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-all duration-200 group"
            >
              <div className={`
                h-9 w-9 rounded-lg flex items-center justify-center text-sm font-bold
                ${getRoleColor(userRole)}
                shadow-lg
              `}>
                {getInitials(userName)}
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium truncate">{userName}</p>
                <p className="text-xs text-slate-400 truncate">{getRoleDisplay(userRole)}</p>
              </div>
              <FaChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* ✅ User Dropdown Menu - Fixed positioning */}
            {isUserMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-slate-800 rounded-lg shadow-xl border border-white/10 py-1 animate-slideUp">
                <button
                  onClick={() => handleNavigation('/profile')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <FaUserCircle className="h-4 w-4" />
                  Profile
                </button>
                <button
                  onClick={() => handleNavigation('/notifications')}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <FaBell className="h-4 w-4" />
                  Notifications
                  <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">3</span>
                </button>
                <div className="border-t border-white/5 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
                >
                  <FaSignOutAlt className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Direct Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-2 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all duration-200 text-sm font-medium"
          >
            <FaSignOutAlt className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}