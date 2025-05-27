"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { makeStyles, tokens, Input, Button, Dropdown, Option, Spinner } from "@fluentui/react-components"
import { SearchRegular } from "@fluentui/react-icons"
import { useAuthContext } from "../components/AuthContext"
import { ProjectCard } from "../components/ProjectCard" 
import { Project } from "types"
import { fetchAllProjects } from "../../../api/project-service"

const useStyles = makeStyles({
  container: {
    padding: "10px 28px",
    backgroundColor: tokens.colorNeutralBackground2,
    overflowY: "hidden",
    overflowX: "hidden",
  },
  pageTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "4px",
    color: tokens.colorNeutralForeground1,
    lineHeight: 1.1,
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "400",
    marginBottom: "12px",
    color: tokens.colorNeutralForeground1,
    lineHeight: 1.1,
  },
  searchFilterRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
    gap: "16px",
  },
  searchContainer: {
    position: "relative",
    flex: 1,
    maxWidth: "400px",
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: tokens.colorNeutralForeground3,
    fontSize: "18px",
    zIndex: 1,
  },
  searchInput: {
    width: "100%",
    paddingLeft: "36px",
    height: "32px",
    fontSize: "14px",
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  filterLabel: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    whiteSpace: "nowrap",
  },
  filterDropdown: {
    minWidth: "110px",
  },
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    columnGap: "16px",
    rowGap: "8px",
    marginBottom: "18px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    gap: "4px",
    marginTop: "16px",
    paddingBottom: "12px",
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
    color: tokens.colorNeutralForeground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  paginationItemActive: {
    backgroundColor: tokens.colorNeutralBackground3,
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    border: `2px solid ${tokens.colorBrandStroke1}`,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },
  unauthorizedContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 120px)",
    textAlign: "center",
    gap: "16px",
  },
  unauthorizedText: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground1,
  },
})
const ProjectsManagement = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { user, loading } = useAuthContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("status");
  const [error, setError] = useState<string | null>(null);

 

 useEffect(() => {
  const fetchProjects = async () => {
    if (!user) return;
    setProjectsLoading(true);
    setError(null);
    try {
      const allProjects = await fetchAllProjects();
      console.log("ooooo", allProjects);
      const filteredProjects = allProjects.filter(project =>
        project.members?.some(member => member.id === user.id)
      );
      console.log("Filtered Projects:", filteredProjects);
      setProjects(filteredProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Failed to load projects. Please try again.");
    } finally {
      setProjectsLoading(false);
    }
  };

  fetchProjects();
}, [user]);

  const handleProjectClick = (projectId: string | number) => {
    navigate(`/mentor/projects/${projectId.toString()}`);
  };

  const handleEdit = (projectId: string | number) => {
    console.log(`Editing project ${projectId}`);
  };

  const handleDelete = (projectId: string | number) => {
    console.log(`Deleting project ${projectId}`);
  };

  const handleDuplicate = (projectId: string | number) => {
    console.log(`Duplicating project ${projectId}`);
  };

  if (!loading && !user) {
    return (
      <div className={styles.unauthorizedContainer}>
        <h2 className={styles.unauthorizedText}>Please log in to access this page.</h2>
        <Button appearance="primary" onClick={() => navigate("/login")}>
          Log In
        </Button>
      </div>
    );
  }

  if (!loading && user && user.role !== "SUPERVISOR") {
    return (
      <div className={styles.unauthorizedContainer}>
        <h2 className={styles.unauthorizedText}>You don't have permission to access this page.</h2>
        <Button appearance="primary" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </Button>
      </div>
    );
  }

  if (projectsLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Loading projects..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.unauthorizedContainer}>
        <h2 className={styles.unauthorizedText}>{error}</h2>
        <Button appearance="primary" onClick={() => setProjectsLoading(true)}>
          Retry
        </Button>
      </div>
    );
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === "status" ||
        (statusFilter === "in-progress" && project.progress.globalProgress > 0 && project.progress.globalProgress < 100) ||
        (statusFilter === "completed" && project.progress.globalProgress === 100) ||
        (statusFilter === "not-started" && project.progress.globalProgress === 0))
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Projects Management</h1>

      <h2 className={styles.sectionTitle}>Active Projects ({filteredProjects.length})</h2>

      <div className={styles.searchFilterRow}>
        <div className={styles.searchContainer}>
          <SearchRegular className={styles.searchIcon} />
          <Input
            className={styles.searchInput}
            placeholder="Search by name, email, or project..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className={styles.filterContainer}>
          <span className={styles.filterLabel}>Filter by</span>
          <Dropdown
            className={styles.filterDropdown}
            value={statusFilter}
            onOptionSelect={(_: any, data: any) => setStatusFilter(data.optionValue || "status")}
            placeholder="Status"
          >
            <Option value="status">Status</Option>
            <Option value="in-progress">In Progress</Option>
            <Option value="completed">Completed</Option>
            <Option value="not-started">Not Started</Option>
          </Dropdown>
        </div>
      </div>

      <div className={styles.projectsGrid}>
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={{
              id: project.id,
              name: project.name,
              description: "",
              progress: typeof project.progress === "number" ? project.progress : project.progress?.globalProgress ?? 0,
              teamMembers: project.members
                ? project.members.map((member: any) => ({
                    id: member.id,
                    name: member.name,
                    avatar: member.avatar,
                  }))
                : [],
              mentors: project.encadrants
                ? project.encadrants.map((encadrant: any) => ({
                    id: encadrant.id,
                    name: encadrant.name,
                    avatar: encadrant.avatar,
                  }))
                : [],
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
            onClick={handleProjectClick}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        <div className={styles.paginationItem}>{"<"}</div>
        <div className={`${styles.paginationItem} ${styles.paginationItemActive}`}>1</div>
        <div className={styles.paginationItem}>2</div>
        <div className={styles.paginationItem}>3</div>
        <div className={styles.paginationItem}>{">"}</div>
      </div>
    </div>
  );
};

export default ProjectsManagement;