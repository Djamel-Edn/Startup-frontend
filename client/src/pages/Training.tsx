"use client";

import { useState, useEffect } from "react";
import { makeStyles, tokens, Button } from "@fluentui/react-components";
import {
  ChevronRight20Regular,
  Clock20Regular,
  Map20Regular,
  ChevronUp20Regular,
  ChevronDown20Regular,
} from "@fluentui/react-icons";
import { getProjectSessions } from "../../api/project-service";
import { Session } from "../../types";
import { useAuthContext } from "./components/AuthContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  content: {
    padding: "0 2rem",
    flex: 1,
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
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
  },
  calendarContainer: {
    display: "flex",
    gap: "24px",
    marginBottom: "24px",
  },
  calendar: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "10px 14px",
    width: "350px",
  },
  calendarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
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
    gap: "8px",
  },
  calendarDay: {
    width: "32px",
    height: "32px",
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
    width: "32px",
    height: "32px",
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
  workshopList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  workshopItem: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workshopInfo: {
    display: "flex",
    gap: "24px",
  },
  workshopDate: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
    width: "120px",
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
    gap: "8px",
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
    marginTop: "40px",
  },
  pastWorkshopsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  pastWorkshopCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    height: "120px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
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
    padding: "20px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
  },
});

const Training = () => {
  const styles = useStyles();
  const [activeDay, setActiveDay] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const {user}=useAuthContext()
  const projectId=user?.projectId
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  useEffect(() => {
    const fetchSessions = async () => {
      if (!projectId) {
        setSessions([]);
        return;
      }
      try {
        const data = await getProjectSessions(projectId);
        setSessions(data);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      }
    };
    fetchSessions();
  }, [projectId]);


  const getCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const prevLastDay = new Date(currentYear, currentMonth, 0);
    const nextDays = new Date(currentYear, currentMonth + 1, 1);

    const prevDays = Array.from(
      { length: firstDay.getDay() },
      (_, i) => prevLastDay.getDate() - firstDay.getDay() + i + 1
    );
    const currentDays = Array.from(
      { length: lastDay.getDate() },
      (_, i) => i + 1
    );
    const nextDaysCount = 7 - ((prevDays.length + currentDays.length) % 7 || 7);
    const nextDaysArray = Array.from(
      { length: nextDaysCount },
      (_, i) => i + 1
    );

    return [...prevDays, ...currentDays, ...nextDaysArray];
  };

  const calendarDays = getCalendarDays();
  const monthName = new Date(currentYear, currentMonth).toLocaleString(
    "default",
    { month: "long" }
  );

  const currentDate = new Date("2025-05-24"); 
  const upcomingWorkshops = sessions
    .filter((session) => new Date(session.date) >= currentDate)
    .map((session) => ({
      date: new Date(session.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
      }),
      time: "9:00 AM to 5:00 PM", 
      location: "ESI SBA Room 04", 
      title: `Session ${session.id}`,
      description: session.feedbacks?.[0]?.text || "No description available",
      mentor: session.feedbacks?.[0]?.author || "@mentor_name",
    }));


  const dummyPastWorkshops = [
    {
      title: "Workshop title",
      date: "March 12, 2023",
      time: "10:00 AM - 4:00 PM",
      description: "Solutions for Tomorrow",
      id: "past1",
    },
    {
      title: "Workshop title",
      date: "March 15, 2023",
      time: "10:00 AM - 4:00 PM",
      description: "Solutions for Tomorrow",
      id: "past2",
    },
    {
      title: "Workshop title",
      date: "March 15, 2023",
      time: "10:00 AM - 4:00 PM",
      description: "Solutions for Tomorrow",
      id: "past3",
    },
    {
      title: "Workshop title",
      date: "March 15, 2023",
      time: "10:00 AM - 4:00 PM",
      description: "Solutions for Tomorrow",
      id: "past4",
    },
    {
      title: "Workshop title",
      date: "March 15, 2023",
      time: "10:00 AM - 4:00 PM",
      description: "Solutions for Tomorrow",
      id: "past5",
    },
    {
      title: "Workshop title",
      date: "March 15, 2023",
      time: "10:00 AM - 4:00 PM",
      description: "Solutions for Tomorrow",
      id: "past6",
    },
    {
      title: "Workshop title",
      date: "March 15, 2023",
      time: "10:00 AM - 4:00 PM",
      description: "Solutions for Tomorrow",
      id: "past7",
    },
  ];

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

  return (
    <div className={styles.root}>
      <div className={styles.mainContent}>
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Training</h1>
          <p className={styles.pageSubtitle}>
            Attend workshops to learn, grow, and advance.
          </p>

          <h2 className={styles.sectionTitle}>
            Upcoming Workshops ({upcomingWorkshops.length})
          </h2>

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
                  />
                  <Button
                    appearance="subtle"
                    icon={<ChevronDown20Regular />}
                    size="small"
                    onClick={handleNextMonth}
                  />
                </div>
              </div>

              <div className={styles.calendarGrid}>
                {days.map((day) => (
                  <div key={day} className={styles.calendarDayHeader}>
                    {day}
                  </div>
                ))}

                {calendarDays.map((day, index) => {
                  const isCurrentMonth =
                    index >= new Date(currentYear, currentMonth, 1).getDay() &&
                    index <
                      new Date(currentYear, currentMonth, 1).getDay() +
                        new Date(currentYear, currentMonth, 0).getDate();
                  const isActive = isCurrentMonth && day === activeDay;
                  const isSelected = isCurrentMonth && day === selectedDay;

                  return (
                    <div
                      key={`${index}-${day}`}
                      className={`${styles.calendarDay} ${
                        isActive ? styles.calendarDayActive : ""
                      } ${isSelected ? styles.calendarDaySelected : ""}`}
                      style={{
                        color: isCurrentMonth
                          ? undefined
                          : tokens.colorNeutralForeground3,
                        cursor: isCurrentMonth ? "pointer" : "default",
                      }}
                      onClick={() => isCurrentMonth && setActiveDay(day)}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={styles.workshopList}>
              {upcomingWorkshops.length > 0 ? (
                upcomingWorkshops.map((workshop, index) => (
                  <div key={index} className={styles.workshopItem}>
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
                <div className={styles.noWorkshopsMessage}>
                  No upcoming workshops scheduled.
                </div>
              )}
            </div>
          </div>

          <div className={styles.pastWorkshops}>
            <h2 className={styles.sectionTitle}>
              Past Workshops ({dummyPastWorkshops.length})
            </h2>
            <div className={styles.pastWorkshopsGrid}>
              {dummyPastWorkshops.map((workshop) => (
                <div key={workshop.id} className={styles.pastWorkshopCard}>
                  <div className={styles.pastWorkshopDate}>
                    {workshop.date} | {workshop.time}
                  </div>
                  <div className={styles.pastWorkshopTitle}>
                    {workshop.title}
                  </div>
                  <div className={styles.workshopDescription}>
                    {workshop.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Training;