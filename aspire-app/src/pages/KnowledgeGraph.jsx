import React, { useState } from "react";

import {
  CalendarDays,
  ChevronDown,
  Database,
  Filter,
  RefreshCw,
  Search,
  Sparkles,
} from "lucide-react";
import {
  knowledgeGraphEdges,
  knowledgeGraphNodes,
} from "../data/knowledgeGraphData";
import KnowledgeGraphCanvas from "../component/USKG/KnowledgeGraphCanvas";
import GraphLegend from "../component/USKG/GraphLegend";

const KnowledgeGraph = () => {
  const [selectedNode, setSelectedNode] = useState(
    knowledgeGraphNodes.find((node) => node?.data?.selected) ||
      knowledgeGraphNodes[0],
  );

  return (
    <div className="w-full space-y-3">
      {/* HEADER */}

      <header className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Unified Software Knowledge Graph
          </h1>

          <p className="mt-1 text-[12px] text-slate-500">
            Explore relationships across requirements, architecture,
            repositories, code, testing and defects.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px] font-medium shadow-sm">
            <Database size={13} />
            Spring PetClinic
            <ChevronDown size={11} />
          </button>

          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px]">
            <CalendarDays size={12} />
            May 12, 2025
          </button>

          <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[11px]">
            <RefreshCw size={12} />
            Refresh
          </button>
        </div>
      </header>

      {/* STATISTICS */}

      <section className="grid grid-cols-2 gap-2 md:grid-cols-4">
        <Stat
          title="Total Nodes"
          value="25,910"
          description="Entities indexed"
        />

        <Stat
          title="Relationship Types"
          value="18"
          description="Semantic relationships"
        />

        <Stat
          title="Connected Components"
          value="4"
          description="Active intelligence components"
        />

        <Stat
          title="Graph Coverage"
          value="72%"
          description="Repository entities mapped"
        />
      </section>

      {/* GRAPH WORKSPACE */}

      <section className="grid min-h-[620px] grid-cols-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm xl:grid-cols-[190px_1fr_300px]">
        {/* FILTER PANEL */}

        <GraphFilters />

        {/* GRAPH */}

        <div className="relative min-h-[620px]">
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-3 py-2 backdrop-blur">
            <div className="flex items-center gap-2">
              <h2 className="text-[12px] font-bold text-slate-800">
                Knowledge Graph
              </h2>

              <span className="rounded bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-600">
                Live
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-md border border-slate-200 px-2 py-1">
                <Search size={10} className="text-slate-400" />

                <input
                  placeholder="Search entities..."
                  className="ml-2 w-32 bg-transparent text-[12px] outline-none"
                />
              </div>

              <button className="rounded-md border border-slate-200 p-1.5">
                <Filter size={11} />
              </button>
            </div>
          </div>

          <div className="h-[620px] pt-[45px]">
            <KnowledgeGraphCanvas
              nodes={knowledgeGraphNodes}
              edges={knowledgeGraphEdges}
              onNodeSelect={setSelectedNode}
            />
          </div>

          <GraphLegend />
        </div>

        {/* DETAILS */}

        <NodeDetails node={selectedNode} />
      </section>

      {/* BOTTOM */}

      <section className="grid grid-cols-1 gap-3 xl:grid-cols-3">
        <ConnectedComponents />

        <KnowledgeInsights />

        <RecentGraphChanges />
      </section>
    </div>
  );
};

const Stat = ({ title, value, description }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
    <p className="text-[11px] text-slate-500">{title}</p>

    <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>

    <p className="mt-1 text-[12px] text-emerald-600">{description}</p>
  </div>
);

const GraphFilters = () => (
  <aside className="border-r border-slate-200 bg-slate-50/50 p-3">
    <h3 className="text-[11px] font-bold text-slate-800">Graph Filters</h3>

    <p className="mt-3 text-[11px] font-semibold uppercase text-slate-400">
      Entity Types
    </p>

    <div className="mt-2 space-y-2">
      {[
        "Requirements",
        "Components",
        "Repositories",
        "Code Files",
        "Test Cases",
        "Defects",
        "Documents",
      ].map((item) => (
        <label
          key={item}
          className="flex items-center gap-2 text-[12px] text-slate-600"
        >
          <input
            type="checkbox"
            defaultChecked
            className="h-3 w-3 rounded border-slate-300"
          />

          {item}
        </label>
      ))}
    </div>

    <p className="mt-5 text-[11px] font-semibold uppercase text-slate-400">
      Relationships
    </p>

    <div className="mt-2 space-y-2">
      {["Depends On", "Implements", "Contains", "Tested By", "Affected By"].map(
        (item) => (
          <label
            key={item}
            className="flex items-center gap-2 text-[12px] text-slate-600"
          >
            <input type="checkbox" defaultChecked />

            {item}
          </label>
        ),
      )}
    </div>
  </aside>
);

const NodeDetails = ({ node }) => {
  if (!node) {
    return (
      <aside className="flex items-center justify-center border-l border-slate-200">
        <p className="text-xs text-slate-400">Select a graph entity</p>
      </aside>
    );
  }

  return (
    <aside className="border-l border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase text-slate-400">
            {node.data.type}
          </span>

          <h2 className="mt-1 text-sm font-bold text-slate-900">
            {node.data.label}
          </h2>

          <p className="mt-1 text-[12px] text-slate-400">{node.data.count}</p>
        </div>

        <button className="text-slate-400">⋮</button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-1 border-b border-slate-200">
        {["Overview", "Relations", "Evidence"].map((tab, index) => (
          <button
            key={tab}
            className={`
              py-2
              text-[12px]
              ${
                index === 0
                  ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                  : "text-slate-500"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <h3 className="text-[11px] font-bold text-slate-800">Entity Summary</h3>

        <div className="mt-3 space-y-3">
          <Detail label="Entity Type" value={node.data.type} />

          <Detail label="Risk Level" value={node.data.risk} />

          <Detail label="Entity ID" value={node.id} />

          <Detail label="Connections" value="14" />
        </div>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        <h3 className="text-[11px] font-bold text-slate-800">
          Graph Relationships
        </h3>

        <div className="mt-3 space-y-2">
          <Relation label="Depends On" value="8 modules" />

          <Relation label="Tested By" value="12 test cases" />

          <Relation label="Affected By" value="2 defects" />

          <Relation label="Documented By" value="3 documents" />
        </div>
      </div>

      <button className="mt-5 w-full rounded-lg bg-blue-600 py-2 text-[11px] font-semibold text-white hover:bg-blue-700">
        Explore Entity
      </button>
    </aside>
  );
};

const Detail = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-[12px] text-slate-500">{label}</span>

    <span className="text-[12px] font-semibold text-slate-700">{value}</span>
  </div>
);

const Relation = ({ label, value }) => (
  <div className="flex items-center justify-between rounded-md bg-slate-50 px-2 py-2">
    <span className="text-[12px] text-slate-600">{label}</span>

    <span className="text-[12px] font-semibold text-blue-600">{value}</span>
  </div>
);

const ConnectedComponents = () => (
  <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
    <h2 className="text-[12px] font-bold text-slate-800">
      Connected Intelligence Components
    </h2>

    <div className="mt-3 space-y-2">
      {[
        ["Requirement Intelligence", "4,821 nodes"],
        ["Repository Intelligence", "12,342 nodes"],
        ["Quality & Testing", "5,621 nodes"],
        ["Traceability Intelligence", "3,126 nodes"],
      ].map(([name, count]) => (
        <div
          key={name}
          className="flex justify-between border-b border-slate-100 py-2"
        >
          <span className="text-[12px] text-slate-600">{name}</span>

          <span className="text-[12px] font-semibold text-blue-600">
            {count}
          </span>
        </div>
      ))}
    </div>
  </section>
);

const KnowledgeInsights = () => (
  <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
    <div className="flex items-center gap-2">
      <Sparkles size={13} className="text-purple-600" />

      <h2 className="text-[12px] font-bold text-slate-800">
        Knowledge Insights
      </h2>
    </div>

    <div className="mt-3 space-y-3">
      <p className="text-[12px] text-slate-600">
        PaymentService connects to 8 modules and 12 test cases.
      </p>

      <p className="text-[12px] text-slate-600">
        Requirement REQ-102 is implemented by PaymentService.
      </p>

      <p className="text-[12px] text-slate-600">
        Two defects are associated with the payment component.
      </p>
    </div>
  </section>
);

const RecentGraphChanges = () => (
  <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
    <h2 className="text-[12px] font-bold text-slate-800">
      Recent Graph Changes
    </h2>

    <div className="mt-3 space-y-3">
      <p className="text-[12px] text-slate-600">
        New dependency discovered
        <span className="ml-2 text-slate-400">10m ago</span>
      </p>

      <p className="text-[12px] text-slate-600">
        Requirement relationship updated
        <span className="ml-2 text-slate-400">1h ago</span>
      </p>

      <p className="text-[12px] text-slate-600">
        New test relationship indexed
        <span className="ml-2 text-slate-400">2h ago</span>
      </p>
    </div>
  </section>
);

export default KnowledgeGraph;
