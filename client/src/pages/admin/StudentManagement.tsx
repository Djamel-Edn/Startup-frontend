"use client";

import React, { useState } from 'react';
import { Input, Select, Text, Checkbox, Image, Button, makeStyles, tokens, shorthands } from '@fluentui/react-components';
import { Search24Regular, ChevronLeft24Regular, ChevronRight24Regular, MoreVertical24Regular, Add24Regular } from '@fluentui/react-icons';
import profilePicture from '../../assets/Profile Picture.jpg';
import { HeaderSection } from './header/HeaderSection';

interface Student {
  id: number;
  name: string;
  email: string;
  role: string;
  year: string;
  isActive: boolean;
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
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    overflowY: 'auto',
    maxHeight: '100%',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '::-webkit-scrollbar': { display: 'none' },
  },
  listHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    fontSize: '12px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground2,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: '4px',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  checkbox: {
    marginRight: '1rem',
  },
  profileWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: 1,
  },
  profilePicture: {
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    objectFit: 'cover',
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: tokens.colorStatusSuccessBackground3,
    border: `2px solid ${tokens.colorNeutralBackground1}`,
  },
  name: {
    fontSize: '14px',
    fontWeight: '500',
    color: tokens.colorNeutralForeground1,
  },
  lastActive: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    flex: 1,
  },
  role: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    flex: 1,
  },
  menuButton: {
    background: 'transparent',
    border: 'none',
    color: tokens.colorNeutralForeground2,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3,
      borderRadius: '4px',
    },
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    margin: '1rem 0 0.5rem 0',
    color: tokens.colorNeutralForeground1,
  },
  addButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
});

export function StudentManagement() {
  const styles = useStyles();
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const sampleStudents: Student[] = [
    { id: 1, name: 'Arlene McCoy', email: 'arlene.mccoy@esi-sba.dz', role: 'member', year: '1 CS', isActive: true },
    { id: 2, name: 'John Smith', email: 'john.smith@esi-sba.dz', role: 'leader', year: '1 CS', isActive: true },
    { id: 3, name: 'Emma Wilson', email: 'emma.wilson@esi-sba.dz', role: 'No team', year: '1 CS', isActive: true },
    { id: 4, name: 'Ahmed Salah', email: 'ahmed.salah@esi-sba.dz', role: 'member', year: '1 CS', isActive: true },
    { id: 5, name: 'Fatima Zahra', email: 'fatima.zahra@esi-sba.dz', role: 'leader', year: '1 CS', isActive: true },
    { id: 6, name: 'Nour Amari', email: 'nour.amari@esi-sba.dz', role: 'No team', year: '1 CS', isActive: true },
    { id: 7, name: 'Omar Khalid', email: 'omar.khalid@esi-sba.dz', role: 'member', year: '1 CS', isActive: true },
  ];

  const toggleRow = (id: number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const handleAddStudent = () => {
    console.log("Add Student clicked");
  };

  return (
    <div className={styles.tableContainer}>
      <HeaderSection
        title="Student Management"
        subtitle="Manage.track and monitor student activities"
        button={{
          label: "Add Student",
           icon: <Add24Regular />,
           onClick: handleAddStudent,
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
      <Text className={styles.sectionTitle}>Students ({sampleStudents.length})</Text>
      <div className={styles.list}>
        <div className={styles.listHeader}>
          <Checkbox className={styles.checkbox} onChange={() => setSelectedRows(new Set(sampleStudents.map(s => s.id)))} />
          <Text style={{ flex: 1 }}>Student</Text>
          <Text style={{ flex: 1 }}>Email</Text>
          <Text style={{ flex: 1 }}>Role</Text>
          <Text style={{ flex: 1 }}>Year</Text>
          <Button className={styles.menuButton}>
            <MoreVertical24Regular />
          </Button>
        </div>
        {sampleStudents.map((student) => (
          <div key={student.id} className={styles.listItem}>
            <Checkbox
              className={styles.checkbox}
              checked={selectedRows.has(student.id)}
              onChange={() => toggleRow(student.id)}
            />
            <div className={styles.profileWrapper}>
              <div style={{ position: 'relative' }}>
                <Image src={profilePicture} alt={student.name} className={styles.profilePicture} />
                {student.isActive && <div className={styles.onlineIndicator}></div>}
              </div>
              <Text className={styles.name}>{student.name}</Text>
            </div>
            <Text className={styles.lastActive}>{student.email}</Text>
            <Text className={styles.role}>{student.role}</Text>
            <Text className={styles.role}>{student.year}</Text>
            <Button className={styles.menuButton}>
              <MoreVertical24Regular />
            </Button>
          </div>
        ))}
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