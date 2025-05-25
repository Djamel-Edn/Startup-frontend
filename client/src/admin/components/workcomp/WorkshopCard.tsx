"use client";
import * as React from "react";
import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

interface WorkshopCardProps {
  date: string;
  time: string;
  location: string;
  title: string;
  description: string;
  mentor: string;
}

const useStyles = makeStyles({
  workshopCard: {
    display: "flex",
    padding: "16px",
    justifyContent: "center",
    alignItems: "center",
    gap: "16px",
    alignSelf: "stretch",
    width: "100%",
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
    backgroundColor: tokens.colorNeutralBackground1,
  },
  leftSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    width: "140px",
    alignSelf: "stretch",
  },
  date: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  timeLocation: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
  },
  timeLocationItem: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase100,
  },
  icon: {
    width: "16px",
    height: "16px",
    objectFit: "contain",
  },
  divider: {
    width: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
    alignSelf: "stretch",
  },
  rightSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "2px",
    flex: "1 0 0",
    alignSelf: "stretch",
  },
  title: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  description: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  mentor: {
    fontSize: tokens.fontSizeBase100,
    color: tokens.colorBrandForeground1,
  },
  arrowIcon: {
    marginLeft: "auto",
    width: "20px",
    height: "20px",
    objectFit: "contain",
  },
});

export const WorkshopCard: React.FC<WorkshopCardProps> = ({
  date,
  time,
  location,
  title,
  description,
  mentor,
}) => {
  const styles = useStyles();

  return (
    <div className={styles.workshopCard}>
      <div className={styles.leftSection}>
        <div className={styles.date}>{date}</div>
        <div className={styles.timeLocation}>
          <div className={styles.timeLocationItem}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8634db6fe1b446f1a09f62a0e6cae112/bf4063261383fae9368a4c3e8d8c58c40c98ae48?placeholderIfAbsent=true"
              className={styles.icon}
              alt="Time Icon"
            />
            {time}
          </div>
          <div className={styles.timeLocationItem}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/8634db6fe1b446f1a09f62a0e6cae112/87cffae6471cbe80796c3643ad9cb63f1ba970d6?placeholderIfAbsent=true"
              className={styles.icon}
              alt="Location Icon"
            />
            {location}
          </div>
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.rightSection}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.mentor}>{mentor}</div>
      </div>

      <img
        src="https://cdn.builder.io/api/v1/image/assets/8634db6fe1b446f1a09f62a0e6cae112/40b435c1e8c51319e1c41ef003943a655cf2a87a?placeholderIfAbsent=true"
        className={styles.arrowIcon}
        alt="Arrow Icon"
      />
    </div>
  );
};

export default WorkshopCard;
