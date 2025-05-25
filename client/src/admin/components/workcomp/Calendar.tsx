"use client";

import * as React from "react";
import { Calendar } from "@fluentui/react-calendar-compat";
import type { CalendarProps } from "@fluentui/react-calendar-compat";

export const MyCalendar: React.FC = () => {
  const handleSelectDate: CalendarProps["onSelectDate"] = (date) => {
    console.log("Selected date:", date);
  };

  return (
    <div style={{ flexGrow: 1, overflow: "auto" }}>
      {/* Important: this wrapper makes Calendar scrollable inside the space */}
      <Calendar
        onSelectDate={handleSelectDate}
        isMonthPickerVisible={false}
        showGoToToday={true}
        highlightCurrentMonth={true}
        highlightSelectedMonth={true}
        showSixWeeksByDefault={true}
        showWeekNumbers={true}
        firstDayOfWeek={1}
      />
    </div>
  );
};

export default MyCalendar;
