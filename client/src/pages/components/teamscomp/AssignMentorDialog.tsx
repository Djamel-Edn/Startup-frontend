import {
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Input,
  Avatar,
  Text,
  makeStyles,
  tokens,
  shorthands,
} from "@fluentui/react-components";
import { Dismiss24Regular, Search24Regular } from "@fluentui/react-icons";
import React from "react";

const useStyles = makeStyles({
  dialogSurface: {
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusLarge),
    width: "480px",
    minWidth: "480px",
    ...shorthands.padding("24px"),
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap(tokens.spacingVerticalXL),
  },
  closeButton: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    cursor: "pointer",
    color: tokens.colorNeutralForeground3,
    fontSize: "24px",
  },
  searchContainer: {
    width: "100%",
    paddingBottom: "12px",
  },
  mentorsContainer: {
    width: "100%",
  },
  mentorItem: {
    display: "flex",
    alignItems: "center",
    ...shorthands.padding("1rem"),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  mentorInfo: {
    marginLeft: "1rem",
    flex: 1,
  },
  mentorName: {
    fontWeight: "500",
  },
  mentorEmail: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  assignButton: {
    minWidth: "80px",
  },
});

interface Mentor {
  id: string;
  name: string;
  email: string;
}

interface AssignMentorDialogProps {
  teamId: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAssignMentor: (teamId: string, mentorId: string) => void;
}

export function AssignMentorDialog({
  teamId,
  isOpen,
  onOpenChange,
  onAssignMentor,
}: AssignMentorDialogProps) {
  const styles = useStyles();
  const [searchQuery, setSearchQuery] = React.useState("");

  const availableMentors: Mentor[] = [
    { id: "1", name: "User name", email: "email@esi-sba.dz" },
    { id: "2", name: "User name", email: "email@esi-sba.dz" },
    { id: "3", name: "User name", email: "email@esi-sba.dz" },
    { id: "4", name: "User name", email: "email@esi-sba.dz" },
    { id: "5", name: "User name", email: "email@esi-sba.dz" },
  ];

  const filteredMentors = availableMentors.filter(
    (mentor) =>
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(_: any, data: { open: boolean; }) => onOpenChange(data.open)}
    >
      <DialogSurface className={styles.dialogSurface}>
        <DialogBody>
          <div
            className={styles.closeButton}
            onClick={() => onOpenChange(false)}
          >
            <Dismiss24Regular />
          </div>
          <DialogTitle>Assign Mentor to Team {teamId}</DialogTitle>
          <DialogContent>
            <div className={styles.searchContainer}>
              <Input
                placeholder="Search for mentor by name, email, expertise"
                contentBefore={<Search24Regular />}
                value={searchQuery}
                onChange={handleSearch}
                style={{ width: "75%" }}
              />
            </div>
            <div className={styles.mentorsContainer}>
              <Text weight="semibold">Mentors ({filteredMentors.length})</Text>
              <div>
                {filteredMentors.map((mentor) => (
                  <div key={mentor.id} className={styles.mentorItem}>
                    <Avatar name={mentor.name} size={40} />
                    <div className={styles.mentorInfo}>
                      <Text className={styles.mentorName}>{mentor.name}</Text>
                      <Text className={styles.mentorEmail}>{mentor.email}</Text>
                    </div>
                    <Button
                      className={styles.assignButton}
                      appearance="outline"
                      onClick={() => {
                        onAssignMentor(teamId, mentor.id);
                        onOpenChange(false);
                      }}
                    >
                      Assign
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button appearance="secondary" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
}