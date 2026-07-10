import { useState } from "react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar setOpen={setOpen} />

        <main className="flex-1 overflow-y-auto p-3 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}