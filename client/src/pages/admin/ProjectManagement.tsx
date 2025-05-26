"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Dropdown,
  Option,
  Text,
  Button,
  makeStyles,
  tokens,
  Spinner,
  shorthands,
} from "@fluentui/react-components";
import { SearchRegular, Add24Regular } from "@fluentui/react-icons";
import { useAuthContext } from "../components/AuthContext";
import { ProjectCard } from "../components/ProjectCard";
import { HeaderSection } from "./header/HeaderSection";

const useStyles = makeStyles({
  container: {
    padding: "0 32px",
    overflowY: "auto",
    overflowX: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "background-color 0.3s ease",
    "@media (max-width: 768px)": {
      padding: "0 16px",
    },
  },
  searchFilterRow: {
    display: "flex",
    alignItems: "center",
    margin: "16px 0",
    gap: "20px",
    flexWrap: "wrap",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      gap: "12px",
      alignItems: "stretch",
    },
  },
  searchContainer: {
    position: "relative",
    flex: "1 1 400px",
    maxWidth: "400px",
    "@media (max-width: 768px)": {
      maxWidth: "100%",
    },
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: tokens.colorNeutralForeground3,
    fontSize: "20px",
    zIndex: 1,
  },
  searchInput: {
    width: "100%",
    paddingLeft: "40px",
    fontSize: "14px",
    borderRadius: tokens.borderRadiusLarge,
    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
    ":hover": {
      boxShadow: tokens.shadow4,
    },
    ":focus": {
      boxShadow: `0 0 0 3px ${tokens.colorBrandBackground2}`,
    },
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flex: "0 1 auto",
  },
  filterLabel: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
    whiteSpace: "nowrap",
  },
  filterDropdown: {
    minWidth: "140px",
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground3,
    transition: "box-shadow 0.2s ease",
    ":hover": {
      boxShadow: tokens.shadow4,
    },
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  projectsGrid: {
    display: "grid",
    marginBottom: "10px",
    gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", 
    gap: "12px", 
    flex: "1 1 auto",
    maxWidth: "1200px", 
    overflowY: "auto",
    "::-webkit-scrollbar": {
      display: "none",
    },
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
      gap: "20px",
    },
    "@media (max-width: 480px)": {
      gridTemplateColumns: "1fr",
      gap: "16px",
    },
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
    flex: "1 1 auto",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow2,
  },
  unauthorizedContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 80px)",
    textAlign: "center",
    gap: "20px",
    flex: "1 1 auto",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusLarge,
  },
  unauthorizedText: {
    fontSize: "18px",
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightMedium,
  },
  emptyState: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground2,
    textAlign: "center",
    padding: "32px", // Larger padding for larger cards
    borderRadius: tokens.borderRadiusLarge,
    backgroundColor: tokens.colorNeutralBackground3,
    boxShadow: tokens.shadow4, // Slightly stronger shadow
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
    "@media (max-width: 768px)": {
      fontSize: "14px",
      padding: "24px",
    },
  },
  emptyStateButton: {
    marginTop: "8px",
    color: tokens.colorNeutralForegroundInverted,
    ":hover": {
    },
  },
});

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  teamMembers: { id: string; name: string; avatar?: string }[];
  mentors: { id: string; name: string; avatar?: string }[];
}

export function ProjectManagement() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { user, loading } = useAuthContext();
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("status");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setTimeout(() => {
          const mockProjects: Project[] = [
            {
              id: "1",
              name: "HealthAI",
              description: "AI-powered diagnostic assistant for rural clinics",
              progress: 10,
              teamMembers: [
                { id: "1", name: "Ahmed Salah", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "2", name: "Bilal Touati", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "3", name: "Camila Uzumaki", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "4", name: "David Lee", avatar: "/placeholder.svg?height=24&width=24" },
              ],
              mentors: [
                { id: "5", name: "John Doe", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "6", name: "Karim Lamine", avatar: "/placeholder.svg?height=24&width=24" },
              ],
            },
            {
              id: "2",
              name: "EduSpark",
              description: "Educational platform for personalized learning",
              progress: 50,
              teamMembers: [
                { id: "7", name: "Emma Wilson", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "8", name: "Fatima Zahra", avatar: "/placeholder.svg?height=24&width=24" },
              ],
              mentors: [
                { id: "9", name: "Malik Johnson", avatar: "/placeholder.svg?height=24&width=24" },
              ],
            },
            {
              id: "3",
              name: "Xovia",
              description: "Smart city solution for traffic optimization",
              progress: 100,
              teamMembers: [
                { id: "10", name: "Nour Amari", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "11", name: "Omar Khalid", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "12", name: "Priya Singh", avatar: "/placeholder.svg?height=24&width=24" },
              ],
              mentors: [
                { id: "13", name: "Rania Bouazizi", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "14", name: "Sofiane Kaci", avatar: "/placeholder.svg?height=24&width=24" },
              ],
            },
            {
              id: "4",
              name: "GreenSync",
              description: "Sustainable energy management system",
              progress: 0,
              teamMembers: [
                { id: "15", name: "Liam Chen", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "16", name: "Aisha Khan", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "17", name: "Sophia Patel", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "18", name: "James Brown", avatar: "/placeholder.svg?height=24&width=24" },
              ],
              mentors: [
                { id: "19", name: "Dr. Lee", avatar: "/placeholder.svg?height=24&width=24" },
              ],
            },
            {
              id: "5",
              name: "MediTrack",
              description: "Healthcare supply chain optimization",
              progress: 75,
              teamMembers: [
                { id: "20", name: "Elena Garcia", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "21", name: "Mohammed Ali", avatar: "/placeholder.svg?height=24&width=24" },
              ],
              mentors: [
                { id: "22", name: "Prof. Taylor", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "23", name: "Dr. Kim", avatar: "/placeholder.svg?height=24&width=24" },
              ],
            },
          ];
          setProjects(mockProjects);
          setProjectsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (id: string | number) => {
    navigate(`/mentor/projects/${id.toString()}`);
  };

  const handleEditProject = (id: string | number) => {
    console.log(`Editing project with ID: ${id}`);
  };

  const handleDeleteProject = (id: string | number) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== id.toString())
    );
    console.log(`Deleted project with ID: ${id}`);
  };

  const handleDuplicateProject = (id: string | number) => {
    setProjects((prevProjects) => {
      const projectToDuplicate = prevProjects.find(
        (project) => project.id === id.toString()
      );
      if (!projectToDuplicate) return prevProjects;
      const newId = (
        Math.max(...prevProjects.map((p) => parseInt(p.id))) + 1
      ).toString();
      const duplicatedProject: Project = {
        ...projectToDuplicate,
        id: newId,
        name: `${projectToDuplicate.name} (Copy)`,
      };
      return [...prevProjects, duplicatedProject];
    });
    console.log(`Duplicated project with ID: ${id}`);
  };

  const handleAddProject = () => {
    console.log("Add Project clicked");
    navigate("/mentor/projects/new");
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === "status" ||
        (statusFilter === "in-progress" && project.progress > 0 && project.progress < 100) ||
        (statusFilter === "completed" && project.progress === 100) ||
        (statusFilter === "not-started" && project.progress === 0))
  );


  

  if (projectsLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner
          size="large"
          label="Loading projects..."
          appearance="primary"
          aria-label="Loading projects"
        />
      </div>
    );
  }

  return (
    <div className={styles.container} role="main">
      <HeaderSection
        title="Projects Management"
        subtitle={`Active Projects (${filteredProjects.length}) • Last Updated: May 26, 2025, 1:56 PM CET`}
        button={{
          label: "Add Project",
          icon: <Add24Regular />,
          onClick: handleAddProject,
        }}
      />
      <div className={styles.searchFilterRow} role="search">
        <div className={styles.searchContainer}>
          <SearchRegular className={styles.searchIcon} aria-hidden="true" />
          <Input
            className={styles.searchInput}
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e, data) => setSearchQuery(data.value || "")}
            aria-label="Search projects"
          />
        </div>
        <div className={styles.filterContainer}>
          <Text className={styles.filterLabel} id="filter-label">
            Filter by
          </Text>
          <Dropdown
            className={styles.filterDropdown}
            value={statusFilter}
            onOptionSelect={(_: any, data: any) => setStatusFilter(data.optionValue || "status")}
            placeholder="Status"
            aria-label="Filter projects by status"
            aria-labelledby="filter-label"
          >
            <Option value="status">All Statuses</Option>
            <Option value="in-progress">In Progress</Option>
            <Option value="completed">Completed</Option>
            <Option value="not-started">Not Started</Option>
          </Dropdown>
        </div>
      </div>
      <div className={styles.projectsGrid} role="grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              onDuplicate={handleDuplicateProject}
              onClick={handleProjectClick}
            />
          ))
        ) : (
          <div className={styles.emptyState}>
            <Text>No projects found matching your search or filter criteria.</Text>
            <Button
              className={styles.emptyStateButton}
              onClick={handleAddProject}
              aria-label="Create a new project"
            >
              Create New Project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}