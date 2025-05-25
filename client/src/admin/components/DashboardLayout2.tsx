import React from "react";
import { Outlet } from "react-router-dom";
import { makeStyles, tokens } from "@fluentui/react-components";
import Header from "./Header";
import Sidebar from "./sideBar";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  header: {
    width: "100%",
  },
  contentWrapper: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
    "@media (max-width: 768px)": {
      flexDirection: "column",
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
    "@media (max-width: 768px)": {
      padding: "0.5rem",
    },
  },
});

const DashboardLayout2: React.FC = () => {
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

export default DashboardLayout2;
