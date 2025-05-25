"use client";
import * as React from "react";
import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
  pastWorkshopCard: {
    overflow: "hidden",
    flexGrow: 1,
    flexShrink: 1,
    alignSelf: "stretch",
    marginTop: "auto",
    marginBottom: "auto",
    flexBasis: 0,
    minWidth: "240px",
    ...shorthands.borderRadius(tokens.borderRadiusXLarge),
  },
  pastWorkshopCardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    ...shorthands.padding("10px"),
    width: "100%",
  },
  pastWorkshopCardInner: {
    display: "flex",
    width: "100%",
    minHeight: "76px",
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
});

export const PastWorkshopCard: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.pastWorkshopCard}>
      <div className={styles.pastWorkshopCardContent}>
        <div className={styles.pastWorkshopCardInner} />
      </div>
    </div>
  );
};

export default PastWorkshopCard;
