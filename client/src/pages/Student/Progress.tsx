"use client";

import { useState, useEffect } from "react";
import {
  makeStyles,
  tokens,
  ProgressBar,
  TabList,
  Tab,
  Spinner,
  SelectTabEventHandler,
  Text,
  Title2,
  Button,
  Link,
} from "@fluentui/react-components";
import {
  ChevronRightRegular,
  DocumentRegular,
  Folder20Filled,
  Folder20Regular,
  Comment20Filled,
  Comment20Regular,
  CommentDismiss24Regular,
  CalendarLtr20Regular,
  ErrorCircleRegular,
  PeopleTeam24Regular,
} from "@fluentui/react-icons";
import {
  getProjectById,
  getProjectSessions,
  getProjectMembers,
  getProjectEncadrants,
  type Session,
} from "../../../api/project-service";
import AddDeliverableModal from "../components/add-delivrable-modal";
import AddFeedbackModal from "../components/add-feedback-modal";
import type { Deliverable, Feedback } from "../../../types";
import { useAuthContext } from "../components/AuthContext";

const useStyles = makeStyles({
  layout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // Ensure full height without scrollbar
    overflow: "hidden", // Prevent unnecessary scrollbars
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
  progressText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    fontWeight: "500",
  },
  contentWrapper: {
    display: "flex",
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: "hidden", // Prevent scrollbars
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
  deliverablesSection: {
    flex: "2 1 66%",
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    padding: "0 1rem",
  },
  tabContainer: {
    marginBottom: "0.5rem",
  },
  deliverableCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "1rem 1.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
  },
  deliverableInfo: {
    flex: 1,
  },
  deliverableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  deliverableName: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: "500",
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  deliverableSubtext: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    margin: 0,
    lineHeight: "1.5",
  },
  statusBadge: {
    fontSize: "12px",
    padding: "4px 12px",
    borderRadius: "16px",
    backgroundColor: "transparent",
    border: `1px solid ${tokens.colorBrandStroke1}`,
    color: tokens.colorBrandForeground1,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  notStartedBadge: {
    fontSize: "12px",
    padding: "4px 12px",
    borderRadius: "16px",
    backgroundColor: "transparent",
    border: `1px solid ${tokens.colorNeutralForeground3}`,
    color: tokens.colorNeutralForeground3,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  progressInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "0.5rem",
  },
  progressPercentageSmall: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: "600",
    color: tokens.colorBrandForeground1,
  },
  progressChange: {
    fontSize: "14px",
    color: tokens.colorStatusSuccessForeground1,
  },
  feedbackCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "1rem 1.5rem",
    marginBottom: "1rem",
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
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "14px",
  },
  noFeedback: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "4rem 2rem",
    height: "100%",
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
  defaultDeliverablesList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
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
  actionsContainer: {
    display: "flex",
    gap: "1rem",
    marginTop: "1.5rem",
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
  noProjectButton: {
    fontSize: "14px",
    padding: "0.5rem 1rem",
  },
});

const defaultDeliverables: Deliverable[] = [
  {
    title: "Prototype",
    description: "Is the MVP of your product?",
    status: "not started",
    progress: 0,
    change: "+0%",
  },
  {
    title: "Demo Video",
    description: "A demo video to showcase the features and working of your product",
    status: "not started",
    progress: 0,
    change: "+0%",
  },
  {
    title: "Pitch Deck",
    description: "A slides presentation to pitch your project at Demo Day.",
    status: "not started",
    progress: 0,
    change: "+0%",
  },
  {
    title: "Deliverable name",
    description: "Upload your file before the deadline to submit for review",
    status: "not started",
    progress: 0,
    change: "+0%",
  },
];

const Progress = () => {
  const styles = useStyles();
  const { user } = useAuthContext();
  const projectId = user?.projectId;
  const [activeTab, setActiveTab] = useState("deliverables");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [projectName, setProjectName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [members, setMembers] = useState<{ id: string; name: string; avatar?: string }[]>([]);
  const [encadrants, setEncadrants] = useState<{ id: string; name: string; avatar?: string }[]>([]);

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

      // Uncomment when sessions endpoint is ready
      // try {
      //   console.log("Fetching sessions for projectId:", projectId);
      //   const sessionsData = await getProjectSessions(projectId);
      //   setSessions(sessionsData || []);
      // } catch (err) {
      //   console.warn("Sessions endpoint error:", err);
      //   setSessions([]);
      // }

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
      setLoading(false); // Skip loading if no projectId
    }
  }, [projectId]);

  useEffect(() => {
    if (sessions.length > 0 && !selectedSessionId) {
      setSelectedSessionId(sessions[0].id);
    }
  }, [sessions]);

  const handleTabChange: SelectTabEventHandler = (_event, data) => {
    setActiveTab(data.value as string);
  };

  const handleSessionClick = (sessionId: string) => {
    setSelectedSessionId(sessionId);
  };

  const handleDeliverableAdded = () => {
    fetchProjectData();
  };

  const handleFeedbackAdded = () => {
    fetchProjectData();
  };

  const calculateGlobalProgress = () => {
    if (sessions.length === 0) return 0;

    let totalProgress = 0;
    let totalDeliverables = 0;

    sessions.forEach((session) => {
      if (session.deliverables) {
        session.deliverables.forEach((deliverable: Deliverable) => {
          totalProgress += deliverable.progress || 0;
          totalDeliverables++;
        });
      }
    });

    return totalDeliverables > 0 ? Math.round(totalProgress / totalDeliverables) : 0;
  };

  const globalProgress = calculateGlobalProgress();
  const hasNoSessions = sessions.length === 0;
  const currentSession = hasNoSessions ? null : sessions.find((session) => session.id === selectedSessionId) || null;
  const currentDeliverables: Deliverable[] = hasNoSessions ? [] : currentSession?.deliverables || [];
  const currentFeedbacks: Feedback[] = hasNoSessions ? [] : currentSession?.feedbacks || [];
  const totalDeliverables = hasNoSessions
    ? defaultDeliverables.length
    : sessions.reduce((total, session) => total + (session.deliverables?.length || 0), 0);
  const totalFeedbacks = hasNoSessions
    ? 0
    : sessions.reduce((total, session) => total + (session.feedbacks?.length || 0), 0);

  if (!projectId || projectId === "undefined") {
    return (
      <div className={styles.layout}>
        <div className={styles.noProjectContainer}>
          <div className={styles.noProjectIcon}>
            <PeopleTeam24Regular style={{ fontSize: "28px" }} />
          </div>
          <h3 className={styles.noProjectTitle}>No Project Assigned</h3>
          <p className={styles.noProjectMessage}>
            "You are not currently assigned to a project. Contact your mentor or join a project to view progress."
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
          {hasNoSessions ? (
            <>
              <div className={styles.sessionsSection}>
                <h2 className={styles.sessionHeader}>
                  Sessions <span className={styles.sessionCount}>({sessions.length})</span>
                </h2>
                <div className={styles.noSessionsContainer}>
                  <div className={styles.noSessionsIcon}>
                    <CalendarLtr20Regular style={{ fontSize: "24px" }} />
                  </div>
                  <h3 className={styles.noFeedbackTitle}>No Sessions Yet</h3>
                  <p className={styles.noFeedbackText}>
                    When your mentor submits a new progress report, you can see it here.
                  </p>
                </div>
                <div className={styles.pagination}>
                  <div className={styles.paginationItem}>{"<"}</div>
                  <div className={`${styles.paginationItem} ${styles.paginationItemActive}`}>1</div>
                  <div className={styles.paginationItem}>{">"}</div>
                </div>
              </div>

              <div className={styles.deliverablesSection}>
                <div className={styles.tabContainer}>
                  <TabList
                    selectedValue={activeTab}
                    onTabSelect={handleTabChange}
                  >
                    <Tab value="deliverables">
                      <div className={styles.statItem}>
                        {activeTab === "deliverables" ? (
                          <Folder20Filled style={{ color: tokens.colorBrandForeground1 }} />
                        ) : (
                          <Folder20Regular />
                        )}
                        <span>Deliverables ({totalDeliverables})</span>
                      </div>
                    </Tab>
                    <Tab value="feedbacks">
                      <div className={styles.statItem}>
                        {activeTab === "feedbacks" ? (
                          <Comment20Filled style={{ color: tokens.colorBrandForeground1 }} />
                        ) : (
                          <Comment20Regular />
                        )}
                        <span>Feedbacks ({totalFeedbacks})</span>
                      </div>
                    </Tab>
                  </TabList>
                </div>

                <div className={styles.defaultDeliverablesList}>
                  {activeTab === "deliverables" ? (
                    defaultDeliverables.map((item, index) => (
                      <div key={index} className={styles.deliverableCard}>
                        <div className={styles.deliverableInfo}>
                          <div className={styles.deliverableHeader}>
                            <h3 className={styles.deliverableName}>{item.title}</h3>
                            <div className={styles.notStartedBadge}>Not started</div>
                          </div>
                          <p className={styles.deliverableSubtext}>{item.description}</p>
                        </div>
                        <div className={styles.progressInfo}>
                          <span className={styles.progressPercentageSmall}>{item.progress}%</span>
                          <span className={styles.progressChange}>{item.change}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noFeedback}>
                      <div className={styles.noFeedbackIcon}>
                        <CommentDismiss24Regular />
                      </div>
                      <h3 className={styles.noFeedbackTitle}>No Feedbacks Yet</h3>
                      <p className={styles.noFeedbackText}>
                        Once you submit your deliverable, your mentor will review it and leave feedback
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.sessionsSection}>
                <h2 className={styles.sessionHeader}>
                  Sessions <span className={styles.sessionCount}>({sessions.length})</span>
                </h2>
                {sessions.map((session, index) => (
                  <div
                    key={index}
                    className={styles.sessionItem}
                    onClick={() => handleSessionClick(session.id)}
                    style={{
                      borderLeft: selectedSessionId === session.id ? `3px solid ${tokens.colorBrandBackground}` : "none",
                    }}
                  >
                    <span className={styles.sessionDate}>{session.date || "No date available"}</span>
                    <ChevronRightRegular />
                  </div>
                ))}

                <div className={styles.pagination}>
                  <div className={styles.paginationItem}>{"<"}</div>
                  <div className={`${styles.paginationItem} ${styles.paginationItemActive}`}>1</div>
                  <div className={styles.paginationItem}>{">"}</div>
                </div>
              </div>

              <div className={styles.deliverablesSection}>
                <div className={styles.tabContainer}>
                  <TabList
                    selectedValue={activeTab}
                    onTabSelect={handleTabChange}
                  >
                    <Tab value="deliverables">
                      <div className={styles.statItem}>
                        {activeTab === "deliverables" ? (
                          <Folder20Filled style={{ color: tokens.colorBrandForeground1 }} />
                        ) : (
                          <Folder20Regular />
                        )}
                        <span>Deliverables ({totalDeliverables})</span>
                      </div>
                    </Tab>
                    <Tab value="feedbacks">
                      <div className={styles.statItem}>
                        {activeTab === "feedbacks" ? (
                          <Comment20Filled style={{ color: tokens.colorBrandForeground1 }} />
                        ) : (
                          <Comment20Regular />
                        )}
                        <span>Feedbacks ({totalFeedbacks})</span>
                      </div>
                    </Tab>
                  </TabList>
                </div>

                {activeTab === "deliverables" ? (
                  <>
                    <div className={styles.actionsContainer}>
                      {currentSession && (
                        <AddDeliverableModal
                          sessionId={currentSession.id}
                          onDeliverableAdded={handleDeliverableAdded}
                        />
                      )}
                    </div>
                    {currentDeliverables.length > 0 ? (
                      currentDeliverables.map((item: Deliverable, index: number) => (
                        <div key={index} className={styles.deliverableCard}>
                          <div className={styles.deliverableInfo}>
                            <div className={styles.deliverableHeader}>
                              <h3 className={styles.deliverableName}>{item.title || "Untitled"}</h3>
                              <div className={styles.statusBadge}>{item.status || "Unknown"}</div>
                            </div>
                            <p className={styles.deliverableSubtext}>{item.description || "No description"}</p>
                          </div>
                          <div className={styles.progressInfo}>
                            <span className={styles.progressPercentageSmall}>{item.progress || 0}%</span>
                            <span className={styles.progressChange}>{item.change || "+0%"}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={styles.noFeedback}>
                        <div className={styles.noFeedbackIcon}>
                          <Folder20Filled />
                        </div>
                        <h3 className={styles.noFeedbackTitle}>No Deliverables Yet</h3>
                        <p className={styles.noFeedbackText}>
                          This session doesn't have any deliverables assigned yet.
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className={styles.actionsContainer}>
                      {currentSession && (
                        <AddFeedbackModal sessionId={currentSession.id} onFeedbackAdded={handleFeedbackAdded} />
                      )}
                    </div>
                    {currentFeedbacks.length > 0 ? (
                      currentFeedbacks.map((feedback: Feedback, index: number) => (
                        <div key={index} className={styles.feedbackCard}>
                          <div className={styles.feedbackAvatar}>
                            <DocumentRegular />
                          </div>
                          <div>
                            <h4 className={styles.deliverableName}>{feedback.author || "Anonymous"}</h4>
                            <p className={styles.feedbackText}>{feedback.text || "No feedback provided"}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={styles.noFeedback}>
                        <div className={styles.noFeedbackIcon}>
                          <CommentDismiss24Regular />
                        </div>
                        <h3 className={styles.noFeedbackTitle}>No Feedbacks Yet</h3>
                        <p className={styles.noFeedbackText}>
                          Once you submit your deliverable, your mentor will review it and leave feedback
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;