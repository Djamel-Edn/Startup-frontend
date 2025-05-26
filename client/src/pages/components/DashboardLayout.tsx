import React from "react";
import { Outlet } from "react-router-dom";
import { makeStyles, tokens } from "@fluentui/react-components";
import Header from "./Header";
import Sidebar from "./sideBar"; 

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // Ensure full viewport height
    backgroundColor: tokens.colorNeutralBackground2,
    boxSizing: "border-box", // Prevent padding/margin overflow
  },
  header: {
    width: "100%",
    height: "60px", // Fixed header height
    flexShrink: 0, // Prevent header from shrinking
  },
  contentWrapper: {
    display: "flex",
    flex: 1, // Fill remaining height
    height: "calc(100vh - 60px)", // Subtract header height
    "@media (max-width: 768px)": {
      flexDirection: "column",
      height: "auto", // Allow natural height on mobile
    },
  },
  sidebar: {
    width: "260px",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    padding: "1rem",
    boxSizing: "border-box", // Prevent padding overflow
  },
});

const DashboardLayout: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;