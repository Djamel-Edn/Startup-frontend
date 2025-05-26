"use client";

import React, { JSX } from "react";
import { makeStyles, tokens, Title3, Text, Card, Button } from "@fluentui/react-components";
import { People24Regular, Flash24Regular, BadgeRegular } from "@fluentui/react-icons";

interface Stat {
  icon: JSX.Element;
  title: string;
  value: string;
}

interface HeaderButton {
  label: string;
  icon: JSX.Element;
  onClick: () => void;
}

interface HeaderSectionProps {
  title?: string;
  subtitle?: string;
  button?: HeaderButton;
}

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    padding: "4px 0",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "14px",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    paddingBottom: "10px",
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  subtitle: {
    color: tokens.colorNeutralForeground2,
    fontSize: "12px",
  },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  statsContainer: {
    width: "60%",
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  statsCard: {
    flex: "1 1 200px",
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
  },
  statsContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  statsText: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  addButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
});

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  title = "Student Management",
  subtitle = "Manage student profiles and activities",
  button,
}) => {
  const styles = useStyles();

  const statsData: Stat[] = [
    {
      icon: <People24Regular />,
      title: "Total Students",
      value: "245",
    },
    {
      icon: <Flash24Regular />,
      title: "Active Students",
      value: "200",
    },
    {
      icon: <BadgeRegular />,
      title: "Total Teams",
      value: "30",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <Title3 className={styles.title}>{title}</Title3>
          <Text className={styles.subtitle}>{subtitle}</Text>
        </header>
        {button && (
          <div className={styles.buttonContainer}>
            <Button
              icon={button.icon}
              className={styles.addButton}
              onClick={button.onClick}
            >
              {button.label}
            </Button>
          </div>
        )}
      </div>
      <div className={styles.statsContainer}>
        {statsData.map((stat, index) => (
          <Card key={index} className={styles.statsCard}>
            <div className={styles.statsContent}>
              {stat.icon}
              <div className={styles.statsText}>
                <Text size={200}>{stat.title}</Text>
                <Text size={400} weight="semibold">
                  {stat.value}
                </Text>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HeaderSection;