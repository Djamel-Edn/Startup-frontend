"use client";

import { useState, useEffect } from "react";
import {
  makeStyles,
  tokens,
  ProgressBar,
  Spinner,
  Text,
  Title2,
  Button,
} from "@fluentui/react-components";
import {
  ChevronRightRegular,
  CalendarLtr20Regular,
  ErrorCircleRegular,
  PeopleTeam24Regular,
  CommentDismiss24Regular,
} from "@fluentui/react-icons";
import {
  getProjectById,
  getProjectSessions,
  type Session,
  type Feedback,
} from "../../../api/project-service";
import { useAuthContext } from "../components/AuthContext";

const useStyles = makeStyles({
  layout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    overflow: "hidden",
  },
  headerSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "1.5rem 2rem",
    borderRadius: "8px",
    boxShadow: tokens.shadow4,
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
    width: "95%",
    position: "relative",
    boxSizing: "border-box",
    overflow: "hidden",
  },
  headerTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: "700",
    color: tokens.colorNeutralForeground1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: 0,
    zIndex: 1,
  },
  progressSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "0 2rem",
    boxSizing: "border-box",
  },
  progressPercentage: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: "600",
    color: tokens.colorBrandForeground1,
    position: "relative",
    zIndex: 1,
    marginBottom: "0.5rem",
  },
  globalProgressBar: {
    width: "100%",
    height: "6px",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentWrapper: {
    display: "flex",
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: "hidden",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    padding: "0 1rem",
    gap: "1rem",
    position: "relative",
  },
  sessionsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    flex: "1 1 33%",
    padding: "0 1rem",
    overflowY: "auto",
  },
  sessionHeader: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  sessionCount: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  sessionItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.25rem 0.5rem",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "4px",
    marginBottom: "0.75rem",
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground4,
    },
  },
  sessionDate: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    fontWeight: "500",
  },
  modulesSection: {
    flex: "2 1 66%",
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    padding: "0 1rem",
  },
  modulesList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  moduleItem: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  moduleName: {
    fontSize: "14px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  moduleDescription: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
  },
  modulePercentage: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
  },
  feedbackCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "1rem 1.5rem",
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
  },
  feedbackAvatar: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: tokens.colorNeutralBackground4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    lineHeight: "1.5",
  },
  noFeedback: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "2rem",
    marginTop: "1rem",
  },
  noFeedbackIcon: {
    fontSize: "28px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "1.5rem",
  },
  noFeedbackTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "1rem",
  },
  noFeedbackText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    maxWidth: "350px",
    margin: "0 auto",
    lineHeight: "1.6",
  },
  noSessionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "6rem 4rem",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
  },
  noSessionsIcon: {
    fontSize: "28px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "1.5rem",
    width: "56px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "8px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
  },
  paginationItem: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  paginationItemActive: {
    backgroundColor: tokens.colorNeutralBackground3,
    fontWeight: tokens.fontWeightSemibold,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    padding: "2rem",
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "3rem",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    color: tokens.colorStatusDangerForeground1,
    gap: "1.5rem",
  },
  errorIcon: {
    fontSize: "40px",
    color: tokens.colorStatusDangerForeground1,
  },
  noProjectContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "4rem 2rem",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    margin: "1.5rem auto",
    width: "95%",
    maxWidth: "600px",
    boxShadow: tokens.shadow4,
  },
  noProjectIcon: {
    fontSize: "32px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "1rem",
    width: "64px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "12px",
  },
  noProjectTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "0.75rem",
  },
  noProjectMessage: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    maxWidth: "400px",
    margin: "0 auto 1rem",
    lineHeight: "1.6",
  },
  actionsContainer: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
  },
});

interface ModuleProgress {
  id: string;
  name: string;
  description: string;
  percentage: number;
}

const Progress = () => {
  const styles = useStyles();
  const { user } = useAuthContext();
  const projectId = user?.projectId;
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fixedModules: ModuleProgress[] = [
    { id: "module1", name: "Development", description: "Building the core product features", percentage: 0 },
    { id: "module2", name: "Documentation", description: "Creating project documentation", percentage: 0 },
    { id: "module3", name: "Research", description: "Conducting research and analysis", percentage: 0 },
    { id: "module4", name: "Testing", description: "Testing product functionality", percentage: 0 },
  ];

  const fetchProjectData = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!projectId || projectId === "undefined") {
        throw new Error("No project assigned");
      }

      console.log("Fetching project data for projectId:", projectId);
      try {
        const projectData = await getProjectById(projectId);
        console.log(projectData, "Project data fetched successfully");
        setProjectName(projectData?.name || "Project");
      } catch (err) {
        console.warn("Project endpoint error:", err);
        setProjectName("Project");
      }

      try {
        console.log("Fetching sessions for projectId:", projectId);
        const sessionsData = await getProjectSessions(projectId);
        setSessions(sessionsData || []);
      } catch (err) {
        console.warn("Sessions endpoint error:", err);
        setSessions([]);
      }
    } catch (err) {
      console.error("Error fetching project data:", err);
      setError(err instanceof Error ? err.message : "Failed to load project data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId && projectId !== "undefined") {
      fetchProjectData();
    } else {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (sessions.length > 0 && !selectedSessionId) {
      setSelectedSessionId(sessions[0].id);
    }
  }, [sessions]);

  const handleSessionClick = (sessionId: string) => {
    setSelectedSessionId(sessionId);
  };

  const handleSessionAdded = () => {
    fetchProjectData();
  };

  const handleFeedbackAdded = () => {
    fetchProjectData();
  };

  const getSessionModuleProgress = (session: Session): ModuleProgress[] => {
    return [
      { id: "module1", name: "Development", description: "Building the core product features", percentage: Number(session.module1) || 0 },
      { id: "module2", name: "Documentation", description: "Creating project documentation", percentage: Number(session.module2) || 0 },
      { id: "module3", name: "Research", description: "Conducting research and analysis", percentage: Number(session.module3) || 0 },
      { id: "module4", name: "Testing", description: "Testing product functionality", percentage: Number(session.module4) || 0 },
    ];
  };

  const calculateGlobalProgress = () => {
    if (sessions.length === 0) return 0;
    const lastSession = sessions[sessions.length - 1];
    const moduleValues = [
      Number(lastSession.module1) || 0,
      Number(lastSession.module2) || 0,
      Number(lastSession.module3) || 0,
      Number(lastSession.module4) || 0,
    ];
    return Math.round(moduleValues.reduce((sum, value) => sum + value, 0) / 4);
  };

  const globalProgress = calculateGlobalProgress();
  const hasNoSessions = sessions.length === 0;
  const currentSession = hasNoSessions
    ? null
    : sessions.find((session) => session.id === selectedSessionId) || sessions[0];
  const currentModules = currentSession ? getSessionModuleProgress(currentSession) : fixedModules;
  const currentFeedback = currentSession?.feedback;

  if (!projectId || projectId === "undefined") {
    return (
      <div className={styles.layout}>
        <div className={styles.noProjectContainer}>
          <div className={styles.noProjectIcon}>
            <PeopleTeam24Regular style={{ fontSize: "28px" }} />
          </div>
          <h3 className={styles.noProjectTitle}>No Project Assigned</h3>
          <p className={styles.noProjectMessage}>
            You are not currently assigned to a project. Contact your mentor or join a project to view progress.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Loading project progress..." />
      </div>
    );
  }

  if (error && error !== "Project data is invalid or empty") {
    return (
      <div className={styles.errorContainer}>
        <ErrorCircleRegular className={styles.errorIcon} />
        <h2>Error Loading Project</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <div className={styles.headerSection}>
        <div className={styles.headerTitle}>
          <Title2>{projectName || "Project"} Progress</Title2>
          <span className={styles.progressPercentage}>{globalProgress}%</span>
        </div>
        <div className={styles.progressSection}>
          <ProgressBar
            value={globalProgress / 100}
            thickness="large"
            className={styles.globalProgressBar}
          />
        </div>
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          <div className={styles.sessionsSection}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className={styles.sessionHeader}>
                Sessions <span className={styles.sessionCount}>({sessions.length})</span>
              </h2>
              <AddSessionModal projectId={projectId!} onSessionAdded={handleSessionAdded} />
            </div>
            {hasNoSessions ? (
              <div className={styles.noSessionsContainer}>
                <div className={styles.noSessionsIcon}>
                  <CalendarLtr20Regular style={{ fontSize: "24px" }} />
                </div>
                <h3 className={styles.noFeedbackTitle}>No Sessions Yet</h3>
                <p className={styles.noFeedbackText}>
                  When your mentor submits a new progress report, you can see it here.
                </p>
              </div>
            ) : (
              sessions.map((session) => (
                <div
                  key={session.id}
                  className={styles.sessionItem}
                  onClick={() => handleSessionClick(session.id)}
                  style={{
                    borderLeft: selectedSessionId === session.id ? `3px solid ${tokens.colorBrandBackground}` : "none",
                  }}
                >
                  <span className={styles.sessionDate}>
                    {session.date ? new Date(session.date).toLocaleDateString() : "No date available"}
                  </span>
                  <ChevronRightRegular />
                </div>
              ))
            )}
            <div className={styles.pagination}>
              <div className={styles.paginationItem}>{"<"}</div>
              <div className={`${styles.paginationItem} ${styles.paginationItemActive}`}>1</div>
              <div className={styles.paginationItem}>{">"}</div>
            </div>
          </div>

          <div className={styles.modulesSection}>
            <h2 className={styles.sessionHeader}>Module Progress</h2>
            <div className={styles.modulesList}>
              {currentModules
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((module) => (
                  <div key={module.id} className={styles.moduleItem}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span className={styles.moduleName}>{module.name}</span>
                      <span className={styles.modulePercentage}>{module.percentage}%</span>
                    </div>
                    <p className={styles.moduleDescription}>{module.description}</p>
                    <ProgressBar value={module.percentage / 100} thickness="medium" />
                  </div>
                ))}
            </div>
            {currentSession && (
              <>
                <h2 className={styles.sessionHeader} style={{ marginTop: "1.5rem" }}>
                  Feedback ({new Date(currentSession.date).toLocaleDateString()})
                </h2>
                <div className={styles.actionsContainer}>
                  <AddFeedbackModal
                    sessionId={currentSession.id}
                    onFeedbackAdded={handleFeedbackAdded}
                  />
                </div>
                {currentFeedback ? (
                  <div className={styles.feedbackCard}>
                    <div className={styles.feedbackAvatar}>
                      <CommentDismiss24Regular />
                    </div>
                    <div>
                      <h4 className={styles.moduleName}>{currentFeedback.author || "Anonymous"}</h4>
                      <p className={styles.feedbackText}>{currentFeedback.text || "No feedback provided"}</p>
                    </div>
                  </div>
                ) : (
                  <div className={styles.noFeedback}>
                    <div className={styles.noFeedbackIcon}>
                      <CommentDismiss24Regular />
                    </div>
                    <h3 className={styles.noFeedbackTitle}>No Feedback Yet</h3>
                    <p className={styles.noFeedbackText}>
                      Once your mentor reviews your progress, feedback will appear here.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;