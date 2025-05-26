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
  Avatar,
} from "@fluentui/react-components";
import {
  MoreHorizontal24Regular,
  Edit24Regular,
  Delete24Regular,
  DocumentCopy24Regular,
  CircleRegular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  card: {
    width: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    padding: tokens.spacingHorizontalL,
    boxShadow: tokens.shadow4,
    cursor: "pointer",
    transition: "all 0.2s",
    marginTop:'2px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: tokens.shadow16,
    },
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: tokens.spacingVerticalS,
  },
  progressBadge: {
    backgroundColor: "transparent",
    color: "#0078d4",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: tokens.fontSizeBase200,
    display: "flex",
    alignItems: "center",
    gap: "4px",
    border: `1px solid #0078d4`,
    fontWeight: tokens.fontWeightMedium,
  },
  moreButton: {
    minWidth: "auto",
    width: "24px",
    height: "24px",
    padding: "0",
  },
  title: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "4px",
    color: tokens.colorNeutralForeground1,
    lineHeight: 1.2,
  },
  description: {
    fontSize: "13px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "10px",
    lineHeight: "1.2",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  metadataRow: {
    display: "flex",
    justifyContent: "space-between",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingTop: "8px",
  },
  metadataSection: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  metadataLabel: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground3,
    fontWeight: tokens.fontWeightSemibold,
  },
  avatarGroup: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginLeft: "-4px",
    border: `2px solid ${tokens.colorNeutralBackground1}`,
    "&:first-child": {
      marginLeft: 0,
    },
  },
  moreAvatars: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,
    fontSize: "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "-4px",
    border: `2px solid ${tokens.colorNeutralBackground1}`,
    fontWeight: tokens.fontWeightSemibold,
  },
});

interface ProjectCardProps {
  project: {
    id: string | number;
    name: string;
    description: string;
    progress: number;
    teamMembers: Array<{
      id: string;
      name: string;
      avatar?: string;
    }>;
    mentors: Array<{
      id: string;
      name: string;
      avatar?: string;
    }>;
  };
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  onDuplicate?: (id: string | number) => void;
  onClick?: (id: string | number) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  onDuplicate,
  onClick,
}) => {
  const styles = useStyles();

  const handleCardClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick(project.id);
    }
  };

  const handleMenuClick = (e: React.MouseEvent, callback?: (id: string | number) => void) => {
    e.stopPropagation();
    if (callback) callback(project.id);
  };

  return (
    <Card className={styles.card} onClick={handleCardClick}>
      <CardHeader
        className={styles.header}
        header={
          <div className={styles.progressBadge}>
            <CircleRegular />
            In Progress {project.progress}%
          </div>
        }
        action={
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Button
                className={styles.moreButton}
                icon={<MoreHorizontal24Regular />}
                appearance="subtle"
                aria-label="More options"
                onClick={(e: { stopPropagation: () => any; }) => e.stopPropagation()}
              />
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                <MenuItem
                  icon={<Edit24Regular />}
                  onClick={(e: React.MouseEvent<Element, MouseEvent>) => handleMenuClick(e, onEdit)}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  icon={<DocumentCopy24Regular />}
                  onClick={(e: React.MouseEvent<Element, MouseEvent>) => handleMenuClick(e, onDuplicate)}
                >
                  Duplicate
                </MenuItem>
                <Divider />
                <MenuItem
                  icon={<Delete24Regular />}
                  onClick={(e: React.MouseEvent<Element, MouseEvent>) => handleMenuClick(e, onDelete)}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </MenuPopover>
          </Menu>
        }
      />
      <div>
        <Text className={styles.title}>{project.name}</Text>
        <Text className={styles.description}>{project.description}</Text>
        <div className={styles.metadataRow}>
          <div className={styles.metadataSection}>
            <Text className={styles.metadataLabel}>Team ID</Text>
            <div className={styles.avatarGroup}>
              {project?.teamMembers?.slice(0, 3).map((member) => (
                <Avatar
                  key={member.id}
                  name={member.name}
                  image={{ src: member.avatar }}
                  size={24}
                  className={styles.avatar}
                />
              ))}
              {project?.teamMembers?.length > 3 && (
                <div className={styles.moreAvatars}>+{project?.teamMembers?.length - 3}</div>
              )}
            </div>
          </div>
          <div className={styles.metadataSection}>
            <Text className={styles.metadataLabel}>Mentors</Text>
            <div className={styles.avatarGroup}>
              {project?.mentors?.map((mentor) => (
                <Avatar
                  key={mentor.id}
                  name={mentor.name}
                  image={{ src: mentor.avatar }}
                  size={24}
                  className={styles.avatar}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;