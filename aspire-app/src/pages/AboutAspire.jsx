import React from "react";
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  GitBranch,
  Layers3,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TestTube2,
  Workflow,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const AboutAspire = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-4 pb-8">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-md bg-indigo-50 px-2 py-1 text-[12px] font-semibold uppercase tracking-wide text-indigo-600">
              Framework
            </span>

            <span className="text-[12px] text-slate-400">v1.0</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            About ASPIRE
          </h1>

          <p className="mt-1 max-w-2xl text-[12px] leading-5 text-slate-500">
            A unified software intelligence framework for understanding,
            analyzing and connecting software project knowledge across
            requirements, repositories, quality, architecture and traceability.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/knowledge-graph")}
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
              transition
              hover:bg-indigo-700
            "
          >
            <Network size={12} />
            Explore Knowledge Graph
            <ArrowRight size={11} />
          </button>
        </div>
      </header>

      <section
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-indigo-100
          bg-gradient-to-br
          from-indigo-50
          via-white
          to-purple-50
          p-6
          shadow-sm
        "
      >
        {/* Decorative background */}

        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-indigo-200/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-purple-200/20 blur-3xl" />

        <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          {/* LEFT */}

          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-indigo-100">
                <BrainCircuit size={25} className="text-indigo-600" />
              </div>

              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-indigo-500">
                  ASPIRE
                </p>

                <p className="text-[12px] text-slate-400">
                  Unified Software Intelligence Framework
                </p>
              </div>
            </div>

            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-tight tracking-tight text-slate-900">
              Turning software project data into
              <span className="text-indigo-600"> actionable intelligence.</span>
            </h2>

            <p className="mt-3 max-w-xl text-[12px] leading-5 text-slate-600">
              ASPIRE brings together multiple software intelligence capabilities
              into a connected framework, allowing teams to understand project
              state, discover relationships and identify potential risks.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Tag>Requirements</Tag>

              <Tag>Repository</Tag>

              <Tag>Architecture</Tag>

              <Tag>Quality</Tag>

              <Tag>Traceability</Tag>
            </div>
          </div>

          {/* RIGHT — VISUAL */}

          <div className="relative mx-auto w-full max-w-[390px]">
            <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-lg backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-bold text-slate-800">
                    Intelligence Ecosystem
                  </p>

                  <p className="text-[11px] text-slate-400">
                    Connected project knowledge
                  </p>
                </div>

                <Sparkles size={14} className="text-indigo-500" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <MiniComponent
                  icon={Search}
                  title="Requirements"
                  value="4,821"
                />

                <MiniComponent
                  icon={GitBranch}
                  title="Repository"
                  value="12,342"
                />

                <MiniComponent icon={TestTube2} title="Quality" value="5,621" />

                <MiniComponent
                  icon={Workflow}
                  title="Traceability"
                  value="3,126"
                />
              </div>

              <div className="my-3 flex items-center justify-center">
                <div className="flex items-center gap-2 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2">
                  <Network size={14} className="text-indigo-600" />

                  <span className="text-[12px] font-bold text-indigo-700">
                    Unified Knowledge Graph
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <GraphMetric label="Entities" value="25.9K" />

                <GraphMetric label="Relations" value="18" />

                <GraphMetric label="Coverage" value="72%" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        <StatCard
          icon={Layers3}
          value="4"
          title="Intelligence Components"
          description="Connected capabilities"
        />

        <StatCard
          icon={Network}
          value="1"
          title="Unified Knowledge Graph"
          description="Shared intelligence layer"
        />

        <StatCard
          icon={GitBranch}
          value="18"
          title="Relationship Types"
          description="Semantic project links"
        />

        <StatCard
          icon={ShieldCheck}
          value="91%"
          title="Evidence Confidence"
          description="Current graph analysis"
        />
      </section>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <InfoCard
          icon={Target}
          eyebrow="The Problem"
          title="Software knowledge is fragmented."
        >
          <p>
            Modern software projects generate information across many sources.
            Requirements, source code, architecture, tests, defects and project
            changes are often analyzed separately.
          </p>

          <p>
            This makes it difficult to understand how a change in one area
            affects another.
          </p>
        </InfoCard>

        <InfoCard
          icon={Sparkles}
          eyebrow="The ASPIRE Approach"
          title="Connect intelligence instead of isolating it."
        >
          <p>
            ASPIRE provides a common framework for bringing software
            intelligence capabilities together.
          </p>

          <p>
            A shared knowledge layer connects entities and relationships,
            allowing insights discovered by one component to provide context to
            another.
          </p>
        </InfoCard>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-5">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-indigo-600">
            Framework Architecture
          </p>

          <h2 className="mt-1 text-base font-bold text-slate-900">
            How ASPIRE works
          </h2>

          <p className="mt-1 text-[11px] text-slate-500">
            Multiple intelligence capabilities contribute to a shared software
            knowledge model.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-5">
          <ArchitectureStep
            number="01"
            icon={Search}
            title="Collect"
            description="Gather project and software artifacts."
          />

          <Arrow />

          <ArchitectureStep
            number="02"
            icon={BrainCircuit}
            title="Analyze"
            description="Extract metrics, risks and semantic information."
          />

          <Arrow />

          <ArchitectureStep
            number="03"
            icon={Network}
            title="Connect"
            description="Build relationships in the unified knowledge graph."
          />
        </div>
      </section>

      <section>
        <div className="mb-3">
          <p className="text-[12px] font-semibold uppercase tracking-wider text-indigo-600">
            Intelligence Layer
          </p>

          <h2 className="mt-1 text-base font-bold text-slate-900">
            ASPIRE Intelligence Components
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <ComponentCard
            icon={Search}
            title="Requirement Intelligence"
            description="Understand requirements, specifications and their relationships with implementation."
          />

          <ComponentCard
            icon={GitBranch}
            title="Repository Intelligence"
            description="Analyze repository structure, architecture, dependencies, risks and evolution."
          />

          <ComponentCard
            icon={TestTube2}
            title="Quality & Testing Intelligence"
            description="Connect quality metrics, test evidence and software quality signals."
          />

          <ComponentCard
            icon={Workflow}
            title="Traceability Intelligence"
            description="Establish relationships between requirements, changes, implementation and validation."
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-indigo-100 bg-indigo-50/40">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
          <div className="p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
              <Network size={19} />
            </div>

            <p className="mt-4 text-[12px] font-semibold uppercase tracking-wider text-indigo-600">
              Shared Layer
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900">
              Unified Software Knowledge Graph
            </h2>

            <p className="mt-2 text-[11px] leading-5 text-slate-600">
              The knowledge graph acts as a common semantic layer that connects
              entities and relationships discovered across the intelligence
              components.
            </p>

            <button
              onClick={() => navigate("/knowledge-graph")}
              className="mt-4 flex items-center gap-1 text-[12px] font-semibold text-indigo-600"
            >
              Explore Knowledge Graph
              <ArrowRight size={10} />
            </button>
          </div>

          <div className="flex items-center justify-center p-5">
            <div className="relative w-full max-w-[500px]">
              <div className="grid grid-cols-3 gap-3">
                <GraphEntity label="Requirement" position="col-span-1" />

                <GraphEntity label="Component" position="col-span-1" />

                <GraphEntity label="Test Case" position="col-span-1" />

                <div />

                <div className="rounded-xl border border-indigo-200 bg-white p-3 text-center shadow-sm">
                  <Network size={19} className="mx-auto text-indigo-600" />

                  <p className="mt-1 text-[12px] font-bold text-slate-800">
                    Knowledge Graph
                  </p>
                </div>

                <div />

                <GraphEntity label="Defect" position="col-span-1" />

                <GraphEntity label="Code File" position="col-span-1" />

                <GraphEntity label="Document" position="col-span-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <SectionHeader icon={BookIcon} title="Research Foundation" />

          <div className="mt-4 space-y-3">
            <ResearchItem
              title="Software Architecture Analysis"
              description="Architecture structure, dependencies and architectural risks."
            />

            <ResearchItem
              title="Repository Intelligence"
              description="Repository structure, evolution and code-level evidence."
            />

            <ResearchItem
              title="Traceability"
              description="Relationships between requirements, implementation and validation."
            />

            <ResearchItem
              title="Knowledge Graphs"
              description="Semantic representation of software entities and relationships."
            />
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <SectionHeader icon={Code2} title="Technology Foundation" />

          <div className="mt-4 grid grid-cols-2 gap-2">
            <TechItem title="React" description="Frontend framework" />

            <TechItem title="Tailwind CSS" description="UI system" />

            <TechItem title="React Flow" description="Graph visualization" />

            <TechItem title="Knowledge Graph" description="Semantic layer" />

            <TechItem title="Repository APIs" description="Software data" />

            <TechItem title="AI / ML" description="Intelligence layer" />
          </div>
        </section>
      </section>

      <footer className="flex flex-col gap-2 border-t border-slate-200 pt-4 text-[12px] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="font-semibold text-slate-600">ASPIRE</span> — Unified
          Software Intelligence Framework
        </div>

        <div className="flex items-center gap-3">
          <span>Version 1.0</span>

          <span>Research Prototype</span>

          <span className="flex items-center gap-1 text-emerald-600">
            <CheckCircle2 size={9} />
            Active
          </span>
        </div>
      </footer>
    </div>
  );
};

const Tag = ({ children }) => (
  <span className="rounded-md border border-white/80 bg-white/70 px-2 py-1 text-[11px] font-medium text-slate-600 shadow-sm">
    {children}
  </span>
);

const MiniComponent = ({ icon: Icon, title, value }) => (
  <div className="rounded-lg border border-slate-100 bg-white p-2">
    <Icon size={13} className="text-indigo-500" />

    <p className="mt-2 text-[11px] text-slate-400">{title}</p>

    <p className="text-[12px] font-bold text-slate-800">{value}</p>
  </div>
);

const GraphMetric = ({ label, value }) => (
  <div className="rounded-lg bg-slate-50 p-2 text-center">
    <p className="text-[11px] text-slate-400">{label}</p>

    <p className="mt-1 text-[11px] font-bold text-slate-800">{value}</p>
  </div>
);

const StatCard = ({ icon: Icon, value, title, description }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
    <div className="flex items-center justify-between">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        <Icon size={14} />
      </div>

      <span className="text-[11px] text-emerald-600">Active</span>
    </div>

    <p className="mt-3 text-xl font-bold text-slate-900">{value}</p>

    <p className="mt-0.5 text-[12px] font-semibold text-slate-700">{title}</p>

    <p className="mt-1 text-[11px] text-slate-400">{description}</p>
  </div>
);

const InfoCard = ({ icon: Icon, eyebrow, title, children }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
      <Icon size={15} />
    </div>

    <p className="mt-4 text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
      {eyebrow}
    </p>

    <h2 className="mt-1 text-sm font-bold text-slate-900">{title}</h2>

    <div className="mt-3 space-y-2 text-[11px] leading-5 text-slate-500">
      {children}
    </div>
  </section>
);

const ArchitectureStep = ({ number, icon: Icon, title, description }) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3">
    <div className="flex items-center justify-between">
      <span className="text-[11px] font-bold text-indigo-500">{number}</span>

      <Icon size={15} className="text-indigo-500" />
    </div>

    <h3 className="mt-4 text-[12px] font-bold text-slate-800">{title}</h3>

    <p className="mt-1 text-[12px] leading-4 text-slate-500">{description}</p>
  </div>
);

const Arrow = () => (
  <div className="hidden items-center justify-center md:flex">
    <ArrowRight size={15} className="text-slate-300" />
  </div>
);

const ComponentCard = ({ icon: Icon, title, description }) => (
  <div className="group rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
      <Icon size={17} />
    </div>

    <h3 className="mt-4 text-[12px] font-bold text-slate-800">{title}</h3>

    <p className="mt-2 text-[12px] leading-4 text-slate-500">{description}</p>

    <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-indigo-600">
      Explore
      <ArrowRight size={9} className="transition group-hover:translate-x-0.5" />
    </div>
  </div>
);

const GraphEntity = ({ label }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-2 text-center shadow-sm">
    <div className="mx-auto h-2 w-2 rounded-full bg-indigo-400" />

    <p className="mt-1 text-[11px] font-semibold text-slate-700">{label}</p>
  </div>
);

const SectionHeader = ({ icon: Icon, title }) => (
  <div className="flex items-center gap-2">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
      <Icon size={14} />
    </div>

    <h2 className="text-[11px] font-bold text-slate-800">{title}</h2>
  </div>
);

const ResearchItem = ({ title, description }) => (
  <div className="flex gap-3">
    <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-emerald-500" />

    <div>
      <p className="text-[12px] font-semibold text-slate-700">{title}</p>

      <p className="mt-0.5 text-[11px] leading-4 text-slate-400">
        {description}
      </p>
    </div>
  </div>
);

const TechItem = ({ title, description }) => (
  <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-3">
    <p className="text-[11px] font-bold text-slate-700">{title}</p>

    <p className="mt-1 text-[11px] text-slate-400">{description}</p>
  </div>
);

/* Small icon component */

const BookIcon = ({ size = 15, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
  </svg>
);

export default AboutAspire;
