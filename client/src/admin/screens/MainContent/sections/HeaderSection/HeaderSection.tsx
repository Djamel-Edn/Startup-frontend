"use client";

import React, { useState } from "react";
import { Text, Title3 } from "@fluentui/react-components";
import { useStyles } from "../../../../lib/theme";
import WorkshopScheduleDialog from "./WorkshopScheduleDialog";

interface HeaderSectionProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  title = "Teams Management",
  subtitle = "Track and manage team activities",
  children,
}) => {
  const styles = useStyles();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Add click handler to the schedule button
  const handleScheduleClick = () => {
    setIsDialogOpen(true);
  };

  // Clone children to add onClick handler to the schedule button, but only for the training schedule button
  const enhancedChildren = React.Children.map(children, (child) => {
    if (
      React.isValidElement<{
        "data-button-type"?: string;
        onClick?: () => void;
      }>(child) &&
      child.props["data-button-type"] === "training-schedule"
    ) {
      return React.cloneElement(child, {
        onClick: handleScheduleClick,
      });
    }
    return child;
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <header className={styles.header}>
        <Title3>{title}</Title3>
        <Text size={200} color="subtle">
          {subtitle}
        </Text>
      </header>

      {enhancedChildren && (
        <div className={styles.addButtonContainer}>{enhancedChildren}</div>
      )}

      {/* Workshop Schedule Dialog */}
      <WorkshopScheduleDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};
