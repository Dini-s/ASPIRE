import { Activity, DatabaseIcon, Eye, Link2, Sparkles } from "lucide-react";

export const TraceabilityPipeline = () => {
  const steps = [
    {
      number: "01",
      icon: DatabaseIcon,
      title: "Consume",
      description: "C1 · C2 · C3 graph data",
    },
    {
      number: "02",
      icon: Link2,
      title: "Match",
      description: "Semantic candidate links",
    },
    {
      number: "03",
      icon: Sparkles,
      title: "Verify",
      description: "Llama 3 + confidence",
    },
    {
      number: "04",
      icon: Activity,
      title: "Maintain",
      description: "Drift + decay detection",
    },
    {
      number: "05",
      icon: Eye,
      title: "Explain",
      description: "Matrix · reports · score",
    },
  ];

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div key={step.number} className="flex items-center gap-2">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Icon size={13} />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-[6px] font-bold text-indigo-400">
                    {step.number}
                  </span>

                  <p className="text-[12px] font-bold text-slate-700">
                    {step.title}
                  </p>
                </div>

                <p className="text-[6px] text-slate-400">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
