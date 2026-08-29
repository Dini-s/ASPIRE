import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../Layouts/DashboardLayout";
import ResearchOverview from "../pages/ResearchOverview";
import RequirementIntelligence from "../pages/RequirementIntelligent/RequirementIntelligence";
import RepositoryIntelligence from "../pages/Repository_Intelligent/RepositoryIntelligence";
import Repositories from "../pages/Repository_Intelligent/Repositories";
import RiskModels from "../pages/Repository_Intelligent/RiskModels";
import ArchitectureVisualization from "../pages/Repository_Intelligent/ArchitectureVisualization";
import ArchitectureIssues from "../pages/Repository_Intelligent/ArchitectureIssues";
import Dependencies from "../pages/Repository_Intelligent/Dependencies";
import QualityTestingIntelligence from "../pages/QA_Intelligent/QualityTestingIntelligence";
import TraceabilityIntelligence from "../pages/Tracebility_Intelligent/TraceabilityIntelligence";
import KnowledgeGraph from "../pages/KnowledgeGraph";
import Reports from "../pages/Reports";
import ActivityMonitor from "../pages/ActivityMonitor";
import AboutAspire from "../pages/AboutAspire";
import EvolutionOverview from "../pages/Repository_Intelligent/EvolutionOverview";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/overview" replace />} />

          <Route path="overview" element={<ResearchOverview />} />

          <Route path="requirement" element={<RequirementIntelligence />} />

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

          <Route path="quality" element={<QualityTestingIntelligence />} />

          <Route path="traceability" element={<TraceabilityIntelligence />} />

          <Route path="knowledge-graph" element={<KnowledgeGraph />} />

          <Route path="reports" element={<Reports />} />

          <Route path="activity" element={<ActivityMonitor />} />

          <Route path="about" element={<AboutAspire />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
