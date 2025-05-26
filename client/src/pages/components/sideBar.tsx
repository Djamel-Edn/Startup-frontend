import { Divider, makeStyles, tokens, Tooltip } from "@fluentui/react-components";
import {
  PeopleTeamRegular,
  PeopleTeamFilled,
  SettingsRegular,
  SettingsFilled,
  SignOutRegular,
  SignOutFilled,
  DesktopTowerRegular,
  DesktopTowerFilled,
  DualScreenStatusBarRegular,
  DualScreenStatusBarFilled,
  HeadsetRegular,
  HeadsetFilled,
  BookRegular,
  BookFilled,
  PeopleRegular,
  PeopleFilled,
  DocumentRegular,
  DocumentFilled,
} from "@fluentui/react-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";

const useStyles = makeStyles({
  sidebar: {
    backgroundColor: tokens.colorNeutralBackground3,
    width: "260px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "12px 0",
    gap: "12px",
    transform: "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
    "@media (max-width: 768px)": {
      width: "100%",
      height: "auto",
      minHeight: "auto",
      gap: "1rem",
    },
    justifyContent: "space-between",
  },
  sidebarVisible: {
    transform: "translateX(0)",
  },
  navSection: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 16px",
    color: tokens.colorNeutralForeground2,
    textDecoration: "none",
    fontSize: "14px",
    height: "40px",
    gap: "12px",
    cursor: "pointer",
    position: "relative",
    boxSizing: "border-box",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
    "@media (max-width: 768px)": {
      padding: "8px 12px",
      height: "36px",
      fontSize: "12px",
    },
  },
  activeNavItem: {
    color: tokens.colorNeutralForeground1,
    fontWeight: "600",
    "::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      width: "3px",
      height: "100%",
      backgroundColor: tokens.colorCompoundBrandStroke,
    },
  },
  icon: {
    fontSize: "20px",
    width: "20px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    "@media (max-width: 768px)": {
      fontSize: "16px",
      width: "16px",
      height: "16px",
    },
  },
  activeIcon: {
    color: tokens.colorCompoundBrandStroke,
    fontSize: "20px",
    width: "20px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
    "@media (max-width: 768px)": {
      fontSize: "16px",
      width: "16px",
      height: "16px",
    },
  },
  navItemText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "calc(100% - 32px)",
  },
  customDivider: {
    backgroundColor: tokens.colorNeutralStroke1,
    margin: "4px 0",
  },
  bottomItems: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "2rem",
  },
});

const Sidebar: React.FC = () => {
  const styles = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuthContext();
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarHeight, setSidebarHeight] = useState("calc(100vh - 60px)");

  useEffect(() => {
    setIsVisible(true);
    const updateHeight = () => {
      setSidebarHeight(`${window.innerHeight - 60}px`);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const adminNavItems = [
    {
      label: "Students",
      regularIcon: <PeopleRegular />,
      filledIcon: <PeopleFilled />,
      path: "/admin/student",
    },
    {
      label: "Teams",
      regularIcon: <PeopleTeamRegular />,
      filledIcon: <PeopleTeamFilled />,
      path: "/admin/teams",
    },
    {
      label: "Projects",
      regularIcon: <DocumentRegular />,
      filledIcon: <DocumentFilled />,
      path: "/admin/projects",
    },
    {
      label: "Trainings",
      regularIcon: <DualScreenStatusBarRegular />,
      filledIcon: <DualScreenStatusBarFilled />,
      path: "/admin/trainings",
    },
  ];

  const studentNavItems = [
    {
      label: "Progress",
      regularIcon: <DesktopTowerRegular />,
      filledIcon: <DesktopTowerFilled />,
      path: "/progress",
    },
    {
      label: "Team",
      regularIcon: <PeopleTeamRegular />,
      filledIcon: <PeopleTeamFilled />,
      path: "/team",
    },
    {
      label: "Training",
      regularIcon: <DualScreenStatusBarRegular />,
      filledIcon: <DualScreenStatusBarFilled />,
      path: "/training",
    },
  ];

  const supervisorNavItems = [
    {
      label: "Projects Management",
      regularIcon: <DocumentRegular />,
      filledIcon: <DocumentFilled />,
      path: "/mentor/projects-management",
    },
    {
      label: "Teams Management",
      regularIcon: <PeopleTeamRegular />,
      filledIcon: <PeopleTeamFilled />,
      path: "/mentor/teams-management",
    },
  ];

  const bottomNavItems = [
    {
      label: "Support",
      regularIcon: <HeadsetRegular />,
      filledIcon: <HeadsetFilled />,
      path: "/support",
    },
    {
      label: "Settings",
      regularIcon: <SettingsRegular />,
      filledIcon: <SettingsFilled />,
      path: "/settings",
    },
    {
      label: "Log out",
      regularIcon: <SignOutRegular />,
      filledIcon: <SignOutFilled />,
      path: "/logout",
    },
  ];

  const topNavItems =
    user?.role === "ADMIN"
      ? adminNavItems
      : user?.role === "SUPERVISOR"
      ? supervisorNavItems
      : studentNavItems;

  return (
    <nav className={`${styles.sidebar} ${isVisible ? styles.sidebarVisible : ""}`} style={{ height: sidebarHeight }}>
      <div className={styles.navSection}>
        {topNavItems.map((item) => (
          <Tooltip content={item.label} relationship="label" key={item.label}>
            <Link
              to={item.path}
              className={`${styles.navItem} ${
                location.pathname === item.path ||
                (item.label === "Projects Management" && location.pathname.startsWith("/mentor/projects")) ||
                (item.label === "Projects" && location.pathname.startsWith("/admin/projects"))
                  ? styles.activeNavItem
                  : ""
              }`}
            >
              <span
                className={
                  location.pathname === item.path ||
                  (item.label === "Projects Management" && location.pathname.startsWith("/mentor/projects")) ||
                  (item.label === "Projects" && location.pathname.startsWith("/admin/projects"))
                    ? styles.activeIcon
                    : styles.icon
                }
              >
                {location.pathname === item.path ||
                (item.label === "Projects Management" && location.pathname.startsWith("/mentor/projects")) ||
                (item.label === "Projects" && location.pathname.startsWith("/admin/projects"))
                  ? item.filledIcon || item.regularIcon
                  : item.regularIcon}
              </span>
              <span className={styles.navItemText}>{item.label}</span>
            </Link>
          </Tooltip>
        ))}
        <Divider className={styles.customDivider} />
      </div>

      <div className={styles.bottomItems}>
        <Divider className={styles.customDivider} />
        {bottomNavItems.map((item) =>
          item.label === "Log out" ? (
            <Tooltip content={item.label} relationship="label" key={item.label}>
              <div
                className={`${styles.navItem} ${location.pathname === item.path ? styles.activeNavItem : ""}`}
                onClick={handleLogout}
              >
                <span className={location.pathname === item.path ? styles.activeIcon : styles.icon}>
                  {location.pathname === item.path ? item.filledIcon : item.regularIcon}
                </span>
                <span className={styles.navItemText}>{item.label}</span>
              </div>
            </Tooltip>
          ) : (
            <Tooltip content={item.label} relationship="label" key={item.label}>
              <Link
                to={item.path}
                className={`${styles.navItem} ${location.pathname === item.path ? styles.activeNavItem : ""}`}
              >
                <span className={location.pathname === item.path ? styles.activeIcon : styles.icon}>
                  {location.pathname === item.path ? item.filledIcon : item.regularIcon}
                </span>
                <span className={styles.navItemText}>{item.label}</span>
              </Link>
            </Tooltip>
          )
        )}
      </div>
    </nav>
  );
};

export default Sidebar;