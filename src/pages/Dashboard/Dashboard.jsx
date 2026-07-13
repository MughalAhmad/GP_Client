import { useEffect, useMemo, useState } from "react";
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
import { dashboardService } from "../../services/dashboardService";

export default function Dashboard() {
      const [cards, setCards] = useState([]);
      const [loading, setLoading] = useState(false);
    
      useEffect(() => {
        getCards();
      }, []);
    
      const getCards = async () => {
        try {
          setLoading(true);
    
          const response = await dashboardService.dashboardCards();
    
          if (!response.hasError) {
            setCards(response.data || []);
          } else {
            alert(response.msg?.[0] || "Failed to fetch cards data.");
          }
        } catch (err) {
          console.error(err);
          alert("Failed to fetch cards data.");
        } finally {
          setLoading(false);
        }
      };

      const cardsInfo = {
        domains:{icon: <FaSearch/>, color: 'bg-blue-600'},
        emails:{icon: <FaEnvelope/>, color: 'bg-emerald-600'},
        templates:{icon: <FaFileAlt/>, color: 'bg-orange-600'},
        sends:{icon: <FaPaperPlane/>, color: 'bg-purple-600'},
        }
    return (
      <MainLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>

            <p className="text-slate-500 mt-2">Welcome back 👋</p>
          </div>

          {/* Statistics */}

          <div className="grid gap-6 lg:grid-cols-4">
            {cards.map((card) => (
                <StatCard
                  title={card.title}
                  value={card.count}
                  icon={cardsInfo[card.title.toLowerCase()].icon}
                  color={cardsInfo[card.title.toLowerCase()].color}
                  />
              ))}
          </div>

          {/* Quick Actions */}

          <div>
            <h2 className="mb-5 text-2xl font-bold">Quick Actions</h2>

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