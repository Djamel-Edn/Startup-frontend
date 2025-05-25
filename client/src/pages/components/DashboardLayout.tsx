"use client";

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { makeStyles, tokens } from "@fluentui/react-components";
import Header from "./Header";
import Sidebar from "./sideBar";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground2,
    padding: "0",
    margin: "0",
  },
  header: {
    width: "100%",
  },
  contentWrapper: {
    display: "flex",
    height: "calc(100vh - 60px)",
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
  },
});

const DashboardLayout: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.root} style={{ height: "100vh" }}>
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
