const rows = [
  {
    domain: "google.com",
    email: "info@google.com",
    status: "Found",
  },
  {
    domain: "facebook.com",
    email: "contact@facebook.com",
    status: "Found",
  },
  {
    domain: "amazon.com",
    email: "support@amazon.com",
    status: "Found",
  },
  {
    domain: "tesla.com",
    email: "-",
    status: "Not Found",
  },
];

export default function RecentSearchTable() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white">
      <div className="border-b p-6">
        <h2 className="text-2xl font-bold">Recent Searches</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Website
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                Email
              </th>

              <th className="px-6 py-4 flex justify-center text-left text-sm font-semibold text-slate-700">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-t border-slate-100 hover:bg-slate-50"
              >
                <td className="px-6 py-4">{row.domain}</td>

                <td className="px-6 py-4">{row.email}</td>

                <td className="py-4 flex justify-center">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      row.status === "Found"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
