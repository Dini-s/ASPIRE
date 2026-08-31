import React, { useState } from "react";

import {
  CalendarDays,
  ChevronDown,
  Database,
  Play,
  RefreshCw,
} from "lucide-react";

import {
  architectureStats,
  selectedModule as defaultModule,
} from "../../data/architectureData";
import ContentHeader from "../../component/common/ContentHeader";
import ArchitectureStatCard from "../../component/RepositoryIntellihent/architecture/ArchitectureStatCard";
import ArchitectureToolbar from "../../component/RepositoryIntellihent/architecture/ArchitectureToolbar";
import ArchitectureLegend from "../../component/RepositoryIntellihent/architecture/ArchitectureLegend";
import ArchitectureGraph from "../../component/RepositoryIntellihent/architecture/ArchitectureGraph";
import SelectedModulePanel from "../../component/RepositoryIntellihent/architecture/SelectedModulePanel";
import ArchitectureDistribution from "../../component/RepositoryIntellihent/architecture/ArchitectureDistribution";
import LayerSummary from "../../component/RepositoryIntellihent/architecture/LayerSummary";
import ViolationOverview from "../../component/RepositoryIntellihent/architecture/ViolationOverview";
import RecentArchitectureChanges from "../../component/RepositoryIntellihent/architecture/RecentArchitectureChanges";

const ArchitectureVisualization = () => {
  const [selectedModule, setSelectedModule] = useState(defaultModule);

  return (
    <div className="mx-auto w-full max-w-[1600px]">
      <header className="mb-4">
        <ContentHeader
          title={"Architecture Visualization"}
          subtitle={
            "Visualize system architecture, dependencies, layers, and violations"
          }
        />
      </header>

      <section
        className="
          grid grid-cols-1
          gap-2
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-6
        "
      >
        {architectureStats.map((stat) => (
          <ArchitectureStatCard key={stat.title} {...stat} />
        ))}
      </section>
      <section
        className="
          mt-2
          grid grid-cols-1
          gap-2
          xl:grid-cols-[minmax(0,1.9fr)_minmax(330px,0.8fr)]
        "
      >
        {/* Graph */}
        <div
          className="
            relative
            overflow-hidden
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >
          <ArchitectureToolbar />

          <ArchitectureLegend />

          <ArchitectureGraph onSelectModule={setSelectedModule} />
        </div>

        {/* Selected Module */}
        <SelectedModulePanel module={selectedModule} />
      </section>
      <section
        className="
          mt-2
          grid grid-cols-1
          gap-2
          lg:grid-cols-2
          xl:grid-cols-[1fr_1fr_1fr_1.25fr]
        "
      >
        <ArchitectureDistribution />

        <LayerSummary />

        <ViolationOverview />

        <RecentArchitectureChanges />
      </section>
    </div>
  );
};

export default ArchitectureVisualization;
