import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Input,
  Button,
  Select,
  Badge,
  Checkbox,
  TableSelectionCell,
  Text,
} from "@fluentui/react-components";
import {
  ChevronDown24Regular,
  MoreVertical24Regular,
  Search24Regular,
  ChevronLeft24Regular,
  ChevronRight24Regular,
} from "@fluentui/react-icons";
import { useStyles } from "../../../../lib/theme";

export const StudentsListSection = (): JSX.Element => {
  const styles = useStyles();
  const [currentPage, setCurrentPage] = React.useState(1);

  const teamData = [
    {
      id: "Team #023",
      project: "EduSpark",
      leader: "Adel Touati",
      initials: "MB",
      lastActivity: "2 hours ago",
    },
    {
      id: "Team #023",
      project: "Xovia",
      leader: "Karim Belkacem",
      initials: "MB",
      lastActivity: "8 hours ago",
    },
    {
      id: "Team #023",
      project: "Loopa",
      leader: "Sofiane Kaci",
      initials: "MB",
      lastActivity: "1 week ago",
    },
    {
      id: "Team #023",
      project: "Civix",
      leader: "Nour Amari",
      initials: "MB",
      lastActivity: "1 week ago",
    },
    {
      id: "Team #023",
      project: "Project",
      leader: "Primary string",
      initials: "MB",
      lastActivity: "2 week ago",
    },
    {
      id: "Team #023",
      project: "Project",
      leader: "Primary string",
      initials: "MB",
      lastActivity: "1 week ago",
    },
  ];

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
              <TableHeaderCell>Team Id</TableHeaderCell>
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
            {teamData.map((team, index) => (
              <TableRow key={index}>
                <TableSelectionCell>
                  <Checkbox />
                </TableSelectionCell>
                <TableCell>{team.id}</TableCell>
                <TableCell>
                  <Badge appearance="filled" color="brand">
                    Active
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
                    <Button
                      icon={<ChevronDown24Regular />}
                      appearance="subtle"
                    />
                    <Button
                      icon={<MoreVertical24Regular />}
                      appearance="subtle"
                    />
                  </div>
                </TableCell>
              </TableRow>
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
            className={`${styles.paginationButton} ${
              currentPage === page ? styles.paginationButtonActive : ""
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
