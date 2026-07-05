import { FaBars, FaBell, FaUserCircle } from "react-icons/fa";

export default function Navbar({ setOpen }) {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">

      <div className="flex items-center gap-5">

        <button
          onClick={() => setOpen(true)}
          className="text-2xl lg:hidden"
        >
          <FaBars />
        </button>

        <h2 className="text-2xl font-bold text-slate-800">
          Dashboard
        </h2>

      </div>

      <div className="flex items-center gap-6">

        <button className="text-xl">
          <FaBell />
        </button>

        <div className="flex items-center gap-3">

          <FaUserCircle className="text-4xl text-blue-600" />

          <div>

            <h3 className="font-semibold">
              Ahmad
            </h3>

            <p className="text-sm text-slate-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}