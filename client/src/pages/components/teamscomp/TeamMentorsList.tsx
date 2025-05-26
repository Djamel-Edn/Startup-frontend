import {
  Checkbox,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Table,
  Text,
  Avatar,
  makeStyles,
  tokens,
  shorthands,
} from "@fluentui/react-components";
import {
  Person16Regular,
  PeopleTeam16Regular,
  Clock16Regular,
  Dismiss16Regular,
} from "@fluentui/react-icons";
import React, { useState } from "react";
import { AssignMentorDialog } from "./AssignMentorDialog";
import { ActionMenu } from "./Menu";

const useStyles = makeStyles({
  mentorContainer: {
    marginBottom: "0.5rem",
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: tokens.fontSizeBase300,
    marginBottom: "0.75rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    width: "1.5rem",
    height: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...shorthands.borderRadius("0.25rem"),
    cursor: "pointer",
    fontSize: "1rem",
    lineHeight: "1rem",
  },
  table: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius("0.25rem"),
    overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  mentorRow: {
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  mentorCell: {
    ...shorthands.padding("0.5rem", "0.75rem"),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("0.5rem"),
  },
});

interface Mentor {
  id: string;
  name: string;
  email: string;
  lastActive: string;
  year: string;
}

interface TeamMentorsListProps {
  mentors: Mentor[];
  teamId: string;
}

export function TeamMentorsList({ mentors, teamId }: TeamMentorsListProps) {
  const styles = useStyles();
  const [selectedMentors, setSelectedMentors] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleMentorSelection = (mentorId: string) => {
    setSelectedMentors((prev) =>
      prev.includes(mentorId)
        ? prev.filter((id) => id !== mentorId)
        : [...prev, mentorId]
    );
  };

  const handleSelectAll = () => {
    setSelectedMentors(
      selectedMentors.length === mentors.length
        ? []
        : mentors.map((mentor) => mentor.id)
    );
  };

  const handleAssignMentor = (teamId: string, mentorId: string) => {
    console.log(`Assigning mentor ${mentorId} to team ${teamId}`);
  };

  const handleMentorAction = (action: string, mentorId: string) => {
    console.log(`Action ${action} on mentor ${mentorId} for team ${teamId}`);
  };

  return (
    <div className={styles.mentorContainer}>
      <div className={styles.sectionTitle}>
        <Text>Mentors ({mentors.length})</Text>
        <div className={styles.addButton} onClick={() => setIsDialogOpen(true)}>
          +
        </div>
      </div>
      <Table className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <Checkbox
                checked={selectedMentors.length === mentors.length}
                onChange={handleSelectAll}
              />
            </TableHeaderCell>
            <TableHeaderCell>Mentor</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Last active</TableHeaderCell>
            <TableHeaderCell>Position</TableHeaderCell>
            <TableHeaderCell />
          </TableRow>
        </TableHeader>
        <TableBody>
          {mentors.map((mentor) => (
            <TableRow key={mentor.id} className={styles.mentorRow}>
              <TableCell className={styles.mentorCell}>
                <Checkbox
                  checked={selectedMentors.includes(mentor.id)}
                  onChange={() => toggleMentorSelection(mentor.id)}
                />
              </TableCell>
              <TableCell className={styles.mentorCell}>
                <div className={styles.avatarContainer}>
                  <Avatar name={mentor.name} size={24} />
                  <Text>{mentor.name}</Text>
                </div>
              </TableCell>
              <TableCell className={styles.mentorCell}>{mentor.email}</TableCell>
              <TableCell className={styles.mentorCell}>{mentor.lastActive}</TableCell>
              <TableCell className={styles.mentorCell}>{mentor.year}</TableCell>
              <TableCell className={styles.mentorCell} style={{ textAlign: "right" }}>
                <ActionMenu
                  header="Mentor Actions"
                  actions={[
                    {
                      label: "View Mentor Profile",
                      icon: <Person16Regular />,
                      onClick: () => handleMentorAction("viewProfile", mentor.id),
                    },
                    {
                      label: "Change Mentor",
                      icon: <Person16Regular />,
                      onClick: () => handleMentorAction("changeMentor", mentor.id),
                    },
                    {
                      label: "View Assigned Teams",
                      icon: <PeopleTeam16Regular />,
                      onClick: () => handleMentorAction("viewTeams", mentor.id),
                    },
                    {
                      label: "View Mentor Activity Log",
                      icon: <Clock16Regular />,
                      onClick: () => handleMentorAction("viewActivity", mentor.id),
                    },
                    {
                      isDivider: true,
                      label: "",
                      icon: null,
                      onClick: () => {},
                    },
                    {
                      label: "Unassign from Team",
                      icon: <Dismiss16Regular />,
                      onClick: () => handleMentorAction("unassign", mentor.id),
                    },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AssignMentorDialog
        teamId={teamId}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAssignMentor={handleAssignMentor}
      />
    </div>
  );
}