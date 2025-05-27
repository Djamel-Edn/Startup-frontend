import { useEffect, useState } from 'react';
import profilePicture from '../../assets/Profile Picture.jpg';
import logoLight from '../../assets/Logo Image.svg';
import {
  WeatherSunny20Regular,
  Alert20Regular,
  Search20Regular,
  WeatherMoon20Regular,
} from '@fluentui/react-icons';
import {
  Button,
  Input,
  makeStyles,
  mergeClasses,
  tokens,
} from '@fluentui/react-components';
import { useTheme } from "../../ThemeContext"
const useStyles = makeStyles({
  header: {
    backgroundColor: tokens.colorNeutralBackground1,
    display: 'flex',
    padding: '0.5rem 1.5rem',
    height: '60px',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    width: '100%',
    transition: 'background-color 0.3s ease-in-out',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '16px',
    fontWeight: '800',
    color: tokens.colorNeutralForeground1,
    flexShrink: 0,
  },
  logoDark: {
    filter: 'brightness(0) invert(1)',
  },
  searchWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    marginRight: '5rem',
  },
  input: {
    width: '100%',
    maxWidth: '580px',
    minWidth: '300px',
    backgroundColor: tokens.colorNeutralBackground3,
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    color: tokens.colorNeutralForeground4,
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '0.5rem',
    flexShrink: 0,
    marginRight: '4rem',
  },
  button: {
    background: 'transparent',
    border: 'none',
    color: tokens.colorNeutralForeground1,
    padding: '0.5rem',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3,
      borderRadius: '4px',
    },
    ':focus, :active': {
      background: 'transparent',
      outline: 'none',
    },
  },
  themeButton: {
    color: tokens.colorNeutralForeground1,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3,
      borderRadius: '4px',
    },
  },
  profileWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    Width: '250px',
  },
  profilePicture: {
    borderRadius: '50%',
    objectFit: 'cover',
  },
  username: {
    color: tokens.colorNeutralForeground1,
    fontSize: '14px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flexShrink: 1,      
    Width: '120px',
  },
});

const Header = () => {
  const styles = useStyles();
  const { isDarkMode, toggleTheme } = useTheme();

  const [userData, setUserData] = useState<{
    username?: string;
    profilePicture?: string;
  }>({ username: 'Default User' });

  useEffect(() => {
    const storedUsername = localStorage.getItem('userFullName');
    const storedProfilePicture = localStorage.getItem('userProfilePicture');
    setUserData({
      username: storedUsername ?? 'Default User',
      profilePicture: storedProfilePicture ?? undefined,
    });
  }, []);

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
            <Search20Regular style={{ color: tokens.colorNeutralForeground3 }} />
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
            isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
          }
          title={
            isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
          }
        >
          {isDarkMode ? <WeatherMoon20Regular /> : <WeatherSunny20Regular />}
        </Button>
        <div className={styles.profileWrapper}>
          <img
            src={userData.profilePicture || profilePicture}
            height={32}
            width={32}
            alt="profile"
            className={styles.profilePicture}
          />
          <p className={styles.username}>{userData.username}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
