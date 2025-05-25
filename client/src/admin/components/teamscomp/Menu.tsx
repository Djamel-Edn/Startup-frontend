import {
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@fluentui/react-components";
import { MoreVertical20Regular } from "@fluentui/react-icons";
import { Button } from "@fluentui/react-components";
import { ReactNode } from "react";

import { useStyles } from "../../lib/theme";

interface ActionMenuProps {
  header?: string;
  actions: {
    label: string;
    icon: ReactNode;
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
