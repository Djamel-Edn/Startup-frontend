// import React, { useState } from "react";
// import { Button, Avatar, Input, Text } from "@fluentui/react-components";
// import { Search24Regular } from "@fluentui/react-icons";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   DialogClose,
// } from "@/components/ui/dialog";
// import { makeStyles, tokens } from "@fluentui/react-components";

// const useStyles = makeStyles({
//   dialogContent: {
//     backgroundColor: "#882999",
//     borderRadius: tokens.borderRadiusLarge,
//     padding: "24px",
//     width: "480px",
//     minWidth: "480px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-start",
//     gap: tokens.spacingVerticalXL,
//   },
//   container: {
//     display: "flex",
//     width: "480px",
//     minWidth: "480px",
//     padding: "24px",
//     flexDirection: "column",
//     alignItems: "flex-start",
//     gap: tokens.spacingHorizontalXL, // Utilise le spacing Global.Size.280 (en Fluent c’est souvent XL)
//     borderRadius: tokens.borderRadiusLarge, // Global.Corner.Radius.80 → souvent borderRadiusLarge
//     backgroundColor: tokens.colorNeutralBackground1, // NeutralBackground1.Rest
//   },

//   dialogTitle: {
//     fontSize: tokens.fontSizeBase500,
//     fontWeight: "600",
//     marginBottom: "1.5rem",
//   },
//   searchContainer: {
//     marginBottom: "2rem",
//   },
//   mentorsContainer: {
//     marginTop: "2rem",
//   },
//   mentorItem: {
//     display: "flex",
//     alignItems: "center",
//     padding: "1rem",
//     borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
//   },
//   mentorInfo: {
//     marginLeft: "1rem",
//     flex: 1,
//   },
//   mentorName: {
//     fontWeight: "500",
//   },
//   mentorEmail: {
//     fontSize: tokens.fontSizeBase200,
//     color: tokens.colorNeutralForeground2,
//   },
//   assignButton: {
//     minWidth: "80px",
//   },
//   closeButton: {
//     position: "absolute",
//     top: "1rem",
//     right: "1rem",
//     cursor: "pointer",
//     fontSize: "1.5rem",
//     color: tokens.colorNeutralForeground3,
//   },
// });

// interface Mentor {
//   id: string;
//   name: string;
//   email: string;
// }

// interface AssignMentorDialogProps {
//   teamId: string;
//   isOpen: boolean;
//   onOpenChange: (open: boolean) => void;
//   onAssignMentor: (teamId: string, mentorId: string) => void;
// }

// export function AssignMentorDialog({
//   teamId,
//   isOpen,
//   onOpenChange,
//   onAssignMentor,
// }: AssignMentorDialogProps) {
//   const styles = useStyles();
//   const [searchQuery, setSearchQuery] = useState("");

//   // Mock data for available mentors
//   const availableMentors: Mentor[] = [
//     { id: "1", name: "User name", email: "email@esi-sba.dz" },
//     { id: "2", name: "User name", email: "email@esi-sba.dz" },
//     { id: "3", name: "User name", email: "email@esi-sba.dz" },
//     { id: "4", name: "User name", email: "email@esi-sba.dz" },
//     { id: "5", name: "User name", email: "email@esi-sba.dz" },
//   ];

//   const filteredMentors = availableMentors.filter(
//     (mentor) =>
//       mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       mentor.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onOpenChange}>
//       <DialogContent className={styles.dialogContent}>
//         <DialogTitle className={styles.dialogTitle}>
//           Assign Mentor to Team {teamId}
//         </DialogTitle>

//         <div className={styles.searchContainer}>
//           <Input
//             placeholder="Search for mentor by name, email, expertise"
//             contentBefore={<Search24Regular />}
//             value={searchQuery}
//             onChange={handleSearch}
//           />
//         </div>

//         <div className={styles.mentorsContainer}>
//           <Text weight="semibold">Mentors ({filteredMentors.length})</Text>

//           <div>
//             {filteredMentors.map((mentor) => (
//               <div key={mentor.id} className={styles.mentorItem}>
//                 <Avatar name={mentor.name} size={40} />
//                 <div className={styles.mentorInfo}>
//                   <Text className={styles.mentorName}>{mentor.name}</Text>
//                   <Text className={styles.mentorEmail}>{mentor.email}</Text>
//                 </div>
//                 <Button
//                   className={styles.assignButton}
//                   appearance="outline"
//                   onClick={() => {
//                     onAssignMentor(teamId, mentor.id);
//                     onOpenChange(false);
//                   }}
//                 >
//                   Assign
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <DialogClose />
//       </DialogContent>
//     </Dialog>
//   );
// }

import * as React from "react";
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
} from "@fluentui/react-components";
import { Dismiss24Regular, Search24Regular } from "@fluentui/react-icons";
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  dialogSurface: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    width: "480px",
    minWidth: "480px",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXL,
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
    padding: "1rem",
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onOpenChange={(_: any, data: { open: boolean }) =>
        onOpenChange(data.open)
      }
    >
      <DialogSurface className={styles.dialogSurface}>
        <DialogBody>
          {/* Close button */}
          <div
            className={styles.closeButton}
            onClick={() => onOpenChange(false)}
          >
            <Dismiss24Regular />
          </div>

          {/* Title */}
          <DialogTitle>Assign Mentor to Team {teamId}</DialogTitle>

          {/* Search */}
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

            {/* Mentor list */}
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

          {/* Actions */}
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
