import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  ClipboardCheck,
  ClipboardList,
  Download,
  FilePlus2,
  Hash,
  Link2,
  ListChecks,
  Pencil,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

/* ================================================================
   FUNCTIONAL REQUIREMENT
================================================================ */

const functionalRequirement = {
  id: "REQ-014",

  description:
    "Password reset token",

  type: "Functional",

  source: "SRS v1.2",

  created: "Apr 15, 2025",

  updated: "May 20, 2025",

  rvc: 50,

  rves: 0.57,

  adequateRvus: 2,

  totalRvus: 4,

  status: "Partial",

  risk: "High",

  rvus: [
    {
      id: "RVU-014.1",

      text:
        "A secure token is generated.",

      adequacy:
        "Adequate",

      evidence: [
        {
          expected:
            "Secure token generation test",

          matched:
            "AuthServiceTest.shouldGenerateSecureToken()",

          source:
            "AuthServiceTest.java",

          type:
            "JUnit",

          semantic:
            94,

          execution:
            "PASS",

          assertion:
            "Strong",

          adequacy:
            "Adequate",
        },
      ],
    },

    {
      id: "RVU-014.2",

      text:
        "Token is valid for 15 minutes.",

      adequacy:
        "Partial",

      evidence: [
        {
          expected:
            "Expired-token rejection test",

          matched:
            "AuthServiceTest.shouldRejectExpiredToken()",

          source:
            "AuthServiceTest.java",

          type:
            "JUnit",

          semantic:
            84,

          execution:
            "PASS",

          assertion:
            "Weak",

          adequacy:
            "Inadequate",
        },

        {
          expected:
            "Boundary at 15 minutes",

          matched:
            "AuthServiceTest.tokenExpiryBoundaryTest()",

          source:
            "AuthServiceTest.java",

          type:
            "JUnit",

          semantic:
            92,

          execution:
            "PASS",

          assertion:
            "Moderate",

          adequacy:
            "Partial",
        },

        {
          expected:
            "Negative scenario proof",

          matched:
            "Token expiry scenario in integration log",

          source:
            "integration-test.log",

          type:
            "Log",

          semantic:
            71,

          execution:
            "PASS",

          assertion:
            "Moderate",

          adequacy:
            "Partial",
        },
      ],
    },

    {
      id: "RVU-014.3",

      text:
        "Token sent to the registered email.",

      adequacy:
        "Inadequate",

      evidence: [
        {
          expected:
            "Registered email delivery test",

          matched:
            "MailServiceTest.sendResetToken()",

          source:
            "MailServiceTest.java",

          type:
            "JUnit",

          semantic:
            61,

          execution:
            "PASS",

          assertion:
            "Weak",

          adequacy:
            "Inadequate",
        },
      ],
    },

    {
      id: "RVU-014.4",

      text:
        "Token cannot be reused.",

      adequacy:
        "Adequate",

      evidence: [
        {
          expected:
            "Token reuse prevention test",

          matched:
            "AuthServiceTest.rejectReusedToken()",

          source:
            "AuthServiceTest.java",

          type:
            "JUnit",

          semantic:
            94,

          execution:
            "PASS",

          assertion:
            "Strong",

          adequacy:
            "Adequate",
        },
      ],
    },
  ],

  findings: [
    {
      type:
        "danger",

      text:
        "Weak assertion only checks token existence, not expiry rejection.",
    },

    {
      type:
        "danger",

      text:
        "Missing boundary test at exactly 15 minutes.",
    },

    {
      type:
        "warning",

      text:
        "Negative scenario coverage is incomplete.",
    },

    {
      type:
        "info",

      text:
        "No explicit proof that reused token is blocked.",
    },
  ],

  recommendations: [
    "Add explicit expired-token rejection test.",

    "Add boundary-value test at exactly 15 minutes.",

    "Add token reuse prevention assertion.",

    "Strengthen negative test scenarios and failure messages.",
  ],
};

/* ================================================================
   NON-FUNCTIONAL REQUIREMENT
================================================================ */

const nonFunctionalRequirement = {
  id: "REQ-021",

  description:
    "API response time should be under 200ms for 95% of requests under 100 concurrent users.",

  type:
    "Non-Functional",

  subtype:
    "Performance",

  source:
    "SRS v1.2",

  created:
    "Apr 18, 2025",

  updated:
    "May 22, 2025",

  rvc:
    60,

  rves:
    0.72,

  adequateRvus:
    3,

  totalRvus:
    5,

  status:
    "Partial",

  risk:
    "High",

  rvus: [
    {
      id:
        "RVU-021.1",

      text:
        "API response time for 95% of requests.",

      adequacy:
        "Adequate",

      evidence: [
        {
          expected:
            "95th percentile response-time measurement",

          matched:
            "jmeter-summary.csv",

          source:
            "JMeter",

          type:
            "Metric Export",

          semantic:
            95,

          execution:
            "PASS",

          measured:
            "184 ms",

          threshold:
            "< 200 ms",

          adequacy:
            "Adequate",
        },
      ],
    },

    {
      id:
        "RVU-021.2",

      text:
        "Response time should be under 200ms.",

      adequacy:
        "Adequate",

      evidence: [
        {
          expected:
            "Response-time threshold validation",

          matched:
            "jmeter-result.jtl",

          source:
            "JMeter",

          type:
            "Execution Report",

          semantic:
            93,

          execution:
            "PASS",

          measured:
            "184 ms",

          threshold:
            "< 200 ms",

          adequacy:
            "Adequate",
        },
      ],
    },

    {
      id:
        "RVU-021.3",

      text:
        "Measured under 100 concurrent users.",

      adequacy:
        "Adequate",

      evidence: [
        {
          expected:
            "100 concurrent-user load configuration",

          matched:
            "load-test-100users.jmx",

          source:
            "JMeter",

          type:
            "Test Configuration",

          semantic:
            96,

          execution:
            "PASS",

          measured:
            "100 users",

          threshold:
            "100 concurrent users",

          adequacy:
            "Adequate",
        },
      ],
    },

    {
      id:
        "RVU-021.4",

      text:
        "Applies to all authenticated API endpoints.",

      adequacy:
        "Inadequate",

      evidence: [
        {
          expected:
            "Authenticated endpoint coverage",

          matched:
            "jmeter-endpoint-list.csv",

          source:
            "JMeter",

          type:
            "Coverage Export",

          semantic:
            59,

          execution:
            "PASS",

          measured:
            "7 / 11 endpoints",

          threshold:
            "All authenticated endpoints",

          adequacy:
            "Inadequate",
        },
      ],
    },

    {
      id:
        "RVU-021.5",

      text:
        "Measurement duration should be at least 10 minutes.",

      adequacy:
        "Partial",

      evidence: [
        {
          expected:
            "Configured test duration is at least 10 minutes",

          matched:
            "load-test-100users.jmx",

          source:
            "JMeter",

          type:
            "Test Configuration",

          semantic:
            92,

          execution:
            "PASS",

          measured:
            "10 minutes",

          threshold:
            "≥ 10 minutes",

          adequacy:
            "Adequate",
        },

        {
          expected:
            "Actual test run duration is at least 10 minutes",

          matched:
            "jmeter-result.jtl",

          source:
            "JMeter",

          type:
            "Execution Report",

          semantic:
            78,

          execution:
            "PASS",

          measured:
            "8 minutes",

          threshold:
            "≥ 10 minutes",

          adequacy:
            "Partial",
        },

        {
          expected:
            "No early termination or errors during test run",

          matched:
            "jmeter-errors.log",

          source:
            "JMeter",

          type:
            "Error Log",

          semantic:
            85,

          execution:
            "PASS",

          measured:
            "0 critical errors",

          threshold:
            "No critical errors",

          adequacy:
            "Adequate",
        },

        {
          expected:
            "Continuous load applied for the full duration",

          matched:
            "jmeter-threads-graph.png",

          source:
            "JMeter",

          type:
            "Thread Profile",

          semantic:
            71,

          execution:
            "PASS",

          measured:
            "Minor fluctuations",

          threshold:
            "Stable load",

          adequacy:
            "Partial",
        },
      ],
    },
  ],

  findings: [
    {
      type:
        "danger",

      text:
        "Actual test duration is 8 minutes, below the required 10 minutes.",
    },

    {
      type:
        "warning",

      text:
        "Load was not applied continuously for the full 10 minutes.",
    },

    {
      type:
        "warning",

      text:
        "Some minor load fluctuations observed during execution.",
    },

    {
      type:
        "info",

      text:
        "Test executed successfully with no critical errors.",
    },
  ],

  recommendations: [
    "Extend test duration to at least 10 minutes.",

    "Ensure continuous load is applied for the full duration.",

    "Re-run performance test and capture 95th percentile metrics.",

    "Monitor CPU, memory and error rate during extended test.",
  ],
};

/* ================================================================
   REVALIDATION DATA
================================================================ */

const revalidationData = {
  changeId:
    "CHG-023",

  changeType:
    "Acceptance criteria update",

  affectedRvu:
    "RVU-014.2",

  previous:
    "Token expires after 15 minutes.",

  current:
    "Token expires after 20 minutes.",

  rows: [
    {
      evidence:
        "validTokenResetsPassword()",

      previous:
        "Valid token permits reset",

      decision:
        "Reusable",

      current:
        "Valid token permits reset",

      reason:
        "Core reset behavior unchanged",

      action:
        "Keep",
    },

    {
      evidence:
        "tokenExpiresAfter15Minutes()",

      previous:
        "Validate expiry threshold (15 min)",

      decision:
        "Outdated",

      current:
        "Validate expiry threshold (20 min)",

      reason:
        "Expiry rule changed from 15 min to 20 min",

      action:
        "Replace",
    },

    {
      evidence:
        "tokenBoundaryAt15Minutes()",

      previous:
        "Boundary validation around token expiry",

      decision:
        "Modify",

      current:
        "Validate boundary exactly at 20 minutes",

      reason:
        "Boundary assertion updated from 15 min to 20 min",

      action:
        "Update",
    },

    {
      evidence:
        "expiredTokenRejectedAfter20Minutes()",

      previous:
        "Not applicable",

      decision:
        "New Evidence",

      current:
        "Validate rejection after 20-minute expiry",

      reason:
        "New post-expiry proof required for updated rule",

      action:
        "Create",
    },
  ],

  summary: [
    "1 validation asset remains reusable.",

    "1 existing test must be updated for 20-minute boundary validation.",

    "1 outdated test must be replaced because the old 15-minute rule changed.",

    "1 new evidence item is required to prove rejection after 20 minutes.",

    "Revalidation scope is limited to RVU-014.2 and connected tests.",
  ],

  actions: [
    "Update expiry threshold from 15 to 20 minutes.",

    "Modify boundary test to assert behavior at exactly 20 minutes.",

    "Add rejection proof for expired tokens after 20 minutes.",

    "Re-run impacted authentication regression tests.",
  ],
};

/* ================================================================
   BADGE
================================================================ */

const Badge = ({
  value,
}) => {
  const styles = {
    Adequate:
      "bg-[#E7F8EA] text-[#159B43]",

    Partial:
      "bg-[#FFF1E2] text-[#F37700]",

    Inadequate:
      "bg-[#FFE9E9] text-[#FF3030]",

    PASS:
      "bg-[#E7F8EA] text-[#159B43]",

    Strong:
      "bg-[#E7F8EA] text-[#159B43]",

    Moderate:
      "bg-[#FFF1E2] text-[#F37700]",

    Weak:
      "bg-[#FFF1E2] text-[#F37700]",

    Reusable:
      "border border-[#9DDEB0] bg-[#EFFAF2] text-[#159B43]",

    Outdated:
      "border border-[#FFB1B1] bg-[#FFF3F3] text-[#FF3030]",

    Modify:
      "border border-[#FFC780] bg-[#FFF6E9] text-[#F37700]",

    "New Evidence":
      "border border-[#ACA2FF] bg-[#F5F3FF] text-[#4726FF]",

    Keep:
      "border border-[#9DDEB0] bg-[#EFFAF2] text-[#159B43]",

    Replace:
      "border border-[#FFB1B1] bg-[#FFF3F3] text-[#FF3030]",

    Update:
      "border border-[#FFC780] bg-[#FFF6E9] text-[#F37700]",

    Create:
      "border border-[#ACA2FF] bg-[#F5F3FF] text-[#4726FF]",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        whitespace-nowrap
        rounded-[5px]
        px-[12px]
        py-[6px]
        text-[12px]
        font-semibold
        leading-none

        ${
          styles[
            value
          ] ||
          "bg-slate-100 text-slate-600"
        }
      `}
    >
      {value}
    </span>
  );
};

/* ================================================================
   SEMANTIC SCORE
================================================================ */

const SemanticScore = ({
  value,
}) => {
  let color =
    "text-[#F87900]";

  if (
    value >= 80
  ) {
    color =
      "text-[#08A83B]";
  }

  if (
    value < 65
  ) {
    color =
      "text-[#FF3030]";
  }

  return (
    <span
      className={`
        text-[14px]
        font-bold

        ${color}
      `}
    >
      {value}%
    </span>
  );
};

/* ================================================================
   KPI CARD
================================================================ */

const MetricCard = ({
  icon: Icon,
  title,
  value,
  tone,
}) => {
  const tones = {
    purple: {
      bg:
        "bg-[#F1EFFF]",

      icon:
        "text-[#4825FF]",

      value:
        "text-[#10183B]",
    },

    blue: {
      bg:
        "bg-[#E9F2FF]",

      icon:
        "text-[#075FFF]",

      value:
        "text-[#10183B]",
    },

    green: {
      bg:
        "bg-[#E8F9EC]",

      icon:
        "text-[#10A441]",

      value:
        "text-[#10183B]",
    },

    orange: {
      bg:
        "bg-[#FFF1E6]",

      icon:
        "text-[#FF7800]",

      value:
        "text-[#FF7800]",
    },

    red: {
      bg:
        "bg-[#FFECEC]",

      icon:
        "text-[#FF2020]",

      value:
        "text-[#FF2020]",
    },
  };

  const current =
    tones[tone];

  return (
    <div
      className="
        flex
        h-[108px]
        items-center
        rounded-xl
        border
        border-[#E3E7EE]
        bg-white
        px-[22px]
      "
    >
      <div
        className={`
          flex
          h-[56px]
          w-[56px]
          shrink-0
          items-center
          justify-center
          rounded-xl

          ${current.bg}
        `}
      >
        <Icon
          size={29}
          strokeWidth={
            1.8
          }
          className={
            current.icon
          }
        />
      </div>

      <div className="ml-[18px] min-w-0">
        <div
          className="
            text-[14px]
            font-semibold
            leading-[19px]
            text-[#1A2341]
          "
        >
          {title}
        </div>

        <div
          className={`
            mt-[8px]
            text-[29px]
            font-bold
            leading-none

            ${current.value}
          `}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   FINDING ICON
================================================================ */

const FindingIcon = ({
  type,
}) => {
  if (
    type === "info"
  ) {
    return (
      <div
        className="
          flex
          h-[19px]
          w-[19px]
          shrink-0
          items-center
          justify-center
          rounded-full
          border-2
          border-[#1658FF]
          text-[10px]
          font-bold
          text-[#1658FF]
        "
      >
        i
      </div>
    );
  }

  return (
    <AlertTriangle
      size={18}
      strokeWidth={2}
      className={
        type ===
        "danger"
          ? "shrink-0 text-[#FF3030]"
          : "shrink-0 text-[#FF7900]"
      }
    />
  );
};

/* ================================================================
   SUMMARY / EVIDENCE VIEW
================================================================ */

const SummaryEvidence = ({
  requirement,
  isNfr,
  selectedRvu,
  setSelectedRvu,
  selectedCriterion,
}) => {
  return (
    <>
      {/* KPI CARDS */}

      <div
        className="
          mt-[18px]
          grid
          grid-cols-1
          gap-[16px]
          sm:grid-cols-2
          xl:grid-cols-5
        "
      >
        <MetricCard
          icon={Link2}
          title={
            isNfr
              ? "RVC (Adequate RVUs)"
              : "RVC"
          }
          value={`${requirement.rvc}%`}
          tone="purple"
        />

        <MetricCard
          icon={Activity}
          title={
            isNfr
              ? "RVES (Adequate RVUs)"
              : "RVES"
          }
          value={
            requirement.rves
          }
          tone="blue"
        />

        <MetricCard
          icon={
            ListChecks
          }
          title="Adequate RVUs"
          value={`${requirement.adequateRvus} / ${requirement.totalRvus}`}
          tone="green"
        />

        <MetricCard
          icon={
            ClipboardCheck
          }
          title="Status"
          value={
            requirement.status
          }
          tone="orange"
        />

        <MetricCard
          icon={
            AlertTriangle
          }
          title="Risk"
          value={
            requirement.risk
          }
          tone="red"
        />
      </div>

      {/* MAIN CONTENT */}

      <div
        className="
          mt-[17px]
          grid
          min-w-0
          grid-cols-1
          gap-[17px]

          xl:grid-cols-[290px_minmax(0,1fr)]
          xl:items-stretch
        "
      >

        {/* REQUIREMENT SUMMARY */}

        <section
          className="
            h-full
            rounded-xl
            border
            border-[#E3E7EE]
            bg-white
            p-[17px]
          "
        >
          <h2
            className="
              text-[17px]
              font-bold
              text-[#11183A]
            "
          >
            Requirement Summary
          </h2>

          <div
            className="
              mt-[20px]
              grid
              grid-cols-[110px_minmax(0,1fr)]
              gap-y-[17px]
              text-[13px]
            "
          >
            <span className="font-bold text-[#0757FF]">
              ID
            </span>

            <span className="font-semibold text-[#182443]">
              {
                requirement.id
              }
            </span>

            <span className="font-bold text-[#0757FF]">
              Type
            </span>

            <span className="font-semibold text-[#182443]">
              {
                requirement.type
              }
            </span>

            {isNfr && (
              <>
                <span className="font-bold text-[#0757FF]">
                  Subtype
                </span>

                <span className="font-semibold text-[#182443]">
                  {
                    requirement.subtype
                  }
                </span>
              </>
            )}

            <span className="font-bold text-[#0757FF]">
              Source
            </span>

            <span className="font-semibold text-[#182443]">
              {
                requirement.source
              }
            </span>

            <span className="font-bold text-[#0757FF]">
              Created
            </span>

            <span className="font-semibold text-[#182443]">
              {
                requirement.created
              }
            </span>

            <span className="font-bold text-[#0757FF]">
              Last Updated
            </span>

            <span className="font-semibold text-[#182443]">
              {
                requirement.updated
              }
            </span>
          </div>

          <div
            className="
              mt-[23px]
              border-t
              border-[#EDF0F4]
              pt-[17px]
            "
          >
            <h3
              className="
                text-[14px]
                font-bold
                text-[#11183A]
              "
            >
              Acceptance Criteria → Derived RVUs
            </h3>

            <div className="mt-[12px] space-y-[8px]">
              {requirement.rvus.map(
                (
                  rvu
                ) => {
                  const active =
                    selectedRvu ===
                    rvu.id;

                  return (
                    <button
                      type="button"
                      key={
                        rvu.id
                      }
                      onClick={() =>
                        setSelectedRvu(
                          rvu.id
                        )
                      }
                      className={`
                        w-full
                        rounded-[7px]
                        border
                        px-[11px]
                        py-[10px]
                        text-left
                        transition

                        ${
                          active
                            ? `
                              border-[#6246FF]
                              bg-[#F8F6FF]
                            `
                            : `
                              border-[#E3E7EE]
                              bg-white
                              hover:border-[#BEB5FF]
                            `
                        }
                      `}
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-2
                        "
                      >
                        <span
                          className="
                            text-[12px]
                            font-bold
                            text-[#4324FF]
                          "
                        >
                          {
                            rvu.id
                          }
                        </span>

                        <Badge
                          value={
                            rvu.adequacy
                          }
                        />
                      </div>

                      <p
                        className="
                          mt-[6px]
                          text-[12px]
                          font-medium
                          leading-[18px]
                          text-[#34405E]
                        "
                      >
                        {
                          rvu.text
                        }
                      </p>
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}

        <div
          className="
            min-w-0
            space-y-[17px]
          "
        >
          <section
            className="
              min-w-0
              rounded-xl
              border
              border-[#E3E7EE]
              bg-white
              p-[17px]
            "
          >
            <h2
              className="
                text-[17px]
                font-bold
                text-[#11183A]
              "
            >
              Evidence Coverage
            </h2>

            <div
              className="
                mt-[5px]
                text-[13px]
                font-bold
                text-[#0757FF]
              "
            >
              Select RVU
            </div>

            <div
              className="
                mt-[8px]
                flex
                flex-wrap
                gap-[11px]
              "
            >
              {requirement.rvus.map(
                (
                  rvu
                ) => {
                  const active =
                    selectedRvu ===
                    rvu.id;

                  return (
                    <button
                      type="button"
                      key={
                        rvu.id
                      }
                      onClick={() =>
                        setSelectedRvu(
                          rvu.id
                        )
                      }
                      className={`
                        h-[36px]
                        min-w-[126px]
                        rounded-[5px]
                        border
                        px-[13px]
                        text-[12px]
                        font-bold

                        ${
                          active
                            ? `
                              border-[#4221FF]
                              bg-gradient-to-r
                              from-[#4D22FF]
                              to-[#3212FF]
                              text-white
                            `
                            : `
                              border-[#DDE2EB]
                              bg-white
                              text-[#26314F]
                            `
                        }
                      `}
                    >
                      {
                        rvu.id
                      }
                    </button>
                  );
                }
              )}
            </div>

            {/* EVIDENCE TABLE */}

            <div
              className="
                mt-[13px]
                overflow-x-auto
                rounded-[8px]
                border
                border-[#E4E8EF]
              "
            >
              <table
                className={`
                  w-full
                  border-collapse

                  ${
                    isNfr
                      ? "min-w-[1120px]"
                      : "min-w-[940px]"
                  }
                `}
              >
                <thead className="bg-[#FBFCFE]">
                  <tr className="border-b border-[#E7EAF0]">

                    <th className="px-3 py-4 text-left text-[12px] font-bold text-[#18213E]">
                      Expected Evidence
                    </th>

                    <th className="px-3 py-4 text-left text-[12px] font-bold text-[#18213E]">
                      Matched Evidence
                    </th>

                    <th className="px-3 py-4 text-left text-[12px] font-bold text-[#18213E]">
                      Source
                    </th>

                    <th className="px-3 py-4 text-left text-[12px] font-bold text-[#18213E]">
                      Type
                    </th>

                    <th className="px-3 py-4 text-center text-[12px] font-bold text-[#18213E]">
                      Semantic Match
                    </th>

                    <th className="px-3 py-4 text-center text-[12px] font-bold text-[#18213E]">
                      Execution
                    </th>

                    {isNfr ? (
                      <>
                        <th className="px-3 py-4 text-left text-[12px] font-bold text-[#18213E]">
                          Measured Value
                        </th>

                        <th className="px-3 py-4 text-left text-[12px] font-bold text-[#18213E]">
                          Threshold / Condition
                        </th>
                      </>
                    ) : (
                      <th className="px-3 py-4 text-center text-[12px] font-bold text-[#18213E]">
                        Assertion Strength
                      </th>
                    )}

                    <th className="px-3 py-4 text-center text-[12px] font-bold text-[#18213E]">
                      Adequacy
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {selectedCriterion.evidence.map(
                    (
                      evidence,
                      index
                    ) => (
                      <tr
                        key={`${selectedCriterion.id}-${index}`}
                        className="
                          border-b
                          border-[#E9ECF1]
                          last:border-b-0
                        "
                      >
                        <td className="px-3 py-4 text-[12px] font-semibold leading-[19px] text-[#23304D]">
                          {
                            evidence.expected
                          }
                        </td>

                        <td className="px-3 py-4 text-[12px] font-semibold leading-[19px] text-[#23304D]">
                          {
                            evidence.matched
                          }
                        </td>

                        <td className="px-3 py-4 text-[12px] font-semibold text-[#23304D]">
                          {
                            evidence.source
                          }
                        </td>

                        <td className="px-3 py-4 text-[12px] font-semibold text-[#23304D]">
                          {
                            evidence.type
                          }
                        </td>

                        <td className="px-3 py-4 text-center">
                          <SemanticScore
                            value={
                              evidence.semantic
                            }
                          />
                        </td>

                        <td className="px-3 py-4 text-center">
                          <Badge
                            value={
                              evidence.execution
                            }
                          />
                        </td>

                        {isNfr ? (
                          <>
                            <td className="px-3 py-4 text-[12px] font-semibold text-[#23304D]">
                              {
                                evidence.measured
                              }
                            </td>

                            <td className="px-3 py-4 text-[12px] font-semibold text-[#23304D]">
                              {
                                evidence.threshold
                              }
                            </td>
                          </>
                        ) : (
                          <td className="px-3 py-4 text-center">
                            <Badge
                              value={
                                evidence.assertion
                              }
                            />
                          </td>
                        )}

                        <td className="px-3 py-4 text-center">
                          <Badge
                            value={
                              evidence.adequacy
                            }
                          />
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* FINDINGS + RECOMMENDATIONS */}

          <div
            className="
              grid
              grid-cols-1
              gap-[17px]

              lg:grid-cols-2
            "
          >
            <section
              className="
                rounded-xl
                border
                border-[#E3E7EE]
                bg-white
                px-[18px]
                py-[16px]
              "
            >
              <h2
                className="
                  text-[17px]
                  font-bold
                  text-[#11183A]
                "
              >
                Test Quality Findings
              </h2>

              <div className="mt-[8px]">
                {requirement.findings.map(
                  (
                    finding
                  ) => (
                    <div
                      key={
                        finding.text
                      }
                      className="
                        flex
                        min-h-[38px]
                        items-center
                        gap-[14px]
                      "
                    >
                      <FindingIcon
                        type={
                          finding.type
                        }
                      />

                      <p
                        className="
                          text-[13px]
                          font-medium
                          leading-[19px]
                          text-[#26324F]
                        "
                      >
                        {
                          finding.text
                        }
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>

            <section
              className="
                rounded-xl
                border
                border-[#E3E7EE]
                bg-white
                px-[18px]
                py-[16px]
              "
            >
              <h2
                className="
                  text-[17px]
                  font-bold
                  text-[#11183A]
                "
              >
                AI Recommendations
              </h2>

              <div className="mt-[8px]">
                {requirement.recommendations.map(
                  (
                    recommendation
                  ) => (
                    <div
                      key={
                        recommendation
                      }
                      className="
                        flex
                        min-h-[38px]
                        items-center
                        gap-[14px]
                      "
                    >
                      <div
                        className="
                          flex
                          h-[22px]
                          w-[22px]
                          shrink-0
                          items-center
                          justify-center
                          rounded-[5px]
                          bg-[#F1EEFF]
                          text-[#4323FF]
                        "
                      >
                        <Sparkles
                          size={14}
                        />
                      </div>

                      <p
                        className="
                          text-[13px]
                          font-medium
                          leading-[19px]
                          text-[#26324F]
                        "
                      >
                        {
                          recommendation
                        }
                      </p>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

/* ================================================================
   REVALIDATION STATUS CARD
================================================================ */

const RevalidationMetric = ({
  icon: Icon,
  label,
  value,
  tone,
}) => {
  const tones = {
    green: {
      border:
        "border-l-[#18B44A]",

      background:
        "bg-[#E8F9ED]",

      icon:
        "text-[#10A344]",

      value:
        "text-[#0BA63D]",
    },

    orange: {
      border:
        "border-l-[#FF8A00]",

      background:
        "bg-[#FFF2E8]",

      icon:
        "text-[#FF7900]",

      value:
        "text-[#FF7900]",
    },

    red: {
      border:
        "border-l-[#FF3030]",

      background:
        "bg-[#FFEDED]",

      icon:
        "text-[#FF2020]",

      value:
        "text-[#FF2020]",
    },

    purple: {
      border:
        "border-l-[#4323FF]",

      background:
        "bg-[#F0EDFF]",

      icon:
        "text-[#4323FF]",

      value:
        "text-[#4323FF]",
    },
  };

  const current =
    tones[tone];

  return (
    <div
      className={`
        flex
        h-[80px]
        items-center
        rounded-xl
        border
        border-[#E3E7EE]
        border-l-[3px]
        bg-white
        px-[20px]

        ${current.border}
      `}
    >
      <div
        className={`
          flex
          h-[49px]
          w-[49px]
          shrink-0
          items-center
          justify-center
          rounded-full

          ${current.background}
          ${current.icon}
        `}
      >
        <Icon
          size={27}
          strokeWidth={
            1.8
          }
        />
      </div>

      <div className="ml-[15px]">
        <div
          className="
            text-[13px]
            font-semibold
            text-[#26324D]
          "
        >
          {label}
        </div>

        <div
          className={`
            mt-[3px]
            text-[30px]
            font-medium
            leading-none

            ${current.value}
          `}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

/* ================================================================
   REVALIDATION BOTTOM CARD
================================================================ */

const RevalidationListCard = ({
  title,
  items,
  type,
}) => {
  return (
    <section
      className="
        min-h-[172px]
        rounded-xl
        border
        border-[#E3E7EE]
        bg-white
        p-[17px]
      "
    >
      <div
        className="
          flex
          items-center
          gap-[13px]
        "
      >
        <div
          className="
            flex
            h-[40px]
            w-[40px]
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#087DFF]
            text-white
          "
        >
          {type ===
          "target" ? (
            <Target
              size={23}
            />
          ) : (
            <ClipboardList
              size={22}
            />
          )}
        </div>

        <h2
          className="
            text-[15px]
            font-bold
            text-[#172142]
          "
        >
          {title}
        </h2>
      </div>

      <div
        className="
          ml-[51px]
          mt-[8px]
          space-y-[7px]
        "
      >
        {items.map(
          (
            item
          ) => (
            <div
              key={
                item
              }
              className="
                flex
                items-start
                gap-[8px]
              "
            >
              <span
                className="
                  mt-[2px]
                  flex
                  h-[16px]
                  w-[16px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#3020FF]
                  text-[9px]
                  font-bold
                  text-white
                "
              >
                ✓
              </span>

              <p
                className="
                  text-[12px]
                  font-semibold
                  leading-[18px]
                  text-[#26324D]
                "
              >
                {
                  item
                }
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

/* ================================================================
   REVALIDATION VIEW
================================================================ */

const RevalidationView =
  () => {
    return (
      <div className="mt-[12px]">

        {/* CHANGE DETECTED */}

        <section
          className="
            rounded-[10px]
            border
            border-[#F5A24A]
            bg-[#FFF8F1]
            px-[20px]
            py-[15px]
            shadow-sm
            shadow-orange-100/40
          "
        >
          <div
            className="
              flex
              items-start
              justify-between
              gap-4
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-[12px]
                "
              >
                <AlertTriangle
                  size={21}
                  strokeWidth={
                    2.2
                  }
                  className="text-[#F56A00]"
                />

                <h2
                  className="
                    text-[18px]
                    font-bold
                    text-[#E94A17]
                  "
                >
                  Change detected from Traceability Intelligence (C4)
                </h2>
              </div>

              <p
                className="
                  mt-[6px]
                  text-[13px]
                  font-semibold
                  leading-[20px]
                  text-[#283653]
                "
              >
                Component 4 identified an acceptance criteria change.
                C3 re-evaluates only the impacted validation evidence.
              </p>
            </div>

            <div
              className="
                shrink-0
                rounded-[7px]
                border
                border-[#F07800]
                bg-white
                px-[15px]
                py-[8px]
                text-[12px]
                font-semibold
                text-[#E95D00]
              "
            >
              Revalidation Required
            </div>
          </div>

          {/* PREVIOUS → CURRENT */}

          <div
            className="
              mt-[11px]
              grid
              items-center
              gap-[18px]

              lg:grid-cols-[1fr_65px_1fr]
            "
          >
            {/* PREVIOUS */}

            <div
              className="
                min-h-[82px]
                rounded-[7px]
                border
                border-[#8FCBFF]
                bg-white
                px-[16px]
                py-[12px]
              "
            >
              <div
                className="
                  text-[13px]
                  font-bold
                  text-[#26324D]
                "
              >
                Previous
              </div>

              <div
                className="
                  mt-[11px]
                  flex
                  items-center
                  gap-[14px]
                "
              >
                <span
                  className="
                    rounded-[5px]
                    border
                    border-[#9B87FF]
                    bg-[#F6F3FF]
                    px-[12px]
                    py-[5px]
                    text-[12px]
                    font-bold
                    text-[#4324FF]
                  "
                >
                  RVU-014.2
                </span>

                <span
                  className="
                    text-[13px]
                    font-semibold
                    text-[#26324D]
                  "
                >
                  Token expires after 15 minutes.
                </span>
              </div>
            </div>

            {/* ARROW */}

            <div
              className="
                flex
                items-center
                justify-center
                text-[#3520FF]
              "
            >
              <ArrowRight
                size={35}
                strokeWidth={
                  2
                }
              />
            </div>

            {/* CURRENT */}

            <div
              className="
                min-h-[82px]
                rounded-[7px]
                border
                border-[#8FCBFF]
                bg-white
                px-[16px]
                py-[12px]
              "
            >
              <div
                className="
                  text-[13px]
                  font-bold
                  text-[#26324D]
                "
              >
                Current
              </div>

              <div
                className="
                  mt-[11px]
                  flex
                  items-center
                  gap-[14px]
                "
              >
                <span
                  className="
                    rounded-[5px]
                    border
                    border-[#9B87FF]
                    bg-[#F6F3FF]
                    px-[12px]
                    py-[5px]
                    text-[12px]
                    font-bold
                    text-[#4324FF]
                  "
                >
                  RVU-014.2
                </span>

                <span
                  className="
                    text-[13px]
                    font-semibold
                    text-[#26324D]
                  "
                >
                  Token expires after 20 minutes.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* CHANGE INFORMATION */}

        <section
          className="
            mt-[8px]
            rounded-[8px]
            border
            border-[#F6B26B]
            bg-[#FFF9F3]
            px-[19px]
            py-[12px]
          "
        >
          <div
            className="
              grid
              grid-cols-1
              divide-y
              divide-[#9EC5D5]

              md:grid-cols-2
              md:divide-x
              md:divide-y-0

              xl:grid-cols-4
            "
          >

            {/* CHANGE ID */}

            <div
              className="
                flex
                items-center
                gap-[15px]
                pr-[20px]
              "
            >
              <div
                className="
                  flex
                  h-[40px]
                  w-[40px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#172A72]
                "
              >
                <Hash
                  size={25}
                  strokeWidth={
                    2
                  }
                />
              </div>

              <div>
                <div
                  className="
                    text-[11px]
                    font-semibold
                    text-[#46536F]
                  "
                >
                  Change ID
                </div>

                <div
                  className="
                    mt-[3px]
                    text-[13px]
                    font-bold
                    text-[#FF3924]
                  "
                >
                  CHG-023
                </div>
              </div>
            </div>

            {/* CHANGE TYPE */}

            <div
              className="
                flex
                items-center
                gap-[15px]
                px-[20px]
                py-3

                md:py-0
              "
            >
              <div
                className="
                  flex
                  h-[40px]
                  w-[40px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#172A72]
                "
              >
                <Pencil
                  size={22}
                  strokeWidth={
                    2
                  }
                />
              </div>

              <div>
                <div
                  className="
                    text-[11px]
                    font-semibold
                    text-[#46536F]
                  "
                >
                  Change Type
                </div>

                <div
                  className="
                    mt-[3px]
                    text-[13px]
                    font-bold
                    text-[#26324D]
                  "
                >
                  Acceptance criteria update
                </div>
              </div>
            </div>

            {/* RVUS */}

            <div
              className="
                flex
                items-center
                gap-[15px]
                px-[20px]
                py-3

                md:py-0
              "
            >
              <div
                className="
                  flex
                  h-[40px]
                  w-[40px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#172A72]
                "
              >
                <Users
                  size={22}
                  strokeWidth={
                    2
                  }
                />
              </div>

              <div>
                <div
                  className="
                    text-[11px]
                    font-semibold
                    text-[#46536F]
                  "
                >
                  No. of RVUs affected
                </div>

                <div
                  className="
                    mt-[3px]
                    text-[13px]
                    font-bold
                    text-[#26324D]
                  "
                >
                  1 RVU affected
                </div>
              </div>
            </div>

            {/* AFFECTED RVU */}

            <div
              className="
                flex
                items-center
                gap-[15px]
                pl-[20px]
                py-3

                md:py-0
              "
            >
              <div
                className="
                  flex
                  h-[40px]
                  w-[40px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  text-[#172A72]
                "
              >
                <Target
                  size={24}
                  strokeWidth={
                    2
                  }
                />
              </div>

              <div>
                <div
                  className="
                    text-[11px]
                    font-semibold
                    text-[#46536F]
                  "
                >
                  Affected RVU
                </div>

                <span
                  className="
                    mt-[3px]
                    inline-flex
                    rounded-[5px]
                    border
                    border-[#FF9B61]
                    bg-white
                    px-[10px]
                    py-[4px]
                    text-[12px]
                    font-bold
                    text-[#FF4B25]
                  "
                >
                  RVU-014.2
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* METRICS */}

        <div
          className="
            mt-[12px]
            grid
            grid-cols-1
            gap-[15px]

            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          <RevalidationMetric
            icon={
              ShieldCheck
            }
            label="Reusable"
            value="1"
            tone="green"
          />

          <RevalidationMetric
            icon={
              Pencil
            }
            label="Modification Required"
            value="1"
            tone="orange"
          />

          <RevalidationMetric
            icon={
              AlertCircle
            }
            label="Outdated"
            value="1"
            tone="red"
          />

          <RevalidationMetric
            icon={
              FilePlus2
            }
            label="New Evidence Required"
            value="1"
            tone="purple"
          />
        </div>

        {/* TABLE */}

        <div
          className="
            mt-[12px]
            overflow-hidden
            rounded-[7px]
            border
            border-[#E3E7EE]
            bg-white
          "
        >
          <div className="overflow-x-auto">
            <table
              className="
                w-full
                min-w-[1150px]
                border-collapse
                text-left
              "
            >
              <thead className="bg-[#F8FBFE]">
                <tr>
                  <th className="px-[17px] py-[11px] text-[12px] font-bold text-[#152044]">
                    Evidence / Test
                  </th>

                  <th className="px-[17px] py-[11px] text-[12px] font-bold text-[#152044]">
                    Previous Validation Purpose
                  </th>

                  <th className="px-[17px] py-[11px] text-[12px] font-bold text-[#152044]">
                    C3 Decision
                  </th>

                  <th className="px-[17px] py-[11px] text-[12px] font-bold text-[#152044]">
                    Current Validation Purpose
                  </th>

                  <th className="px-[17px] py-[11px] text-[12px] font-bold text-[#152044]">
                    Reason
                  </th>

                  <th className="px-[17px] py-[11px] text-[12px] font-bold text-[#152044]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {revalidationData.rows.map(
                  (
                    row
                  ) => (
                    <tr
                      key={
                        row.evidence
                      }
                      className="
                        border-t
                        border-[#E7EBF0]
                      "
                    >
                      <td className="px-[17px] py-[10px] text-[12px] font-bold text-[#26324D]">
                        {
                          row.evidence
                        }
                      </td>

                      <td className="px-[17px] py-[10px] text-[12px] font-semibold leading-[18px] text-[#26324D]">
                        {
                          row.previous
                        }
                      </td>

                      <td className="px-[17px] py-[10px]">
                        <Badge
                          value={
                            row.decision
                          }
                        />
                      </td>

                      <td className="px-[17px] py-[10px] text-[12px] font-semibold leading-[18px] text-[#26324D]">
                        {
                          row.current
                        }
                      </td>

                      <td className="px-[17px] py-[10px] text-[12px] font-semibold leading-[18px] text-[#26324D]">
                        {
                          row.reason
                        }
                      </td>

                      <td className="px-[17px] py-[10px]">
                        <Badge
                          value={
                            row.action
                          }
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* BOTTOM CARDS */}

        <div
          className="
            mt-[18px]
            grid
            grid-cols-1
            gap-[16px]

            lg:grid-cols-2
          "
        >
          <RevalidationListCard
            title="Revalidation Summary"
            items={
              revalidationData.summary
            }
            type="summary"
          />

          <RevalidationListCard
            title="Recommended QA Actions"
            items={
              revalidationData.actions
            }
            type="target"
          />
        </div>
      </div>
    );
  };

/* ================================================================
   MAIN PAGE
================================================================ */

const RequirementDetails =
  () => {
    const {
      requirementId =
        "REQ-014",
    } = useParams();

    const navigate =
      useNavigate();

    const [
      searchParams,
      setSearchParams,
    ] =
      useSearchParams();

    const isNfr =
      requirementId ===
      "REQ-021";

    const requirement =
      isNfr
        ? nonFunctionalRequirement
        : functionalRequirement;

    const initialRvu =
      isNfr
        ? "RVU-021.5"
        : "RVU-014.2";

    const [
      selectedRvu,
      setSelectedRvu,
    ] = useState(
      initialRvu
    );

    const tab =
      searchParams.get(
        "tab"
      ) ||
      "summary";

    /* ==============================================================
       CORRECT RVU WHEN URL CHANGES
    ============================================================== */

    useEffect(() => {
      setSelectedRvu(
        isNfr
          ? "RVU-021.5"
          : "RVU-014.2"
      );
    }, [
      requirementId,
      isNfr,
    ]);

    const selectedCriterion =
      useMemo(() => {
        return (
          requirement.rvus.find(
            (
              rvu
            ) =>
              rvu.id ===
              selectedRvu
          ) ||
          requirement
            .rvus[0]
        );
      }, [
        requirement,
        selectedRvu,
      ]);

    /* ==============================================================
       TAB
    ============================================================== */

    const changeTab = (
      nextTab
    ) => {
      if (
        nextTab ===
        "summary"
      ) {
        setSearchParams(
          {}
        );

        return;
      }

      /*
       * Revalidation example is specifically REQ-014.
       */

      if (
        requirement.id !==
        "REQ-014"
      ) {
        navigate(
          "/quality/requirement-details/REQ-014?tab=revalidation"
        );

        return;
      }

      setSearchParams({
        tab:
          "revalidation",
      });
    };

    /* ==============================================================
       EXPORT
    ============================================================== */

    const handleExport =
      () => {
        const rows =
          selectedCriterion.evidence.map(
            (
              item
            ) => ({
              Requirement:
                requirement.id,

              RVU:
                selectedCriterion.id,

              "Expected Evidence":
                item.expected,

              "Matched Evidence":
                item.matched,

              Source:
                item.source,

              Type:
                item.type,

              "Semantic Match":
                `${item.semantic}%`,

              Execution:
                item.execution,

              Adequacy:
                item.adequacy,
            })
          );

        if (
          !rows.length
        ) {
          return;
        }

        const headers =
          Object.keys(
            rows[0]
          );

        const csv = [
          headers.join(
            ","
          ),

          ...rows.map(
            (
              row
            ) =>
              headers
                .map(
                  (
                    header
                  ) =>
                    `"${String(
                      row[
                        header
                      ]
                    ).replaceAll(
                      '"',
                      '""'
                    )}"`
                )
                .join(
                  ","
                )
          ),
        ].join(
          "\n"
        );

        const blob =
          new Blob(
            [csv],
            {
              type:
                "text/csv;charset=utf-8",
            }
          );

        const url =
          URL.createObjectURL(
            blob
          );

        const anchor =
          document.createElement(
            "a"
          );

        anchor.href =
          url;

        anchor.download =
          `${requirement.id}-evidence-report.csv`;

        anchor.click();

        URL.revokeObjectURL(
          url
        );
      };

    return (
      <div
        className="
          -m-4
          min-h-[calc(100vh-72px)]
          bg-white
          p-4

          sm:-m-6
          sm:p-6
        "
      >

        {/* PAGE HEADER */}

        <div
          className="
            flex
            flex-col
            gap-3

            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          <div className="min-w-0">
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-[14px]
              "
            >
              <h1
                className="
                  text-[28px]
                  font-bold
                  leading-tight
                  tracking-[-0.5px]
                  text-[#0B1235]
                "
              >
                Requirement Details ({requirement.id})
              </h1>

              <span
                className="
                  inline-flex
                  rounded-[6px]
                  bg-[#FFF0F0]
                  px-[12px]
                  py-[6px]
                  text-[12px]
                  font-semibold
                  leading-none
                  text-[#FF2929]
                "
              >
                High Risk
              </span>
            </div>

            <p
              className="
                mt-[6px]
                max-w-[950px]
                text-[15px]
                font-semibold
                leading-[21px]
                text-[#0757FF]
              "
            >
              {
                requirement.description
              }
            </p>
          </div>

          {/* EXPORT ONLY — NO NFR FILTER */}

          <div
            className="
              flex
              shrink-0
              items-start
            "
          >
            <button
              type="button"
              onClick={
                handleExport
              }
              className="
                flex
                h-[44px]
                items-center
                overflow-hidden
                rounded-[7px]
                bg-gradient-to-r
                from-[#4E21FF]
                to-[#3111FF]
                text-[13px]
                font-semibold
                text-white
                shadow-sm
              "
            >
              <span
                className="
                  flex
                  h-full
                  items-center
                  gap-[9px]
                  px-[18px]
                "
              >
                <Download
                  size={17}
                />

                Export Report
              </span>

              <span
                className="
                  flex
                  h-full
                  w-[42px]
                  items-center
                  justify-center
                  border-l
                  border-white/20
                "
              >
                ⌄
              </span>
            </button>
          </div>
        </div>

        {/* TABS */}

        <div
          className="
            mt-[9px]
            flex
            h-[43px]
            items-end
            gap-[18px]
            border-b
            border-[#E2E6EE]
          "
        >
          <button
            type="button"
            onClick={() =>
              changeTab(
                "summary"
              )
            }
            className={`
              h-[43px]
              border-b-2
              px-[13px]
              text-[13px]
              font-bold

              ${
                tab ===
                "summary"
                  ? `
                    border-[#3821FF]
                    text-[#2216FF]
                  `
                  : `
                    border-transparent
                    text-[#25304D]
                  `
              }
            `}
          >
            Summary & Evidence
          </button>

          <button
            type="button"
            onClick={() =>
              changeTab(
                "revalidation"
              )
            }
            className={`
              h-[43px]
              border-b-2
              px-[13px]
              text-[13px]
              font-bold

              ${
                tab ===
                "revalidation"
                  ? `
                    border-[#3821FF]
                    text-[#2216FF]
                  `
                  : `
                    border-transparent
                    text-[#25304D]
                  `
              }
            `}
          >
            Revalidation
          </button>
        </div>

        {/* PAGE CONTENT */}

        {tab ===
        "revalidation" ? (
          <RevalidationView />
        ) : (
          <SummaryEvidence
            requirement={
              requirement
            }
            isNfr={
              isNfr
            }
            selectedRvu={
              selectedRvu
            }
            setSelectedRvu={
              setSelectedRvu
            }
            selectedCriterion={
              selectedCriterion
            }
          />
        )}
      </div>
    );
  };

export default RequirementDetails;