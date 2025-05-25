import { Button, Input, Select, Text } from "@fluentui/react-components";
import ProjectCard from "../components/projectcomp/ProjectCard";
import {
  ChevronLeft24Regular,
  ChevronRight24Regular,
  Search24Regular,
} from "@fluentui/react-icons";
import React from "react";
import { useStyles } from "../lib/theme";

export  function ProjectManagement () {
  const styles = useStyles();
  const [currentPage, setCurrentPage] = React.useState(1);
  const projects = [
    {
      id: "1",
      name: "Project Name",
      description:
        "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
      teamId: "Team ID",
      members: [
        { id: "1", name: "Ahmed Salah", initials: "AS" },
        { id: "2", name: "Bilal Touati", initials: "BT" },
        { id: "3", name: "Camila Uzumaki", initials: "CU" },
        { id: "4", name: "David Lee", initials: "DL" },
      ],
      mentors: [
        { id: "5", name: "John Doe", initials: "JD" },
        { id: "6", name: "Karim Lamine", initials: "KL" },
      ],
      status: "Active" as "Active" | "Completed" | "On Hold" | "Inactive",
    },
    {
      id: "2",
      name: "EduSpark",
      description:
        "Educational platform connecting students with mentors for personalized learning experiences",
      teamId: "Team ID",
      members: [
        { id: "7", name: "Emma Wilson", initials: "EW" },
        { id: "8", name: "Fatima Zahra", initials: "FZ" },
      ],
      mentors: [{ id: "9", name: "Malik Johnson", initials: "MJ" }],
      status: "Completed" as "Active" | "Completed" | "On Hold" | "Inactive",
    },
    {
      id: "3",
      name: "Xovia",
      description:
        "Smart city solution for optimizing traffic flow and reducing congestion in urban areas",
      teamId: "Team ID",
      members: [
        { id: "10", name: "Nour Amari", initials: "NA" },
        { id: "11", name: "Omar Khalid", initials: "OK" },
        { id: "12", name: "Priya Singh", initials: "PS" },
      ],
      mentors: [
        { id: "13", name: "Rania Bouazizi", initials: "RB" },
        { id: "14", name: "Sofiane Kaci", initials: "SK" },
      ],
      status: "On Hold" as "Active" | "Completed" | "On Hold" | "Inactive",
    },
    {
      id: "4",
      name: "Project Name",
      description:
        "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
      teamId: "Team ID",
      members: [
        { id: "1", name: "Ahmed Salah", initials: "AS" },
        { id: "2", name: "Bilal Touati", initials: "BT" },
        { id: "3", name: "Camila Uzumaki", initials: "CU" },
        { id: "4", name: "David Lee", initials: "DL" },
      ],
      mentors: [
        { id: "5", name: "John Doe", initials: "JD" },
        { id: "6", name: "Karim Lamine", initials: "KL" },
      ],
      status: "Active" as "Active" | "Completed" | "On Hold" | "Inactive",
    },
    {
      id: "5",
      name: "Project Name",
      description:
        "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
      teamId: "Team ID",
      members: [
        { id: "1", name: "Ahmed Salah", initials: "AS" },
        { id: "2", name: "Bilal Touati", initials: "BT" },
        { id: "3", name: "Camila Uzumaki", initials: "CU" },
        { id: "4", name: "David Lee", initials: "DL" },
      ],
      mentors: [
        { id: "5", name: "John Doe", initials: "JD" },
        { id: "6", name: "Karim Lamine", initials: "KL" },
      ],
      status: "Active" as "Active" | "Completed" | "On Hold" | "Inactive",
    },
    {
      id: "6",
      name: "Project Name",
      description:
        "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
      teamId: "Team ID",
      members: [
        { id: "1", name: "Ahmed Salah", initials: "AS" },
        { id: "2", name: "Bilal Touati", initials: "BT" },
        { id: "3", name: "Camila Uzumaki", initials: "CU" },
        { id: "4", name: "David Lee", initials: "DL" },
      ],
      mentors: [
        { id: "5", name: "John Doe", initials: "JD" },
        { id: "6", name: "Karim Lamine", initials: "KL" },
      ],
      status: "Active" as "Active" | "Completed" | "On Hold" | "Inactive",
    },
    {
      id: "7",
      name: "Project Name",
      description:
        "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
      teamId: "Team ID",
      members: [
        { id: "1", name: "Ahmed Salah", initials: "AS" },
        { id: "2", name: "Bilal Touati", initials: "BT" },
        { id: "3", name: "Camila Uzumaki", initials: "CU" },
        { id: "4", name: "David Lee", initials: "DL" },
      ],
      mentors: [
        { id: "5", name: "John Doe", initials: "JD" },
        { id: "6", name: "Karim Lamine", initials: "KL" },
      ],
      status: "Active" as "Active" | "Completed" | "On Hold" | "Inactive",
    },
    {
      id: "8",
      name: "Project Name",
      description:
        "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
      teamId: "Team ID",
      members: [
        { id: "1", name: "Ahmed Salah", initials: "AS" },
        { id: "2", name: "Bilal Touati", initials: "BT" },
        { id: "3", name: "Camila Uzumaki", initials: "CU" },
        { id: "4", name: "David Lee", initials: "DL" },
      ],
      mentors: [
        { id: "5", name: "John Doe", initials: "JD" },
        { id: "6", name: "Karim Lamine", initials: "KL" },
      ],
      status: "Active" as "Active" | "Completed" | "On Hold" | "Inactive",
    },
    {
      id: "9",
      name: "Project Name",
      description:
        "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
      teamId: "Team ID",
      members: [
        { id: "1", name: "Ahmed Salah", initials: "AS" },
        { id: "2", name: "Bilal Touati", initials: "BT" },
        { id: "3", name: "Camila Uzumaki", initials: "CU" },
        { id: "4", name: "David Lee", initials: "DL" },
      ],
      mentors: [
        { id: "5", name: "John Doe", initials: "JD" },
        { id: "6", name: "Karim Lamine", initials: "KL" },
      ],
      status: "Active" as "Active" | "Completed" | "On Hold" | "Inactive",
    },
    {
      id: "10",
      name: "Project Name",
      description:
        "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
      teamId: "Team ID",
      members: [
        { id: "1", name: "Ahmed Salah", initials: "AS" },
        { id: "2", name: "Bilal Touati", initials: "BT" },
        { id: "3", name: "Camila Uzumaki", initials: "CU" },
        { id: "4", name: "David Lee", initials: "DL" },
      ],
      mentors: [
        { id: "5", name: "John Doe", initials: "JD" },
        { id: "6", name: "Karim Lamine", initials: "KL" },
      ],
      status: "Active" as "Active" | "Completed" | "On Hold" | "Inactive",
    },
    {
      id: "11",
      name: "Project Name",
      description:
        "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
      teamId: "Team ID",
      members: [
        { id: "1", name: "Ahmed Salah", initials: "AS" },
        { id: "2", name: "Bilal Touati", initials: "BT" },
        { id: "3", name: "Camila Uzumaki", initials: "CU" },
        { id: "4", name: "David Lee", initials: "DL" },
      ],
      mentors: [
        { id: "5", name: "John Doe", initials: "JD" },
        { id: "6", name: "Karim Lamine", initials: "KL" },
      ],
      status: "Active" as "Active" | "Completed" | "On Hold" | "Inactive",
    },
    {
      id: "12",
      name: "Project Name",
      description:
        "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
      teamId: "Team ID",
      members: [
        { id: "1", name: "Ahmed Salah", initials: "AS" },
        { id: "2", name: "Bilal Touati", initials: "BT" },
        { id: "3", name: "Camila Uzumaki", initials: "CU" },
        { id: "4", name: "David Lee", initials: "DL" },
      ],
      mentors: [
        { id: "5", name: "John Doe", initials: "JD" },
        { id: "6", name: "Karim Lamine", initials: "KL" },
      ],
      status: "Active" as "Active" | "Completed" | "On Hold" | "Inactive",
    },
  ];

  const handleEditProject = (id: string | number) => {
    console.log(`Edit project ${id}`);
  };

  const handleDeleteProject = (id: string | number) => {
    console.log(`Delete project ${id}`);
  };

  const handleDuplicateProject = (id: string | number) => {
    console.log(`Duplicate project ${id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <div className={styles.searchInput}>
          <Input
            contentBefore={<Search24Regular />}
            placeholder="Search ame, email, or project.."
          />
        </div>

        <div className={styles.filterSection}>
          <Text className={styles.filterLabel}>Filter by</Text>
          <Select>
            <option value="status">Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="all">All</option>
          </Select>
        </div>
      </div>
      <div className={styles.projectsGrid}>
        {projects.map((project) => {
          try {
            return (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onDuplicate={handleDuplicateProject}
              />
            );
          } catch (err) {
            console.error("Error rendering project:", project, err);
            return <div>Error rendering project {project?.id}</div>;
          }
        })}
      </div>
      <div className={styles.pagination}>
        <Button
          icon={<ChevronLeft24Regular />}
          className={styles.paginationButton}
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        />
        {[1, 2, 3].map((page) => (
          <Button
            key={page}
            className={`${styles.paginationButton} ${currentPage === page ? styles.paginationButtonActive : ""
              }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </Button>
        ))}
        <Button
          icon={<ChevronRight24Regular />}
          className={styles.paginationButton}
          onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
        />
      </div>
    </div>
  );
};