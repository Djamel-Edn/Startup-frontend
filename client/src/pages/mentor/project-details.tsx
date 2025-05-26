"use client";

import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  makeStyles, 
  Button, 
  Spinner, 
  TabList, 
  Tab, 
  type SelectTabEventHandler, 
  tokens 
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
import { Deliverable, Project } from "../../../types";
import CreateSessionModal from "../components/create-session-modal";

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
    padding: "20px 24px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "8px",
    boxShadow: "0 1px 1px rgba(0, 0, 0, 1)",
    margin: "0 28px",
  },
  projectHeaderTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
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
    width: "280px",
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
});

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
  const [tempDeliverables, setTempDeliverables] = useState<Deliverable[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    if (!isLoading && user && user.role !== "SUPERVISOR") navigate("/dashboard");
  }, [user, isLoading, navigate]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setTimeout(() => {
          const isCompleted = projectId === "1";
          let mockProject: Project = isCompleted
            ? {
                id: projectId || "1",
                name: "Project Name",
                teamId: "Team ID",
                progress: {
                  id: "progress1",
                  name: "Progress",
                  globalProgress: 100,
                  sessions: [
                    { id: "1", date: "March 3, 2025", time: "10:00 AM", deliverables: [{ title: "Deliverable name", description: "Upload your file before the deadline to submit for review", status: "done", progress: 100, change: "" }, { title: "Pitch Deck", description: "A slides presentation to pitch your project at Demo Day.", status: "done", progress: 100, change: "" }, { title: "Prototype", description: "Is the MVP of your product?", status: "done", progress: 100, change: "" }, { title: "Demo Video", description: "A demo video to showcase the features and working of your product", status: "done", progress: 100, change: "" }], feedbacks: [] },
                    { id: "2", date: "March 10, 2025", time: "10:00 AM", deliverables: [], feedbacks: [] },
                    { id: "3", date: "March 17, 2025", time: "10:00 AM", deliverables: [], feedbacks: [] },
                    { id: "4", date: "March 24, 2025", time: "10:00 AM", deliverables: [], feedbacks: [] },
                    { id: "5", date: "March 31, 2025", time: "10:00 AM", deliverables: [], feedbacks: [] },
                    { id: "6", date: "April 7, 2025", time: "10:00 AM", deliverables: [], feedbacks: [] },
                    { id: "7", date: "May 5, 2025", time: "10:00 AM", deliverables: [], feedbacks: [] },
                  ],
                },
                industry: "", about: "", problem: "", solution: "", idea: "", targetAudience: "", competitiveAdvantage: "", motivation: "", status: "", stage: "", createdAt: "",
              }
            : { id: projectId || "3", name: "Project Name", teamId: "Team ID", progress: { id: "progress3", name: "Progress", globalProgress: 0, sessions: [] }, industry: "", about: "", problem: "", solution: "", idea: "", targetAudience: "", competitiveAdvantage: "", motivation: "", status: "", stage: "", createdAt: "" };
          setProject(mockProject);
          setProjectLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching project:", error);
        setProjectLoading(false);
      }
    };
    if (projectId) fetchProject();
  }, [projectId, refreshTrigger]);

  const handleTabChange: SelectTabEventHandler = (_, data) => setActiveTab(data.value as string);
  const handleSessionClick = (index: number) => setSelectedSessionIndex(index);
  const handleEditToggle = () => {
    if (editMode && project && project.progress.sessions[selectedSessionIndex]) {
      const updatedSessions = [...project.progress.sessions];
      updatedSessions[selectedSessionIndex] = { ...updatedSessions[selectedSessionIndex], deliverables: tempDeliverables };
      let totalProgress = 0, totalDeliverables = 0;
      updatedSessions.forEach(session => session.deliverables.forEach(deliverable => { totalProgress += deliverable.progress; totalDeliverables++ }));
      const newProgress = totalDeliverables > 0 ? Math.round(totalProgress / totalDeliverables) : 0;
      setProject({ ...project, progress: { ...project.progress, globalProgress: newProgress, sessions: updatedSessions } });
    } else if (project && project.progress.sessions[selectedSessionIndex]) {
      setTempDeliverables([...project.progress.sessions[selectedSessionIndex].deliverables]);
    }
    setEditMode(!editMode);
  };
  const handleIncrementProgress = (deliverableIndex: number) => {
    if (!editMode) return;
    const updatedDeliverables = [...tempDeliverables];
    const currentProgress = updatedDeliverables[deliverableIndex].progress;
    const newProgress = Math.min(currentProgress + 10, 100);
    updatedDeliverables[deliverableIndex] = { ...updatedDeliverables[deliverableIndex], progress: newProgress, change: "+10%", status: newProgress === 0 ? "not started" : newProgress === 100 ? "done" : "in progress" };
    setTempDeliverables(updatedDeliverables);
  };

  const getStatusBadgeClass = (status: string) => ({ "not started": styles.statusBadgeNotStarted, "in progress": styles.statusBadgeInProgress, "done": styles.statusBadgeDone }[status] || "");
  const getStatusText = (status: string) => ({ "not started": "Not started", "in progress": "In progress", "done": "Done" }[status] || status);

  if (!isLoading && user && user.role !== "SUPERVISOR") return (
    <div className={styles.unauthorizedContainer}>
      <h2 className={styles.unauthorizedText}>You don't have permission to access this page.</h2>
      <Button appearance="primary" onClick={() => navigate("/dashboard")}>Go to Dashboard</Button>
    </div>
  );
  if (projectLoading || isLoading || !project) return (
    <div className={styles.loadingContainer}><Spinner size="large" label="Loading project details..." /></div>
  );

  const currentSession = project.progress.sessions[selectedSessionIndex] || { deliverables: [], feedbacks: [] };
  const deliverablesToDisplay = editMode ? tempDeliverables : currentSession.deliverables;

  const handleSessionCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/mentor/projects-management" className={styles.breadcrumbLink}>Projects Management</Link>
        <ChevronRight20Regular />
        <span className={styles.breadcrumbCurrent}>{project.name}</span>
      </div>
      <div className={styles.projectHeader}>
        <div className={styles.projectHeaderTop}>
          <h1 className={styles.projectTitle}>Project Progress</h1>
          <div className={styles.progressContainer}>
            <span className={styles.progressPercentage}>{project.progress.globalProgress}%</span>
            <span className={styles.progressChange}>+10%</span>
          </div>
        </div>
        <div className={styles.projectInfo}>
          <div className={styles.projectInfoItem}><DocumentRegular /><span>{project.name}</span></div>
          <div className={styles.projectInfoItem}><PeopleRegular /><span>{project.teamId}</span></div>
        </div>
      </div>
      <div className={styles.mainArea}>
        <div className={styles.sessionsPanel}>
          <div className={styles.sessionsPanelHeader}>
            <h2 className={styles.sessionsPanelTitle}>Sessions {project.progress.sessions.length > 0 && `(${project.progress.sessions.length})`}</h2>
            <CreateSessionModal projectId={projectId || ""} onSessionCreated={handleSessionCreated} />
          </div>
          {project.progress.sessions.length > 0 ? (
            <div className={styles.sessionsList}>
              {project.progress.sessions.map((session, index) => (
                <div key={session.id} className={`${styles.sessionItem} ${index === selectedSessionIndex ? styles.sessionItemActive : ""}`} onClick={() => handleSessionClick(index)}>
                  <span className={styles.sessionDate}>{session.date}</span>
                  <ChevronRight20Regular />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noSessions}>
              <CalendarLtr20Regular className={styles.noSessionsIcon} />
              <h3 className={styles.noSessionsTitle}>No Sessions Yet</h3>
              <p className={styles.noSessionsText}>When your mentor submits a new progress report, you can see it here.</p>
            </div>
          )}
        </div>
        <div className={styles.deliverablesPanel}>
          <div className={styles.tabContainer}>
            <TabList selectedValue={activeTab} onTabSelect={handleTabChange}>
              <Tab value="deliverables">
                <div className={styles.tabContent}>
                  {activeTab === "deliverables" ? <Folder20Filled style={{ color: tokens.colorBrandForeground1 }} /> : <Folder20Regular />}
                  <span>Deliverables ({currentSession.deliverables.length})</span>
                </div>
              </Tab>
              <Tab value="feedbacks">
                <div className={styles.tabContent}>
                  {activeTab === "feedbacks" ? <Comment20Filled style={{ color: tokens.colorBrandForeground1 }} /> : <Comment20Regular />}
                  <span>Feedbacks ({currentSession.feedbacks.length})</span>
                </div>
              </Tab>
            </TabList>
            {project.progress.sessions.length > 0 && <Button className={editMode ? styles.saveButton : styles.updateButton} onClick={handleEditToggle}>{editMode ? "Save Changes" : "Update Progress"}</Button>}
          </div>
          <div className={styles.deliverablesContent}>
            {activeTab === "deliverables" && (
              <div className={styles.deliverablesList}>
                {deliverablesToDisplay.map((deliverable, index) => (
                  <div key={deliverable.title} className={styles.deliverableItem}>
                    <div className={styles.deliverableInfo}>
                      <div className={styles.deliverableHeader}>
                        <h3 className={styles.deliverableTitle}>{deliverable.title}</h3>
                        <span className={`${styles.statusBadge} ${getStatusBadgeClass(deliverable.status)}`}>{getStatusText(deliverable.status)}</span>
                      </div>
                      <p className={styles.deliverableDescription}>{deliverable.description}</p>
                    </div>
                    <div className={styles.progressInfo}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span className={styles.progressPercentageSmall} style={{ color: deliverable.progress === 100 ? tokens.colorStatusSuccessForeground1 : tokens.colorBrandForeground1 }}>{deliverable.progress}%</span>
                        {editMode && <div className={styles.incrementButton} onClick={() => handleIncrementProgress(index)}><Add16Filled /></div>}
                      </div>
                      {deliverable.change && <span className={styles.progressChange} style={{ color: tokens.colorStatusSuccessForeground1 }}>{deliverable.change}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;