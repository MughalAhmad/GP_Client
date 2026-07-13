import { useEffect, useMemo, useState } from "react";
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

export default function Templates() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTemplates();
  }, []);

  const getTemplates = async () => {
    try {
      setLoading(true);

      const response = await templateService.list();

      if (!response.hasError) {
        setTemplates(response.data || []);
      } else {
        alert(response.msg?.[0] || "Failed to fetch templates.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to fetch templates.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this template?"
    );

    if (!confirmDelete) return;

    try {
      const response = await templateService.delete(id);

      if (!response.hasError) {
        alert("Template deleted successfully.");
        getTemplates();
      } else {
        alert(response.msg?.[0] || "Delete failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const keyword = search.toLowerCase();

      return (
        template.title?.toLowerCase().includes(keyword) ||
        template.subject?.toLowerCase().includes(keyword)
      );
    });
  }, [templates, search]);

  return (
    <MainLayout>
      <PageHeader
        title="Email Templates"
        subtitle="Manage your email templates."
      />

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Email Templates
            </h2>

            <p className="mt-1 text-slate-500">
              Manage your reusable email templates.
            </p>
          </div>

          <button
            onClick={() => navigate("/template/new")}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 cursor-pointer"
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
              placeholder="Search templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Title
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Subject
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Updated
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-slate-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredTemplates.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-slate-500"
                  >
                    No templates found.
                  </td>
                </tr>
              ) : (
                filteredTemplates.map((template) => (
                  <tr
                    key={template._id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium">
                      {template.title}
                    </td>

                    <td className="px-6 py-4">
                      {template.subject}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          template.status
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {template.status ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {new Date(
                        template.updatedAt || template.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            navigate(`/template/${template._id}`)
                          }
                          className="rounded-lg bg-slate-100 p-2 hover:bg-green-100 hover:text-green-600 cursor-pointer"
                        >
                          <FaEdit />
                        </button>

                        <button
                          onClick={() => handleDelete(template._id)}
                          className="rounded-lg bg-slate-100 p-2 hover:bg-red-100 hover:text-red-600 cursor-pointer"
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