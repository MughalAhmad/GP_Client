import { useMemo, useState } from "react";
import { FaCopy, FaCheckCircle, FaGlobe, FaDownload } from "react-icons/fa";

import MainLayout from "../../layouts/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import SectionCard from "../../components/common/SectionCard";
import TextArea from "../../components/ui/TextArea";
import Button from "../../components/ui/Button";
import { emailService } from "../../services/emailService";

export default function FindEmail() {
  const [domains, setDomains] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    // Validate input
    if (!domains.trim()) {
      setError("Please enter at least one domain");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Parse domains from textarea (one per line)
      const domainList = domains.split('\n').map(d => d.trim()).filter(Boolean);

      if (domainList.length === 0) {
        setError("Please enter valid domains");
        setLoading(false);
        return;
      }

      // Call the API
      const response = await emailService.findEmails(domainList);

      // Handle different response structures
      if (Array.isArray(response)) {
        setResponseData(response);
      } else if (response.results) {
        setResponseData(response.results);
      } else if (response.data) {
        setResponseData(response.data);
      } else {
        setResponseData(response);
      }

    } catch (err) {
      console.error("API Error:", err);
      // Show user-friendly error message
      if (typeof err === 'string') {
        setError(err);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Failed to find emails. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const totalEmails = useMemo(() => {
    let count = 0;
    if (!responseData) return 0;

    const data = Array.isArray(responseData) ? responseData : responseData.results || [];
    data.map((item)=>{if(item.totalEmails > 0){count ++}});
    // return data.reduce((sum, item) => sum + item.totalEmails, 0);
    return count
  }, [responseData]);

  const successfulWebsites = useMemo(() => {
    if (!responseData) return 0;

    const data = Array.isArray(responseData) ? responseData : responseData.results || [];
    return data.filter((x) => x.success).length;
  }, [responseData]);

  const totalWebsites = useMemo(() => {
    if (!responseData) return 0;

    const data = Array.isArray(responseData) ? responseData : responseData.results || [];
    return data.length;
  }, [responseData]);

  // Get results array
  const results = useMemo(() => {
    if (!responseData) return [];

    return Array.isArray(responseData) ? responseData : responseData.results || [];
  }, [responseData]);

  // Function to download CSV with grouped emails
  const downloadGroupedCSV = () => {
    if (!results || results.length === 0) {
      setError("No data to download");
      return;
    }

    try {
      let csvRows = [];

      // Add headers
      csvRows.push([
        'Website',
        'Total Emails Found',
        'Status',
        'Elapsed Time (s)',
        'Emails (Verified)',
        'Emails (Unverified)',
        'All Emails'
      ].join(','));

      // Add data rows - one row per domain
      results.forEach((website) => {
        // Separate verified and unverified emails
        const verifiedEmails = website.emails?.filter(e => e.verified) || [];
        const unverifiedEmails = website.emails?.filter(e => !e.verified) || [];

        // Create comma-separated lists
        const verifiedList = verifiedEmails.map(e => e.email).join('; ');
        const unverifiedList = unverifiedEmails.map(e => e.email).join('; ');
        const allEmailsList = website.emails?.map(e => e.email).join('; ') || 'No emails found';

        csvRows.push([
          `"${website.website}"`,
          website.totalEmails || 0,
          website.success ? 'Success' : 'Failed',
          website.elapsed || 'N/A',
          `"${verifiedList || 'None'}"`,
          `"${unverifiedList || 'None'}"`,
          `"${allEmailsList}"`
        ].join(','));
      });

      // Create CSV string
      const csvString = csvRows.join('\n');

      // Create blob and download
      const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' }); // Added BOM for Excel compatibility
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', `emails_grouped_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error("CSV Download Error:", err);
      setError("Failed to download CSV file");
    }
  };

  // Alternative: Download with emails in separate columns
  const downloadCSVWithColumns = () => {
    if (!results || results.length === 0) {
      setError("No data to download");
      return;
    }

    try {
      // Find the maximum number of emails for any domain
      const maxEmails = Math.max(...results.map(r => r.emails?.length || 0));

      let csvRows = [];

      // Create dynamic headers
      let headers = ['Website', 'Total Emails', 'Status', 'Elapsed Time (s)'];

      // Add email columns (Email 1, Verified 1, Email 2, Verified 2, etc.)
      for (let i = 1; i <= maxEmails; i++) {
        headers.push(`Email ${i}`);
        headers.push(`Verified ${i}`);
      }

      csvRows.push(headers.join(','));

      // Add data rows
      results.forEach((website) => {
        const emails = website.emails || [];
        const row = [
          `"${website.website}"`,
          website.totalEmails || 0,
          website.success ? 'Success' : 'Failed',
          website.elapsed || 'N/A'
        ];

        // Add each email with its verification status
        for (let i = 0; i < maxEmails; i++) {
          if (i < emails.length) {
            row.push(`"${emails[i].email}"`);
            row.push(emails[i].verified ? 'Yes' : 'No');
          } else {
            row.push(''); // Empty cell
            row.push(''); // Empty cell
          }
        }

        csvRows.push(row.join(','));
      });

      const csvString = csvRows.join('\n');
      const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', `emails_columns_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error("CSV Download Error:", err);
      setError("Failed to download CSV file");
    }
  };

  // Simple CSV with grouped emails
  const downloadSimpleGroupedCSV = () => {
    if (!results || results.length === 0) {
      setError("No data to download");
      return;
    }

    try {
      let csvRows = [];

      // Simple headers
      csvRows.push(['Domain', 'Emails Found', 'All Emails'].join(','));

      // One row per domain with all emails in one cell
      results.forEach((website) => {
        const emailList = website.emails?.map(e => e.email).join('; ') || 'No emails found';
        csvRows.push([
          `"${website.website}"`,
          website.totalEmails || 0,
          `"${emailList}"`
        ].join(','));
      });

      const csvString = csvRows.join('\n');
      const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', `emails_simple_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err) {
      console.error("CSV Download Error:", err);
      setError("Failed to download CSV file");
    }
  };

  return (
    <MainLayout>
      <PageHeader
        title="Find Emails"
        subtitle="Paste one domain per line."
      />

      {/* Search Section */}
      <SectionCard title="Domain List">
        <TextArea
          rows={10}
          value={domains}
          onChange={(e) => setDomains(e.target.value)}
          placeholder={`google.com
facebook.com
amazon.com`}
          className="font-mono"
        />

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-4 text-red-600 border border-red-100">
            <span className="font-semibold">Error: </span>
            {error}
          </div>
        )}

        <div className="mt-6 flex items-center gap-4">
          <Button
            onClick={handleSearch}
            disabled={loading}
            className="min-w-[150px]"
          >
            {loading ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></span>
                Searching...
              </>
            ) : (
              "Find Emails"
            )}
          </Button>

          {loading && (
            <span className="text-sm text-slate-500">
              This may take a few moments...
            </span>
          )}
        </div>
      </SectionCard>

      {/* Summary Cards */}
      {responseData && !loading && (
        <>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-blue-50 p-6 border border-blue-100">
              <p className="text-slate-600 font-medium">Websites</p>
              <h2 className="mt-2 text-4xl font-bold text-blue-700">
                {totalWebsites}
              </h2>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-6 border border-emerald-100">
              <p className="text-slate-600 font-medium">Emails Found</p>
              <h2 className="mt-2 text-4xl font-bold text-emerald-700">
                {totalEmails}
              </h2>
            </div>

            <div className="rounded-2xl bg-orange-50 p-6 border border-orange-100">
              <p className="text-slate-600 font-medium">Successful Websites</p>
              <h2 className="mt-2 text-4xl font-bold text-orange-700">
                {successfulWebsites}
              </h2>
            </div>
          </div>

          {/* Download Button Section */}
          {results.length > 0 && (
            <div className="mt-6 rounded-2xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-blue-100 p-3">
                    <FaDownload className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Export Results</h3>
                    <p className="text-sm text-slate-500">
                      {totalEmails} websites emails found across {totalWebsites} websites
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={downloadSimpleGroupedCSV}
                    variant="primary"
                    className="flex items-center gap-2"
                  >
                    <FaDownload />
                    Simple Grouped
                  </Button>
                  <Button
                    onClick={downloadGroupedCSV}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <FaDownload />
                    Detailed Grouped
                  </Button>
                  <Button
                    onClick={downloadCSVWithColumns}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <FaDownload />
                    Column Format
                  </Button>
                </div>
              </div>

              {/* Info box */}
              <div className="mt-4 rounded-lg bg-blue-50 p-4 border border-blue-100">
                <p className="text-sm text-blue-700">
                  <span className="font-semibold">💡 Tip:</span> Each domain appears once in the CSV with all its emails grouped in a single cell (separated by semicolons).
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {/* Results */}
      {responseData && !loading && results.length > 0 && (
        <div className="mt-8 space-y-6">
          {results.map((website) => (
            <div
              key={website.website}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <FaGlobe className="text-blue-600 text-lg" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {website.website}
                    </h3>
                    <p className="text-sm text-slate-500">
                      {website.elapsed ? `Completed in ${website.elapsed}s` : 'Completed'}
                    </p>
                  </div>
                </div>

                <div className={`rounded-full px-4 py-2 text-sm font-semibold ${website.totalEmails > 0
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-100 text-slate-600'
                  }`}>
                  {website.totalEmails} Emails
                </div>
              </div>

              <div className="mt-6">
                {website.totalEmails === 0 ? (
                  <div className="rounded-xl bg-amber-50 p-4 text-amber-600 border border-amber-100">
                    <span className="font-medium">ℹ️</span> No emails found for this domain
                  </div>
                ) : (
                  <div className="space-y-3">
                    {website.emails.map((item) => (
                      <div
                        key={item.email}
                        className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between hover:bg-white transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-800 break-all">
                            {item.email}
                          </p>
                          {item.verified && (
                            <div className="mt-1.5 flex items-center gap-2 text-sm text-emerald-600">
                              <FaCheckCircle className="text-emerald-500" />
                              <span className="font-medium">Verified</span>
                            </div>
                          )}
                        </div>

                        <Button
                          onClick={() =>
                            navigator.clipboard.writeText(item.email)
                          }
                          variant="outline"
                          className="flex-shrink-0"
                        >
                          <FaCopy className="mr-2" />
                          Copy
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </MainLayout>
  );
}