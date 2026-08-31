import React from "react";
import { ArrowRight } from "lucide-react";

const RelationshipPath = ({ insight }) => {
  return (
    <div className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <Entity
        id={insight.sourceEntity.id}
        name={insight.sourceEntity.name}
        type={insight.sourceEntity.type}
      />

      <div className="flex flex-col items-center gap-1">
        <span className="text-[11px] font-semibold uppercase text-indigo-500">
          {insight.relationship}
        </span>

        <ArrowRight size={16} className="text-indigo-400" />
      </div>

      <Entity
        id={insight.targetEntity.id}
        name={insight.targetEntity.name}
        type={insight.targetEntity.type}
      />
    </div>
  );
};

const Entity = ({ id, name, type }) => (
  <div className="w-[125px] rounded-lg border border-slate-200 bg-white p-2.5 shadow-sm">
    <p className="text-[11px] font-semibold uppercase text-slate-400">{type}</p>

    <p className="mt-1 truncate text-[11px] font-bold text-slate-800">{name}</p>

    <p className="mt-1 text-[11px] text-slate-400">{id}</p>
  </div>
);

export default RelationshipPath;
