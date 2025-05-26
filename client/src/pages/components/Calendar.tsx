"use client";

import React, { useState, useEffect } from "react";
import { makeStyles, tokens, Button } from "@fluentui/react-components";
import { ChevronUp20Regular, ChevronDown20Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  calendar: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    padding: "12px",
    width: "100%",
    boxShadow: tokens.shadow4,
  },
  calendarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  calendarMonth: {
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  calendarControls: {
    display: "flex",
    gap: "8px",
  },
  controlButton: {
    minWidth: "24px",
    height: "24px",
    padding: "0",
    backgroundColor: tokens.colorNeutralBackground3,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3Hover,
    },
    transition: "background-color 0.2s ease",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "4px",
  },
  calendarDayHeader: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground2,
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
    transition: "background-color 0.2s ease, transform 0.2s ease",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
      transform: "scale(1.1)",
    },
  },
  calendarDayActive: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,
  },
  calendarDaySelected: {
    border: `2px solid ${tokens.colorBrandStroke1}`,
    fontWeight: tokens.fontWeightSemibold,
  },
  calendarDayDisabled: {
    color: tokens.colorNeutralForeground3,
    cursor: "default",
    ":hover": {
      backgroundColor: "transparent",
      transform: "none",
    },
  },
});

interface MyCalendarProps {
  onSelectDate?: (date: Date) => void;
}

export const MyCalendar: React.FC<MyCalendarProps> = ({ onSelectDate }) => {
  const styles = useStyles();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

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
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    setCurrentYear((prev) => (currentMonth === 11 ? prev + 1 : prev));
    setSelectedDay(null);
  };

  const handleDayClick = (day: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      setSelectedDay(day);
      if (onSelectDate) {
        onSelectDate(new Date(currentYear, currentMonth, day));
      }
    }
  };

  const { prevDays, currentDays, nextDays } = getCalendarDays();
  const monthName = new Date(currentYear, currentMonth).toLocaleString("default", { month: "long" });

  return (
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
            className={styles.controlButton}
          />
          <Button
            appearance="subtle"
            icon={<ChevronDown20Regular />}
            size="small"
            onClick={handleNextMonth}
            aria-label="Next month"
            className={styles.controlButton}
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
              selectedDay === day ? styles.calendarDaySelected : ""
            }`}
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
  );
};

export default MyCalendar;