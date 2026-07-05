import Card from "../components/ui/Card";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>

        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-3xl"></div>

        <div className="absolute bottom-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-3xl"></div>

      </div>

      {/* Main */}

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">

        <div className="grid w-full max-w-7xl overflow-hidden rounded-[32px] bg-white shadow-2xl lg:grid-cols-2">

          {/* Left */}

          <div className="hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-16 text-white lg:flex lg:flex-col lg:justify-between">

            <div>

              <h1 className="text-5xl font-extrabold tracking-tight">
                Email Finder
              </h1>

              <p className="mt-6 text-lg text-blue-100 leading-8">
                Discover business emails, manage templates,
                and launch email campaigns from one beautiful dashboard.
              </p>

            </div>

            <div className="space-y-6">

              <Feature text="Find verified emails instantly" />

              <Feature text="Create unlimited templates" />

              <Feature text="Bulk email sender" />

              <Feature text="Analytics dashboard" />

            </div>

          </div>

          {/* Right */}

          <div className="flex items-center justify-center md:p-10">

            <Card className="w-full max-w-md shadow-none border-none">

              <div className="mb-10">

                <h2 className="text-3xl md:text-4xl font-bold text-slate-800 text-center">
                  {title}
                </h2>

                <p className="mt-3 text-slate-500 text-center">
                  {subtitle}
                </p>

              </div>

              {children}

            </Card>

          </div>

        </div>

      </div>

    </div>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg">
        ✓
      </div>

      <span className="text-lg">
        {text}
      </span>

    </div>
  );
}