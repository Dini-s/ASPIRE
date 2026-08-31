import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  Code2,
  Copy,
  FileText,
  Layers3,
  Network,
  Plus,
  Search,
  ShieldAlert,
  Sparkles,
  Upload,
} from "lucide-react";

import {
  requirementStats,
  requirementFindings,
  selectedRequirement,
} from "../../data/requirementData";

const RequirementIntelligence = () => {
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All risks");
  const [selectedId, setSelectedId] = useState(requirementFindings[0]?.id);

  const [revisionAccepted, setRevisionAccepted] = useState(false);

  const currentRequirement = useMemo(() => {
    return (
      requirementFindings.find((item) => item.id === selectedId) ||
      requirementFindings[0]
    );
  }, [selectedId]);

  const filteredFindings = useMemo(() => {
    return requirementFindings.filter((item) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      const matchesRisk =
        riskFilter === "All risks" || item.severity === riskFilter;

      return matchesSearch && matchesRisk;
    });
  }, [search, riskFilter]);

  return (
    <div className="w-full space-y-3 pb-6">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <header className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <FileText size={12} className="text-indigo-600" />

            <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-indigo-600">
              Component 1
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Requirement Intelligence
          </h1>

          <p className="mt-1 max-w-2xl text-[12px] leading-5 text-slate-500">
            Turn raw requirement sources into clearer, risk-aware and
            stakeholder-ready requirement knowledge—without creating RVUs or
            test artifacts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="
              flex items-center gap-2
              rounded-lg
              border border-slate-200
              bg-white
              px-3 py-2
              text-[11px] font-medium
              text-slate-700
              shadow-sm
              transition
              hover:border-indigo-200
              hover:bg-slate-50
            "
          >
            <Upload size={11} />
            Upload source files
          </button>

          <button
            type="button"
            className="
              flex items-center gap-2
              rounded-lg
              bg-indigo-600
              px-3 py-2
              text-[11px] font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-indigo-700
              hover:shadow-md
            "
          >
            <Sparkles size={11} />
            Run analysis
          </button>
        </div>
      </header>

      {/* =====================================================
          SELECTED SOURCE
      ===================================================== */}

      <SourceCard />

      {/* =====================================================
          PIPELINE
      ===================================================== */}

      <RequirementPipeline />

      {/* =====================================================
          COMPONENT BOUNDARY
      ===================================================== */}

      <ComponentBoundary />

      {/* =====================================================
          STATISTICS
      ===================================================== */}

      <section className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        {requirementStats.map((stat) => (
          <RequirementStatCard key={stat.label} stat={stat} />
        ))}
      </section>

      {/* =====================================================
          FINDINGS WORKSPACE
      ===================================================== */}

      <section
        className="
          grid
          overflow-hidden
          rounded-xl
          border border-slate-200
          bg-white
          shadow-sm
          xl:grid-cols-[0.78fr_1fr]
        "
      >
        {/* ===================================================
            LEFT — FINDINGS
        =================================================== */}

        <section className="border-b border-slate-200 xl:border-b-0 xl:border-r">
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[11px] font-bold text-slate-800">
                  Requirement intelligence findings
                </h2>

                <p className="mt-0.5 text-[11px] text-slate-400">
                  Ambiguity, conflict and duplicate findings requiring human
                  review
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-500">
                {filteredFindings.length} open
              </span>
            </div>

            {/* Search */}

            <div className="mt-3 flex gap-2">
              <div className="relative flex-1">
                <Search
                  size={13}
                  className="
                    absolute left-2.5 top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search requirements or findings"
                  className="
                    h-8 w-full
                    rounded-lg
                    border border-slate-200
                    bg-white
                    pl-8 pr-3
                    text-[12px]
                    text-slate-700
                    outline-none
                    placeholder:text-slate-400
                    focus:border-indigo-300
                    focus:ring-2
                    focus:ring-indigo-50
                  "
                />
              </div>

              <select
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="
                  h-8
                  rounded-lg
                  border border-slate-200
                  bg-white
                  px-2
                  text-[12px]
                  font-medium
                  text-slate-600
                  outline-none
                "
              >
                <option>All risks</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          {/* Finding list */}

          <div className="border-t border-slate-100">
            {filteredFindings.length > 0 ? (
              filteredFindings.map((item) => (
                <RequirementFinding
                  key={item.id}
                  item={item}
                  selected={item.id === selectedId}
                  onClick={() => {
                    setSelectedId(item.id);
                    setRevisionAccepted(false);
                  }}
                />
              ))
            ) : (
              <div className="flex h-48 items-center justify-center">
                <div className="text-center">
                  <Search size={22} className="mx-auto text-slate-300" />

                  <p className="mt-2 text-[11px] font-semibold text-slate-500">
                    No findings found
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Try another search or risk filter.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ===================================================
            RIGHT — ANALYSIS
        =================================================== */}

        <section className="p-3">
          <RequirementAnalysis
            requirement={currentRequirement}
            accepted={revisionAccepted}
            onAccept={() => setRevisionAccepted(true)}
          />
        </section>
      </section>
    </div>
  );
};

/* =============================================================
   SOURCE CARD
============================================================= */

const SourceCard = () => {
  return (
    <section
      className="
        flex flex-col gap-3
        rounded-xl
        border border-slate-200
        bg-white
        px-4 py-3
        shadow-sm
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div>
        <p className="text-[8px] font-bold uppercase tracking-wider text-indigo-500">
          Selected requirement sources · 1 file
        </p>

        <div className="mt-1 flex items-center gap-2">
          <div
            className="
              flex h-6 w-6
              items-center justify-center
              rounded-md
              bg-indigo-50
              text-indigo-600
            "
          >
            <FileText size={12} />
          </div>

          <span
            className="
              rounded-md
              border border-slate-200
              bg-slate-50
              px-2 py-1
              text-[11px]
              font-medium
              text-slate-700
            "
          >
            CoreBanking_SRS_v2.pdf
          </span>
        </div>
      </div>

      <div
        className="
          flex items-center gap-2
          rounded-full
          bg-emerald-50
          px-3 py-1.5
          text-[11px]
          font-semibold
          text-emerald-600
        "
      >
        <Check size={9} />
        Analysis complete
      </div>
    </section>
  );
};

/* =============================================================
   PIPELINE
============================================================= */

const RequirementPipeline = () => {
  const steps = [
    {
      number: "01",
      title: "Collect",
      description: "Documents · text · work items",
      icon: FileText,
    },
    {
      number: "02",
      title: "Identify",
      description: "Requirement statements + source",
      icon: Copy,
    },
    {
      number: "03",
      title: "Analyse",
      description: "Ambiguity · duplicate · conflict",
      icon: Sparkles,
    },
    {
      number: "04",
      title: "Improve",
      description: "Revision · risk · task · question",
      icon: Code2,
    },
    {
      number: "05",
      title: "Share",
      description: "Enriched requirement records",
      icon: Network,
    },
  ];

  return (
    <section
      className="
        rounded-xl
        border border-slate-200
        bg-white
        p-3
        shadow-sm
      "
    >
      <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div
              key={step.number}
              className="
                group
                flex items-center gap-2
                rounded-lg
                p-1.5
                transition
                hover:bg-slate-50
              "
            >
              <div className="flex items-center gap-2">
                <span
                  className="
                    flex h-5 w-5
                    items-center justify-center
                    rounded-md
                    bg-indigo-50
                    text-[8px]
                    font-bold
                    text-indigo-600
                  "
                >
                  {step.number}
                </span>

                <Icon size={13} className="text-indigo-500" />
              </div>

              <div className="min-w-0">
                <p className="text-[12px] font-bold text-slate-700">
                  {step.title}
                </p>

                <p className="mt-0.5 truncate text-[8px] text-slate-400">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <ArrowRight
                  size={13}
                  className="
                    ml-auto
                    hidden
                    text-slate-300
                    lg:block
                  "
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

/* =============================================================
   COMPONENT BOUNDARY
============================================================= */

const ComponentBoundary = () => {
  return (
    <section className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <div
        className="
          flex items-center gap-2
          rounded-lg
          border border-emerald-100
          bg-emerald-50/60
          px-3 py-2
        "
      >
        <Check size={12} className="shrink-0 text-emerald-600" />

        <p className="text-[11px] leading-4 text-emerald-700">
          <strong>C1 owns:</strong> requirement identification, semantic
          analysis, risk, clarification, revisions and task drafts.
        </p>
      </div>

      <div
        className="
          flex items-center gap-2
          rounded-lg
          border border-blue-100
          bg-blue-50/60
          px-3 py-2
        "
      >
        <ArrowRight size={12} className="shrink-0 text-blue-600" />

        <p className="text-[11px] leading-4 text-blue-700">
          <strong>C3 owns next:</strong> RVU extraction, QA evidence and test
          adequacy.
        </p>
      </div>
    </section>
  );
};

/* =============================================================
   STAT CARD
============================================================= */

const RequirementStatCard = ({ stat }) => {
  const iconMap = {
    requirements: FileText,
    ambiguity: AlertTriangle,
    conflicts: ShieldAlert,
    duplicates: Layers3,
    tasks: Code2,
  };

  const colorMap = {
    indigo: "bg-indigo-50 text-indigo-600",
    orange: "bg-orange-50 text-orange-500",
    red: "bg-red-50 text-red-500",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-emerald-50 text-emerald-600",
  };

  const Icon = iconMap[stat.icon] || FileText;

  return (
    <div
      className="
        rounded-xl
        border border-slate-200
        bg-white
        p-3
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
      "
    >
      <div className="flex items-center gap-2">
        <div
          className={`
            flex h-8 w-8
            shrink-0
            items-center justify-center
            rounded-lg
            ${colorMap[stat.color]}
          `}
        >
          <Icon size={15} />
        </div>

        <div>
          <p className="text-[11px] text-slate-400">{stat.label}</p>

          <p className="mt-0.5 text-lg font-bold leading-5 text-slate-900">
            {stat.value}
          </p>
        </div>
      </div>

      <p className="mt-2 text-[11px] text-slate-400">{stat.subtitle}</p>
    </div>
  );
};

/* =============================================================
   FINDING ITEM
============================================================= */

const RequirementFinding = ({ item, selected, onClick }) => {
  const severityStyles = {
    High: "bg-red-50 text-red-500 border-red-100",
    Medium: "bg-orange-50 text-orange-500 border-orange-100",
    Low: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  const iconMap = {
    Ambiguity: AlertTriangle,
    Conflict: ShieldAlert,
    Duplicate: Layers3,
  };

  const Icon = iconMap[item.type] || AlertTriangle;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        w-full
        border-t border-slate-100
        p-3
        text-left
        transition-all
        duration-200
        ${
          selected
            ? "border-l-2 border-l-indigo-500 bg-indigo-50/80"
            : "border-l-2 border-l-transparent hover:bg-slate-50"
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div
          className={`
            flex h-7 w-7
            shrink-0
            items-center justify-center
            rounded-lg
            ${
              item.severity === "High"
                ? "bg-red-50 text-red-500"
                : item.severity === "Medium"
                  ? "bg-orange-50 text-orange-500"
                  : "bg-emerald-50 text-emerald-600"
            }
          `}
        >
          <Icon size={14} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-indigo-600">
              {item.id}
            </span>

            <span className="text-[8px] text-slate-400">{item.type}</span>
          </div>

          <h3 className="mt-1.5 text-[12px] font-bold leading-4 text-slate-700">
            {item.title}
          </h3>

          <p className="mt-0.5 text-[11px] leading-4 text-slate-500">
            {item.description}
          </p>

          <p className="mt-1 text-[8px] text-slate-400">{item.source}</p>
        </div>

        <span
          className={`
            shrink-0
            rounded-full
            border
            px-2 py-1
            text-[8px]
            font-bold
            ${severityStyles[item.severity]}
          `}
        >
          {item.severity.toUpperCase()}
        </span>
      </div>
    </button>
  );
};

/* =============================================================
   REQUIREMENT ANALYSIS
============================================================= */

const RequirementAnalysis = ({ requirement, accepted, onAccept }) => {
  if (!requirement) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-xs text-slate-400">Select a requirement finding.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-indigo-600">
              {requirement.id}
            </span>

            <span className="rounded-full bg-red-50 px-2 py-1 text-[8px] font-bold text-red-500">
              HIGH RISK
            </span>
          </div>

          <h2 className="mt-2 text-sm font-bold text-slate-800">
            Requirement analysis
          </h2>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-600">
          <Sparkles size={13} />
          AI confidence 94%
        </div>
      </div>

      {/* ===================================================
          ORIGINAL REQUIREMENT
      =================================================== */}

      <AnalysisCard
        label="Original requirement"
        icon={<FileText size={12} />}
        className="bg-slate-50/70"
      >
        <p className="text-[12px] leading-5 text-slate-700">
          The system should{" "}
          <span className="rounded bg-red-100 px-1 font-bold text-red-600">
            quickly
          </span>{" "}
          notify users about suspicious logins.
        </p>

        <p className="mt-2 text-[8px] text-slate-400">
          CoreBanking_SRS_v2.pdf · Page 12, paragraph 3
        </p>
      </AnalysisCard>

      {/* ===================================================
          AI EXPLANATION
      =================================================== */}

      <AnalysisCard
        label="AI explanation"
        icon={<Sparkles size={13} />}
        className="border-purple-100 bg-purple-50/70"
        labelClass="text-purple-600"
      >
        <h3 className="text-[12px] font-bold text-purple-700">
          Ambiguity detected
        </h3>

        <p className="mt-1 text-[12px] leading-4 text-purple-700">
          No measurable delivery time is defined, so teams can interpret the
          requirement differently.
        </p>
      </AnalysisCard>

      {/* ===================================================
          SUGGESTED REVISION
      =================================================== */}

      <AnalysisCard
        label="Suggested revision"
        icon={<Code2 size={13} />}
        className="border-blue-100 bg-blue-50/70"
        labelClass="text-blue-600"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-[12px] font-semibold leading-5 text-blue-800">
            The system shall notify the user within 2 seconds after detecting a
            suspicious login.
          </p>

          <span
            className="
              shrink-0
              rounded-full
              border border-purple-100
              bg-purple-50
              px-2 py-1
              text-[5px]
              font-bold
              text-purple-600
            "
          >
            AI GENERATED
          </span>
        </div>

        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={onAccept}
            disabled={accepted}
            className={`
              flex items-center gap-1.5
              rounded-lg
              px-3 py-2
              text-[11px]
              font-semibold
              text-white
              transition
              ${
                accepted
                  ? "bg-emerald-500"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }
            `}
          >
            <Check size={10} />

            {accepted ? "Revision accepted" : "Accept revision"}
          </button>

          <button
            type="button"
            className="
              rounded-lg
              border border-slate-200
              bg-white
              px-3 py-2
              text-[11px]
              font-medium
              text-slate-600
              transition
              hover:bg-slate-50
            "
          >
            Edit manually
          </button>
        </div>
      </AnalysisCard>

      {/* ===================================================
          COMPONENT BOUNDARY
      =================================================== */}

      <div
        className="
          flex items-start gap-2
          rounded-lg
          border border-blue-100
          bg-blue-50/50
          px-3 py-2.5
        "
      >
        <Network size={13} className="mt-0.5 shrink-0 text-blue-600" />

        <div>
          <p className="text-[11px] font-bold text-blue-700">
            Component boundary
          </p>

          <p className="mt-1 text-[11px] leading-4 text-blue-700">
            C1 sends this clarified requirement record to Component 3. Component
            3 then creates RVUs and evaluates QA evidence.
          </p>
        </div>
      </div>
    </div>
  );
};

/* =============================================================
   ANALYSIS CARD
============================================================= */

const AnalysisCard = ({
  label,
  icon,
  children,
  className = "",
  labelClass = "text-slate-400",
}) => {
  return (
    <section
      className={`
        rounded-xl
        border border-slate-200
        p-3
        ${className}
      `}
    >
      <div className={`flex items-center gap-2 ${labelClass}`}>
        {icon}

        <span className="text-[8px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>

      <div className="mt-2">{children}</div>
    </section>
  );
};

export default RequirementIntelligence;
