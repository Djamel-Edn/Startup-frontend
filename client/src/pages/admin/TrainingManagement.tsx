"use client";

import React, { useState } from "react";
import {
  Text,
  Button,
  makeStyles,
  tokens,
  Card,
  Tooltip,
} from "@fluentui/react-components";
import {
  ChevronLeft24Regular,
  ChevronRight24Regular,
  Add24Regular,
  Dismiss24Regular,
} from "@fluentui/react-icons";
import { MyCalendar } from "../components/Calendar";
import WorkshopCard from "../components/WorkshopCard";
import PastWorkshopCard from "../components/PastWorkshopCard";
import { HeaderSection } from "./header/HeaderSection";
import { WorkshopScheduleDialog } from "./WorkshopScheduleDialog";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: "1",
    gap: "20px",
    padding: "0 2rem",
    "@media (max-width: 768px)": {
      padding: "1rem",
    },
  },
  contentGrid: {
    display: "flex",
    gap: "2rem",
    overflowY: "auto",
    flexGrow: 1,
    "@media (max-width: 768px)": {
      flexDirection: "column",
      gap: "1.5rem",
    },
  },
  calendarWrapper: {
    flex: "0 0 320px",
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow8,
    "@media (max-width: 768px)": {
      flex: "0 0 auto",
      width: "100%",
    },
  },
  workshopsList: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    overflowY: "auto",
    paddingRight: "0.5rem",
    "@media (max-width: 768px)": {
      maxHeight: "none",
    },
  },
  sectionTitleWrapper: {
    display: "flex",
    alignItems: "center",
    paddingLeft: tokens.spacingHorizontalL,
    paddingRight: tokens.spacingHorizontalL,
    marginBottom: "12px",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: "8px",
    },
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    "@media (max-width: 768px)": {
      fontSize: "20px",
    },
  },
  selectedDateText: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  clearButton: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground2,
    padding: "4px 8px",
    fontSize: "12px",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3Hover,
      color: tokens.colorNeutralForeground1,
    },
  },
  pastWorkshopsContainer: {
    padding: "1.5rem",
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow4,
    marginBottom: "20px",
    backgroundColor: "transparent",
    "@media (max-width: 768px)": {
      padding: "1rem",
    },
  },
  pastWorkshopsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "16px",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  workshopCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    padding: "16px",
    boxShadow: tokens.shadow4,
  },
  pagination: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
    padding: "16px",
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow4,
    gap: "8px",
  },
  paginationButton: {
    minWidth: "36px",
    height: "36px",
    padding: "6px",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    transition: "background-color 0.2s ease, transform 0.2s ease",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground1Hover,
      transform: "scale(1.05)",
    },
  },
  paginationButtonActive: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
      transform: "scale(1.05)",
    },
  },
  addButton: {
    background: `linear-gradient(135deg, ${tokens.colorBrandBackground} 0%, ${tokens.colorBrandBackgroundHover} 100%)`,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: "8px 16px",
    borderRadius: tokens.borderRadiusMedium,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: tokens.shadow8,
    },
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  emptyState: {
    borderRadius: tokens.borderRadiusLarge,
    padding: "20px",
    textAlign: "center",
    color: tokens.colorNeutralForeground2,
    fontSize: "16px",
    boxShadow: tokens.shadow2,
    "@media (max-width: 768px)": {
      fontSize: "14px",
      padding: "16px",
    },
  },
});

interface Workshop {
  id: string;
  date: string;
  time: string;
  location: string;
  title: string;
  description: string;
  mentor: string;
}

export default function TrainingManagement() {
  const styles = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const workshops: Workshop[] = [
    {
      id: "1",
      date: "2025-08-17",
      time: "9:00 AM to 5:00 PM",
      location: "ESI SBA Room 04",
      title: "Workshop Title",
      description: 'Come and be part of our session, "Future Innovations Unleashed," where we will explore groundbreaking concepts!',
      mentor: "@mentor_name",
    },
    {
      id: "2",
      date: "2025-08-17",
      time: "9:00 AM to 5:00 PM",
      location: "ESI SBA Room 04",
      title: "Workshop Ideas for Creatives",
      description: 'Join us for our session, "Future Innovations Unleashed," where we will explore groundbreaking concepts!',
      mentor: "@mentor_name",
    },
  ];

  const handleAddWorkshop = () => {
    setDialogOpen(true);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleClearDate = () => {
    setSelectedDate(null);
  };

  const filteredWorkshops = workshops.filter((workshop) => {
    const workshopDate = new Date(workshop.date);
    const currentDate = new Date("2025-05-26T14:27:00Z"); // Updated to 2:27 PM CET
    const isUpcoming = workshopDate >= currentDate;
    if (!isUpcoming) return false;
    if (!selectedDate) return true;
    return (
      workshopDate.getFullYear() === selectedDate.getFullYear() &&
      workshopDate.getMonth() === selectedDate.getMonth() &&
      workshopDate.getDate() === selectedDate.getDate()
    );
  });

  const lastUpdated = "May 26, 2025, 2:27 PM CET";

  return (
    <div className={styles.container}>
      <HeaderSection
        title="Workshop Management"
        subtitle={`Schedule and manage workshops • ${lastUpdated}`}
        button={{
          label: "Schedule",
          icon: <Add24Regular />,
          onClick: handleAddWorkshop,
        }}
      />
      <WorkshopScheduleDialog
        open={dialogOpen}
        onOpenChange={(open) => setDialogOpen(open)}
      />
      <div>
        <div className={styles.sectionTitleWrapper}>
          <Text className={styles.sectionTitle}>
            Upcoming Workshops ({filteredWorkshops.length})
          </Text>
          {selectedDate && (
            <Text className={styles.selectedDateText}>
              Selected: {selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              <Button
                icon={<Dismiss24Regular />}
                appearance="subtle"
                className={styles.clearButton}
                onClick={handleClearDate}
                aria-label="Clear selected date filter"
              >
                Clear
              </Button>
            </Text>
          )}
        </div>
        <div className={styles.contentGrid}>
          <div className={styles.calendarWrapper}>
            <MyCalendar onSelectDate={handleSelectDate} />
          </div>
          <div className={styles.workshopsList}>
            {filteredWorkshops.length > 0 ? (
              filteredWorkshops.map((workshop) => (
                <Card key={workshop.id} className={styles.workshopCard}>
                  <WorkshopCard
                    date={new Date(workshop.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                    time={workshop.time}
                    location={workshop.location}
                    title={workshop.title}
                    description={workshop.description}
                    mentor={workshop.mentor}
                  />
                </Card>
              ))
            ) : (
              <div className={styles.emptyState}>
                No upcoming workshops found{selectedDate ? " for selected date" : ""}.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.pastWorkshopsContainer}>
        <Text className={styles.sectionTitle}>Past Workshops (3)</Text>
        <div className={styles.pastWorkshopsGrid}>
          <Card className={styles.workshopCard}>
            <PastWorkshopCard />
          </Card>
          <Card className={styles.workshopCard}>
            <PastWorkshopCard />
          </Card>
          <Card className={styles.workshopCard}>
            <PastWorkshopCard />
          </Card>
        </div>
      </div>
      <div className={styles.pagination}>
        <Tooltip content="Previous page" relationship="label">
          <Button
            icon={<ChevronLeft24Regular />}
            className={styles.paginationButton}
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          />
        </Tooltip>
        {[1, 2, 3].map((page) => (
          <Tooltip key={page} content={`Page ${page}`} relationship="label">
            <Button
              className={`${styles.paginationButton} ${currentPage === page ? styles.paginationButtonActive : ""}`}
              onClick={() => setCurrentPage(page)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Button>
          </Tooltip>
        ))}
        <Tooltip content="Next page" relationship="label">
          <Button
            icon={<ChevronRight24Regular />}
            className={styles.paginationButton}
            onClick={() => setCurrentPage(Math.min(3, currentPage + 1))}
            disabled={currentPage === 3}
            aria-label="Next page"
          />
        </Tooltip>
      </div>
    </div>
  );
}