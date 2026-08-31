import { ArrowRight } from "lucide-react";

export const TraceabilityFlow = () => {
  return (
    <section className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1fr_30px_1fr_30px_1fr]">
        <FlowNode
          label="FROM C3"
          title="RVUs + evidence links"
          description="Consumed directly; never re-extracted"
        />

        <ArrowRight size={18} className="hidden text-slate-300 md:block" />

        <FlowNode
          label="OWNED BY C4"
          title="RVU → VERIFIED_TRACE → Code"
          description="Verified links, decay flags and matrix"
        />

        <ArrowRight size={18} className="hidden text-slate-300 md:block" />

        <FlowNode
          label="SHARED OUTPUT"
          title="Traceability intelligence"
          description="Reports, score and explainability"
        />
      </div>
    </section>
  );
};

const FlowNode = ({ label, title, description }) => (
  <div>
    <span className="text-[6px] font-bold uppercase text-indigo-500">
      {label}
    </span>

    <p className="mt-1 text-[12px] font-bold text-slate-800">{title}</p>

    <p className="mt-1 text-[6px] text-slate-400">{description}</p>
  </div>
);
