import React from "react";

import {
  AlertTriangle,
  BookOpen,
  Bug,
  ClipboardList,
  Code2,
  FileText,
  GitBranch,
  Layers,
  Package,
  TestTube,
} from "lucide-react";

import { Handle, Position } from "@xyflow/react";

const nodeConfig = {
  Project: {
    Icon: Layers,
    bg: "bg-blue-50",
    border: "border-blue-300",
    icon: "text-blue-600",
  },

  Requirement: {
    Icon: ClipboardList,
    bg: "bg-indigo-50",
    border: "border-indigo-300",
    icon: "text-indigo-600",
  },

  Component: {
    Icon: Package,
    bg: "bg-emerald-50",
    border: "border-emerald-300",
    icon: "text-emerald-600",
  },

  "Code File": {
    Icon: Code2,
    bg: "bg-purple-50",
    border: "border-purple-300",
    icon: "text-purple-600",
  },

  "Test Case": {
    Icon: TestTube,
    bg: "bg-cyan-50",
    border: "border-cyan-300",
    icon: "text-cyan-600",
  },

  Defect: {
    Icon: Bug,
    bg: "bg-red-50",
    border: "border-red-300",
    icon: "text-red-600",
  },

  Repository: {
    Icon: GitBranch,
    bg: "bg-slate-50",
    border: "border-slate-300",
    icon: "text-slate-600",
  },

  Document: {
    Icon: FileText,
    bg: "bg-orange-50",
    border: "border-orange-300",
    icon: "text-orange-600",
  },
};

const KnowledgeNode = ({ data }) => {
  const config = nodeConfig[data.type] || nodeConfig.Project;

  const Icon = config.Icon;

  return (
    <div
      className={`
        relative
        w-[170px]
        rounded-xl
        border
        ${config.border}
        ${config.bg}
        p-3
        shadow-sm
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        ${data.selected ? "ring-2 ring-blue-300" : ""}
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-1.5 !w-1.5 !border-0 !bg-slate-400"
      />

      <div className="flex items-start gap-2">
        <div
          className={`
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            bg-white
            ${config.icon}
          `}
        >
          <Icon size={15} />
        </div>

        <div className="min-w-0">
          <span className="text-[9px] font-semibold uppercase text-slate-400">
            {data.type}
          </span>

          <p className="truncate text-[10px] font-bold text-slate-800">
            {data.label}
          </p>

          <p className="truncate text-[9px] text-slate-400">{data.count}</p>
        </div>
      </div>

      {data.risk && (
        <div className="mt-2 flex items-center justify-between">
          <span className="text-[9px] text-slate-400">Risk</span>

          <span
            className={`
              text-[9px]
              font-semibold
              ${
                data.risk === "High"
                  ? "text-red-500"
                  : data.risk === "Medium"
                    ? "text-orange-500"
                    : "text-emerald-600"
              }
            `}
          >
            {data.risk}
          </span>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-1.5 !w-1.5 !border-0 !bg-slate-400"
      />
    </div>
  );
};

export default KnowledgeNode;
