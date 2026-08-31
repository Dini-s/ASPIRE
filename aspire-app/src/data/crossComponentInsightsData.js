export const crossComponentInsights = [
    {
        id: "CCI-001",

        severity: "High",

        category: "Requirement → Repository",

        title: "Requirement has incomplete implementation",

        description:
            "REQ-102 is partially implemented by PaymentService. The expected payment validation behavior is not fully represented in the repository.",

        confidence: 94,

        source: "Requirement Intelligence",

        target: "Repository Intelligence",

        relationship: "IMPLEMENTED_BY",

        sourceEntity: {
            id: "REQ-102",
            name: "Payment Processing",
            type: "Requirement",
        },

        targetEntity: {
            id: "CMP-021",
            name: "PaymentService",
            type: "Component",
        },

        evidence: [
            "Requirement specification",
            "PaymentService.java",
            "Traceability relationship",
        ],

        impact: [
            "PaymentService",
            "PaymentServiceTest",
            "Release validation",
        ],

        recommendation:
            "Review the missing implementation and update the traceability relationship after validation.",
    },

    {
        id: "CCI-002",

        severity: "High",

        category: "Architecture → Quality",

        title: "Architecture drift may affect test coverage",

        description:
            "PaymentService shows high architecture-drift risk while its associated test coverage remains below the expected threshold.",

        confidence: 89,

        source: "Repository Intelligence",

        target: "Quality Intelligence",

        relationship: "IMPACTS",

        sourceEntity: {
            id: "CMP-021",
            name: "PaymentService",
            type: "Component",
        },

        targetEntity: {
            id: "TC-892",
            name: "PaymentServiceTest",
            type: "Test Case",
        },

        evidence: [
            "Architecture drift analysis",
            "Code complexity metrics",
            "Test coverage report",
        ],

        impact: [
            "PaymentService",
            "PaymentServiceTest",
            "Architecture health",
        ],

        recommendation:
            "Prioritize refactoring and increase unit-test coverage for the affected module.",
    },

    {
        id: "CCI-003",

        severity: "Medium",

        category: "Requirement → Testing",

        title: "Requirement lacks sufficient test coverage",

        description:
            "A functional requirement has an associated implementation but insufficient test evidence was detected.",

        confidence: 86,

        source: "Requirement Intelligence",

        target: "Quality Intelligence",

        relationship: "VERIFIED_BY",

        sourceEntity: {
            id: "REQ-114",
            name: "Payment Refund",
            type: "Requirement",
        },

        targetEntity: {
            id: "TC-932",
            name: "RefundTest",
            type: "Test Case",
        },

        evidence: [
            "Requirement specification",
            "Test case mapping",
            "Coverage report",
        ],

        impact: [
            "Payment Refund",
            "RefundTest",
            "Release confidence",
        ],

        recommendation:
            "Add additional test scenarios covering the uncovered acceptance criteria.",
    },

    {
        id: "CCI-004",

        severity: "Medium",

        category: "Repository → Traceability",

        title: "Code change has weak traceability",

        description:
            "A recent repository change could not be confidently associated with a requirement or tracked work item.",

        confidence: 81,

        source: "Repository Intelligence",

        target: "Traceability Intelligence",

        relationship: "TRACES_TO",

        sourceEntity: {
            id: "COMMIT-a1b2",
            name: "Commit a1b2c3d",
            type: "Commit",
        },

        targetEntity: {
            id: "REQ-121",
            name: "Unknown Requirement",
            type: "Requirement",
        },

        evidence: [
            "Git commit metadata",
            "Changed files",
            "Traceability analysis",
        ],

        impact: [
            "Change tracking",
            "Requirement coverage",
            "Auditability",
        ],

        recommendation:
            "Associate the change with the relevant requirement or work item.",
    },
];