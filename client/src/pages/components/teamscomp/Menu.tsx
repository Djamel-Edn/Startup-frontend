import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
  makeStyles,
  tokens,
  shorthands,
} from "@fluentui/react-components";
import { MoreVertical20Regular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
import React from "react";

const useStyles = makeStyles({
  menuList: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "flex-start",
    ...shorthands.padding("4px", 0),
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.borderRadius(tokens.borderRadiusMedium),
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("0.75rem"),
    width: "100%",
    ...shorthands.padding("8px", "12px"),
    fontSize: tokens.fontSizeBase200,
  },
  menuHeader: {
    ...shorthands.padding("8px", "12px"),
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
});

interface ActionMenuProps {
  header?: string;
  actions: {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    isDivider?: boolean;
  }[];
}

export const ActionMenu = ({ header, actions }: ActionMenuProps) => {
  const styles = useStyles();

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button
          icon={<MoreVertical20Regular />}
          appearance="subtle"
          aria-label="More options"
        />
      </MenuTrigger>
      <MenuPopover>
        <MenuList className={styles.menuList}>
          {header && <div className={styles.menuHeader}>{header}</div>}
          {actions.map((action, idx) =>
            action.isDivider ? (
              <MenuDivider key={idx} />
            ) : (
              <MenuItem
                key={idx}
                onClick={action.onClick}
                className={styles.menuItem}
              >
                {action.icon} {action.label}
              </MenuItem>
            )
          )}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};