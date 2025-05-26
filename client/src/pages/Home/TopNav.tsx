import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  tokens,
  Button,
  TabList,
  Tab,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  mergeClasses,
  Text,
} from '@fluentui/react-components';
import { Badge24Regular } from '@fluentui/react-icons';
import logo from '../../assets/Logo Image.svg';
import { useTheme } from '../../ThemeContext';

const useStyles = makeStyles({
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 3rem',
    width: '95%',
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    position: 'sticky',
    top: '0',
    zIndex: 1000,
    '@media (max-width: 768px)': {
      padding: '0.5rem 1rem',
    },
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoText: {
    fontSize: '1.25rem',
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  tabList: {
    display: 'flex',
    '@media (max-width: 768px)': {
      display: 'none',
    },
  },
  tab: {
    fontSize: '1rem',
    padding: '0.5rem 1rem',
    color: tokens.colorNeutralForeground2,
    ':hover': {
      color: tokens.colorBrandForeground1,
    },
    ':selected': {
      color: tokens.colorBrandForeground1,
      borderBottom: `2px solid ${tokens.colorBrandForeground1}`,
    },
  },
  link: {
    textDecoration: 'none',
    ':visited': {
      textDecoration: 'none',
    },
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    '@media (max-width: 768px)': {
      gap: '0.5rem',
    },
  },
  primaryButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: '0.5rem 1.5rem',
    borderRadius: tokens.borderRadiusMedium,
    fontWeight: tokens.fontWeightSemibold,
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
      transform: 'translateY(-2px)',
    },
    '@media (max-width: 768px)': {
      padding: '0.5rem 1rem',
    },
  },
  secondaryButton: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    padding: '0.5rem 1.5rem',
    borderRadius: tokens.borderRadiusMedium,
    fontWeight: tokens.fontWeightSemibold,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3Hover,
      transform: 'translateY(-2px)',
    },
    '@media (max-width: 768px)': {
      padding: '0.5rem 1rem',
    },
  },
  utilitySection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  menuButton: {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
    },
  },
  mobileMenu: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: '1rem',
    '@media (min-width: 769px)': {
      display: 'none',
    },
  },
  mobileMenuItem: {
    padding: '0.5rem 0',
    color: tokens.colorNeutralForeground1,
    textDecoration: 'none',
    ':hover': {
      color: tokens.colorBrandForeground1,
    },
    ':visited': {
      textDecoration: 'none',
    },
  },
  logo: {
    width: '50px',
    filter: 'none', 
  },
  logoDark: {
    filter: 'brightness(0) invert(1)', 
  },
  languageLabel: {
    fontSize: '1rem',
    color: tokens.colorNeutralForeground2,
  },
});

const TopNav: React.FC = () => {
  const styles = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { isDarkMode } = useTheme();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={styles.navContainer}>
      {/* Left: Logo */}
      <div className={styles.logoContainer}>
        <img
          src={logo}
          alt="ESI-SBA Logo"
          className={mergeClasses(styles.logo, isDarkMode && styles.logoDark)}
        />
        <span className={styles.logoText}>Innovation Incubator</span>
      </div>

      {/* Center: Tabs */}
      <TabList className={styles.tabList} defaultSelectedValue="home">
        <Link to="/" className={styles.link}>
          <Tab value="home" className={styles.tab}>Home</Tab>
        </Link>
        <Link to="#about" className={styles.link}>
          <Tab value="about" className={styles.tab}>About</Tab>
        </Link>
        <Link to="#features" className={styles.link}>
          <Tab value="features" className={styles.tab}>Features</Tab>
        </Link>
        <Link to="#contact" className={styles.link}>
          <Tab value="contact" className={styles.tab}>Contact</Tab>
        </Link>
      </TabList>

      {/* Right: Buttons and Utility Options */}
      <div className={styles.rightSection}>
        <div className={styles.utilitySection}>
          <Text className={styles.languageLabel}>English</Text>
        </div>
        <Link to="/signup" className={styles.link}>
          <Button className={styles.primaryButton}>Register</Button>
        </Link>
        <Link to="/login" className={styles.link}>
          <Button className={styles.secondaryButton}>Login</Button>
        </Link>
        <Menu open={isMenuOpen} onOpenChange={toggleMenu}>
          <MenuTrigger>
            <MenuButton
              className={styles.menuButton}
              icon={<Badge24Regular />}
              aria-label="Toggle navigation menu"
            />
          </MenuTrigger>
          <MenuPopover>
            <MenuList className={styles.mobileMenu}>
              <MenuItem>
                <Link to="/" onClick={toggleMenu} className={styles.mobileMenuItem}>Home</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/about" onClick={toggleMenu} className={styles.mobileMenuItem}>About</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/features" onClick={toggleMenu} className={styles.mobileMenuItem}>Features</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/contact" onClick={toggleMenu} className={styles.mobileMenuItem}>Contact</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/signup" onClick={toggleMenu} className={styles.mobileMenuItem}>
                  <Button className={styles.primaryButton} style={{ width: '100%' }}>Register</Button>
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/login" onClick={toggleMenu} className={styles.mobileMenuItem}>
                  <Button className={styles.secondaryButton} style={{ width: '100%' }}>Login</Button>
                </Link>
              </MenuItem>
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    </nav>
  );
};

export default TopNav;