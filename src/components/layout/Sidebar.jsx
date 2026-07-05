import {
  FaHome,
  FaSearch,
  FaEnvelope,
  FaFileAlt,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

const menus = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    title: "Find Email",
    path: "/find-email",
    icon: FaSearch,
  },
  {
    title: "Templates",
    path: "/templates",
    icon: FaFileAlt,
  },
  {
    title: "Email Sender",
    path: "/email-sender",
    icon: FaEnvelope,
  },
];

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
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
          w-72
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

          <p className="mt-2 text-sm text-slate-400">
            Admin Dashboard
          </p>

        </div>

        <div className="mt-6 px-4">

          {menus.map((menu) => {

            const Icon = menu.icon;

            const active = location.pathname === menu.path;

            return (
              <Link
                key={menu.path}
                to={menu.path}
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

              </Link>
            );
          })}

        </div>

        <div className="absolute bottom-0 w-full p-5">

          <button
          onClick={()=>{
            navigate('/login')
          }}
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
            "
          >
            <FaSignOutAlt />

            Logout

          </button>

        </div>

      </aside>
    </>
  );
}