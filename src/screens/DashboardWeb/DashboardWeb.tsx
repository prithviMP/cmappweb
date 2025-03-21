import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PageLayout } from "../../components/layout/PageLayout";
import { DashboardStatsSection } from "./sections/DashboardStatsSection";
import { HealthOverviewSection } from "./sections/HealthOverviewSection/HealthOverviewSection";
import { HelpSupportSection } from "./sections/HelpSupportSection/HelpSupportSection";
import { ProjectManagerDetailsSection } from "./sections/ProjectManagerDetailsSection/ProjectManagerDetailsSection";
import { ProjectSummarySection } from "./sections/ProjectSummarySection";
import { ProjectTypeDistributionSection } from "./sections/ProjectTypeDistributionSection";
import { TaskOverviewSection } from "./sections/TaskOverviewSection";
import { ProjectsScreen } from "../ProjectsScreen/ProjectsScreen";
import { ProjectDetailScreen } from "../ProjectDetailScreen/ProjectDetailScreen";
import { RequestsScreen } from "../RequestsScreen/RequestsScreen";
import { ResourcesScreen } from "../ResourcesScreen/ResourcesScreen";
import { ContractorsScreen } from "../ContractorsScreen/ContractorsScreen";
import { SettingsScreen } from "../SettingsScreen/SettingsScreen";
import { LoginScreen } from "../LoginScreen/LoginScreen";
import useAuthStore from "../../lib/store/useAuthStore";

const DashboardContent = () => (
  <>
    <div className="col-span-12">
      <DashboardStatsSection />
    </div>
    <div className="col-span-12 lg:col-span-5">
      <ProjectManagerDetailsSection />
    </div>
    <div className="col-span-12 lg:col-span-4">
      <HelpSupportSection />
    </div>
    <div className="col-span-12 lg:col-span-3">
      <ProjectSummarySection />
    </div>
    <div className="col-span-12 lg:col-span-7">
      <HealthOverviewSection />
    </div>
    <div className="col-span-12 lg:col-span-5">
      <TaskOverviewSection />
    </div>
  </>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const DashboardWeb = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <PageLayout>
              <DashboardContent />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <PageLayout>
              <ProjectsScreen />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/projects/:id"
        element={
          <ProtectedRoute>
            <PageLayout>
              <ProjectDetailScreen />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/requests"
        element={
          <ProtectedRoute>
            <PageLayout>
              <RequestsScreen />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/resources"
        element={
          <ProtectedRoute>
            <PageLayout>
              <ResourcesScreen />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/contractors"
        element={
          <ProtectedRoute>
            <PageLayout>
              <ContractorsScreen />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <PageLayout>
              <SettingsScreen />
            </PageLayout>
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/help"
        element={
          <ProtectedRoute>
            <PageLayout>
              <div className="col-span-12 p-4">Help & Support Page</div>
            </PageLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};