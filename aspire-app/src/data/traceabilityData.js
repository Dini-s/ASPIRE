export const traceabilityStats = [
    {
        label: "Completeness Score",
        value: "0.84",
        subtitle: "Code + evidence",
        icon: "activity",
        color: "indigo",
    },
    {
        label: "Verified Links",
        value: "128",
        subtitle: "91.4% precision",
        icon: "link",
        color: "green",
    },
    {
        label: "Decayed Links",
        value: "7",
        subtitle: "Review required",
        icon: "decay",
        color: "red",
    },
    {
        label: "Orphan RVUs",
        value: "5",
        subtitle: "No verified code",
        icon: "warning",
        color: "orange",
    },
    {
        label: "LLM Verified",
        value: "93%",
        subtitle: "Trace decisions",
        icon: "sparkles",
        color: "purple",
    },
];

export const traceabilityItems = [
    {
        id: "TR-204",
        rvu: "RVU-034-02",
        title: "Notify users within 2 seconds of a suspicious login",
        code: "NotificationService.sendSecurityAlert()",
        status: "VERIFIED",
        confidence: 96,
        requirement: "Notify users within 2 seconds of a suspicious login",
        component: "NotificationService.sendSecurityAlert()",
        evidence: "SecurityAlertLatencyTest",
    },

    {
        id: "TR-188",
        rvu: "RVU-018-01",
        title: "Verify a mobile-number change using OTP",
        code: "CustomerProfile.updateMobile()",
        status: "DECAYED",
        confidence: 61,
        requirement: "Verify a mobile-number change using OTP",
        component: "CustomerProfile.updateMobile()",
        evidence: "OTPVerificationTest",
    },

    {
        id: "TR-156",
        rvu: "RVU-027-01",
        title: "Allow an administrator to suspend an account",
        code: "AccountAdminService.suspend()",
        status: "VERIFIED",
        confidence: 91,
        requirement: "Allow an administrator to suspend an account",
        component: "AccountAdminService.suspend()",
        evidence: "AccountSuspensionTest",
    },

    {
        id: "TR-241",
        rvu: "RVU-041-03",
        title: "Display ten recent transactions with required fields",
        code: "No verified method",
        status: "ORPHAN",
        confidence: 0,
        requirement: "Display ten recent transactions with required fields",
        component: "TransactionService",
        evidence: "No verified evidence",
    },
];

export const traceabilityBottomCards = [
    {
        title: "Verified Traceability Matrix",
        description:
            "Requirement → Task → RVU → Code → Evidence, assembled through one live graph traversal.",
        icon: "graph",
    },
    {
        title: "Orphan & Broken Link Reports",
        description:
            "AI decay findings combined with missing or weak evidence signals.",
        icon: "warning",
    },
    {
        title: "Explainability & Correctness",
        description:
            "Human-readable decisions plus checks against benchmark ground truth.",
        icon: "sparkles",
    },
];