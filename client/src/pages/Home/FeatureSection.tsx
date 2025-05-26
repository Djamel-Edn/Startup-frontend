import React from 'react';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  tokens,
  Caption1Strong,
  Title2,
  Body1,
  Button,
} from '@fluentui/react-components';

const useStyles = makeStyles({
  featureSection: {
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
    padding: '4rem 2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    backgroundColor: tokens.colorNeutralBackground1,
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      padding: '2rem 1rem',
      gap: '1.5rem',
    },
  },
  leftColumn: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    justifyContent: 'center',
    '@media (max-width: 768px)': {
      alignItems: 'center',
      textAlign: 'center',
    },
  },
  rightColumn: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overline: {
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
    textTransform: 'uppercase',
  },
  headline: {
    color: tokens.colorNeutralForeground1,
  },
  bodyText: {
    color: tokens.colorNeutralForeground2,
    maxWidth: '400px',
    '@media (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
  ctaButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: '0.5rem 1.5rem',
    borderRadius: tokens.borderRadiusMedium,
    fontWeight: tokens.fontWeightSemibold,
    transition: 'background-color 0.2s ease, transform 0.2s ease',
    ':hover': {
      transform: 'translateY(-2px)',
    },
    '@media (max-width: 768px)': {
      padding: '0.5rem 2rem',
    },
  },
  image: {
    maxWidth: '100%',
    width: '600px',
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow4,
    '@media (max-width: 768px)': {
      width: '100%',
      maxWidth: '300px',
    },
  },
  link: {
    textDecoration: 'none',
    ':visited': {
      textDecoration: 'none',
    },
  },
});

interface FeatureSectionProps {
  overline: string;
  headline: string;
  bodyText: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  overline,
  headline,
  bodyText,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
}) => {
  const styles = useStyles();

  return (
    <section className={styles.featureSection}>
      <div className={styles.leftColumn}>
        <Caption1Strong className={styles.overline}>{overline}</Caption1Strong>
        <Title2 className={styles.headline}>{headline}</Title2>
        <Body1 className={styles.bodyText}>{bodyText}</Body1>
        <Link to={buttonLink} className={styles.link}>
          <Button className={styles.ctaButton}>{buttonText}</Button>
        </Link>
      </div>
      <div className={styles.rightColumn}>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
      </div>
    </section>
  );
};

export default FeatureSection;