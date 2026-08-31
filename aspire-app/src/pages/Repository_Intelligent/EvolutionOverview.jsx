import React from "react";
import {
  CalendarDays,
  ChevronDown,
  Database,
  RefreshCw,
  Play,
} from "lucide-react";
import EvolutionTabs from "../../component/RepositoryIntellihent/Evalution/EvolutionTabs";
import { evolutionStats } from "../../data/evolutionData";
import EvolutionStatCard from "../../component/RepositoryIntellihent/Evalution/EvolutionStatCard";
import EvolutionTrend from "../../component/RepositoryIntellihent/Evalution/EvolutionTrend";
import SoftwareMetricsSummary from "../../component/RepositoryIntellihent/Evalution/SoftwareMetricsSummary";
import HighRiskModules from "../../component/RepositoryIntellihent/Evalution/HighRiskModules";
import CodeChurnChart from "../../component/RepositoryIntellihent/Evalution/CodeChurnChart";
import TopMetricsByModule from "../../component/RepositoryIntellihent/Evalution/TopMetricsByModule";
import DependencyOverview from "../../component/RepositoryIntellihent/Evalution/DependencyOverview";
import AnalysisHistory from "../../component/RepositoryIntellihent/Evalution/AnalysisHistory";
import RepositoryHeader from "../../component/RepositoryIntellihent/repository/RepositoryHeader";
import ContentHeader from "../../component/common/ContentHeader";
import ArchitectureIssuesImpact from "../../component/RepositoryIntellihent/Evalution/ArchitectureIssuesImpact";

const EvolutionOverview = () => {
  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <header className="mb-1">
        <ContentHeader
          title={"Evolution & Metrics"}
          subtitle={"All the metrics and evalution analyze"}
        />
      </header>

      <section className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {evolutionStats.map((stat) => (
          <EvolutionStatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="mt-2 grid grid-cols-1 gap-2 xl:grid-cols-[1fr_1.2fr]">
        <EvolutionTrend />

        <SoftwareMetricsSummary />
      </section>

      <section className="mt-2 grid grid-cols-1 gap-2 xl:grid-cols-[1.15fr_0.72fr_1.0fr]">
        <HighRiskModules />

        <CodeChurnChart />

        <TopMetricsByModule />
      </section>

      <section className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-[0.9fr_0.9fr_2.3fr]">
        <ArchitectureIssuesImpact />

        <DependencyOverview />

        <AnalysisHistory />
      </section>
    </div>
  );
};

export default EvolutionOverview;
