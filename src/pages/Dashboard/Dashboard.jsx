import MainLayout from "../../layouts/MainLayout";

import StatCard from "../../components/dashboard/StatCard";
import QuickActionCard from "../../components/dashboard/QuickActionCard";
import RecentSearchTable from "../../components/dashboard/RecentSearchTable";

import {
    FaEnvelope,
    FaFileAlt,
    FaPaperPlane,
    FaPlus,
    FaSearch,
} from "react-icons/fa";

export default function Dashboard() {
    return (
        <MainLayout>

            <div className="space-y-8">

                <div>

                    <h1 className="text-4xl font-bold">
                        Dashboard
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Welcome back 👋
                    </p>

                </div>

                {/* Statistics */}

                <div className="grid gap-6 lg:grid-cols-4">

                    <StatCard
                        title="Domains"
                        value="1,240"
                        icon={<FaSearch />}
                        color="bg-blue-600"
                    />

                    <StatCard
                        title="Emails"
                        value="7,392"
                        icon={<FaEnvelope />}
                        color="bg-emerald-600"
                    />

                    <StatCard
                        title="Templates"
                        value="18"
                        icon={<FaFileAlt />}
                        color="bg-orange-500"
                    />

                    <StatCard
                        title="Sent"
                        value="1,822"
                        icon={<FaPaperPlane />}
                        color="bg-purple-600"
                    />

                </div>

                {/* Quick Actions */}

                <div>

                    <h2 className="mb-5 text-2xl font-bold">
                        Quick Actions
                    </h2>

                    <div className="grid gap-6 md:grid-cols-3">

                        <QuickActionCard
                            title="Find Emails"
                            description="Paste domains and start searching."
                            to="/find-email"
                            icon={<FaSearch />}
                            color="bg-blue-600"
                        />

                        <QuickActionCard
                            title="Create Template"
                            description="Design your email template."
                            to="/templates"
                            icon={<FaPlus />}
                            color="bg-emerald-600"
                        />

                        <QuickActionCard
                            title="Send Emails"
                            description="Launch a campaign."
                            to="/email-sender"
                            icon={<FaPaperPlane />}
                            color="bg-purple-600"
                        />

                    </div>

                </div>

                <RecentSearchTable />

            </div>

        </MainLayout>
    );
}