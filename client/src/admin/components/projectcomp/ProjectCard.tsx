"use client";

import type * as React from "react";
import {
  Card,
  CardHeader,
  makeStyles,
  tokens,
  Text,
  Button,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  Divider,
} from "@fluentui/react-components";
import {
  MoreHorizontal24Regular,
  Edit24Regular,
  Delete24Regular,
  DocumentCopy24Regular,
} from "@fluentui/react-icons";
import ProjectBadge from "./ProjectBadge";
import AvatarStack from "./AvatarStack";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    flexGrow: 1, // <-- stretch nicely if needed
    minHeight: 0, // <-- VERY IMPORTANT to prevent overflow
  },
  sectionRow: {
    display: "flex",
    gap: tokens.spacingHorizontalL,
    flexWrap: "wrap",
    minHeight: 0,
  },
  card: {
    width: "100%", // instead of maxWidth
    display: "flex",
    flexDirection: "column",
    padding: tokens.spacingHorizontalXL,
    height: "auto", // <-- important!! allow card to size naturally
    minHeight: "320px", // or whatever minimum you want
    boxSizing: "border-box", // ensure padding is counted
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: tokens.spacingVerticalS, // Add spacing under the header
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS, // 12px between badge and title
  },
  title: {
    fontWeight: tokens.fontWeightSemibold,
  },
  description: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    marginBottom: tokens.spacingVerticalL,
  },
  section: {
    marginTop: tokens.spacingVerticalM,
  },
  sectionTitle: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalXS,
  },
});

export interface ProjectCardProps {
  project: {
    id: string | number;
    name: string;
    description: string;
    status: "Active" | "Completed" | "On Hold" | "Inactive";
    teamId: string;
    members: Array<{
      id: string;
      name: string;
      initials: string;
      image?: string;
    }>;
    mentors: Array<{
      id: string;
      name: string;
      initials: string;
      image?: string;
    }>;
  };
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  onDuplicate?: (id: string | number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  onDuplicate,
}) => {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.header}
        header={
          <div className={styles.titleWrapper}>
            <ProjectBadge status={project.status}>
              {project.status}
            </ProjectBadge>
            <Text className={styles.title} size={500}>
              {project.name}
            </Text>
          </div>
        }
        action={
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button
                appearance="subtle"
                icon={<MoreHorizontal24Regular />}
                aria-label="More options"
              />
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem
                  icon={<Edit24Regular />}
                  onClick={() => onEdit && onEdit(project.id)}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  icon={<DocumentCopy24Regular />}
                  onClick={() => onDuplicate && onDuplicate(project.id)}
                >
                  Duplicate
                </MenuItem>
                <Divider />
                <MenuItem
                  icon={<Delete24Regular />}
                  onClick={() => onDelete && onDelete(project.id)}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        }
      />
      <div className={styles.content}>
        <Text className={styles.description}>{project.description}</Text>

        <div className={styles.sectionRow}>
          <div className={styles.section}>
            <Text className={styles.sectionTitle}>Team ID</Text>
            <AvatarStack members={project.members} />
          </div>

          <div className={styles.section}>
            <Text className={styles.sectionTitle}>Mentors</Text>
            <AvatarStack members={project.mentors} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
