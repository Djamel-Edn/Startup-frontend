import profilePicture from "../assets/Profile Picture.jpg";
import logoLight from "../assets/Logo Image.svg";
import {
  WeatherSunny20Regular,
  Alert20Regular,
  Search20Regular,
  WeatherMoon20Regular,
} from "@fluentui/react-icons";
import {
  Button,
  Input,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import { useTheme } from "../../ThemeContext";

const useStyles = makeStyles({
  header: {
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    padding: "0.5rem 1.5rem",
    height: "60px",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    width: "100%",
    transition: "background-color 0.3s ease-in-out",
  },
  searchWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    margin: "0 2rem",
  },
  input: {
    width: "100%",
    maxWidth: "550px",
    minWidth: "300px",
    backgroundColor: tokens.colorNeutralBackground3,
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    color: tokens.colorNeutralForeground4,
  },
  button: {
    background: "transparent",
    backgroundColor: "transparent",
    border: "none",
    color: tokens.colorNeutralForeground1,
    padding: "0.5rem",
    ":hover": {
      background: tokens.colorNeutralBackground3,
      backgroundColor: tokens.colorNeutralBackground3,
      borderRadius: "4px",
    },
    ":focus": {
      background: "transparent",
      backgroundColor: "transparent",
      outline: "none",
    },
    ":active": {
      background: "transparent",
      backgroundColor: "transparent",
    },
  },
  themeButton: {
    color: tokens.colorNeutralForeground1,
    ":hover": {
      background: tokens.colorNeutralBackground3,
      borderRadius: "4px",
    },
  },
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "2px",
  },
  profileWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  profilePicture: {
    borderRadius: "50%",
    objectFit: "cover",
  },
  username: {
    color: tokens.colorNeutralForeground1,
    fontSize: "14px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "16px",
    fontWeight: "800",
    color: tokens.colorNeutralForeground1,
  },
  logoDark: {
    filter: "brightness(0) invert(1)",
  },
});

const Header = () => {
  const styles = useStyles();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src={logoLight}
          alt="Logo"
          width={40}
          className={mergeClasses(styles.logo, isDarkMode && styles.logoDark)}
        />
        <p>Starthub</p>
      </div>
      <div className={styles.searchWrapper}>
        <Input
          className={styles.input}
          placeholder="Search..."
          contentBefore={
            <Search20Regular
              style={{ color: tokens.colorNeutralForeground3 }}
            />
          }
        />
      </div>
      <div className={styles.wrapper}>
        <Button className={styles.button}>
          <Alert20Regular />
        </Button>
        <Button
          className={mergeClasses(styles.button, styles.themeButton)}
          onClick={toggleTheme}
          aria-label={
            isDarkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? <WeatherMoon20Regular /> : <WeatherSunny20Regular />}
        </Button>
        <div className={styles.profileWrapper}>
          <img
            src={profilePicture}
            height={32}
            width={32}
            alt="profilePicture"
            className={styles.profilePicture}
          />
          <p className={styles.username}>Primary string</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
