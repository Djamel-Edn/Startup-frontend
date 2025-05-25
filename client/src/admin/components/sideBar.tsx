import { Divider, makeStyles, tokens } from "@fluentui/react-components";
import {
  PeopleTeamRegular,
  PeopleTeamFilled,
  SettingsRegular,
  SettingsFilled,
  SignOutRegular,
  SignOutFilled,
  GridRegular,
  GridFilled,
  HeadsetRegular,
  HeadsetFilled,
  FolderRegular,
  FolderFilled,
  PeopleRegular,
  PeopleFilled,
  BookQuestionMarkRegular,
  BookQuestionMarkFilled,
} from "@fluentui/react-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  sidebar: {
    backgroundColor: tokens.colorNeutralBackground3,
    width: "260px",
    height: "calc(100vh - 60px)",
    display: "flex",
    flexDirection: "column",
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "16px 0",
    gap: "16rem",
    transform: "translateX(-100%)",
    transition: "transform 0.3s ease-in-out",
    "@media (max-width: 768px)": {
      width: "100%", // Full width on small screens
      height: "auto", // Adjust height
      gap: "1rem", // Reduce gap on small screens
    },
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
    padding: "12px 16px",
    color: tokens.colorNeutralForeground2,
    textDecoration: "none",
    fontSize: "14px",
    height: "44px",
    gap: "12px",
    cursor: "pointer",
    position: "relative",
    boxSizing: "border-box",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2,
    },
    "@media (max-width: 768px)": {
      padding: "8px 12px", // Smaller padding on small screens
      height: "36px", // Smaller height
      fontSize: "12px", // Smaller font size
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
    "@media (max-width: 768px)": {
      fontSize: "16px", // Smaller icon on small screens
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
    "@media (max-width: 768px)": {
      fontSize: "16px",
      width: "16px",
      height: "16px",
    },
  },
  customDivider: {
    backgroundColor: tokens.colorNeutralStroke1, // Darker divider color
  },
  bottomItems: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
});

const Sidebar = () => {
  const styles = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const topNavItems = [
    {
      label: "Dashboard",
      path: "/dashboards",
      regularIcon: <GridRegular />,
      filledIcon: <GridFilled />,
    },
    {
      label: "Student Management",
      path: "/student",
      regularIcon: <PeopleTeamRegular />,
      filledIcon: <PeopleTeamFilled />,
    },
    {
      label: "Projects Management",
      path: "/projects",
      regularIcon: <FolderRegular />,
      filledIcon: <FolderFilled />,
    },
    {
      label: "Teams Management",
      path: "/teams",
      regularIcon: <PeopleRegular />,
      filledIcon: <PeopleFilled />,
    },
    {
      label: "Training Management",
      path: "/trainings",
      regularIcon: <BookQuestionMarkRegular />,
      filledIcon: <BookQuestionMarkFilled />,
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

  return (
    <nav
      className={`${styles.sidebar} ${isVisible ? styles.sidebarVisible : ""}`}
    >
      <div className={styles.navSection}>
        {topNavItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`${styles.navItem} ${
              location.pathname === item.path ? styles.activeNavItem : ""
            }`}
          >
            <span
              className={
                location.pathname === item.path
                  ? styles.activeIcon
                  : styles.icon
              }
            >
              {location.pathname === item.path
                ? item.filledIcon
                : item.regularIcon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
        <Divider className={styles.customDivider} />
      </div>

      <div className={styles.bottomItems}>
        <Divider className={styles.customDivider} />
        {bottomNavItems.map((item) =>
          item.label === "Log out" ? (
            <div
              key={item.label}
              className={`${styles.navItem} ${
                location.pathname === item.path ? styles.activeNavItem : ""
              }`}
              onClick={handleLogout}
            >
              <span
                className={
                  location.pathname === item.path
                    ? styles.activeIcon
                    : styles.icon
                }
              >
                {location.pathname === item.path
                  ? item.filledIcon
                  : item.regularIcon}
              </span>
              <span>{item.label}</span>
            </div>
          ) : (
            <Link
              key={item.label}
              to={item.path}
              className={`${styles.navItem} ${
                location.pathname === item.path ? styles.activeNavItem : ""
              }`}
            >
              <span
                className={
                  location.pathname === item.path
                    ? styles.activeIcon
                    : styles.icon
                }
              >
                {location.pathname === item.path
                  ? item.filledIcon
                  : item.regularIcon}
              </span>
              <span>{item.label}</span>
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
