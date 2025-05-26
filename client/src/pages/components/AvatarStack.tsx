import type * as React from "react";
import {
  Avatar,
  AvatarGroup,
  makeStyles,
  Tooltip,
  Button,
  AvatarSize,
} from "@fluentui/react-components";
import { MoreHorizontal16Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  avatarGroup: {
    display: "flex",
    alignItems: "center",
  },
  moreButton: {
    minWidth: "24px",
    width: "24px",
    height: "24px",
    padding: "0",
    marginLeft: "4px",
  },
});

export interface AvatarStackProps {
  members: Array<{
    id: string;
    name: string;
    initials: string;
    image?: string;
  }>;
  maxDisplayed?: number;
  size?: AvatarSize; // <-- Use Fluent's accepted type
}

export const AvatarStack: React.FC<AvatarStackProps> = ({
  members,
  maxDisplayed = 3,
  size = 24, // <-- Use string not number
}) => {
  const styles = useStyles();
  const displayedMembers = members.slice(0, maxDisplayed);
  const remainingCount = members.length - maxDisplayed;

  return (
    <div className={styles.avatarGroup}>
      <AvatarGroup layout="stack">
        {displayedMembers.map((member) => (
          <Tooltip key={member.id} content={member.name} relationship="label">
            <Avatar
              name={member.name}
              image={member.image ? { src: member.image } : undefined}
              size={size}
              aria-label={member.name}
            />
          </Tooltip>
        ))}
      </AvatarGroup>

      {remainingCount > 0 && (
        <Tooltip content={`${remainingCount} more`} relationship="label">
          <Button
            icon={<MoreHorizontal16Regular />}
            appearance="subtle"
            className={styles.moreButton}
            aria-label={`${remainingCount} more members`}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default AvatarStack;
