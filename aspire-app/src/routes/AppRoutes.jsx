import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from "react-router-dom";

import DashboardLayout from "../Layouts/DashboardLayout";

// =============================================================
// RESEARCH OVERVIEW
// =============================================================
import ResearchOverview from "../pages/ResearchOverview";

// =============================================================
// COMPONENT 1
// =============================================================
import RequirementIntelligence from "../pages/RequirementIntelligent/RequirementIntelligence";

// =============================================================
// COMPONENT 2
// =============================================================
import RepositoryIntelligence from "../pages/Repository_Intelligent/RepositoryIntelligence";

import Repositories from "../pages/Repository_Intelligent/Repositories";

import RiskModels from "../pages/Repository_Intelligent/RiskModels";

import ArchitectureVisualization from "../pages/Repository_Intelligent/ArchitectureVisualization";

import ArchitectureIssues from "../pages/Repository_Intelligent/ArchitectureIssues";

import Dependencies from "../pages/Repository_Intelligent/Dependencies";

import EvolutionOverview from "../pages/Repository_Intelligent/EvolutionOverview";

// =============================================================
// COMPONENT 3
// =============================================================
import QualityTestingIntelligence from "../pages/QA_Intelligent/QualityTestingIntelligence";

import Requirements from "../pages/QA_Intelligent/Requirements";

import RequirementDetails from "../pages/QA_Intelligent/RequirementDetails";

import QAReportsAnalytics from "../pages/QA_Intelligent/QAReportsAnalytics";

// =============================================================
// COMPONENT 4
// =============================================================
import TraceabilityIntelligence from "../pages/Tracebility_Intelligent/TraceabilityIntelligence";

// =============================================================
// SHARED LAYER
// =============================================================
import KnowledgeGraph from "../pages/KnowledgeGraph";

import Reports from "../pages/Reports";

import ActivityMonitor from "../pages/ActivityMonitor";

// =============================================================
// SYSTEM
// =============================================================
import AboutAspire from "../pages/AboutAspire";
import AIExplanation from "../pages/Repository_Intelligent/AIExplanation";
import CrossComponentInsights from "../pages/CrossComponentInsights";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* =====================================================
              DEFAULT
          ====================================================== */}

          <Route index element={<Navigate to="/overview" replace />} />

          {/* =====================================================
              RESEARCH OVERVIEW
          ====================================================== */}

          <Route path="overview" element={<ResearchOverview />} />

          {/* =====================================================
              COMPONENT 1
          ====================================================== */}

          <Route path="requirement" element={<RequirementIntelligence />} />

          {/* =====================================================
              COMPONENT 2
          ====================================================== */}

          <Route path="repository" element={<RepositoryIntelligence />} />

          <Route path="repository/repositories" element={<Repositories />} />

          <Route path="repository/evalution" element={<EvolutionOverview />} />

          <Route path="repository/risk-models" element={<RiskModels />} />

          <Route
            path="repository/architecture"
            element={<ArchitectureVisualization />}
          />

          <Route path="repository/issues" element={<ArchitectureIssues />} />

          <Route path="repository/dependencies" element={<Dependencies />} />

          {/* =====================================================
              COMPONENT 3
              QUALITY & TESTING INTELLIGENCE
          ====================================================== */}

          <Route path="quality" element={<QualityTestingIntelligence />} />

          <Route path="quality/requirements" element={<Requirements />} />
          <Route path="repository/ai-explanation" element={<AIExplanation />} />
          <Route path="repository/issues" element={<ArchitectureIssues />} />

          <Route
            path="quality/requirement-details/:requirementId"
            element={<RequirementDetails />}
          />

          {/* =====================================================
              COMPONENT 4
          ====================================================== */}

          <Route path="traceability" element={<TraceabilityIntelligence />} />

          {/* =====================================================
              SHARED LAYER
          ====================================================== */}

          <Route path="knowledge-graph" element={<KnowledgeGraph />} />

          {/* Main shared Reports page */}

          {/* Component 3 QA report displayed under Shared Layer */}
          <Route path="reports/quality" element={<QAReportsAnalytics />} />

          <Route path="activity" element={<ActivityMonitor />} />

          <Route path="insights" element={<CrossComponentInsights />} />

          {/* =====================================================
              SYSTEM
          ====================================================== */}

          <Route path="about" element={<AboutAspire />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
