import { useMemo, useState } from "react";
import { FaPaperPlane, FaEnvelope, FaFileAlt, FaUsers } from "react-icons/fa";
import MainLayout from "../../layouts/MainLayout";
import PageHeader from "../../components/common/PageHeader";

export default function EmailSender() {
  const [fromEmail, setFromEmail] = useState("support@company.com");

  const [subject, setSubject] = useState("");

  const [selectedTemplates, setSelectedTemplates] = useState([]);

  const [recipients, setRecipients] = useState("");

  const templates = [
    { id: 1, title: "Welcome Email" },
    { id: 2, title: "Promotion" },
    { id: 3, title: "Newsletter" },
    { id: 4, title: "Follow Up" },
  ];

  const fromEmails = [
    "support@company.com",
    "sales@company.com",
    "info@company.com",
  ];

  const totalEmails = useMemo(() => {
    return recipients
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean).length;
  }, [recipients]);

  const toggleTemplate = (id) => {
    if (selectedTemplates.includes(id)) {
      setSelectedTemplates(selectedTemplates.filter((x) => x !== id));
    } else {
      setSelectedTemplates([...selectedTemplates, id]);
    }
  };

  const handleSend = () => {
    const emails = recipients
      .split("\n")
      .map((e) => e.trim())
      .filter(Boolean);

    const payload = {
      fromEmail,
      subject,
      templates: selectedTemplates,
      recipients: emails,
    };

    console.log(payload);

    alert("Ready to send API request");
  };

  return (
    <MainLayout>
      <PageHeader title="Email Sender" subtitle="Paste one domain per line." />

      <div className="min-h-screen bg-slate-100">

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left */}

            <div className="lg:col-span-2">
              <div className="rounded-3xl bg-white shadow-sm p-8">
                {/* From */}

                <div className="mb-6">
                  <label className="mb-2 block font-semibold text-slate-700">
                    From Email
                  </label>

                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-4 text-slate-400" />

                    <select
                      value={fromEmail}
                      onChange={(e) => setFromEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-blue-500"
                    >
                      {fromEmails.map((email) => (
                        <option key={email}>{email}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject */}

                <div className="mb-6">
                  <label className="mb-2 block font-semibold text-slate-700">
                    Subject
                  </label>

                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Email Subject"
                    className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
                  />
                </div>

                {/* Templates */}

                <div className="mb-6">
                  <label className="mb-3 block font-semibold text-slate-700">
                    Select Templates
                  </label>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        type="button"
                        onClick={() => toggleTemplate(template.id)}
                        className={`rounded-xl border p-4 text-left transition ${
                          selectedTemplates.includes(template.id)
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-300 hover:border-blue-400"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <FaFileAlt />

                          {template.title}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recipients */}

                <div>
                  <label className="mb-2 block font-semibold text-slate-700">
                    Recipients (One Email Per Line)
                  </label>

                  <textarea
                    rows={12}
                    value={recipients}
                    onChange={(e) => setRecipients(e.target.value)}
                    placeholder={`john@gmail.com
mike@gmail.com
sara@gmail.com`}
                    className="w-full rounded-xl border border-slate-300 p-4 outline-none resize-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Right */}

            <div>
              <div className="rounded-3xl bg-white p-8 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold">Summary</h2>

                <div className="space-y-5">
                  <div className="flex justify-between">
                    <span>Recipients</span>

                    <span className="font-bold">{totalEmails}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Templates</span>

                    <span className="font-bold">
                      {selectedTemplates.length}
                    </span>
                  </div>
                </div>

                <div className="my-8 border-t"></div>

                <h3 className="mb-4 text-xl font-bold">Preview</h3>

                <div className="rounded-xl border bg-slate-50 p-4">
                  <p className="font-semibold">Subject</p>

                  <p className="mb-4 text-slate-600">
                    {subject || "No subject"}
                  </p>

                  <p className="font-semibold">Templates</p>

                  <ul className="mt-2 list-disc pl-5">
                    {selectedTemplates.length === 0 ? (
                      <li>No template selected</li>
                    ) : (
                      templates
                        .filter((t) => selectedTemplates.includes(t.id))
                        .map((t) => <li key={t.id}>{t.title}</li>)
                    )}
                  </ul>
                </div>

                <button
                  onClick={handleSend}
                  className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
                >
                  <FaPaperPlane />
                  Send Emails
                </button>
              </div>
            </div>
          </div>
        
      </div>
    </MainLayout>
  );
}
