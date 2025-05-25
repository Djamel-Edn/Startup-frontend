import type * as React from "react";
import { Badge } from "@fluentui/react-components";
import Placeholder from "../../assets/Placeholder.svg";

export interface ProjectBadgeProps {
  children: React.ReactNode;
  status?: "Active" | "Inactive" | "Completed" | "On Hold";
  className?: string;
}

export const ProjectBadge: React.FC<ProjectBadgeProps> = ({
  children,
  status = "Active",
  className,
}) => {
  const getBadgeColor = () => {
    switch (status) {
      case "Active":
        return "success";
      case "Inactive":
        return "warning";
      case "Completed":
        return "informative";
      case "On Hold":
        return "severe";
      default:
        return "brand";
    }
  };

  return (
    <Badge
      appearance="filled"
      color={getBadgeColor()}
      icon={<img src={Placeholder} alt="" style={{ width: 12, height: 12 }} />}
      className={className}
      title={`Status: ${status}`}
    >
      {children}
    </Badge>
  );
};

export default ProjectBadge;
