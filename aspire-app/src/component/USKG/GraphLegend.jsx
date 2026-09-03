const nodeTypes = [
  ["bg-blue-500", "Requirement"],
  ["bg-emerald-500", "Component"],
  ["bg-purple-500", "Code File"],
  ["bg-cyan-500", "Test Case"],
  ["bg-red-500", "Defect"],
  ["bg-orange-500", "Document"],
  ["bg-slate-400", "Repository"],
];

const GraphLegend = () => {
  return (
    <div className="absolute left-3 top-9 z-20 w-[145px] rounded-xl border border-slate-200 bg-white p-3 shadow-sm">

      <h3 className="text-[11px] font-bold text-slate-800">
        Graph Legend
      </h3>

      <p className="mt-3 text-[11px] font-semibold uppercase text-slate-400">
        Entity Types
      </p>

      <div className="mt-2 space-y-2">

        {nodeTypes.map(([color, label]) => (
          <div
            key={label}
            className="flex items-center gap-2"
          >
            <span
              className={`h-2 w-2 rounded-full ${color}`}
            />

            <span className="text-[12px] text-slate-600">
              {label}
            </span>
          </div>
        ))}

      </div>

      <p className="mt-4 text-[11px] font-semibold uppercase text-slate-400">
        Relationships
      </p>

      <div className="mt-2 space-y-2 text-[12px] text-slate-600">
        <p>→ Depends On</p>
        <p>→ Implements</p>
        <p>→ Tested By</p>
        <p>→ Documents</p>
        <p className="text-red-500">→ Affected By</p>
      </div>

    </div>
  );
};

export default GraphLegend;