import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  GitBranch,
  RefreshCw,
  Search,
  Sparkles,
  Check,
  ChevronRight,
  Eye,
  TestTube2,
  Workflow,
  BottleWineIcon,
} from "lucide-react";

import {
  traceabilityStats,
  traceabilityItems,
  traceabilityBottomCards,
} from "../../data/traceabilityData";
import { TraceabilityFlow } from "../../component/Tracebility/TraceabilityFlow";
import { TraceabilityPipeline } from "../../component/Tracebility/TraceabilityPipeline";
import { TraceStatCard } from "../../component/Tracebility/TraceStatCard";
import { TraceDetails } from "../../component/Tracebility/TraceDetails";
import { TraceabilityListItem } from "../../component/Tracebility/TraceabilityListItem";
import { BottomCard } from "../../component/Tracebility/BottomCard";

const TraceabilityIntelligence = () => {
  const [selectedTrace, setSelectedTrace] = useState(traceabilityItems[0]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All links");

  const [confirmed, setConfirmed] = useState(false);

  const filteredItems = useMemo(() => {
    return traceabilityItems.filter((item) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        item.id.toLowerCase().includes(query) ||
        item.rvu.toLowerCase().includes(query) ||
        item.title.toLowerCase().includes(query) ||
        item.code.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All links" || item.status === filter.toUpperCase();

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const handleSelectTrace = (trace) => {
    setSelectedTrace(trace);
    setConfirmed(false);
  };

  return (
    <div className="w-full space-y-3 pb-6">
      <header className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div>
          {/* Component label */}

          <div className="mb-1 flex items-center gap-2">
            <GitBranch size={12} strokeWidth={2} className="text-indigo-600" />

            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-indigo-600">
              Component 4
            </span>
          </div>

          {/* Title */}

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Traceability Intelligence
          </h1>

          {/* Description */}

          <p className="mt-1 max-w-2xl text-[12px] leading-5 text-slate-500">
            Continuously generate, verify and maintain RVU-to-code trace links
            as requirements and repositories evolve.
          </p>
        </div>

        {/* Header actions */}

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="
              flex
              items-center
              gap-2
              rounded-lg
              border
              border-slate-200
              bg-white
              px-3
              py-2
              text-[11px]
              font-medium
              text-slate-700
              shadow-sm
              transition-all
              duration-200
              hover:border-indigo-200
              hover:bg-slate-50
            "
          >
            <RefreshCw size={11} />
            Recompute links
          </button>

          <button
            type="button"
            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-indigo-600
              px-3
              py-2
              text-[11px]
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:bg-indigo-700
              hover:shadow-md
            "
          >
            <Activity size={11} />
            Run decay scan
          </button>
        </div>
      </header>

      <TraceabilityFlow />

      <TraceabilityPipeline />

      <section className="grid grid-cols-2 gap-2 lg:grid-cols-5">
        {traceabilityStats.map((stat) => (
          <TraceStatCard key={stat.label} stat={stat} />
        ))}
      </section>

      <section
        className="
          grid
          min-h-[430px]
          grid-cols-1
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-sm
          xl:grid-cols-[0.78fr_1fr]
        "
      >
        <section className="border-b border-slate-200 xl:border-b-0 xl:border-r">
          {/* Header */}

          <div className="p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-[11px] font-bold text-slate-800">
                  Living traceability links
                </h2>

                <p className="mt-0.5 text-[11px] text-slate-400">
                  Verified, decayed and orphan links from the USKG
                </p>
              </div>

              <span
                className="
                  shrink-0
                  rounded-full
                  bg-slate-100
                  px-2
                  py-1
                  text-[11px]
                  font-medium
                  text-slate-500
                "
              >
                140 monitored
              </span>
            </div>

            {/* Search + filter */}

            <div className="mt-3 flex gap-2">
              <div className="relative flex-1">
                <Search
                  size={13}
                  className="
                    absolute
                    left-2.5
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search RVU, code or trace ID..."
                  className="
                    h-8
                    w-full
                    rounded-lg
                    border
                    border-slate-200
                    bg-white
                    pl-8
                    pr-2
                    text-[12px]
                    text-slate-700
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-indigo-300
                    focus:ring-2
                    focus:ring-indigo-50
                  "
                />
              </div>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="
                  h-8
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-2
                  text-[12px]
                  font-medium
                  text-slate-600
                  outline-none
                  focus:border-indigo-300
                "
              >
                <option>All links</option>
                <option>Verified</option>
                <option>Decayed</option>
                <option>Orphan</option>
              </select>
            </div>
          </div>

          {/* Trace list */}

          <div className="border-t border-slate-100">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <TraceabilityListItem
                  key={item.id}
                  item={item}
                  selected={selectedTrace?.id === item.id}
                  onClick={() => handleSelectTrace(item)}
                />
              ))
            ) : (
              <div className="flex h-48 items-center justify-center">
                <div className="text-center">
                  <Search size={22} className="mx-auto text-slate-300" />

                  <p className="mt-2 text-[11px] font-semibold text-slate-500">
                    No traceability links found
                  </p>

                  <p className="mt-1 text-[11px] text-slate-400">
                    Try another search or filter.
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="p-3">
          <TraceDetails
            trace={selectedTrace}
            confirmed={confirmed}
            onConfirm={() => setConfirmed(true)}
          />
        </section>
      </section>

      <section className="grid grid-cols-1 gap-2 lg:grid-cols-3">
        {traceabilityBottomCards.map((card) => (
          <BottomCard key={card.title} card={card} />
        ))}
      </section>
    </div>
  );
};

const DatabaseIcon = ({ size = 13 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <ellipse cx="12" cy="5" rx="8" ry="3" />

    <path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />

    <path d="M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7" />
  </svg>
);

export default TraceabilityIntelligence;
