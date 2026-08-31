export const knowledgeGraphNodes = [
    {
        id: "project",
        type: "knowledge",
        position: { x: 450, y: 250 },
        data: {
            label: "Spring PetClinic",
            type: "Project",
            count: "1,248",
            risk: "Low",
        },
    },

    {
        id: "requirement-1",
        type: "knowledge",
        position: { x: 100, y: 80 },
        data: {
            label: "User Login Requirement",
            type: "Requirement",
            count: "REQ-102",
            risk: "Low",
        },
    },

    {
        id: "component-payment",
        type: "knowledge",
        position: { x: 450, y: 80 },
        data: {
            label: "PaymentService",
            type: "Component",
            count: "3,142",
            risk: "High",
            selected: true,
        },
    },

    {
        id: "component-owner",
        type: "knowledge",
        position: { x: 750, y: 80 },
        data: {
            label: "OwnerService",
            type: "Component",
            count: "1,120",
            risk: "Medium",
        },
    },

    {
        id: "code-payment",
        type: "knowledge",
        position: { x: 300, y: 230 },
        data: {
            label: "PaymentService.java",
            type: "Code File",
            count: "689 lines",
            risk: "High",
        },
    },

    {
        id: "test-payment",
        type: "knowledge",
        position: { x: 600, y: 230 },
        data: {
            label: "PaymentServiceTest",
            type: "Test Case",
            count: "TC-892",
            risk: "Low",
        },
    },

    {
        id: "defect-1",
        type: "knowledge",
        position: { x: 180, y: 400 },
        data: {
            label: "Payment Validation Defect",
            type: "Defect",
            count: "DEF-201",
            risk: "High",
        },
    },

    {
        id: "repository",
        type: "knowledge",
        position: { x: 450, y: 450 },
        data: {
            label: "Spring PetClinic Repository",
            type: "Repository",
            count: "6,891 files",
            risk: "Low",
        },
    },

    {
        id: "document",
        type: "knowledge",
        position: { x: 750, y: 400 },
        data: {
            label: "Payment API Specification",
            type: "Document",
            count: "DOC-45",
            risk: "Low",
        },
    },
];

export const knowledgeGraphEdges = [
    {
        id: "req-component",
        source: "requirement-1",
        target: "component-payment",
        label: "implemented by",
        type: "smoothstep",
    },

    {
        id: "component-code",
        source: "component-payment",
        target: "code-payment",
        label: "contains",
        type: "smoothstep",
    },

    {
        id: "component-test",
        source: "component-payment",
        target: "test-payment",
        label: "tested by",
        type: "smoothstep",
    },

    {
        id: "component-owner",
        source: "component-payment",
        target: "component-owner",
        label: "depends on",
        type: "smoothstep",
    },

    {
        id: "component-defect",
        source: "component-payment",
        target: "defect-1",
        label: "affected by",
        type: "smoothstep",
        animated: true,
    },

    {
        id: "component-repository",
        source: "component-payment",
        target: "repository",
        label: "belongs to",
        type: "smoothstep",
    },

    {
        id: "component-document",
        source: "component-payment",
        target: "document",
        label: "documented by",
        type: "smoothstep",
    },
];