"use client";

import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  makeStyles, 
  Button, 
  Spinner, 
  TabList, 
  Tab, 
  type SelectTabEventHandler, 
  tokens, 
  Textarea
} from "@fluentui/react-components";
import {
  ChevronRight20Regular,
  Folder20Filled,
  Folder20Regular,
  Comment20Filled,
  Comment20Regular,
  DocumentRegular,
  PeopleRegular,
  CalendarLtr20Regular,
  Add16Filled,
} from "@fluentui/react-icons";
import { useAuthContext } from "../components/AuthContext";
import { Deliverable, Feedback, Project, Session } from "../../../types";
import CreateSessionModal from "../components/create-session-modal";
import { addFeedback, getModulesProgress, getProjectById, getProjectSessions, updateAllModulesProgress } from "../../../api/project-service";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: "hidden",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "16px 24px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  breadcrumbLink: {
    color: tokens.colorNeutralForeground2,
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  },
  breadcrumbCurrent: { color: tokens.colorNeutralForeground1 },
  projectHeader: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "10px 20px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "8px",
    boxShadow: "0 1px 1px rgba(0, 0, 0, 1)",
    margin: "0 28px",
  },
  projectHeaderTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectTitle: {
    fontSize: "24px",
    fontWeight: "700",
    margin: 0,
    color: tokens.colorNeutralForeground1,
  },
  progressContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "2px",
  },
  progressPercentage: {
    fontSize: "32px",
    fontWeight: "700",
    marginTop: "0.5rem",
    color: tokens.colorBrandForeground1,
  },
  progressChange: {
    fontSize: "16px",
    fontWeight: "500",
    color: tokens.colorStatusSuccessForeground1,
  },
  projectInfo: {
    display: "flex",
    gap: "24px",
    marginTop: "8px",
  },
  projectInfoItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  mainArea: { flex: 1, display: "flex", overflow: "hidden" },
  sessionsPanel: {
    width: "450px",
    display: "flex",
    flexDirection: "column",
    padding: "0 24px",
  },
  sessionsPanelHeader: {
    margin: "2px",
  },
  sessionsPanelTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  sessionsList: { flex: 1, overflow: "auto" },
  sessionItem: {
    padding: "12px 16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "background-color 0.2s",
    backgroundColor: tokens.colorNeutralBackground1,
    "&:hover": { backgroundColor: tokens.colorNeutralBackground3 },
    borderRadius: "4px",
  },
  sessionItemActive: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderLeft: `3px solid ${tokens.colorBrandForeground1}`,
    paddingLeft: "13px",
  },
  sessionDate: {
    fontSize: "16px",
    color: tokens.colorBrandForeground1,
    fontWeight: "600",
  },
  noSessions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    textAlign: "center",
    gap: "16px",
    flex: 1,
  },
  noSessionsIcon: {
    fontSize: "48px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "8px",
  },
  noSessionsTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  noSessionsText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    margin: 0,
    lineHeight: "1.4",
  },
  deliverablesPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflowY: "hidden",
    borderRadius: "8px",
  },
  tabContainer: {
    padding: "4px 10px",
    paddingRight: "28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "56px",
  },
  tabContent: { display: "flex", alignItems: "center", gap: "8px" },
  updateButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: "600",
    minWidth: "auto",
    padding: "8px 20px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    "&:hover": { backgroundColor: tokens.colorBrandBackgroundHover },
    "&:focus": { outline: "none" },
  },
  saveButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: "600",
    minWidth: "auto",
    padding: "8px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    "&:hover": { backgroundColor: tokens.colorBrandBackgroundHover },
    "&:focus": { outline: "none" },
  },
  deliverablesContent: { flex: 1, padding: "2px 6px", paddingRight: "28px", overflow: "auto" },
  deliverablesList: { display: "flex", flexDirection: "column", gap: "4px" },
  deliverableItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  deliverableInfo: { flex: 1 },
  deliverableHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px", 
    marginBottom: "4px",
  },
  deliverableTitle: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
    color: tokens.colorNeutralForeground1,
  },
  deliverableDescription: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground2,
    margin: 0,
  },
  statusBadge: {
    fontSize: "14px",
    padding: "4px 12px",
    borderRadius: "12px",
    fontWeight: "500",
    display: "inline-block",
  },
  statusBadgeDone: {
    backgroundColor: tokens.colorStatusSuccessBackground1,
    color: tokens.colorStatusSuccessForeground1,
    border: `1px solid ${tokens.colorStatusSuccessBorder1}`,
  },
  statusBadgeNotStarted: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  statusBadgeInProgress: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    border: `1px solid ${tokens.colorBrandStroke1}`,
  },
  progressInfo: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" },
  progressPercentageSmall: { fontSize: "24px", fontWeight: "700" },
  incrementButton: {
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    border: `1px solid ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    color: tokens.colorBrandForeground1,
    fontSize: "16px",
    marginLeft: "8px",
    "&:hover": { backgroundColor: tokens.colorBrandBackgroundHover },
  },
  loadingContainer: { display: "flex", justifyContent: "center", alignItems: "center", height: "300px" },
  unauthorizedContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 120px)",
    textAlign: "center",
    gap: "16px",
  },
  unauthorizedText: { fontSize: "16px", color: tokens.colorNeutralForeground1 },
  feedbacksContent: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  noDeliverables: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    textAlign: "center",
    gap: "16px",
    flex: 1,
  },
  noFeedbacks: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    textAlign: "center",
    gap: "16px",
    flex: 1,
  },
  feedbackItem: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "16px",
    fontSize: "16px",
    color: tokens.colorNeutralForeground1,
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  feedbackForm: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "8px",
  },
});



const staticDeliverables: Deliverable[] = [
  {
    title: "Prototype",
    description: "Is the MVP of your product?",
    status: "not started",
    percentage: 0,
    change: "",
  },
  {
    title: "Demo Video",
    description: "A demo video to showcase the features and working of your product",
    status: "not started",
    percentage: 0,
    change: "",
  },
  {
    title: "Pitch Deck",
    description: "A slides presentation to pitch your project at Demo Day.",
    status: "not started",
    percentage: 0,
    change: "",
  },
  {
    title: "Scaling",
    description: "Upload your file before the deadline to submit for review",
    status: "not started",
    percentage: 0,
    change: "",
  },
];

const ProjectDetail = () => {
  const styles = useStyles();
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { user, loading: isLoading } = useAuthContext();
  const [project, setProject] = useState<Project | null>(null);
  const [projectLoading, setProjectLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("deliverables");
  const [selectedSessionIndex, setSelectedSessionIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [tempDeliverables, setTempDeliverables] = useState<Deliverable[]>(staticDeliverables);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [newFeedback, setNewFeedback] = useState("");
  const [feedbackError, setFeedbackError] = useState<string | null>(null);
  const [moduleProgress, setModuleProgress] = useState<number[]>([]); // Changed to array

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId || !user) return;
      setProjectLoading(true);
      setError(null);
      try {
        const projectDetails = await getProjectById(projectId);
        const modules = await getModulesProgress(projectId);
        console.log("Modules Progress:", modules);
        const moduleProgressArray: number[] = [];
        modules.forEach((m) => {
          moduleProgressArray.push(m.percentage); // Populate array
        });
        setModuleProgress(moduleProgressArray); // Store module percentage

        const initialDeliverables = staticDeliverables.map((d, i) => {
          const percentage = moduleProgressArray[i] ?? 0; // Use array index
          return {
            ...d,
            percentage,
            status: percentage === 0 ? "not started" : percentage === 100 ? "done" : "in percentage",
            change: percentage > 0 ? "+10%" : "",
          };
        });

        const sessions = await getProjectSessions(projectId);
        const mappedSessions = sessions.map(s => ({
          id: s.id,
          date: s.date,
          feedback: s.feedback || "",
          summary: s.summary || "",
          module1: s.module1 || (moduleProgressArray[0]?.toString() ?? "0"),
          module2: s.module2 || (moduleProgressArray[1]?.toString() ?? "0"),
          module3: s.module3 || (moduleProgressArray[2]?.toString() ?? "0"),
          module4: s.module4 || (moduleProgressArray[3]?.toString() ?? "0"),
        }));

        const globalProgress = initialDeliverables.length > 0
          ? Math.round(initialDeliverables.reduce((sum, d) => sum + d.percentage, 0) / initialDeliverables.length)
          : 0;

        const projectData: Project = {
          ...projectDetails,
          id: projectId,
          name: projectDetails?.name || "Project Name",
          percentage: { // Fixed to percentage
            id: `percentage-${projectId}`,
            name: "Progress",
            globalProgress,
            sessions: mappedSessions,
          },
          industry: projectDetails?.industry || "",
          about: projectDetails?.about || "",
          problem: projectDetails?.problem || "",
          solution: projectDetails?.solution || "",
          idea: projectDetails?.idea || "",
          targetAudience: projectDetails?.targetAudience || "",
          competitiveAdvantage: projectDetails?.competitiveAdvantage || "",
          motivation: projectDetails?.motivation || "",
          status: projectDetails?.status || "",
          stage: projectDetails?.stage || "",
          createdAt: projectDetails?.createdAt || "",
        };

        setProject(projectData);
        setTempDeliverables(mappedSessions.length > 0
          ? staticDeliverables.map((d, i) => ({
              ...d,
              percentage: parseInt(mappedSessions[0][`module${i + 1}` as keyof Session] as string) || 0,
              status: parseInt(mappedSessions[0][`module${i + 1}` as keyof Session] as string) === 0
                ? "not started"
                : parseInt(mappedSessions[0][`module${i + 1}` as keyof Session] as string) === 100
                ? "done"
                : "in percentage",
              change: parseInt(mappedSessions[0][`module${i + 1}` as keyof Session] as string) > 0 ? "+10%" : "",
            }))
          : initialDeliverables
        );
        setSelectedSessionIndex(mappedSessions.length > 0 ? 0 : 0);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Project not loaded.");
        setProject(null);
        setModuleProgress([]);
        setTempDeliverables(staticDeliverables.map(d => ({
          ...d,
          percentage: 0,
          status: "not started",
          change: "",
        })));
      } finally {
        setProjectLoading(false);
      }
    };

    if (projectId && user) fetchProject();
  }, [projectId, user, refreshTrigger]);

  const handleTabChange: SelectTabEventHandler = (_, data) => setActiveTab(data.value as string);

  const handleSessionClick = (index: number) => {
    setSelectedSessionIndex(index);
    if (project && project.percentage.sessions[index]) {
      const session = project.percentage.sessions[index];
      setTempDeliverables(staticDeliverables.map((d, i) => ({
        ...d,
        percentage: parseInt(session[`module${i + 1}` as keyof Session] as string) || 0,
        status: parseInt(session[`module${i + 1}` as keyof Session] as string) === 0
          ? "not started"
          : parseInt(session[`module${i + 1}` as keyof Session] as string) === 100
          ? "done"
          : "in percentage",
        change: parseInt(session[`module${i + 1}` as keyof Session] as string) > 0 ? "+10%" : "",
      })));
    }
  };

  const handleEditToggle = async () => {
    if (editMode && project && projectId) {
      try {
        const modulesProgress = {
          research: tempDeliverables[0].percentage, // Assuming API expects these names
          development: tempDeliverables[1].percentage,
          testing: tempDeliverables[2].percentage,
          documentation: tempDeliverables[3].percentage,
        };
        await updateAllModulesProgress(projectId, modulesProgress);

        const updatedSessions = [...project.percentage.sessions];
        if (updatedSessions[selectedSessionIndex]) {
          updatedSessions[selectedSessionIndex] = {
            ...updatedSessions[selectedSessionIndex],
            module1: tempDeliverables[0].percentage.toString(),
            module2: tempDeliverables[1].percentage.toString(),
            module3: tempDeliverables[2].percentage.toString(),
            module4: tempDeliverables[3].percentage.toString(),
          };
        }

        const moduleProgressValues = tempDeliverables.map(d => d.percentage);
        const totalProgress = moduleProgressValues.reduce((sum, p) => sum + p, 0);
        const globalProgress = moduleProgressValues.length > 0 ? Math.round(totalProgress / moduleProgressValues.length) : 0;

        setProject({
          ...project,
          percentage: {
            ...project.percentage,
            globalProgress,
            sessions: updatedSessions,
          },
        });
      } catch (error) {
        console.error("Error updating module percentage:", error);
        setError("Failed to save percentage. Please try again.");
      }
    }
    setEditMode(!editMode);
  };

  const handleIncrementProgress = (deliverableIndex: number) => {
    if (!editMode) return;
    const updatedDeliverables = [...tempDeliverables];
    const currentProgress = updatedDeliverables[deliverableIndex].percentage;
    const newProgress = Math.min(currentProgress + 10, 100);
    updatedDeliverables[deliverableIndex] = {
      ...updatedDeliverables[deliverableIndex],
      percentage: newProgress,
      change: "+10%",
      status: newProgress === 0 ? "not started" : newProgress === 100 ? "done" : "in percentage",
    };
    setTempDeliverables(updatedDeliverables);
    // Update moduleProgress array
    const newModuleProgress = [...moduleProgress];
    newModuleProgress[deliverableIndex] = newProgress;
    setModuleProgress(newModuleProgress);
  };

  const handleAddFeedback = async () => {
    if (!project || !project.percentage.sessions[selectedSessionIndex] || !newFeedback.trim()) {
      setFeedbackError("Feedback cannot be empty.");
      return;
    }
    try {
      const sessionId = project.percentage.sessions[selectedSessionIndex].id;
      const feedbackData: Partial<Feedback> = { text: newFeedback };
      await addFeedback(sessionId, feedbackData);
      setRefreshTrigger(prev => prev + 1);
      setNewFeedback("");
      setFeedbackError(null);
    } catch (error) {
      console.error("Error adding feedback:", error);
      setFeedbackError("Failed to add feedback. Please try again.");
    }
  };

  const getStatusBadgeClass = (status: string) =>
    ({
      "not started": styles.statusBadgeNotStarted,
      "in percentage": styles.statusBadgeInProgress, // Fixed status
      done: styles.statusBadgeDone,
    }[status] || "");

  const getStatusText = (status: string) =>
    ({
      "not started": "Not started",
      "in percentage": "In percentage", // Fixed status
      done: "Done",
    }[status] || status);

  const handleSessionCreated = (newSessionId: string) => {
    setRefreshTrigger((prev) => prev + 1);
    setTimeout(() => {
      if (project?.percentage.sessions) {
        const newSessionIndex = project.percentage.sessions.findIndex(s => s.id === newSessionId);
        if (newSessionIndex !== -1) {
          setSelectedSessionIndex(newSessionIndex);
          handleSessionClick(newSessionIndex);
        }
      }
    }, 0);
  };

  if (!isLoading && !user) {
    return (
      <div className={styles.unauthorizedContainer}>
        <h2 className={styles.unauthorizedText}>Please log in to access this page.</h2>
        <Button appearance="primary" onClick={() => navigate("/login")}>
          Log In
        </Button>
      </div>
    );
  }

  if (!isLoading && user && user.role !== "SUPERVISOR") {
    return (
      <div className={styles.unauthorizedContainer}>
        <h2 className={styles.unauthorizedText}>You don't have permission to access this page.</h2>
        <Button appearance="primary" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </Button>
      </div>
    );
  }

  if (projectLoading || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Loading project details..." />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/mentor/projects-management" className={styles.breadcrumbLink}>
          Projects Management
        </Link>
        <ChevronRight20Regular />
        <span className={styles.breadcrumbCurrent}>{project?.name || "Project Name"}</span>
      </div>
      <div className={styles.projectHeader}>
        <div className={styles.projectHeaderTop}>
          <h1 className={styles.projectTitle}>Project Progress</h1>
          <div className={styles.progressContainer}>
            <span className={styles.progressPercentage}>{project?.percentage.globalProgress || 0}%</span>
            <span className={styles.progressChange}>+10%</span>
          </div>
        </div>
        {error && (
          <div style={{ color: tokens.colorStatusDangerForeground1, marginTop: "8px" }}>
            {error}
            <Button
              appearance="primary"
              style={{ marginLeft: "8px" }}
              onClick={() => setRefreshTrigger(prev => prev + 1)}
            >
              Retry
            </Button>
          </div>
        )}
        <div className={styles.projectInfo}>
          <div className={styles.projectInfoItem}>
            <DocumentRegular />
            <span>{project?.name || "Project Name"}</span>
          </div>
          <div className={styles.projectInfoItem}>
            <PeopleRegular />
            <span>{project?.teamId || "N/A"}</span>
          </div>
        </div>
      </div>
      <div className={styles.mainArea}>
        <div className={styles.sessionsPanel}>
          <div className={styles.sessionsPanelHeader}>
            <h2 className={styles.sessionsPanelTitle}>
              Sessions {project?.percentage.sessions?.length && project.percentage.sessions.length > 0 ? `(${project.percentage.sessions.length})` : "(0)"}
            </h2>
            <CreateSessionModal
              projectId={projectId || ""}
              onSessionCreated={handleSessionCreated}
            />
          </div>
          {project?.percentage.sessions && project.percentage.sessions.length > 0 ? (
            <div className={styles.sessionsList}>
              {project.percentage.sessions.map((session, index) => (
                <div
                  key={session.id}
                  className={`${styles.sessionItem} ${index === selectedSessionIndex ? styles.sessionItemActive : ""}`}
                  onClick={() => handleSessionClick(index)}
                >
                  <span className={styles.sessionDate}>
                    {typeof session.date === "object" && session.date !== null && "toISOString" in session.date
                      ? (session.date as Date).toISOString().split("T")[0]
                      : session.date}
                  </span>
                  <ChevronRight20Regular />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noSessions}>
              <CalendarLtr20Regular className={styles.noSessionsIcon} />
              <h3 className={styles.noSessionsTitle}>No Sessions Yet</h3>
              <p className={styles.noSessionsText}>
                Create a new session to track percentage.
              </p>
            </div>
          )}
        </div>
        <div className={styles.deliverablesPanel}>
          <div className={styles.tabContainer}>
            <TabList selectedValue={activeTab} onTabSelect={handleTabChange}>
              <Tab value="deliverables">
                <div className={styles.tabContent}>
                  {activeTab === "deliverables" ? (
                    <Folder20Filled style={{ color: tokens.colorBrandForeground1 }} />
                  ) : (
                    <Folder20Regular />
                  )}
                  <span>Deliverables ({tempDeliverables.length})</span>
                </div>
              </Tab>
              <Tab value="feedbacks">
                <div className={styles.tabContent}>
                  {activeTab === "feedbacks" ? (
                    <Comment20Filled style={{ color: tokens.colorBrandForeground1 }} />
                  ) : (
                    <Comment20Regular />
                  )}
                  <span>Feedbacks ({project?.percentage.sessions[selectedSessionIndex]?.feedback ? 1 : 0})</span>
                </div>
              </Tab>
            </TabList>
            {activeTab === "deliverables" && (
              <Button className={editMode ? styles.saveButton : styles.updateButton} onClick={handleEditToggle}>
                {editMode ? "Save Changes" : "Update Progress"}
              </Button>
            )}
          </div>
          <div className={styles.deliverablesContent}>
            {activeTab === "deliverables" && (
              tempDeliverables.length > 0 ? (
                <div className={styles.deliverablesList}>
                  {tempDeliverables.map((deliverable, index) => (
                    <div key={deliverable.title} className={styles.deliverableItem}>
                      <div className={styles.deliverableInfo}>
                        <div className={styles.deliverableHeader}>
                          <h3 className={styles.deliverableTitle}>{deliverable.title}</h3>
                          <span className={`${styles.statusBadge} ${getStatusBadgeClass(deliverable.status)}`}>
                            {getStatusText(deliverable.status)}
                          </span>
                        </div>
                        <p className={styles.deliverableDescription}>{deliverable.description}</p>
                      </div>
                      <div className={styles.progressInfo}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span
                            className={styles.progressPercentageSmall}
                            style={{
                              color:
                                moduleProgress[index] === 100
                                  ? tokens.colorStatusSuccessForeground1
                                  : tokens.colorBrandForeground1,
                            }}
                          >
                            {moduleProgress[index] ?? 0}%
                          </span>
                          {editMode && (
                            <div className={styles.incrementButton} onClick={() => handleIncrementProgress(index)}>
                              <Add16Filled />
                            </div>
                          )}
                        </div>
                        {deliverable.change && (
                          <span className={styles.progressChange} style={{ color: tokens.colorStatusSuccessForeground1 }}>
                            {deliverable.change}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noDeliverables}>
                  <Folder20Regular className={styles.noSessionsIcon} />
                  <h3 className={styles.noSessionsTitle}>No Deliverables Yet</h3>
                  <p className={styles.noSessionsText}>
                    No deliverables have been added to this project.
                  </p>
                </div>
              )
            )}
            {activeTab === "feedbacks" && (
              <div className={styles.feedbacksContent}>
                {project?.percentage.sessions[selectedSessionIndex]?.feedback ? (
                  <div className={styles.feedbackItem}>
                    <p>{project.percentage.sessions[selectedSessionIndex].feedback}</p>
                  </div>
                ) : (
                  <div className={styles.noFeedbacks}>
                    <Comment20Regular className={styles.noSessionsIcon} />
                    <h3 className={styles.noSessionsTitle}>No Feedback Yet</h3>
                    <p className={styles.noSessionsText}>
                      No feedback has been provided for this session.
                    </p>
                  </div>
                )}
                {project?.percentage.sessions[selectedSessionIndex]?.id && (
                  <div className={styles.feedbackForm}>
                    <Textarea
                      value={newFeedback}
                      onChange={(e) => setNewFeedback(e.target.value)}
                      placeholder="Enter your feedback..."
                      style={{ width: "100%", marginBottom: "10px" }}
                    />
                    {feedbackError && (
                      <p style={{ color: tokens.colorStatusDangerForeground1, marginBottom: "10px" }}>
                        {feedbackError}
                      </p>
                    )}
                    <Button appearance="primary" onClick={handleAddFeedback}>
                      Submit Feedback
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;