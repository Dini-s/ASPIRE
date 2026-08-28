import AIInsightSummary from "../../component/repository/AIInsightSummary";
import ArchitectureIssues from "../../component/repository/ArchitectureIssues";
import ArchitectureRiskTrend from "../../component/repository/ArchitectureRiskTrend";
import DataSummary from "../../component/repository/DataSummary";
import HighRiskModules from "../../component/repository/HighRiskModules";
import HRIMModelSummary from "../../component/repository/HRIMModelSummary";
import RecentCodeChanges from "../../component/repository/RecentCodeChanges";
import RepositoryEvolution from "../../component/repository/RepositoryEvolution";
import RepositoryHeader from "../../component/repository/RepositoryHeader";
import RepositoryStatCard from "../../component/repository/RepositoryStatCard";
import { repositoryStats } from "../../data/repositoryData";

const RepositoryIntelligence = () => {
  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <RepositoryHeader />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {repositoryStats.map((stat) => (
          <RepositoryStatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[1.25fr_1fr_1fr]">
        <ArchitectureRiskTrend />

        <HighRiskModules />

        <AIInsightSummary />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[1.1fr_0.85fr_1.1fr]">
        <RepositoryEvolution />

        <ArchitectureIssues />

        <RecentCodeChanges />
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 xl:grid-cols-[1fr_1.2fr]">
        <HRIMModelSummary />

        <DataSummary />
      </div>
    </div>
  );
};

export default RepositoryIntelligence;
