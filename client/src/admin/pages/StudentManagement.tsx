/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Text, mergeClasses } from "@fluentui/react-components";
import {
  ChevronLeft24Regular,
  ChevronRight24Regular,
  MoreVertical24Regular,
  Search24Regular,
} from "@fluentui/react-icons";
import profilePicture from "../assets/Profile Picture.jpg";
import {
  makeStyles,
  tokens,
  Button,
  Checkbox,
  Image,
  Input,
} from "@fluentui/react-components";
import { useStyles } from "../lib/theme";
import { Select } from "@fluentui/react-components"; // Add this import if using Fluent UI
interface Student {
  id: number;
  name: string;
  email: string;
  role: string;
  year: string;
  isActive: boolean;
}
const useStyless = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  content: {
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  subtext: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginTop: "0.5rem",
  },
  inviteButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: "600",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    overflowY: "auto",
    maxHeight: "100%", // <--- very important, so it doesn't overflow container
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "::webkit-scrollbar": { display: "none" },
    ":global(*::-webkit-scrollbar)": { display: "none" },
  },
  listHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 1rem",
    fontSize: "12px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground2,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 1rem",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "4px",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  checkbox: {
    marginRight: "1rem",
  },
  profileWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flex: 1,
  },
  profilePicture: {
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    objectFit: "cover",
    position: "relative",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: tokens.colorStatusSuccessBackground3,
    border: `2px solid ${tokens.colorNeutralBackground1}`,
  },
  name: {
    fontSize: "14px",
    fontWeight: "500",
    color: tokens.colorNeutralForeground1,
  },
  lastActive: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    flex: 1,
  },
  role: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    flex: 1,
  },
  menuButton: {
    background: "transparent",
    border: "none",
    color: tokens.colorNeutralForeground2,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
      borderRadius: "4px",
    },
  },
});
const sampleStudents: Student[] = [
  {
    id: 1,
    name: "Arlene McCoy",
    email: "u.name@esi-sba.dz",
    role: "member",
    year: "1 CS",
    isActive: true,
  },
  {
    id: 2,
    name: "Arlene McCoy",
    email: "u.name@esi-sba.dz",
    role: "leader",
    year: "1 CS",
    isActive: true,
  },
  {
    id: 3,
    name: "Arlene McCoy",
    email: "u.name@esi-sba.dz",
    role: "No team",
    year: "1 CS",
    isActive: true,
  },
  {
    id: 4,
    name: "Arlene McCoy",
    email: "u.name@esi-sba.dz",
    role: "member",
    year: "1 CS",
    isActive: true,
  },
  {
    id: 5,
    name: "Arlene McCoy",
    email: "u.name@esi-sba.dz",
    role: "leader",
    year: "1 CS",
    isActive: true,
  },
  {
    id: 6,
    name: "Arlene McCoy",
    email: "u.name@esi-sba.dz",
    role: "No team",
    year: "1 CS",
    isActive: true,
  },
  {
    id: 7,
    name: "Arlene McCoy",
    email: "u.name@esi-sba.dz",
    role: "member",
    year: "1 CS",
    isActive: true,
  },
];

export function StudentManagement() {
  const styles = useStyles();
  const styless = useStyless();
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [contextMenu, setContextMenu] = useState<{
    isOpen: boolean;
    position: { x: number; y: number };
    studentId?: number;
  }>({
    isOpen: false,
    position: { x: 0, y: 0 },
  });
  const handleCheckboxChange = (id: number) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((s) => s !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const toggleRow = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const toggleAllRows = () => {
    if (selectedRows.size === sampleStudents.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(sampleStudents.map((s) => s.id)));
    }
  };

  const handleActionClick = (event: React.MouseEvent, studentId: number) => {
    event.preventDefault();
    event.stopPropagation();

    setContextMenu({
      isOpen: true,
      position: { x: event.clientX, y: event.clientY },
      studentId,
    });
  };

  const members = [
    {
      name: "Arlene McCoy",
      lastActive: "Yesterday",
      role: "Product management",
      isOnline: false,
      isOwner: true,
    },
    {
      name: "Arlene McCoy",
      lastActive: "Yesterday",
      role: "Product management",
      isOnline: true,
    },
    {
      name: "Arlene McCoy",
      lastActive: "Yesterday",
      role: "Product management",
      isOnline: true,
    },
    {
      name: "Arlene McCoy",
      lastActive: "Yesterday",
      role: "Product management",
      isOnline: true,
    },
    {
      name: "Arlene McCoy",
      lastActive: "Yesterday",
      role: "Product management",
      isOnline: true,
    },
  ];
  const closeContextMenu = () => {
    setContextMenu({
      isOpen: false,
      position: { x: 0, y: 0 },
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className={styles.tableContainer}>
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
      </div>{" "}
      <Text className={styless.sectionTitle}>Students ({members.length})</Text>
      {/* <div className={styles.tableWrapper}> */}
      <div className={styless.list}>
        <div className={styless.listHeader}>
          <Checkbox className={styless.checkbox} />
          <Text style={{ flex: 1 }}>Student</Text>
          <Text style={{ flex: 1 }}>Email</Text>
          <Text style={{ flex: 1 }}>Role</Text>
          <Text style={{ flex: 1 }}>Year</Text>
          <Button className={styless.menuButton}>
            <MoreVertical24Regular />
          </Button>
        </div>

        {sampleStudents.map((student) => (
          <div key={student.id} className={styless.listItem}>
            <Checkbox
              className={styless.checkbox}
              checked={selectedMembers.includes(student.id)}
              onChange={() => handleCheckboxChange(student.id)}
            />
            <div className={styless.profileWrapper}>
              <div style={{ position: "relative" }}>
                <Image
                  src={profilePicture}
                  alt={student.name}
                  className={styless.profilePicture}
                />
                {student.isActive && (
                  <div className={styless.onlineIndicator}></div>
                )}
              </div>
              <Text className={styless.name}>{student.name}</Text>
            </div>
            <Text className={styless.lastActive}>{student.email}</Text>
            <Text className={styless.role}>{student.role}</Text>
            <Text className={styless.role}>{student.year}</Text>
            <Button className={styless.menuButton}>
              <MoreVertical24Regular />
            </Button>
          </div>
        ))}
      </div>
      {/* </div> */}
      <div className={styles.pagination}>
        <Button
          icon={<ChevronLeft24Regular />}
          className={styles.paginationButton}
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        />
        {[1, 2, 3].map((page) => (
          <Button
            key={page}
            className={mergeClasses(
              styles.paginationButton,
              currentPage === page ? styles.paginationButtonActive : undefined
            )}
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
      {/* <UserContextMenu
        isOpen={contextMenu.isOpen}
        onClose={closeContextMenu}
        position={contextMenu.position}
        onEditUser={() => {
          console.log("Edit user", contextMenu.studentId);
          closeContextMenu();
        }}
        onViewTeam={() => {
          console.log("View team", contextMenu.studentId);
          closeContextMenu();
        }}
        onViewActivity={() => {
          console.log("View activity", contextMenu.studentId);
          closeContextMenu();
        }}
        onRemoveUser={() => {
          console.log("Remove user", contextMenu.studentId);
          closeContextMenu();
        }}
      /> */}
    </div>
  );
}
