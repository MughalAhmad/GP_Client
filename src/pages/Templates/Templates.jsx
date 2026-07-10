import { useMemo, useState, useEffect } from "react";
import {
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import PageHeader from "../../components/common/PageHeader";
import { templateService } from "../../services/templateService";

export default function Template() {
  const [search, setSearch] = useState("");
  const [templates, setTemplates] = useState([]);
  const navigate = useNavigate();

  // const templates = [
  //   {
  //     id: 1,
  //     title: "Welcome Email",
  //     subject: "Welcome to Our Company",
  //     status: "Active",
  //     updatedAt: "05 Jul 2026",
  //   },
  //   {
  //     id: 2,
  //     title: "Promotion",
  //     subject: "Special Summer Offer",
  //     status: "Active",
  //     updatedAt: "04 Jul 2026",
  //   },
  //   {
  //     id: 3,
  //     title: "Newsletter",
  //     subject: "Monthly Newsletter",
  //     status: "Inactive",
  //     updatedAt: "03 Jul 2026",
  //   },
  //   {
  //     id: 4,
  //     title: "Follow Up",
  //     subject: "Checking In",
  //     status: "Active",
  //     updatedAt: "02 Jul 2026",
  //   },
  // ];

  const getTemplates = async () =>{
    try {
          // Call login API
          const response = await templateService.list();
    
          if (!response.hasError) {
             setTemplates(response.data)
            // setSuccess("Login successful! )
            
          } else {
            setError(response.message || "error getting while template list");
          }
        } catch (err) {
          console.error("Template list error:", err);
        } finally {
          // setLoading(false);
        }
  }

  // const filteredTemplates = useMemo(() => {
  //   return templates.filter((template) =>
  //     template.title.toLowerCase().includes(search.toLowerCase()) ||
  //     template.subject.toLowerCase().includes(search.toLowerCase())
  //   );
  // }, [search]);

  useEffect(() => {
   getTemplates()
  }, [])
  

  return (
    <MainLayout>
          <PageHeader title="Email Templates" subtitle="Manage your email templates." />
    
    <div className="rounded-3xl bg-white shadow-sm border border-slate-200">

      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Email Templates
          </h2>

          <p className="mt-1 text-slate-500">
            Manage your email templates.
          </p>
        </div>

        <button
            onClick={() => {
                // Navigate to the template creation page
                navigate("/template/new");
            }}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          <FaPlus />
          Create Template
        </button>

      </div>

      {/* Search */}
      <div className="p-6">

        <div className="relative max-w-md">

          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500"
          />

        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Title
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Subject
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Updated
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {templates?.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-slate-500"
                >
                  No templates found.
                </td>
              </tr>
            ) : (
              templates.map((template) => (
                <tr
                  key={template._id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >

                  <td className="px-6 py-4 font-medium text-slate-800">
                    {template.title}
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {template.subject}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        template.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {template.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-slate-600">
                    {template.updatedAt}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        className="rounded-lg bg-slate-100 p-2 transition hover:bg-blue-100 hover:text-blue-600"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={()=>navigate(`/template/${template._id}`)}
                        className="rounded-lg bg-slate-100 p-2 transition hover:bg-emerald-100 hover:text-emerald-600"
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="rounded-lg bg-slate-100 p-2 transition hover:bg-red-100 hover:text-red-600"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
    </MainLayout>
  );
}