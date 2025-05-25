/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import {
  Text,
  Table,
  TableBody,

  TableHeader,
  TableHeaderCell,
  TableRow,
  Input,

  TableSelectionCell,
  Checkbox,
  Button,
  Select,
  mergeClasses,
} from "@fluentui/react-components";
import { TeamRow } from "../components/teamscomp/TeamRow"; // your existing component
import { useStyles } from "../lib/theme";
import {
  ChevronLeft24Regular,
  ChevronRight24Regular,
  MoreVertical24Regular,
  Search24Regular,
} from "@fluentui/react-icons";

// Dummy data (replace with real data or state later)
const dummyTeams = [
  {
    id: "127",
    name: "Team #127",
    status: "Active",
    project: "Project",
    leader: "Primary string",
    lastActivity: "2 weeks ago",
    highlight: true,
    members: [],
    initials: "T#1",
  },
  {
    id: "128",
    name: "Team #128",
    status: "Active",
    project: "Project",
    leader: "Primary string",
    lastActivity: "1 week ago",
    members: [],
    initials: "T#2",
  },
  {
    id: "128",
    name: "Team #128",
    status: "Active",
    project: "Project",
    leader: "Primary string",
    lastActivity: "1 week ago",
    members: [],
    initials: "T#3",
  },
  {
    id: "128",
    name: "Team #128",
    status: "Active",
    project: "Project",
    leader: "Primary string",
    lastActivity: "1 week ago",
    members: [],
    initials: "T#4",
  },
  {
    id: "128",
    name: "Team #128",
    status: "Active",
    project: "Project",
    leader: "Primary string",
    lastActivity: "1 week ago",
    members: [],
    initials: "T#5",
  },
  {
    id: "128",
    name: "Team #128",
    status: "Active",
    project: "Project",
    leader: "Primary string",
    lastActivity: "1 week ago",
    members: [],
    initials: "T#6",
  },
];

export default function TeamsManagement() {
  const styles = useStyles();
  const [expandedRowId, setExpandedRowId] = React.useState<string | null>(null);
  const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [, setSelectedTeamId] = React.useState<string[]>([]);

  // const handleRowClick = (teamId: string) => {
  //   setSelectedTeamId(teamId === selectedTeamId ? null : teamId);
  // };
  const handleRowClick = (teamId: string) => {
    setSelectedTeamId((prevSelected) =>
      prevSelected.includes(teamId)
        ? prevSelected.filter((id) => id !== teamId)
        : [...prevSelected, teamId]
    );
  };

  const handleToggleExpand = (teamId: string) => {
    setExpandedRowId((prev) => (prev === teamId ? null : teamId));
  };

  const handleToggleSelect = (teamId: string) => {
    setSelectedRows((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  const handleTeamAction = (action: string, teamId: string) => {
    console.log(`Action: ${action}, Team: ${teamId}`);
  };

  const handleMemberAction = (
    action: string,
    teamId: string,
    memberEmail: string
  ) => {
    console.log(`Action: ${action}, Team: ${teamId}, Member: ${memberEmail}`);
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
      </div>
      <div className={styles.tableWrapper}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableSelectionCell>
                <Checkbox />
              </TableSelectionCell>

              <TableHeaderCell>Team ID</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Project</TableHeaderCell>
              <TableHeaderCell>Team Leader</TableHeaderCell>
              <TableHeaderCell>Last Activity</TableHeaderCell>
              <TableHeaderCell>
                <Button icon={<MoreVertical24Regular />} appearance="subtle" />
              </TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyTeams.map((team) => (
              <TeamRow
                key={team.id}
                team={team}
                isSelected={selectedRows.includes(team.id)}
                isExpanded={expandedRowId === team.id}
                onToggleSelect={() => handleToggleSelect(team.id)}
                onToggleExpand={() => handleToggleExpand(team.id)}
                onTeamAction={handleTeamAction}
                onMemberAction={handleMemberAction}
                // isSelected={selectedTeamId === team.id}
                onRowClick={() => handleRowClick(team.id)}
              />
            ))}
          </TableBody>
        </Table>
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
    </div>
  );
}
