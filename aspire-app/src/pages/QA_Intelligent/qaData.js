/* ================================================================
   REQUIREMENTS GRID
================================================================ */

export const requirementsGrid = [
  {
    id: "REQ-001",
    title: "User Login",
    type: "Functional",
    risk: "High",
    rvus: 3,
    adequate: 3,
    rvc: 100,
    rves: 0.95,
    status: "Adequate",
    updated: "May 20, 2025",
  },

  {
    id: "REQ-006",
    title: "Add Item to Cart",
    type: "Functional",
    risk: "Medium",
    rvus: 4,
    adequate: 3,
    rvc: 75,
    rves: 0.84,
    status: "Partial",
    updated: "May 20, 2025",
  },

  {
    id: "REQ-014",
    title: "Password reset token",
    type: "Functional",
    risk: "High",
    rvus: 4,
    adequate: 2,
    rvc: 50,
    rves: 0.57,
    status: "Partial",
    updated: "May 20, 2025",
    detailsId: "REQ-014",
  },

  {
    id: "REQ-021",
    title: "API Performance (95% < 200ms @ 100 users)",
    type: "Performance",
    risk: "High",
    rvus: 5,
    adequate: 3,
    rvc: 60,
    rves: 0.72,
    status: "Partial",
    updated: "May 22, 2025",
    detailsId: "REQ-021",
  },

  {
    id: "REQ-031",
    title: "Admin role authorization",
    type: "Security",
    risk: "High",
    rvus: 3,
    adequate: 2,
    rvc: 55,
    rves: 0.59,
    status: "Partial",
    updated: "May 20, 2025",
  },

  {
    id: "REQ-037",
    title: "Data backup daily",
    type: "Reliability",
    risk: "Medium",
    rvus: 2,
    adequate: 2,
    rvc: 100,
    rves: 0.93,
    status: "Adequate",
    updated: "May 20, 2025",
  },

  {
    id: "REQ-041",
    title: "Account lock after 5 attempts",
    type: "Security",
    risk: "High",
    rvus: 3,
    adequate: 1,
    rvc: 33,
    rves: 0.42,
    status: "Inadequate",
    updated: "May 19, 2025",
  },
];

/* ================================================================
   FUNCTIONAL REQUIREMENT - REQ-014
================================================================ */

export const functionalRequirement = {
  id: "REQ-014",

  title: "Password reset token",

  description: "Password reset token",

  type: "Functional",

  source: "SRS v1.2",

  created: "Apr 15, 2025",

  updated: "May 20, 2025",

  rvc: 50,

  rves: 0.57,

  adequate: 2,

  totalRvus: 4,

  status: "Partial",

  risk: "High",

  criteria: [
    {
      id: "RVU-014.1",

      text: "A secure token is generated.",

      adequacy: "Adequate",

      evidence: [
        {
          expected: "Secure token generation",

          matched: "AuthServiceTest.shouldGenerateSecureToken()",

          source: "AuthServiceTest.java",

          type: "JUnit",

          semantic: 94,

          execution: "PASS",

          assertion: "Strong",

          adequacy: "Adequate",
        },
      ],
    },

    {
      id: "RVU-014.2",

      text: "Token is valid for 15 minutes.",

      adequacy: "Partial",

      evidence: [
        {
          expected: "Expired-token rejection test",

          matched: "AuthServiceTest.shouldRejectExpiredToken()",

          source: "AuthServiceTest.java",

          type: "JUnit",

          semantic: 84,

          execution: "PASS",

          assertion: "Weak",

          adequacy: "Inadequate",
        },

        {
          expected: "Boundary at 15 minutes",

          matched: "AuthServiceTest.tokenExpiryBoundaryTest()",

          source: "AuthServiceTest.java",

          type: "JUnit",

          semantic: 92,

          execution: "PASS",

          assertion: "Moderate",

          adequacy: "Partial",
        },

        {
          expected: "Negative scenario proof",

          matched: "Token expiry scenario in integration log",

          source: "integration-test.log",

          type: "Log",

          semantic: 71,

          execution: "PASS",

          assertion: "Moderate",

          adequacy: "Partial",
        },
      ],
    },

    {
      id: "RVU-014.3",

      text: "Token sent to the registered email.",

      adequacy: "Inadequate",

      evidence: [
        {
          expected: "Registered email delivery validation",

          matched: "MailServiceTest.sendsResetMailToRegisteredEmail()",

          source: "MailServiceTest.java",

          type: "JUnit",

          semantic: 61,

          execution: "PASS",

          assertion: "Weak",

          adequacy: "Inadequate",
        },
      ],
    },

    {
      id: "RVU-014.4",

      text: "Token cannot be reused.",

      adequacy: "Adequate",

      evidence: [
        {
          expected: "Token reuse prevention test",

          matched: "AuthServiceTest.rejectsReusedToken()",

          source: "AuthServiceTest.java",

          type: "JUnit",

          semantic: 93,

          execution: "PASS",

          assertion: "Strong",

          adequacy: "Adequate",
        },
      ],
    },
  ],

  findings: [
    "Weak assertion only checks token existence, not expiry rejection.",

    "Missing boundary test at exactly 15 minutes.",

    "Negative scenario coverage is incomplete.",

    "No explicit proof that reused token is blocked.",
  ],

  recommendations: [
    "Add explicit expired-token rejection test.",

    "Add boundary-value test at exactly 15 minutes.",

    "Add token reuse prevention assertion.",

    "Strengthen negative test scenarios and failure messages.",
  ],
};

/* ================================================================
   NON-FUNCTIONAL REQUIREMENT - REQ-021
================================================================ */

export const nonFunctionalRequirement = {
  id: "REQ-021",

  title:
    "API response time should be under 200ms for 95% of requests under 100 concurrent users.",

  description:
    "API response time should be under 200ms for 95% of requests under 100 concurrent users.",

  type: "Non-Functional",

  subtype: "Performance",

  source: "SRS v1.2",

  created: "Apr 18, 2025",

  updated: "May 22, 2025",

  rvc: 60,

  rves: 0.72,

  adequate: 3,

  totalRvus: 5,

  status: "Partial",

  risk: "High",

  criteria: [
    {
      id: "RVU-021.1",

      text: "API response time for 95% of requests.",

      adequacy: "Adequate",

      evidence: [
        {
          expected: "95th percentile response-time evidence",

          matched: "jmeter-summary.csv",

          source: "JMeter",

          type: "Metric Export",

          semantic: 95,

          execution: "PASS",

          measured: "184 ms",

          threshold: "< 200 ms",

          adequacy: "Adequate",
        },
      ],
    },

    {
      id: "RVU-021.2",

      text: "Response time should be under 200ms.",

      adequacy: "Adequate",

      evidence: [
        {
          expected: "Response-time threshold proof",

          matched: "jmeter-result.jtl",

          source: "JMeter",

          type: "Execution Report",

          semantic: 93,

          execution: "PASS",

          measured: "184 ms",

          threshold: "< 200 ms",

          adequacy: "Adequate",
        },
      ],
    },

    {
      id: "RVU-021.3",

      text: "Measured under 100 concurrent users.",

      adequacy: "Adequate",

      evidence: [
        {
          expected: "100 concurrent-user configuration",

          matched: "load-test-100users.jmx",

          source: "JMeter",

          type: "Test Configuration",

          semantic: 96,

          execution: "PASS",

          measured: "100 users",

          threshold: "100 concurrent users",

          adequacy: "Adequate",
        },
      ],
    },

    {
      id: "RVU-021.4",

      text: "Applies to all authenticated API endpoints.",

      adequacy: "Inadequate",

      evidence: [
        {
          expected: "Authenticated API endpoint coverage",

          matched: "jmeter-endpoint-list.csv",

          source: "JMeter",

          type: "Coverage Export",

          semantic: 59,

          execution: "PASS",

          measured: "7 / 11 endpoints",

          threshold: "All authenticated endpoints",

          adequacy: "Inadequate",
        },
      ],
    },

    {
      id: "RVU-021.5",

      text: "Measurement duration should be at least 10 minutes.",

      adequacy: "Partial",

      evidence: [
        {
          expected: "Configured test duration is at least 10 minutes",

          matched: "load-test-100users.jmx",

          source: "JMeter",

          type: "Test Configuration",

          semantic: 92,

          execution: "PASS",

          measured: "10 minutes",

          threshold: "≥ 10 minutes",

          adequacy: "Adequate",
        },

        {
          expected: "Actual test run duration is at least 10 minutes",

          matched: "jmeter-result.jtl",

          source: "JMeter",

          type: "Execution Report",

          semantic: 78,

          execution: "PASS",

          measured: "8 minutes",

          threshold: "≥ 10 minutes",

          adequacy: "Partial",
        },

        {
          expected: "No early termination or errors during test run",

          matched: "jmeter-errors.log",

          source: "JMeter",

          type: "Error Log",

          semantic: 85,

          execution: "PASS",

          measured: "0 critical errors",

          threshold: "No critical errors",

          adequacy: "Adequate",
        },

        {
          expected: "Continuous load applied for the full duration",

          matched: "jmeter-threads-graph.png",

          source: "JMeter",

          type: "Thread Profile",

          semantic: 71,

          execution: "PASS",

          measured: "Minor fluctuations",

          threshold: "Stable load",

          adequacy: "Partial",
        },
      ],
    },
  ],

  findings: [
    "Actual test duration is 8 minutes, below the required 10 minutes.",

    "Load was not applied continuously for the full 10 minutes.",

    "Some minor load fluctuations observed during execution.",

    "Test executed successfully with no critical errors.",
  ],

  recommendations: [
    "Extend test duration to at least 10 minutes.",

    "Ensure continuous load is applied for the full duration.",

    "Re-run performance test and capture 95th percentile metrics.",

    "Monitor CPU, memory and error rate during extended test.",
  ],
};

/* ================================================================
   LOOKUP
================================================================ */

export const requirementsById = {
  "REQ-014": functionalRequirement,

  "REQ-021": nonFunctionalRequirement,
};

/* ================================================================
   OVERVIEW
================================================================ */

export const validationTrend = [
  {
    month: "Dec",
    rvc: 62,
    passRate: 88,
  },

  {
    month: "Jan",
    rvc: 65,
    passRate: 91,
  },

  {
    month: "Feb",
    rvc: 61,
    passRate: 89,
  },

  {
    month: "Mar",
    rvc: 70,
    passRate: 92,
  },

  {
    month: "Apr",
    rvc: 74,
    passRate: 93,
  },

  {
    month: "May",
    rvc: 78,
    passRate: 94,
  },
];

export const priorityAttention = [
  {
    id: "REQ-014",
    title: "Password reset token",
    type: "Functional",
    rvc: 46,
    status: "Partial",
    detailsId: "REQ-014",
  },

  {
    id: "REQ-021",
    title: "API performance",
    type: "Non-Functional",
    rvc: 60,
    status: "Partial",
    detailsId: "REQ-021",
  },

  {
    id: "REQ-031",
    title: "Admin role authorization",
    type: "Functional",
    rvc: 55,
    status: "Partial",
  },

  {
    id: "REQ-041",
    title: "Account lockout after 5 attempts",
    type: "Functional",
    rvc: 32,
    status: "Inadequate",
  },
];

export const validationGaps = [
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

export const validationDetails = [
  {
    issue: "Missing boundary validation for password reset expiry",
    severity: "High",
    id: "REQ-014",
    detailsId: "REQ-014",
  },

  {
    issue: "Load mismatch in API performance evidence",
    severity: "High",
    id: "REQ-021",
    detailsId: "REQ-021",
  },

  {
    issue: "Weak assertions for admin role authorization",
    severity: "Medium",
    id: "REQ-031",
  },

  {
    issue: "Missing lockout verification after repeated failures",
    severity: "Medium",
    id: "REQ-041",
  },
];

/* ================================================================
   REVALIDATION
================================================================ */

export const revalidation = {
  changeId: "CHG-023",

  changeType: "Acceptance criteria update",

  affectedRvu: "RVU-014.2",

  previous: "Token expires after 15 minutes.",

  current: "Token expires after 20 minutes.",

  rows: [
    {
      evidence: "validTokenResetsPassword()",

      previous: "Valid token permits reset",

      decision: "Reusable",

      current: "Valid token permits reset",

      reason: "Core reset behavior unchanged",

      action: "Keep",
    },

    {
      evidence: "tokenExpiresAfter15Minutes()",

      previous: "Validate expiry threshold (15 min)",

      decision: "Outdated",

      current: "Validate expiry threshold (20 min)",

      reason: "Expiry rule changed from 15 min to 20 min",

      action: "Replace",
    },

    {
      evidence: "tokenBoundaryAt15Minutes()",

      previous: "Boundary validation around token expiry",

      decision: "Modify",

      current: "Validate boundary exactly at 20 minutes",

      reason: "Boundary assertion updated from 15 min to 20 min",

      action: "Update",
    },

    {
      evidence: "expiredTokenRejectedAfter20Minutes()",

      previous: "Not applicable",

      decision: "New Evidence",

      current: "Validate rejection after 20-minute expiry",

      reason: "New post-expiry proof required for updated rule",

      action: "Create",
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
   REPORT PAGE
================================================================ */

export const reportRows = [
  {
    id: "REQ-001",
    title: "User login with valid credentials",
    type: "Functional",
    rvc: 100,
    rves: 0.92,
    adequacy: "Adequate",
    rvus: "4 / 4 RVUs",
    quality: "Good",
    qualityText: "All tests passed",
    revalidation: "Not Required",
    recommendation: "No action required. Maintain current test coverage.",
  },

  {
    id: "REQ-002",
    title: "Password reset via email token",
    type: "Functional",
    rvc: 50,
    rves: 0.57,
    adequacy: "Partial",
    rvus: "2 / 4 RVUs",
    quality: "Needs Attention",
    qualityText: "Some tests missing",
    revalidation: "Required",
    due: "May 30, 2025",
    recommendation: "Add boundary test for token expiry and reuse prevention.",
  },

  {
    id: "REQ-003",
    title: "Create new pet profile",
    type: "Functional",
    rvc: 75,
    rves: 0.74,
    adequacy: "Partial",
    rvus: "3 / 4 RVUs",
    quality: "Good",
    qualityText: "Most tests passed",
    revalidation: "Recommended",
    due: "Jun 05, 2025",
    recommendation: "Add negative scenario tests for invalid pet data.",
  },

  {
    id: "REQ-004",
    title: "Update pet information",
    type: "Functional",
    rvc: 100,
    rves: 0.88,
    adequacy: "Adequate",
    rvus: "4 / 4 RVUs",
    quality: "Good",
    qualityText: "All tests passed",
    revalidation: "Not Required",
    recommendation: "No action required.",
  },

  {
    id: "REQ-005",
    title: "Delete pet profile",
    type: "Functional",
    rvc: 25,
    rves: 0.32,
    adequacy: "Unsatisfied",
    rvus: "1 / 4 RVUs",
    quality: "Poor",
    qualityText: "Major gaps found",
    revalidation: "Required",
    due: "May 29, 2025",
    recommendation: "Add tests for authorization checks and data integrity.",
  },

  {
    id: "REQ-006",
    title: "Search pets by criteria",
    type: "Functional",
    rvc: 75,
    rves: 0.71,
    adequacy: "Partial",
    rvus: "3 / 4 RVUs",
    quality: "Good",
    qualityText: "Most tests passed",
    revalidation: "Recommended",
    due: "Jun 07, 2025",
    recommendation: "Add performance tests for large datasets.",
  },

  {
    id: "REQ-007",
    title: "View appointment schedule",
    type: "Functional",
    rvc: 100,
    rves: 0.89,
    adequacy: "Adequate",
    rvus: "4 / 4 RVUs",
    quality: "Good",
    qualityText: "All tests passed",
    revalidation: "Not Required",
    recommendation: "No action required.",
  },

  {
    id: "REQ-008",
    title: "Book new appointment",
    type: "Functional",
    rvc: 60,
    rves: 0.61,
    adequacy: "Partial",
    rvus: "2 / 4 RVUs",
    quality: "Needs Attention",
    qualityText: "Some tests missing",
    revalidation: "Recommended",
    due: "Jun 02, 2025",
    recommendation: "Add validation tests for conflicting time slots.",
  },
];
