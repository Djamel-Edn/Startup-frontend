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
import { Person16Regular, Clock16Regular, Delete16Regular } from "@fluentui/react-icons";
import React, { useState } from "react";
import { ActionMenu } from "./Menu";

const useStyles = makeStyles({
  studentContainer: {
    marginBottom: "1.5rem",
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
  studentRow: {
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  studentCell: {
    ...shorthands.padding("0.5rem", "0.75rem"),
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("0.5rem"),
  },
});

interface Student {
  id: string;
  name: string;
  email: string;
  lastActive: string;
  year: string;
}

interface TeamStudentsListProps {
  students: Student[];
  teamId: string;
}

export function TeamStudentsList({ students, teamId }: TeamStudentsListProps) {
  const styles = useStyles();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const toggleStudentSelection = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    setSelectedStudents(
      selectedStudents.length === students.length
        ? []
        : students.map((student) => student.id)
    );
  };

  const handleStudentAction = (action: string, studentId: string) => {
    console.log(`Action ${action} on student ${studentId} for team ${teamId}`);
  };

  return (
    <div className={styles.studentContainer}>
      <div className={styles.sectionTitle}>
        <Text>Students ({students.length})</Text>
        <div className={styles.addButton}>+</div>
      </div>
      <Table className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <Checkbox
                checked={selectedStudents.length === students.length}
                onChange={handleSelectAll}
              />
            </TableHeaderCell>
            <TableHeaderCell>Student</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Last active</TableHeaderCell>
            <TableHeaderCell>Year</TableHeaderCell>
            <TableHeaderCell />
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} className={styles.studentRow}>
              <TableCell className={styles.studentCell}>
                <Checkbox
                  checked={selectedStudents.includes(student.id)}
                  onChange={() => toggleStudentSelection(student.id)}
                />
              </TableCell>
              <TableCell className={styles.studentCell}>
                <div className={styles.avatarContainer}>
                  <Avatar name={student.name} size={24} />
                  <Text>{student.name}</Text>
                </div>
              </TableCell>
              <TableCell className={styles.studentCell}>{student.email}</TableCell>
              <TableCell className={styles.studentCell}>{student.lastActive}</TableCell>
              <TableCell className={styles.studentCell}>{student.year}</TableCell>
              <TableCell className={styles.studentCell} style={{ textAlign: "right" }}>
                <ActionMenu
                  header="Student Actions"
                  actions={[
                    {
                      label: "Change Role in Team",
                      icon: <Person16Regular />,
                      onClick: () => handleStudentAction("changeRole", student.id),
                    },
                    {
                      label: "View Team Activity Log",
                      icon: <Clock16Regular />,
                      onClick: () => handleStudentAction("viewActivity", student.id),
                    },
                    {
                      label: "Remove from Team",
                      icon: <Delete16Regular />,
                      onClick: () => handleStudentAction("remove", student.id),
                    },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}