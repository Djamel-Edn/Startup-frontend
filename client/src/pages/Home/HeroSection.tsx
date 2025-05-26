import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, tokens, Button, Title1, Subtitle1 } from '@fluentui/react-components';
import platformScreenshot from '../../assets/HeroImage.svg';

const useStyles = makeStyles({
  heroSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '4rem 2rem',
    maxWidth: '1000px',
    backgroundColor: tokens.colorNeutralBackground1,
    '@media (max-width: 768px)': {
      padding: '2rem 1rem',
      minHeight: '100vh'
    },
  },
  headline: {
    fontSize: '2.5rem',
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorNeutralForeground1,
    textAlign: 'center',
    marginBottom: '1rem',
    '@media (max-width: 768px)': {
      fontSize: '1.75rem',
    },
  },
  subheading: {
    fontSize: '1.125rem',
    fontWeight: tokens.fontWeightMedium,
    color: tokens.colorNeutralForeground2,
    textAlign: 'center',
    maxWidth: '600px',
    marginBottom: '1.5rem',
    '@media (max-width: 768px)': {
      fontSize: '1rem',
    },
  },
  ctaButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: '0.75rem 2rem',
    borderRadius: tokens.borderRadiusMedium,
    fontSize: '1rem',
    fontWeight: tokens.fontWeightSemibold,
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    ':hover': {
      transform: 'translateY(-2px)',
    },
    '@media (max-width: 768px)': {
      padding: '0.5rem 1.5rem',
      width: '100%',
      maxWidth: '300px',
    },
  },
  screenshot: {
    maxWidth: '100%',
    width: '800px',
    marginTop: '2rem',
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow4,
    '@media (max-width: 768px)': {
      width: '100%',
      maxWidth: '500px',
    },
  },
  link: {
    textDecoration: 'none',
    ':visited': {
      textDecoration: 'none',
    },
  },
});

const HeroSection: React.FC = () => {
  const styles = useStyles();

  return (
    <section className={styles.heroSection}>
      <Title1 className={styles.headline}>
        Transform Your Ideas into Reality with ESI-SBA’s Innovation Incubator
      </Title1>
      <Subtitle1 className={styles.subheading}>
        Join the journey of innovation and entrepreneurship with expert support.
      </Subtitle1>
      <Link to="/signup" className={styles.link}>
        <Button className={styles.ctaButton}>Apply for Incubation</Button>
      </Link>
      <img
        src={platformScreenshot}
        alt="Platform UI Screenshot"
        className={styles.screenshot}
      />
    </section>
  );    
};

export default HeroSection;