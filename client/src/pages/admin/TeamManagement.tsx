"use client";

import React, { useState } from 'react';
import { Text, Table, TableBody, TableHeader, TableHeaderCell, TableRow, Input, TableSelectionCell, Checkbox, Button, Select, makeStyles, tokens, shorthands } from '@fluentui/react-components';
import { Search24Regular, ChevronLeft24Regular, ChevronRight24Regular, MoreVertical24Regular, Add24Regular } from '@fluentui/react-icons';
import { TeamRow } from '../components/teamscomp/TeamRow';
import { HeaderSection } from './header/HeaderSection';

interface Team {
  id: string;
  name: string;
  status: string;
  project: string;
  leader: string;
  lastActivity: string;
  members: any[];
  initials: string;
}

const useStyles = makeStyles({
  tableContainer: {
    flex: '1 1 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    overflow: 'hidden',
    padding: '0 2rem',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
    width: '100%',
    paddingBottom: '16px',
  },
  searchInput: {
    flexGrow: 1,
  },
  filterSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  filterLabel: {
    color: tokens.colorNeutralForeground1,
  },
  tableWrapper: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    padding: '16px',
    overflowY: 'auto',
    maxHeight: '100%',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '::-webkit-scrollbar': { display: 'none' },
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    padding: '1rem',
    boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.05)',
    gap: '8px',
  },
  paginationButton: {
    minWidth: '32px',
    height: '32px',
    padding: '4px',
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  paginationButtonActive: {
    backgroundColor: tokens.colorNeutralBackground1Selected,
    fontWeight: tokens.fontWeightSemibold,
  },
  addButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
});

export default function TeamsManagement() {
  const styles = useStyles();
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const teams: Team[] = [
    {
      id: '127',
      name: 'Team #127',
      status: 'Active',
      project: 'HealthAI',
      leader: 'Ahmed Salah',
      lastActivity: '2 weeks ago',
      members: [],
      initials: 'T#1',
    },
    {
      id: '128',
      name: 'Team #128',
      status: 'Active',
      project: 'EduSpark',
      leader: 'Emma Wilson',
      lastActivity: '1 week ago',
      members: [],
      initials: 'T#2',
    },
    {
      id: '129',
      name: 'Team #129',
      status: 'Active',
      project: 'Xovia',
      leader: 'Nour Amari',
      lastActivity: '1 week ago',
      members: [],
      initials: 'T#3',
    },
  ];

  const handleToggleExpand = (teamId: string) => {
    setExpandedRowId((prev) => (prev === teamId ? null : teamId));
  };

  const handleToggleSelect = (teamId: string) => {
    setSelectedRows((prev) =>
      prev.includes(teamId) ? prev.filter((id) => id !== teamId) : [...prev, teamId]
    );
  };

  const handleTeamAction = (action: string, teamId: string) => {
    console.log(`Action: ${action}, Team: ${teamId}`);
  };

  const handleAddTeam = () => {
    console.log("Add Team clicked");
  };

  return (
    <div className={styles.tableContainer}>
       <HeaderSection
              title="Teams management"
              subtitle="MTrack and manage team activities"
              button={{
                label: "Add Team",
                 icon: <Add24Regular />,
                 onClick: handleAddTeam,
              }}
            />
      <div className={styles.searchBar}>
        <div className={styles.searchInput}>
          <Input contentBefore={<Search24Regular />} placeholder="Search name, email, or project..." />
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
            {teams.map((team) => (
              <TeamRow
                key={team.id}
                team={team}
                isSelected={selectedRows.includes(team.id)}
                isExpanded={expandedRowId === team.id}
                onToggleSelect={() => handleToggleSelect(team.id)}
                onToggleExpand={() => handleToggleExpand(team.id)}
                onTeamAction={handleTeamAction}
                onRowClick={() => handleToggleSelect(team.id)}
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
            className={`${styles.paginationButton} ${currentPage === page ? styles.paginationButtonActive : ''}`}
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