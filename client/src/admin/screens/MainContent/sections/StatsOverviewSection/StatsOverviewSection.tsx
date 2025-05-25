import React from "react";
import { Card, Text } from "@fluentui/react-components";
import { People24Regular, Flash24Regular } from "@fluentui/react-icons";
import { useStyles } from "../../../../lib/theme";

export const StatsOverviewSection = (): JSX.Element => {
  const styles = useStyles();

  const statsData = [
    {
      icon: <People24Regular />,
      title: "Total Students",
      value: "245",
    },
    {
      icon: <Flash24Regular />,
      title: "Active Students",
      value: "245",
    },
    {
      icon: <Flash24Regular />,
      title: "Active Students",
      value: "245",
    },
  ];

  return (
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
  );
};
