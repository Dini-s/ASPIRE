import React, { useMemo, useState } from "react";

import {
  AlertTriangle,
  BrainCircuit,
  Network,
  Search,
  ShieldCheck,
} from "lucide-react";
import { crossComponentInsights } from "../data/crossComponentInsightsData";
import InsightCard from "../component/CrossInsight/InsightCard";
import InsightDetails from "../component/CrossInsight/InsightDetails";

const CrossComponentInsights = () => {
  const [activeTab, setActiveTab] = useState("All");

  const [search, setSearch] = useState("");

  const [selectedInsight, setSelectedInsight] = useState(
    crossComponentInsights[0],
  );

  const filteredInsights = useMemo(() => {
    return crossComponentInsights.filter((insight) => {
      const matchesTab =
        activeTab === "All" || insight.category.includes(activeTab);

      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        `${insight.title}
           ${insight.description}
           ${insight.category}
           ${insight.sourceEntity.name}
           ${insight.targetEntity.name}`
          .toLowerCase()
          .includes(query);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  return (
    <div className="w-full space-y-3">
      {/* HEADER */}

      <header className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <BrainCircuit size={23} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Cross-Component Insights
            </h1>

            <p className="mt-1 text-[12px] text-slate-500">
              Discover relationships, impacts and risks across ASPIRE
              intelligence components.
            </p>
          </div>
        </div>

        <button className="flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium text-slate-600 shadow-sm">
          Repository: Spring PetClinic
        </button>
      </header>

      {/* STATS */}

      <div className="grid grid-cols-2 gap-2 xl:grid-cols-4">
        <Stat
          icon={BrainCircuit}
          title="Insights Detected"
          value="24"
          subtitle="↑ 6 since last scan"
        />

        <Stat
          icon={AlertTriangle}
          title="High Impact"
          value="8"
          subtitle="33% of insights"
        />

        <Stat
          icon={Network}
          title="Cross-Component Links"
          value="13"
          subtitle="Across 4 components"
        />

        <Stat
          icon={ShieldCheck}
          title="Evidence Confidence"
          value="91%"
          subtitle="Strong evidence"
        />
      </div>

      {/* TABS */}

      <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200">
        {[
          "All",
          "Requirements",
          "Repository",
          "Quality",
          "Traceability",
          "Architecture",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              whitespace-nowrap
              border-b-2
              px-3
              py-2
              text-[11px]
              font-medium
              transition
              ${
                activeTab === tab
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* FILTER BAR */}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex w-full max-w-sm items-center rounded-lg border border-slate-200 bg-white px-3 py-2">
          <Search size={12} className="text-slate-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cross-component insights..."
            className="ml-2 w-full bg-transparent text-[11px] outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex gap-2">
          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] text-slate-600 outline-none">
            <option>Severity</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] text-slate-600 outline-none">
            <option>Impact</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      {/* MAIN */}

      <section className="grid min-h-[600px] grid-cols-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:grid-cols-[0.95fr_1.05fr]">
        {/* LEFT */}

        <div className="border-r border-slate-200 bg-slate-50/30">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <div>
              <h2 className="text-[12px] font-bold text-slate-800">
                Detected Insights
              </h2>

              <p className="mt-0.5 text-[9px] text-slate-400">
                {filteredInsights.length} insights
              </p>
            </div>

            <select className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[9px] text-slate-500">
              <option>Highest Impact</option>
              <option>Confidence</option>
              <option>Recent</option>
            </select>
          </div>

          <div className="space-y-2 p-3">
            {filteredInsights.map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                selected={selectedInsight?.id === insight.id}
                onClick={setSelectedInsight}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}

        <InsightDetails insight={selectedInsight} />
      </section>
    </div>
  );
};

const Stat = ({ icon: Icon, title, value, subtitle }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-[10px] font-medium text-slate-500">{title}</p>

      <Icon size={13} className="text-indigo-500" />
    </div>

    <p className="mt-2 text-xl font-bold text-slate-900">{value}</p>

    <p className="mt-1 text-[9px] text-emerald-600">{subtitle}</p>
  </div>
);

export default CrossComponentInsights;
