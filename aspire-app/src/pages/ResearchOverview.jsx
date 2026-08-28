import React from "react";
import { stats } from "../data/dashboardData";
import StatCard from "../component/mainDashboard/StatsCard";
import IntelligenceComponents from "../component/mainDashboard/IntelligenceComponents";
import IntelligenceAgents from "../component/mainDashboard/IntelligenceAgents";
import CrossComponentInsights from "../component/mainDashboard/CrossComponentInsights";
import KnowledgeGraphCard from "../component/mainDashboard/KnowledgeGraphCard";
import IntelligenceAlerts from "../component/mainDashboard/IntelligenceAlerts";
import RecentActivity from "../component/mainDashboard/RecentActivity";

const ResearchOverview = () => {
  return (
    <div className="mx-auto w-full max-w-[1500px]">
      <div className="mb-5">
        <h2 className="text-sm font-semibold text-slate-900">Main Content</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <IntelligenceComponents />

        <IntelligenceAgents />
      </div>

      <div className="mt-5">
        <CrossComponentInsights />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <KnowledgeGraphCard />

        <div className="space-y-5">
          <IntelligenceAlerts />
          <RecentActivity />
        </div>
      </div>

      <footer className="py-8 text-center">
        <p className="text-[10px] text-slate-400">
          © 2026 ASPIRE Framework. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ResearchOverview;
