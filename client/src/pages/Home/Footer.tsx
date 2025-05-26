import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  tokens,
  Caption1Strong,
  Body2,
  Caption2,
  Text,
  Button,
} from '@fluentui/react-components';
import {
  Mail24Regular,
  ShareIos24Regular,
  Globe24Regular,
  WeatherSunny24Regular,
  WeatherMoon24Regular,
} from '@fluentui/react-icons';
import logo from '../../assets/Logo Image.svg'; 
import { useTheme } from '../../ThemeContext';

const useStyles = makeStyles({
  footer: {
    backgroundColor: tokens.colorNeutralBackground3, 
    padding: '48px 1rem',
    width: '98%',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  footerContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem',
    Width: '100%',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '1.5rem',
    },
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    '@media (max-width: 768px)': {
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  brandingColumn: {
    '@media (max-width: 768px)': {
      alignItems: 'center',
    },
  },
    logo: {
    width: '50px',
    filter: 'none', 
  },
  logoDark: {
    width: '50px',
    filter: 'brightness(0) invert(1)', 
  },
  description: {
    color: tokens.colorNeutralForeground2,
    maxWidth: '250px',
    '@media (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
  sectionTitle: {
    color: tokens.colorNeutralForeground1,
    marginBottom: '0.5rem',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  linkItem: {
    color: tokens.colorNeutralForeground2,
    textDecoration: 'none',
    ':hover': {
      color: tokens.colorBrandForeground1,
      textDecoration: 'underline',
    },
    ':visited': {
      textDecoration: 'none',
    },
  },
  socialIcons: {
    display: 'flex',
    gap: '1rem',
    '@media (max-width: 768px)': {
      justifyContent: 'center',
    },
  },
  socialIcon: {
    color: tokens.colorNeutralForeground2,
    ':hover': {
      color: tokens.colorBrandForeground1,
    },
  },
  bottomBar: {
    marginTop: '2rem',
    paddingTop: '1rem',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    Width: '100%',
    margin: '0.5rem 0 ',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      gap: '1rem',
      textAlign: 'center',
    },
  },
  copyright: {
    color: tokens.colorNeutralForeground3,
    fontSize: '0.875rem',
  },
  utilitySection: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  languageLabel: {
    fontSize: '1rem',
    color: tokens.colorNeutralForeground2,
  },
});

const Footer: React.FC = () => {
  const styles = useStyles();

  const { isDarkMode } = useTheme();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={`${styles.column} ${styles.brandingColumn}`}>
          <img src={logo} alt="ESI-SBA Logo" className={isDarkMode ? styles.logoDark : styles.logo} />
          <Body2 className={styles.description}>
            Empowering innovation and guiding students through their startup journey at ESI-SBA.
          </Body2>
        </div>

        {/* Column 2: Quick Links */}
        <div className={styles.column}>
          <Caption1Strong className={styles.sectionTitle}>Quick Links</Caption1Strong>
          <ul className={styles.linkList}>
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/features', label: 'Features' },
              { to: '/register', label: 'Apply for Incubation' },
            ].map((link, index) => (
              <li key={index}>
                <Link to={link.to} className={styles.linkItem}>
                  <Caption2>{link.label}</Caption2>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <Caption1Strong className={styles.sectionTitle}>Resources</Caption1Strong>
          <ul className={styles.linkList}>
            {[
              { to: '/documentation', label: 'Documentation' },
              { to: '/support', label: 'Support' },
              { to: '/faqs', label: 'FAQs' },
            ].map((link, index) => (
              <li key={index}>
                <Link to={link.to} className={styles.linkItem}>
                  <Caption2>{link.label}</Caption2>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <Caption1Strong className={styles.sectionTitle}>Contact</Caption1Strong>
          <ul className={styles.linkList}>
            <li>
              <a href="mailto:contact@esi-sba.dz" className={styles.linkItem}>
                <Caption2>contact@esi-sba.dz</Caption2>
              </a>
            </li>
          </ul>
          <div className={styles.socialIcons}>
            <a href="mailto:contact@esi-sba.dz" aria-label="Email" className={styles.socialIcon}>
              <Mail24Regular />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
              <ShareIos24Regular />
            </a>
            <a href="https://esi-sba.dz" target="_blank" rel="noopener noreferrer" aria-label="Website" className={styles.socialIcon}>
              <Globe24Regular />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <Text className={styles.copyright}>© 2025 ESI-SBA. All rights reserved.</Text>
        <div className={styles.utilitySection}>
         
          <Text className={styles.languageLabel}>English</Text>
        </div>
      </div>

    </footer>
  );
};

export default Footer;