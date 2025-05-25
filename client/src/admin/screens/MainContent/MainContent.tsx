import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import React from "react";
import { HeaderSection } from "./sections/HeaderSection";
import { StatsOverviewSection } from "./sections/StatsOverviewSection/StatsOverviewSection";
import { StudentsListSection } from "./sections/StudentsListSection/StudentsListSection";
import { useStyles } from "../../lib/theme";
import TeamsManagement from "@/components/TeamManagement";
export const MainContent = (): JSX.Element => {
  const styles = useStyles();

  return (
    <FluentProvider theme={webLightTheme}>
      <main className={styles.root}>
        <HeaderSection />
        <StatsOverviewSection />
        <TeamsManagement />
      </main>
    </FluentProvider>
  );
};
