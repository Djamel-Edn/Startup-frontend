import React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import TopNav from './TopNav';
import HeroSection from './HeroSection';
import FeatureSection from './FeatureSection';
import Footer from './Footer';
import feedbackImage from '../../assets/feedback.svg';
import workshopsImage from '../../assets/workshops.svg';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: tokens.colorNeutralBackground1,
    minHeight: '100vh', 
    width: '100%',
  },
});

const Home: React.FC = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <TopNav />
      <HeroSection />
      <FeatureSection
        overline="FEATURE"
        headline="Track Your Progress in Real-Time"
        bodyText="Stay updated on every step of your project with detailed dashboards and live updates."
        buttonText="Explore Features"
        buttonLink="/features"
        imageSrc={feedbackImage}
        imageAlt="Feedback illustration"
      />
      <FeatureSection
        overline="WORKSHOPS"
        headline="Empower Students Through Expert-led Trainings"
        bodyText="Provide students with access to curated workshops, technical formations, and soft-skills training. From business model design to backend development, ensure every participant gains the skills needed to succeed in innovation and entrepreneurship."
        buttonText="View Upcoming Trainings"
        buttonLink="/workshops"
        imageSrc={workshopsImage}
        imageAlt="Workshops illustration"
      />
      <Footer />
    </div>
  );
};

export default Home;