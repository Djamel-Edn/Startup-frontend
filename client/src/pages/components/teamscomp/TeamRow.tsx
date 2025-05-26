import {
  Badge,
  Checkbox,
  TableCell,
  TableCellLayout,
  TableRow,
  TableSelectionCell,
  Text,
  makeStyles,
  tokens,
  shorthands,
} from "@fluentui/react-components";
import {
  ChevronDown16Regular,
  ChevronUp16Regular,
  Person16Regular,
  FolderMultiple16Regular,
  Send16Regular,
  Clock16Regular,
  Delete16Regular,
} from "@fluentui/react-icons";
import React from "react";
import { TeamStudentsList } from "./TeamStudentsList";
import { TeamMentorsList } from "./TeamMentorsList";
import { ActionMenu } from "./Menu";

const useStyles = makeStyles({
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  },
  highlightedRow: {
    backgroundColor: tokens.colorBrandBackground,
  },
  avatar: {
    width: "24px",
    height: "24px",
    backgroundColor: tokens.colorNeutralBackground3,
    ...shorthands.borderRadius("50%"),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    color: tokens.colorNeutralForeground1,
  },
  teamLeaderCell: {
    display: "flex",
    ...shorthands.gap("8px"),
  },
  actionButtons: {
    display: "flex",
    ...shorthands.gap("4px"),
  },
  expandButton: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  membersContainer: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: "16px",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
});

interface TeamRowProps {
  team: {
    initials: React.ReactNode;
    id: string;
    name: string;
    status: string;
    project: string;
    leader: string;
    lastActivity: string;
    members: Array<{
      name: string;
      role: string;
      email: string;
    }>;
  };
  isSelected: boolean;
  isExpanded: boolean;
  onToggleSelect: (teamId: string, event: React.MouseEvent) => void;
  onToggleExpand: (teamId: string, event: React.MouseEvent) => void;
  onTeamAction: (action: string, teamId: string) => void;
  onRowClick?: () => void;
}

export function TeamRow({
  team,
  isSelected,
  isExpanded,
  onToggleSelect,
  onToggleExpand,
  onTeamAction,
  onRowClick,
}: TeamRowProps) {
  const styles = useStyles();

  const students = [
    {
      id: "1",
      name: "Karim Belkacem",
      email: "u.name@esi-sba.dz",
      lastActive: "2 days",
      year: "1 CS",
    },
    {
      id: "2",
      name: "Arlene McCoy",
      email: "u.name@esi-sba.dz",
      lastActive: "2 days",
      year: "1 CS",
    },
    {
      id: "3",
      name: "Arlene McCoy",
      email: "u.name@esi-sba.dz",
      lastActive: "2 days",
      year: "1 CS",
    },
    {
      id: "4",
      name: "Arlene McCoy",
      email: "u.name@esi-sba.dz",
      lastActive: "2 days",
      year: "1 CS",
    },
  ];

  const mentors = [
    {
      id: "1",
      name: "Adel Touati",
      email: "a.touati@esi-sba.dz",
      lastActive: "1 day",
      year: "Prof",
    },
    {
      id: "2",
      name: "Karim Belkacemi",
      email: "k.belkacemi@esi-sba.dz",
      lastActive: "3 days",
      year: "PhD",
    },
  ];

  return (
    <>
      <TableRow
        className={`${styles.row} ${isSelected ? styles.highlightedRow : ""}`}
        onClick={onRowClick}
      >
        <TableSelectionCell
          onClick={(e: React.MouseEvent<Element, MouseEvent>) => onToggleSelect(team.id, e)}
        >
          <Checkbox checked={isSelected} />
        </TableSelectionCell>
        <TableCell>
          <TableCellLayout>{team.name}</TableCellLayout>
        </TableCell>
        <TableCell>
          <Badge
            appearance="filled"
            size="large"
            color="important"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14ZM8 13C5.23858 13 3 10.7614 3 8C3 5.23858 5.23858 3 8 3C10.7614 3 13 5.23858 13 8C13 10.7614 10.7614 13 8 13Z"
                  fill={tokens.colorNeutralForegroundInverted}
                />
              </svg>
            }
          >
            {team.status}
          </Badge>
        </TableCell>
        <TableCell>
          <Text weight="semibold">{team.project}</Text>
        </TableCell>
        <TableCell>
          <div className={styles.teamLeaderCell}>
            <div className={styles.avatar}>{team.initials}</div>
            <Text>{team.leader}</Text>
          </div>
        </TableCell>
        <TableCell>{team.lastActivity}</TableCell>
        <TableCell>
          <div className={styles.actionButtons}>
            <ActionMenu
              header="Team Actions"
              actions={[
                {
                  label: "Edit Team Info",
                  icon: <Person16Regular />,
                  onClick: () => onTeamAction("edit", team.id),
                },
                {
                  label: "View Linked Project Profile",
                  icon: <FolderMultiple16Regular />,
                  onClick: () => onTeamAction("viewProject", team.id),
                },
                {
                  label: "Send Notification",
                  icon: <Send16Regular />,
                  onClick: () => onTeamAction("sendNotification", team.id),
                },
                {
                  label: "View Team Activity Log",
                  icon: <Clock16Regular />,
                  onClick: () => onTeamAction("viewActivity", team.id),
                },
                {
                  label: "Delete Team",
                  icon: <Delete16Regular />,
                  onClick: () => onTeamAction("delete", team.id),
                },
              ]}
            />
            <div
              className={styles.expandButton}
              onClick={(e) => onToggleExpand(team.id, e)}
            >
              {isExpanded ? <ChevronUp16Regular /> : <ChevronDown16Regular />}
            </div>
          </div>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <tr>
          <td colSpan={7}>
            <div className={styles.membersContainer}>
              <TeamStudentsList students={students} teamId={team.id} />
              <TeamMentorsList mentors={mentors} teamId={team.id} />
            </div>
          </td>
        </tr>
      )}
    </>
  );
}