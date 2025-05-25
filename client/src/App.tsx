import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { StatsOverviewSection } from "./admin/screens/MainContent/sections/StatsOverviewSection/StatsOverviewSection";
import { StudentManagement } from "./admin/pages/StudentManagement";
import {ProjectManagement} from "./admin/pages/ProjectManagement";
import TeamsManagement from "./admin/pages/TeamManagement";
import TrainingManagement from "./admin/pages/TrainingManagement";
import DashboardLayout2 from "./admin/components/DashboardLayout2";
import { HeaderSection } from "./admin/screens/MainContent/sections/HeaderSection";
import { Button } from "@fluentui/react-components";
import { Add24Regular } from "@fluentui/react-icons";

const Home = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login'));
const SignUpSelection = React.lazy(() => import('./pages/SignUpSelection'));
const StudentSignUp = React.lazy(() => import('./pages/StudentSignUp'));
const ProfessorSignUp = React.lazy(() => import('./pages/ProfessorSignUp'));
const Otp = React.lazy(() => import('./pages/Otp'));
const Application = React.lazy(() => import('./pages/Application'));
const Team = React.lazy(() => import('./pages/Team'));
const DashboardLayout = React.lazy(() => import('./pages/components/DashboardLayout'));
const Progress = React.lazy(() => import('./pages/Progress'));
const Training = React.lazy(() => import('./pages/Training'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const ForgotPassword = React.lazy(() => import('./pages/forgot_password'));
const Support = React.lazy(() => import('./pages/Support'));
const Settings = React.lazy(() => import('./pages/Settings'));
const ProjectsManagement = React.lazy(() => import('./pages/mentor/project-management'));
const ProjectDetail = React.lazy(() => import('./pages/mentor/project-details'));
const ProtectedRoute = React.lazy(() => import('./pages/components/ProtectedRoute'));
import { useStyles } from "./admin/lib/theme";

const App: React.FC = () => {
  const styles = useStyles();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpSelection />} />
        <Route path="/signup/student" element={<StudentSignUp />} />
        <Route path="/signup/professor" element={<ProfessorSignUp />} />
        <Route path="/verifyEmail" element={<Otp />} />
        <Route path="/application" element={<Application />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute allowedRoles={['MEMBER', 'SUPERVISOR']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/support" element={<Support />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['MEMBER']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/progress" element={<Progress  />} />
            <Route path="/team" element={<Team />} />
            <Route path="/training" element={<Training/>} />
          </Route>
        </Route>
        <Route element={<DashboardLayout2 />}>
        <Route path="/dashboards" element={<div>Dashboard Page</div>} />
        <Route
          path="/student"
          element={
            <main className={styles.root}>
              <HeaderSection
                title="Student Management"
                subtitle="Track and manage all your Students info"
              />
              <StatsOverviewSection />
              <StudentManagement />
            </main>
          }
        />
       
        <Route
          path="/teams"
          element={
            <main className={styles.root}>
              <HeaderSection
                title="Team Management"
                subtitle="Track and manage all your Teams info"
              />
              <StatsOverviewSection />
              <TeamsManagement />
            </main>
          }
        />
        <Route
          path="/trainings"
          element={
            <main className={styles.root}>
              <HeaderSection
                title="Training Management"
                subtitle="Track and manage all your Training info"
              >
                <Button
                  appearance="primary"
                  data-button-type="training-schedule"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        d="M14.5 3.5C15.8807 3.5 17 4.61929 17 6V10.0997C16.6832 9.93777 16.3486 9.80564 16 9.70703V7.5H4V15C4 15.8284 4.67157 16.5 5.5 16.5H9.20703C9.30564 16.8486 9.43777 17.1832 9.59971 17.5H5.5C4.11929 17.5 3 16.3807 3 15V6C3 4.61929 4.11929 3.5 5.5 3.5H14.5ZM14.5 4.5H5.5C4.67157 4.5 4 5.17157 4 6V6.5H16V6C16 5.17157 15.3284 4.5 14.5 4.5ZM19 15C19 17.4853 16.9853 19.5 14.5 19.5C12.0147 19.5 10 17.4853 10 15C10 12.5147 12.0147 10.5 14.5 10.5C16.9853 10.5 19 12.5147 19 15ZM15 13C15 12.7239 14.7761 12.5 14.5 12.5C14.2239 12.5 14 12.7239 14 13V14.5H12.5C12.2239 14.5 12 14.7239 12 15C12 15.2761 12.2239 15.5 12.5 15.5H14V17C14 17.2761 14.2239 17.5 14.5 17.5C14.7761 17.5 15 17.2761 15 17V15.5H16.5C16.7761 15.5 17 15.2761 17 15C17 14.7239 16.7761 14.5 16.5 14.5H15V13Z"
                        fill="white"
                      />
                    </svg>
                  }
                >
                  schedule
                </Button>
              </HeaderSection>
              <StatsOverviewSection />
              <TrainingManagement />
            </main>
          }
        /> <Route
          path="/projects"
          element={
            <main className={styles.root}>
              <HeaderSection
                title="Projects Management"
                subtitle="Track and manage all your projects"
              >
                <Button appearance="primary" icon={<Add24Regular />}>
                  New Project
                </Button>
              </HeaderSection>
              <StatsOverviewSection />
              <ProjectManagement />
            </main>
          }
        />
      </Route>
        <Route element={<ProtectedRoute allowedRoles={['SUPERVISOR']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/mentor/projects-management" element={<ProjectsManagement />} />
            <Route path="/mentor/projects/:projectId" element={<ProjectDetail />}  />
            <Route path="/mentor/teams-management" element={<div>Teams Management</div>} />
          </Route>
        </Route>
        <Route path="/404" element={<div>404 - Page Not Found</div>} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};
export default App;