import { useEffect, useState } from "react";
import { FaSave, FaArrowLeft } from "react-icons/fa";
import MainLayout from "../../layouts/MainLayout";
import { useNavigate } from "react-router-dom";

import PageHeader from "../../components/common/PageHeader";
export default function Template({
  initialData = null,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const isEdit = !!initialData;
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    subject: "",
    body: "",
    status: "Active",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        subject: initialData.subject || "",
        body: initialData.body || "",
        status: initialData.status || "Active",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return alert("Title is required.");
    }

    if (!form.subject.trim()) {
      return alert("Subject is required.");
    }

    if (!form.body.trim()) {
      return alert("Body is required.");
    }

    onSubmit?.(form);
  };

  return (
    <MainLayout>
          <PageHeader title="Email Templates" subtitle="Manage your email templates." />
    
    <form onSubmit={handleSubmit}>
      <div className="mx-auto max-w-7xl rounded-3xl bg-white shadow-sm border border-slate-200">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div>

            <h2 className="text-3xl font-bold text-slate-800">
              {isEdit ? "Edit Template" : "Create Template"}
            </h2>

            <p className="mt-1 text-slate-500">
              {isEdit
                ? "Update your email template."
                : "Create a new reusable email template."}
            </p>

          </div>

        </div>

        {/* Body */}

        <div className="grid gap-8 p-8 lg:grid-cols-2">

          {/* Left */}

          <div className="space-y-6">

            {/* Title */}

            <div>

              <label className="mb-2 block font-semibold text-slate-700">
                Template Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Welcome Email"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>

            {/* Subject */}

            <div>

              <label className="mb-2 block font-semibold text-slate-700">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Welcome to our company"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              />

            </div>

            {/* Status */}

            <div>

              <label className="mb-2 block font-semibold text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

            </div>

            {/* Body */}

            <div>

              <label className="mb-2 block font-semibold text-slate-700">
                Email Body
              </label>

              <textarea
                rows={12}
                name="body"
                value={form.body}
                onChange={handleChange}
                placeholder={`Hello {{name}},

Welcome to our company.

Thank you for joining us.

Best Regards`}
                className="w-full resize-none rounded-xl border border-slate-300 p-4 outline-none transition focus:border-blue-500"
              />

            </div>

          </div>

          {/* Right Preview */}

          <div>

            <div className="sticky top-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">

              <h3 className="mb-5 text-xl font-bold">
                Live Preview
              </h3>

              <div className="rounded-xl bg-white p-5 shadow-sm">

                <p className="text-xs uppercase text-slate-400">
                  SUBJECT
                </p>

                <h2 className="mb-6 mt-2 text-2xl font-bold text-slate-800">
                  {form.subject || "Email Subject"}
                </h2>

                <div className="whitespace-pre-wrap leading-7 text-slate-700">
                  {form.body || "Email preview will appear here..."}
                </div>

              </div>

              <div className="mt-6">

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    form.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {form.status}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-200 p-6">

          <button
            type="button"
            onClick={()=>{
                navigate("/templates"); // Navigate back to the previous page
            }}
            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold hover:bg-slate-100"
          >
            <FaArrowLeft className="mr-2 inline" />
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            <FaSave className="mr-2 inline" />

            {loading
              ? "Saving..."
              : isEdit
              ? "Update Template"
              : "Save Template"}
          </button>

        </div>

      </div>
    </form>

    </MainLayout>
  );
}