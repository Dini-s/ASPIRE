import React from "react";
import { CheckCircle2, ExternalLink, Sparkles } from "lucide-react";

import RelationshipPath from "./RelationshipPath";

const InsightDetails = ({ insight }) => {
  if (!insight) {
    return (
      <aside className="flex items-center justify-center border-l border-slate-200">
        <div className="text-center">
          <Sparkles size={25} className="mx-auto text-slate-300" />

          <p className="mt-2 text-[11px] text-slate-400">
            Select an insight to explore
          </p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="overflow-y-auto border-l border-slate-200 bg-white p-4">
      {/* Header */}

      <div className="flex items-start justify-between">
        <div>
          <span className="rounded-md bg-indigo-50 px-2 py-1 text-[9px] font-semibold text-indigo-600">
            {insight.category}
          </span>

          <h2 className="mt-3 text-sm font-bold text-slate-900">
            {insight.title}
          </h2>
        </div>

        <span className="rounded-md bg-red-50 px-2 py-1 text-[9px] font-semibold text-red-600">
          {insight.severity}
        </span>
      </div>

      {/* Description */}

      <p className="mt-3 text-[11px] leading-4 text-slate-500">
        {insight.description}
      </p>

      {/* Relationship */}

      <div className="mt-5">
        <SectionTitle>Cross-Component Relationship</SectionTitle>

        <div className="mt-2">
          <RelationshipPath insight={insight} />
        </div>
      </div>

      {/* Evidence */}

      <div className="mt-5">
        <SectionTitle>Evidence</SectionTitle>

        <div className="mt-2 space-y-2">
          {insight.evidence.map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2"
            >
              <CheckCircle2 size={11} className="text-emerald-500" />

              <span className="text-[10px] text-slate-600">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Impact */}

      <div className="mt-5">
        <SectionTitle>Potential Impact</SectionTitle>

        <div className="mt-2 space-y-2">
          {insight.impact.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-slate-100 px-3 py-2"
            >
              <p className="text-[10px] font-medium text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation */}

      <div className="mt-5 rounded-xl border border-purple-100 bg-purple-50/50 p-3">
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-purple-600" />

          <span className="text-[10px] font-bold text-purple-700">
            AI Recommendation
          </span>
        </div>

        <p className="mt-2 text-[10px] leading-4 text-purple-700">
          {insight.recommendation}
        </p>
      </div>

      {/* Actions */}

      <div className="mt-5 flex gap-2">
        <button className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-blue-600 py-2 text-[10px] font-semibold text-white hover:bg-blue-700">
          View in Knowledge Graph
          <ExternalLink size={10} />
        </button>
      </div>
    </aside>
  );
};

const SectionTitle = ({ children }) => (
  <h3 className="text-[11px] font-bold text-slate-800">{children}</h3>
);

export default InsightDetails;
