import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Activity,
  AlertTriangle,
  ChevronDown,
  CloudUpload,
  Database,
  Info,
  ListChecks,
  Play,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import {
  CartesianGrid,
  LabelList,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* ================================================================
   DATA
================================================================ */

const validationTrend = [
  { month: "Dec", rvc: 62, passRate: 88 },
  { month: "Jan", rvc: 65, passRate: 91 },
  { month: "Feb", rvc: 61, passRate: 89 },
  { month: "Mar", rvc: 70, passRate: 92 },
  { month: "Apr", rvc: 74, passRate: 93 },
  { month: "May", rvc: 78, passRate: 94 },
];

const priorityRequirements = [
  {
    id: "REQ-014",
    detailsId: "REQ-014",
    requirement: "Password reset token",
    type: "Functional",
    rvc: "46%",
    status: "Partial",
  },
  {
    id: "REQ-021",
    detailsId: "REQ-021",
    requirement: "API performance",
    type: "Non-Functional",
    rvc: "60%",
    status: "Partial",
  },
  {
    id: "REQ-031",
    requirement: "Admin role authorization",
    type: "Functional",
    rvc: "55%",
    status: "Partial",
  },
  {
    id: "REQ-041",
    requirement: "Account lockout after 5 attempts",
    type: "Functional",
    rvc: "32%",
    status: "Inadequate",
  },
];

const validationGaps = [
  {
    label: "Missing evidence",
    value: 42,
  },
  {
    label: "Weak assertions",
    value: 28,
  },
  {
    label: "Boundary gaps",
    value: 18,
  },
  {
    label: "NFR mismatch",
    value: 12,
  },
];

const validationDetails = [
  {
    issue: "Missing boundary validation for password reset expiry",
    severity: "High",
    requirement: "REQ-014",
    detailsId: "REQ-014",
  },
  {
    issue: "Load mismatch in API performance evidence",
    severity: "High",
    requirement: "REQ-021",
    detailsId: "REQ-021",
  },
  {
    issue: "Weak assertions for admin role authorization",
    severity: "Medium",
    requirement: "REQ-031",
  },
  {
    issue: "Missing lockout verification after repeated failures",
    severity: "Medium",
    requirement: "REQ-041",
  },
];

/* ================================================================
   KPI CARD
================================================================ */

const KpiCard = ({
  icon: Icon,
  title,
  value,
  secondaryValue,
  helper,
  tone = "green",
}) => {
  const tones = {
    green: {
      bg: "bg-[#e8f8ee]",
      icon: "text-[#0ba547]",
      value: "text-[#08a33e]",
    },

    red: {
      bg: "bg-[#ffeded]",
      icon: "text-[#ff2020]",
      value: "text-[#ff2020]",
    },

    blue: {
      bg: "bg-[#e8f2ff]",
      icon: "text-[#0765f7]",
      value: "text-[#0765f7]",
    },
  };

  const selected = tones[tone];

  return (
    <div
      className="
        flex
        h-[122px]
        items-center
        rounded-[10px]
        border
        border-[#dfe5ed]
        bg-white
        px-[20px]
      "
    >
      <div
        className={`
          flex
          h-[64px]
          w-[64px]
          shrink-0
          items-center
          justify-center
          rounded-[14px]
          ${selected.bg}
        `}
      >
        <Icon
          size={34}
          strokeWidth={1.75}
          className={selected.icon}
        />
      </div>

      <div className="ml-[18px] min-w-0">
        <div
          className="
            whitespace-nowrap
            text-[14px]
            font-semibold
            leading-none
            text-[#171d38]
          "
        >
          {title}
        </div>

        <div
          className="
            mt-[10px]
            flex
            items-baseline
            whitespace-nowrap
          "
        >
          <span
            className={`
              text-[30px]
              font-bold
              leading-none
              ${selected.value}
            `}
          >
            {value}
          </span>

          {secondaryValue && (
            <>
              <span
                className="
                  mx-[7px]
                  text-[21px]
                  font-semibold
                  text-[#17203d]
                "
              >
                /
              </span>

              <span
                className={`
                  text-[25px]
                  font-bold
                  leading-none
                  ${
                    tone === "red"
                      ? "text-[#ff2020]"
                      : "text-[#17203d]"
                  }
                `}
              >
                {secondaryValue}
              </span>
            </>
          )}
        </div>

        {helper && (
          <div
            className="
              mt-[11px]
              whitespace-nowrap
              text-[12px]
              font-medium
              text-[#3e4c68]
            "
          >
            {helper}
          </div>
        )}
      </div>
    </div>
  );
};

/* ================================================================
   BADGES
================================================================ */

const TypeBadge = ({ type }) => {
  const isNfr =
    type === "Non-Functional";

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        whitespace-nowrap
        rounded-[4px]
        px-[10px]
        py-[5px]
        text-[11px]
        font-semibold
        leading-none
        ${
          isNfr
            ? "bg-[#efeaff] text-[#4824ff]"
            : "bg-[#e6f1ff] text-[#0765f7]"
        }
      `}
    >
      {type}
    </span>
  );
};

const StatusBadge = ({
  status,
}) => {
  const inadequate =
    status === "Inadequate";

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        whitespace-nowrap
        rounded-[4px]
        px-[10px]
        py-[5px]
        text-[11px]
        font-semibold
        leading-none
        ${
          inadequate
            ? "bg-[#ffe7e7] text-[#ff3030]"
            : "bg-[#fff0df] text-[#f37800]"
        }
      `}
    >
      {status}
    </span>
  );
};

const SeverityBadge = ({
  severity,
}) => {
  return (
    <span
      className={`
        inline-flex
        min-w-[56px]
        items-center
        justify-center
        rounded-[4px]
        px-[9px]
        py-[5px]
        text-[11px]
        font-semibold
        leading-none
        ${
          severity === "High"
            ? "bg-[#ffe7e7] text-[#ff3030]"
            : "bg-[#fff0df] text-[#f37800]"
        }
      `}
    >
      {severity}
    </span>
  );
};

/* ================================================================
   CHART LABEL
================================================================ */

const TrendLabel = ({
  x,
  y,
  value,
  color,
  below = false,
}) => (
  <text
    x={x}
    y={
      below
        ? y + 23
        : y - 10
    }
    textAnchor="middle"
    fill={color}
    fontSize={12}
    fontWeight={700}
  >
    {value}%
  </text>
);

/* ================================================================
   PAGE
================================================================ */

const QualityTestingIntelligence =
  () => {
    const navigate =
      useNavigate();

    const openRequirement = (
      row
    ) => {
      if (
        !row.detailsId
      ) {
        return;
      }

      navigate(
        `/quality/requirement-details/${row.detailsId}`
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
        {/* ======================================================
            TOP ROW
        ====================================================== */}

        <div
          className="
            flex
            w-full
            items-start
            justify-between
            gap-[18px]
          "
        >
          <div className="shrink-0 pt-[1px]">
            <div
              className="
                flex
                items-center
                gap-[14px]
              "
            >
              <div
                className="
                  flex
                  h-[39px]
                  w-[39px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#4b26ff]
                  text-[16px]
                  font-bold
                  text-white
                "
              >
                3
              </div>

              <h1
                className="
                  whitespace-nowrap
                  text-[25px]
                  font-bold
                  leading-none
                  tracking-[-0.4px]
                  text-[#0b1232]
                "
              >
                Quality & Testing Intelligence
              </h1>
            </div>

            <p
              className="
                mt-[9px]
                whitespace-nowrap
                text-[13px]
                font-medium
                text-[#53617b]
              "
            >
              Requirement-centric QA evidence and test adequacy overview
            </p>
          </div>

          {/* ACTIONS */}

          <div
            className="
              flex
              min-w-0
              flex-1
              items-center
              justify-end
              gap-[9px]
            "
          >
            <button
              type="button"
              className="
                flex
                h-[40px]
                shrink-0
                items-center
                gap-[8px]
                rounded-[6px]
                border
                border-[#d7dee8]
                bg-white
                px-[11px]
                text-[11px]
                font-semibold
                text-[#17213d]
              "
            >
              <span
                className="
                  flex
                  h-[26px]
                  w-[26px]
                  items-center
                  justify-center
                  rounded-[4px]
                  bg-[#f0edff]
                  text-[#4524ff]
                "
              >
                <Database
                  size={16}
                />
              </span>

              Spring PetClinic

              <ChevronDown
                size={14}
              />
            </button>

            <div
              className="
                flex
                h-[40px]
                shrink-0
                items-center
                whitespace-nowrap
                rounded-[6px]
                border
                border-[#d7dee8]
                bg-white
                px-[11px]
                text-[11px]
                font-medium
                text-[#43516c]
              "
            >
              Last analyzed: May 12, 2025 09:45 AM
            </div>

            <button
              type="button"
              className="
                flex
                h-[40px]
                shrink-0
                items-center
                gap-[7px]
                rounded-[6px]
                border
                border-[#d7dee8]
                bg-white
                px-[12px]
                text-[11px]
                font-semibold
                text-[#273650]
              "
            >
              <RefreshCw
                size={16}
              />

              Refresh
            </button>

            <button
              type="button"
              className="
                flex
                h-[40px]
                shrink-0
                items-center
                gap-[7px]
                whitespace-nowrap
                rounded-[6px]
                border
                border-[#d7dee8]
                bg-white
                px-[13px]
                text-[11px]
                font-semibold
                text-[#273650]
              "
            >
              <CloudUpload
                size={17}
                className="text-[#4323ff]"
              />

              Import Evidence
            </button>

            <button
              type="button"
              className="
                flex
                h-[40px]
                shrink-0
                items-center
                gap-[8px]
                whitespace-nowrap
                rounded-[6px]
                bg-gradient-to-r
                from-[#5126ff]
                to-[#3216ff]
                px-[15px]
                text-[11px]
                font-semibold
                text-white
                shadow-sm
              "
            >
              <Play
                size={15}
                fill="currentColor"
              />

              Run QA Analysis
            </button>
          </div>
        </div>

        {/* ======================================================
            KPI CARDS
        ====================================================== */}

        <div
          className="
            mt-[27px]
            grid
            grid-cols-4
            gap-[16px]
          "
        >
          <KpiCard
            icon={ShieldCheck}
            title="RVC"
            value="78%"
            helper={
              <>
                Adequate RVUs:{" "}
                <span className="font-bold text-[#09a23d]">
                  94
                </span>{" "}
                / 121
              </>
            }
            tone="green"
          />

          <KpiCard
            icon={ListChecks}
            title="Adequately Validated"
            value="24"
            secondaryValue="42"
            helper="Requirements"
            tone="green"
          />

          <KpiCard
            icon={AlertTriangle}
            title="Partial / Inadequate"
            value="11"
            secondaryValue="7"
            helper="Requirements"
            tone="red"
          />

          <KpiCard
            icon={Activity}
            title="Avg RVES"
            value="0.82"
            helper="Execution Strength"
            tone="blue"
          />
        </div>

        {/* ======================================================
            MIDDLE ROW
        ====================================================== */}

        <div
          className="
            mt-[16px]
            grid
            grid-cols-[0.93fr_1.07fr]
            gap-[16px]
          "
        >
          {/* TREND */}

          <section
            className="
              h-[280px]
              min-w-0
              rounded-[9px]
              border
              border-[#dfe5ed]
              bg-white
              px-[18px]
              pb-[10px]
              pt-[14px]
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[7px]">
                <h2
                  className="
                    text-[14px]
                    font-bold
                    text-[#111936]
                  "
                >
                  Requirement Validation Trend
                </h2>

                <Info
                  size={14}
                  className="text-[#75839b]"
                />
              </div>

              <button
                type="button"
                className="
                  flex
                  h-[31px]
                  items-center
                  gap-[6px]
                  rounded-[5px]
                  border
                  border-[#dfe4ec]
                  bg-white
                  px-[10px]
                  text-[11px]
                  font-semibold
                  text-[#354360]
                "
              >
                Last 6 Months

                <ChevronDown
                  size={13}
                />
              </button>
            </div>

            <div className="mt-[2px] h-[230px]">
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <LineChart
                  data={
                    validationTrend
                  }
                  margin={{
                    top: 32,
                    right: 25,
                    left: -4,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid
                    vertical={
                      false
                    }
                    stroke="#edf0f5"
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                    dy={6}
                    tick={{
                      fill:
                        "#52617b",
                      fontSize:
                        11,
                      fontWeight:
                        500,
                    }}
                  />

                  <YAxis
                    domain={[
                      0,
                      100,
                    ]}
                    ticks={[
                      0,
                      25,
                      50,
                      75,
                      100,
                    ]}
                    axisLine={
                      false
                    }
                    tickLine={
                      false
                    }
                    width={45}
                    tickFormatter={(
                      value
                    ) =>
                      `${value}%`
                    }
                    tick={{
                      fill:
                        "#52617b",
                      fontSize:
                        11,
                      fontWeight:
                        500,
                    }}
                  />

                  <Tooltip
                    formatter={(
                      value
                    ) =>
                      `${value}%`
                    }
                  />

                  <Legend
                    verticalAlign="bottom"
                    iconType="line"
                    height={22}
                    wrapperStyle={{
                      fontSize:
                        "11px",
                      paddingTop:
                        "7px",
                    }}
                  />

                  <Line
                    type="linear"
                    dataKey="rvc"
                    name="RVC (%)"
                    stroke="#0765f7"
                    strokeWidth={
                      2.2
                    }
                    dot={{
                      r: 3.8,
                      fill:
                        "#0765f7",
                      strokeWidth:
                        0,
                    }}
                  >
                    <LabelList
                      dataKey="rvc"
                      content={(
                        props
                      ) => (
                        <TrendLabel
                          {...props}
                          color="#0765f7"
                          below
                        />
                      )}
                    />
                  </Line>

                  <Line
                    type="linear"
                    dataKey="passRate"
                    name="Test Pass Rate (%)"
                    stroke="#4825ff"
                    strokeWidth={
                      2.2
                    }
                    dot={{
                      r: 3.8,
                      fill:
                        "#4825ff",
                      strokeWidth:
                        0,
                    }}
                  >
                    <LabelList
                      dataKey="passRate"
                      content={(
                        props
                      ) => (
                        <TrendLabel
                          {...props}
                          color="#4825ff"
                        />
                      )}
                    />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* PRIORITY */}

          <section
            className="
              h-[280px]
              min-w-0
              rounded-[9px]
              border
              border-[#dfe5ed]
              bg-white
              px-[17px]
              pb-[11px]
              pt-[14px]
            "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[7px]">
                <h2
                  className="
                    text-[14px]
                    font-bold
                    text-[#111936]
                  "
                >
                  Priority QA Attention
                </h2>

                <Info
                  size={14}
                  className="text-[#75839b]"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/quality/requirements"
                  )
                }
                className="
                  text-[12px]
                  font-bold
                  text-[#4323ff]
                "
              >
                View All
              </button>
            </div>

            <table
              className="
                mt-[10px]
                w-full
                table-fixed
                border-collapse
                text-left
              "
            >
              <colgroup>
                <col className="w-[22%]" />
                <col className="w-[30%]" />
                <col className="w-[21%]" />
                <col className="w-[11%]" />
                <col className="w-[16%]" />
              </colgroup>

              <thead className="bg-[#f8fafc]">
                <tr>
                  {[
                    "Requirement ID",
                    "Requirement",
                    "Type",
                    "RVC",
                    "Status",
                  ].map(
                    (
                      heading
                    ) => (
                      <th
                        key={
                          heading
                        }
                        className="
                          px-[9px]
                          py-[9px]
                          text-[11px]
                          font-semibold
                          text-[#53617a]
                        "
                      >
                        {
                          heading
                        }
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {priorityRequirements.map(
                  (
                    row
                  ) => (
                    <tr
                      key={
                        row.id
                      }
                      onClick={() =>
                        openRequirement(
                          row
                        )
                      }
                      className={`
                        h-[48px]
                        border-b
                        border-[#edf0f4]
                        last:border-b-0

                        ${
                          row.detailsId
                            ? "cursor-pointer hover:bg-[#faf9ff]"
                            : ""
                        }
                      `}
                    >
                      <td className="px-[9px]">
                        <div className="flex items-center gap-[8px]">
                          <AlertTriangle
                            size={17}
                            className="shrink-0 text-[#ff3030]"
                          />

                          <span className="whitespace-nowrap text-[12px] font-bold text-[#4624ff]">
                            {
                              row.id
                            }
                          </span>
                        </div>
                      </td>

                      <td className="truncate px-[9px] text-[12px] font-medium text-[#293651]">
                        {
                          row.requirement
                        }
                      </td>

                      <td className="px-[9px]">
                        <TypeBadge
                          type={
                            row.type
                          }
                        />
                      </td>

                      <td className="px-[7px] text-[12px] font-bold text-[#161e3a]">
                        {
                          row.rvc
                        }
                      </td>

                      <td className="px-[7px]">
                        <StatusBadge
                          status={
                            row.status
                          }
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </section>
        </div>

        {/* ======================================================
            BOTTOM ROW
        ====================================================== */}

        <div
          className="
            mt-[12px]
            grid
            grid-cols-[0.93fr_1.07fr]
            gap-[16px]
          "
        >
          {/* GAPS */}

          <section
            className="
              h-[210px]
              rounded-[9px]
              border
              border-[#dfe5ed]
              bg-white
              px-[18px]
              pb-[12px]
              pt-[13px]
            "
          >
            <div className="flex items-center gap-[7px]">
              <h2 className="text-[14px] font-bold text-[#111936]">
                Top Validation Gaps
              </h2>

              <Info
                size={14}
                className="text-[#75839b]"
              />
            </div>

            <div className="mt-[16px]">
              {validationGaps.map(
                (
                  gap
                ) => (
                  <div
                    key={
                      gap.label
                    }
                    className="
                      mb-[12px]
                      grid
                      grid-cols-[120px_minmax(0,1fr)_42px]
                      items-center
                      gap-[8px]
                      last:mb-0
                    "
                  >
                    <span className="whitespace-nowrap text-[11px] font-medium text-[#364360]">
                      {
                        gap.label
                      }
                    </span>

                    <div className="h-[13px] overflow-hidden bg-[#f0f2f6]">
                      <div
                        className="
                          h-full
                          bg-gradient-to-r
                          from-[#5427ff]
                          to-[#4121ff]
                        "
                        style={{
                          width:
                            `${gap.value * 2}%`,
                        }}
                      />
                    </div>

                    <span className="text-[11px] font-bold text-[#18213e]">
                      {
                        gap.value
                      }
                      %
                    </span>
                  </div>
                )
              )}
            </div>

            <div
              className="
                ml-[128px]
                mr-[40px]
                mt-[10px]
                flex
                justify-between
                text-[10px]
                font-medium
                text-[#52617c]
              "
            >
              <span>0%</span>
              <span>10%</span>
              <span>20%</span>
              <span>30%</span>
              <span>40%</span>
              <span>50%</span>
            </div>
          </section>

          {/* DETAILS */}

          <section
            className="
              h-[210px]
              rounded-[9px]
              border
              border-[#dfe5ed]
              bg-white
              px-[17px]
              pb-[10px]
              pt-[13px]
            "
          >
            <div className="flex items-center gap-[7px]">
              <h2 className="text-[14px] font-bold text-[#111936]">
                Top Validation Details
              </h2>

              <Info
                size={14}
                className="text-[#75839b]"
              />
            </div>

            <table
              className="
                mt-[9px]
                w-full
                table-fixed
                border-collapse
                text-left
              "
            >
              <colgroup>
                <col className="w-[62%]" />
                <col className="w-[18%]" />
                <col className="w-[20%]" />
              </colgroup>

              <thead>
                <tr className="border-b border-[#e4e8ef]">
                  {[
                    "Issue",
                    "Severity",
                    "Requirement ID",
                  ].map(
                    (
                      heading
                    ) => (
                      <th
                        key={
                          heading
                        }
                        className="
                          pb-[8px]
                          text-[10px]
                          font-semibold
                          text-[#53617a]
                        "
                      >
                        {
                          heading
                        }
                      </th>
                    )
                  )}
                </tr>
              </thead>

              <tbody>
                {validationDetails.map(
                  (
                    row
                  ) => (
                    <tr
                      key={
                        row.issue
                      }
                      className="
                        h-[37px]
                        border-b
                        border-[#edf0f4]
                        last:border-b-0
                      "
                    >
                      <td className="truncate pr-[8px] text-[11px] font-medium text-[#364360]">
                        {
                          row.issue
                        }
                      </td>

                      <td>
                        <SeverityBadge
                          severity={
                            row.severity
                          }
                        />
                      </td>

                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            openRequirement(
                              row
                            )
                          }
                          className="
                            rounded-[4px]
                            bg-[#f1eeff]
                            px-[7px]
                            py-[4px]
                            text-[11px]
                            font-bold
                            text-[#4825ff]
                          "
                        >
                          {
                            row.requirement
                          }
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    );
  };

export default QualityTestingIntelligence;