"use client";

import { makeStyles,  tokens } from "@fluentui/react-components";
import { MyCalendar } from "../components/workcomp/Calendar";
import WorkshopCard from "../components/workcomp/WorkshopCard";
import PastWorkshopCard from "../components/workcomp/PastWorkshopCard";

const useStyles = makeStyles({
  container: {
    overflow: "hidden",
    backgroundColor: "red",
    borderRadius: tokens.borderRadiusXLarge,
  },
  mainContainer: {
    width: "100%",
    overflow: "hidden",
    backgroundColor: "red",
  },

  rightColumn: {
    // marginLeft: "20px",
    width: "100%",
  },
  mainContent: {
    display: "flex",
    overflow: "hidden",
    flexDirection: "column",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  sectionTitle: {
    marginTop: "32px",
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    lineHeight: tokens.lineHeightBase100,
    color: tokens.colorNeutralForeground2,
  },
  workshopsContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    marginTop: "24px",
    gap: "12px",
    alignItems: "flex-start",
  },
  MyCalendarContainer: {
    display: "flex",
    flexDirection: "row",
    // <==== Divider between list and calendar
    overflow: "hidden",
    alignItems: "stretch",
  },

  workshopList: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "0",
    paddingLeft: "10px",
    borderLeft: `0.05px solid ${tokens.colorNeutralStroke1}`,
    minWidth: "300px", // better match your design
    gap: "16px",
  },

  pastWorkshopsContainer: {
    marginTop: "20px",
    width: "100%",
  },

  pastWorkshopsList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    alignItems: "center",
    marginTop: "12px",
    width: "100%",
  },
});

function TrainingManagement() {
  const styles = useStyles();

  return (
    <div className={styles.rightColumn}>
      <div className={styles.mainContent}>
        <div>
          <div className={styles.sectionTitle}>Upcoming Workshops (2)</div>
          <div className={styles.workshopsContainer}>
            <div className={styles.MyCalendarContainer}>
              <MyCalendar />
            </div>
            <div className={styles.workshopList}>
              <WorkshopCard
                date="August 17th"
                time="9:00 AM to 5:00 PM"
                location="ESI SBA Room 04"
                title="Workshop title"
                description='Come and be part of our session, "Future Innovations Unleashed," where we will explore groundbreaking concepts!'
                mentor="@mentor_name"
              />
              <WorkshopCard
                date="August 17th"
                time="9:00 AM to 5:00 PM"
                location="ESI SBA Room 04"
                title="Workshop Ideas for Creatives"
                description='Join us for our session, "Future Innovations Unleashed," where we will explore groundbreaking concepts!'
                mentor="@mentor_name"
              />
              <WorkshopCard
                date="August 17th"
                time="9:00 AM to 5:00 PM"
                location="ESI SBA Room 04"
                title="Workshop Ideas for Creatives"
                description='Join us for our session, "Future Innovations Unleashed," where we will explore groundbreaking concepts!'
                mentor="@mentor_name"
              />
            </div>
          </div>
        </div>

        <div className={styles.pastWorkshopsContainer}>
          <div className={styles.sectionTitle}>Past Workshops (7)</div>
          <div className={styles.pastWorkshopsList}>
            <PastWorkshopCard />
            <PastWorkshopCard />
            <PastWorkshopCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainingManagement;
