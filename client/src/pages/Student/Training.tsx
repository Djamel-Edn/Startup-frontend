import { useState, useEffect } from "react";
import { makeStyles, tokens, Button, Spinner } from "@fluentui/react-components";
import {
  ChevronRight20Regular,
  Clock20Regular,
  Map20Regular,
  ChevronUp20Regular,
  ChevronDown20Regular,
} from "@fluentui/react-icons";
import { getWorkshops, getPastWorkshops } from "../../../api/project-service";
import { Workshop } from "../../../types";
import { useAuthContext } from "../components/AuthContext";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    backgroundColor: tokens.colorNeutralBackground2,
    flex: 1, // Ensure it takes available space
    overflow: "hidden", // Prevent root-level scrolling
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden", // Prevent mainContent scrolling
  },
  content: {
    padding: "0 1.5rem", // Reduced padding
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflowY: "auto", // Allow scrolling only within content
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "4px",
  },
  pageSubtitle: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "16px", // Reduced margin
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "12px", // Reduced margin
  },
  calendarContainer: {
    display: "flex",
    gap: "16px", // Reduced gap
    marginBottom: "16px", // Reduced margin
    "@media (max-width: 768px)": {
      flexDirection: "column",
    },
  },
  calendar: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "8px 12px", // Reduced padding
    width: "320px", // Slightly smaller
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  calendarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px", // Reduced margin
  },
  calendarMonth: {
    fontSize: "14px",
    fontWeight: "600",
  },
  calendarControls: {
    display: "flex",
    gap: "8px",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "6px", // Reduced gap
  },
  calendarDay: {
    width: "30px", // Slightly smaller
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    borderRadius: "50%",
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  calendarDayHeader: {
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground2,
  },
  calendarDayActive: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: "600",
  },
  calendarDaySelected: {
    border: `2px solid ${tokens.colorBrandStroke1}`,
    fontWeight: "600",
  },
  calendarDayDisabled: {
    color: tokens.colorNeutralForeground3,
    cursor: "default",
    ":hover": {
      backgroundColor: "transparent",
    },
  },
  workshopList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px", // Reduced gap
    flex: 1,
    overflowY: "auto", // Allow scrolling for long workshop lists
    maxHeight: "300px", // Limit height to prevent overflow
  },
  workshopItem: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "12px", // Reduced padding
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workshopInfo: {
    display: "flex",
    gap: "16px", // Reduced gap
  },
  workshopDate: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "6px", // Reduced gap
    width: "100px", // Slightly smaller
  },
  workshopDateTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  workshopMeta: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
  },
  workshopDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "6px", // Reduced gap
    flex: 1,
  },
  workshopTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  workshopDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "4px",
  },
  mentorName: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
  },
  pastWorkshops: {
    marginTop: "5px",
  },
  pastWorkshopsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px", // Reduced gap
    maxHeight: "300px", // Limit height
    overflowY: "auto", // Allow internal scrolling
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  pastWorkshopCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    height: "100px", // Reduced height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px", // Reduced padding
  },
  pastWorkshopDate: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  pastWorkshopTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  noWorkshopsMessage: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    textAlign: "center",
    padding: "16px", // Reduced padding
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
  },
  emptyStateContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px", // Reduced gap
    padding: "12px", // Reduced padding
    borderRadius: "8px",
    marginBottom: "16px", // Reduced margin
  },
  emptyStateTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  emptyStateMessage: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    textAlign: "center",
  },
  emptyStateLink: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px", // Reduced padding
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    marginBottom: "16px", // Reduced margin
  },
});

const Training: React.FC = () => {
  const styles = useStyles();
  const { user } = useAuthContext();
  const projectId = user?.projectId;
  const isAdmin = user?.role === "ADMIN";

  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [pastWorkshops, setPastWorkshops] = useState<Workshop[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(true);

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  useEffect(() => {
    const fetchWorkshops = async () => {
      setIsLoading(true);
      try {
        const workshopData = await getWorkshops();
        setWorkshops(workshopData);
        const pastWorkshopData = await getPastWorkshops();
        setPastWorkshops(pastWorkshopData);
      } catch (error) {
        console.error("Failed to fetch workshops:", error);
        setWorkshops([]);
        setPastWorkshops([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkshops();
  }, [projectId, isAdmin]);

  const getCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const firstDayIndex = firstDayOfMonth.getDay();
    const lastDay = lastDayOfMonth.getDate();
    const prevLastDay = new Date(currentYear, currentMonth, 0).getDate();

    const prevDays = Array.from(
      { length: firstDayIndex },
      (_, i) => prevLastDay - firstDayIndex + i + 1
    );
    const currentDays = Array.from(
      { length: lastDay },
      (_, i) => i + 1
    );
    const nextDaysCount = 42 - (prevDays.length + currentDays.length);
    const nextDays = Array.from(
      { length: nextDaysCount },
      (_, i) => i + 1
    );

    return { prevDays, currentDays, nextDays };
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    setCurrentYear((prev) => (currentMonth === 0 ? prev - 1 : prev));
    setActiveDay(null);
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
    setActiveDay(null);
    setSelectedDay(null);
  };

  const handleDayClick = (day: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      setActiveDay(day);
      setSelectedDay(day);
    }
  };

  const { prevDays, currentDays, nextDays } = getCalendarDays();
  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" });
  const currentDate = new Date();

  const formatWorkshop = (workshop: Workshop) => ({
    id: workshop.id,
    date: new Date(workshop.date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    }),
    time: workshop.time || "9:00 AM to 5:00 PM",
    location: workshop.location || "ESI SBA Room 04",
    title: workshop.title || `Session ${workshop.id}`,
    description: workshop.description || "No description available",
    mentor: workshop.author || "@mentor_name",
  });

  const filteredWorkshops = workshops
    .filter((workshop) => {
      const workshopDate = new Date(workshop.date);
      const isUpcoming = workshopDate >= currentDate;
      if (!isUpcoming) return false;
      if (!selectedDay) return true;
      return (
        workshopDate.getDate() === selectedDay &&
        workshopDate.getMonth() === currentMonth &&
        workshopDate.getFullYear() === currentYear
      );
    })
    .map(formatWorkshop);

  return (
    <div className={styles.root}>
      <div className={styles.mainContent}>
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Training</h1>
          <p className={styles.pageSubtitle}>
            Attend workshops to learn, grow, and advance.
          </p>

          <h2 className={styles.sectionTitle}>
            Upcoming Workshops ({filteredWorkshops.length})
          </h2>

          {isLoading ? (
            <div className={styles.loadingContainer}>
              <Spinner label="Loading workshops..." />
            </div>
          ) : (
            <div className={styles.calendarContainer}>
              <div className={styles.calendar}>
                <div className={styles.calendarHeader}>
                  <span className={styles.calendarMonth}>
                    {monthName} {currentYear}
                  </span>
                  <div className={styles.calendarControls}>
                    <Button
                      appearance="subtle"
                      icon={<ChevronUp20Regular />}
                      size="small"
                      onClick={handlePrevMonth}
                      aria-label="Previous month"
                    />
                    <Button
                      appearance="subtle"
                      icon={<ChevronDown20Regular />}
                      size="small"
                      onClick={handleNextMonth}
                      aria-label="Next month"
                    />
                  </div>
                </div>
                <div className={styles.calendarGrid}>
                  {days.map((day) => (
                    <div key={day} className={styles.calendarDayHeader}>
                      {day}
                    </div>
                  ))}
                  {prevDays.map((day, index) => (
                    <div
                      key={`prev-${index}`}
                      className={`${styles.calendarDay} ${styles.calendarDayDisabled}`}
                    >
                      {day}
                    </div>
                  ))}
                  {currentDays.map((day) => (
                    <div
                      key={`current-${day}`}
                      className={`${styles.calendarDay} ${
                        activeDay === day ? styles.calendarDayActive : ""
                      } ${selectedDay === day ? styles.calendarDaySelected : ""}`}
                      onClick={() => handleDayClick(day, true)}
                    >
                      {day}
                    </div>
                  ))}
                  {nextDays.map((day, index) => (
                    <div
                      key={`next-${index}`}
                      className={`${styles.calendarDay} ${styles.calendarDayDisabled}`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.workshopList}>
                {filteredWorkshops.length > 0 ? (
                  filteredWorkshops.map((workshop) => (
                    <div key={workshop.id} className={styles.workshopItem}>
                      <div className={styles.workshopInfo}>
                        <div className={styles.workshopDate}>
                          <div className={styles.workshopDateTitle}>
                            {workshop.date}
                          </div>
                          <div className={styles.workshopMeta}>
                            <Clock20Regular />
                            <span>{workshop.time}</span>
                          </div>
                          <div className={styles.workshopMeta}>
                            <Map20Regular />
                            <span>{workshop.location}</span>
                          </div>
                        </div>
                        <div className={styles.workshopDetails}>
                          <div className={styles.workshopTitle}>
                            {workshop.title}
                          </div>
                          <div className={styles.workshopDescription}>
                            {workshop.description}
                          </div>
                          <div className={styles.mentorName}>
                            {workshop.mentor}
                          </div>
                        </div>
                      </div>
                      <ChevronRight20Regular />
                    </div>
                  ))
                ) : (
                  <div className={styles.emptyStateContainer}>
                    <div className={styles.emptyStateTitle}>
                      No Upcoming Workshops
                    </div>
                    <div className={styles.emptyStateMessage}>
                      {isAdmin
                        ? "There are no upcoming workshops scheduled. Create a new workshop to get started."
                        : "There are no upcoming workshops scheduled. Check back later or contact your mentor."}
                    </div>
                    {isAdmin && (
                      <RouterLink to="/admin/trainings" className={styles.emptyStateLink}>
                        Create a Workshop
                      </RouterLink>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={styles.pastWorkshops}>
            <h2 className={styles.sectionTitle}>
              Past Workshops ({pastWorkshops.length})
            </h2>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <Spinner label="Loading past workshops..." />
              </div>
            ) : pastWorkshops.length > 0 ? (
              <div className={styles.pastWorkshopsGrid}>
                {pastWorkshops.map((workshop) => {
                  const formatted = formatWorkshop(workshop);
                  return (
                    <div key={workshop.id} className={styles.pastWorkshopCard}>
                      <div className={styles.pastWorkshopDate}>
                        {formatted.date} | {formatted.time}
                      </div>
                      <div className={styles.pastWorkshopTitle}>
                        {formatted.title}
                      </div>
                      <div className={styles.workshopDescription}>
                        {formatted.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={styles.emptyStateContainer}>
                <div className={styles.emptyStateTitle}>
                  No Past Workshops
                </div>
                <div className={styles.emptyStateMessage}>
                  {isAdmin
                    ? "There are no past workshops. Create new workshops to build a history."
                    : "There are no past workshops."}
                </div>
                {isAdmin && (
                  <RouterLink to="/admin/trainings" className={styles.emptyStateLink}>
                    Create a Workshop
                  </RouterLink>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;