import MainLayout from "../../layouts/MainLayout";
import {
    FaEnvelope,
    FaFileAlt,
    FaPaperPlane,
    FaPlus,
    FaSearch,
} from "react-icons/fa";
import { dashboardService } from "../../services/dashboardService";

export default function Analytics() {

    return (
      <MainLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold">Analytics</h1>
          </div>

        </div>
      </MainLayout>
    );
}