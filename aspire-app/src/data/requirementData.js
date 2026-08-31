export const requirementStats = [
    {
        label: "Requirements",
        value: "42",
        subtitle: "Source-linked",
        icon: "requirements",
        color: "indigo",
    },
    {
        label: "Ambiguities",
        value: "8",
        subtitle: "3 high risk",
        icon: "ambiguity",
        color: "orange",
    },
    {
        label: "Conflicts",
        value: "2",
        subtitle: "Decision required",
        icon: "conflicts",
        color: "red",
    },
    {
        label: "Duplicates",
        value: "3",
        subtitle: "Semantic matches",
        icon: "duplicates",
        color: "purple",
    },
    {
        label: "Task Drafts",
        value: "29",
        subtitle: "Human review",
        icon: "tasks",
        color: "green",
    },
];


export const requirementFindings = [
    {
        id: "REQ-034",
        type: "Ambiguity",
        severity: "High",
        title: "The system should quickly notify users about suspicious logins.",
        description:
            "The term 'quickly' does not define a measurable response time.",
        source: "CoreBanking_SRS_v2.pdf · Page 12 · paragraph 3",
    },

    {
        id: "REQ-018",
        type: "Conflict",
        severity: "High",
        title:
            "A customer may update their registered mobile number without additional verification.",
        description:
            "This conflicts with the security verification requirement.",
        source: "CoreBanking_SRS_v2.pdf · Page 7 · paragraph 6",
    },

    {
        id: "REQ-027",
        type: "Duplicate",
        severity: "Medium",
        title:
            "Administrators shall be able to temporarily deactivate a customer account.",
        description:
            "A semantically similar requirement already exists.",
        source: "CoreBanking_SRS_v2.pdf · Page 10 · paragraph 2",
    },

    {
        id: "REQ-041",
        type: "Ambiguity",
        severity: "Medium",
        title:
            "The dashboard must provide a user-friendly summary of recent transactions.",
        description:
            "The expected transaction range and summary criteria are not specified.",
        source: "CoreBanking_SRS_v2.pdf · Page 15 · paragraph 1",
    },

    {
        id: "REQ-012",
        type: "Ambiguity",
        severity: "Low",
        title:
            "The application should support common export formats.",
        description:
            "The supported file formats are not explicitly defined.",
        source: "CoreBanking_SRS_v2.pdf · Page 5 · paragraph 4",
    },
];


export const selectedRequirement = {
    id: "REQ-034",

    original:
        "The system should quickly notify users about suspicious logins.",

    explanation:
        "No measurable delivery time is defined, so teams can interpret the requirement differently.",

    suggestedRevision:
        "The system shall notify the user within 2 seconds after detecting a suspicious login.",

    confidence: 94,

    source:
        "CoreBanking_SRS_v2.pdf · Page 12 · paragraph 3",
};