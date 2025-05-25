import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


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

const App: React.FC = () => {
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