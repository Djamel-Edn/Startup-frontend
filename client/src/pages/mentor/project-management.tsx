"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { makeStyles, tokens, Input, Button, Dropdown, Option, Spinner } from "@fluentui/react-components"
import { SearchRegular } from "@fluentui/react-icons"
import { useAuthContext } from "../components/AuthContext"
import { ProjectCard } from "../components/ProjectCard" 

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

interface Project {
  id: string
  name: string
  description: string
  progress: number
  teamMembers: { id: string; name: string; avatar?: string }[]
  mentors: { id: string; name: string; avatar?: string }[]
}

const ProjectsManagement = () => {
  const styles = useStyles()
  const navigate = useNavigate()
  const { user, loading } = useAuthContext()
  const [projects, setProjects] = useState<Project[]>([])
  const [projectsLoading, setProjectsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("status")

  useEffect(() => {
    if (loading && user && user.role !== "SUPERVISOR") {
      navigate("/dashboard")
    }
  }, [user, loading, navigate])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setTimeout(() => {
          const mockProjects: Project[] = [
            {
              id: "1",
              name: "Project Alpha",
              description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
              progress: 10,
              teamMembers: [
                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "4", name: "Alice Brown", avatar: "/placeholder.svg?height=24&width=24" },
              ],
              mentors: [
                { id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "2", name: "Prof. Johnson", avatar: "/placeholder.svg?height=24&width=24" },
              ],
            },
            {
              id: "2",
              name: "Project Beta",
              description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
              progress: 50,
              teamMembers: [
                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "4", name: "Alice Brown", avatar: "/placeholder.svg?height=24&width=24" },
              ],
              mentors: [
                { id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "2", name: "Prof. Johnson", avatar: "/placeholder.svg?height=24&width=24" },
              ],
            },
            {
              id: "3",
              name: "Project Gamma",
              description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
              progress: 100,
              teamMembers: [
                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "4", name: "Alice Brown", avatar: "/placeholder.svg?height=24&width=24" },
              ],
              mentors: [
                { id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "2", name: "Prof. Johnson", avatar: "/placeholder.svg?height=24&width=24" },
              ],
            },
            {
              id: "4",
              name: "Project Delta",
              description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
              progress: 0,
              teamMembers: [
                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "4", name: "Alice Brown", avatar: "/placeholder.svg?height=24&width=24" },
              ],
              mentors: [
                { id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "2", name: "Prof. Johnson", avatar: "/placeholder.svg?height=24&width=24" },
              ],
            },
            {
              id: "5",
              name: "Project Epsilon",
              description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
              progress: 75,
              teamMembers: [
                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "4", name: "Alice Brown", avatar: "/placeholder.svg?height=24&width=24" },
              ],
              mentors: [
                { id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=24&width=24" },
                { id: "2", name: "Prof. Johnson", avatar: "/placeholder.svg?height=24&width=24" },
              ],
            },
          ]
          setProjects(mockProjects)
          setProjectsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching projects:", error)
        setProjectsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleProjectClick = (projectId: string | number) => {
    navigate(`/mentor/projects/${projectId.toString()}`)
  }

  const handleEdit = (projectId: string | number) => {
    console.log(`Editing project ${projectId}`)
  }

  const handleDelete = (projectId: string | number) => {
    console.log(`Deleting project ${projectId}`)
  }

  const handleDuplicate = (projectId: string | number) => {
    console.log(`Duplicating project ${projectId}`)
    // Implement duplicate logic here
  }

  if (loading && user && user.role !== "SUPERVISOR") {
    return (
      <div className={styles.unauthorizedContainer}>
        <h2 className={styles.unauthorizedText}>You don't have permission to access this page.</h2>
        <Button appearance="primary" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </Button>
      </div>
    )
  }

  if (projectsLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Loading projects..." />
      </div>
    )
  }

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (statusFilter === "status" ||
        (statusFilter === "in-progress" && project.progress > 0 && project.progress < 100) ||
        (statusFilter === "completed" && project.progress === 100) ||
        (statusFilter === "not-started" && project.progress === 0)),
  )

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
            project={project}
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
  )
}

export default ProjectsManagement