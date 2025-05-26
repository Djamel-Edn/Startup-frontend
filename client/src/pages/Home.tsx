"use client";

import React from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  tokens,
  Button,
  Text,
  Card,
  Title1,
  Subtitle1,
} from "@fluentui/react-components";
import {
  Lightbulb24Regular,
  Money24Regular,
  PeopleCommunity24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground2,
    overflowY: "auto",
    overflowX: "hidden",
    minHeight: "calc(100vh - 56px)", // Adjust for header height
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: tokens.colorNeutralStroke2,
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  heroSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "4rem 2rem",
    marginBottom: "2rem",
    "@media (max-width: 768px)": {
      padding: "2rem 1rem",
    },
  },
  heroTitle: {
    fontSize: "40px",
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "1rem",
    "@media (max-width: 768px)": {
      fontSize: "32px",
    },
  },
  heroSubtitle: {
    fontSize: "18px",
    color: tokens.colorNeutralForeground2,
    maxWidth: "600px",
    marginBottom: "1.5rem",
    "@media (max-width: 768px)": {
      fontSize: "16px",
    },
  },
  ctaButtons: {
    display: "flex",
    gap: "1rem",
    "@media (max-width: 768px)": {
      flexDirection: "column",
      width: "100%",
    },
  },
  primaryButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    padding: "0.75rem 2rem",
    borderRadius: tokens.borderRadiusMedium,
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    transition: "background-color 0.2s ease, transform 0.2s ease",
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
      transform: "translateY(-2px)",
    },
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  secondaryButton: {
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground1,
    padding: "0.75rem 2rem",
    borderRadius: tokens.borderRadiusMedium,
    fontSize: "16px",
    fontWeight: tokens.fontWeightSemibold,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    transition: "background-color 0.2s ease, transform 0.2s ease",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3Hover,
      transform: "translateY(-2px)",
    },
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  featuresSection: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    "@media (max-width: 768px)": {
      padding: "1rem",
    },
  },
  testimonialsSection: {
    padding: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    "@media (max-width: 768px)": {
      padding: "1rem",
    },
  },
  sectionTitle: {
    fontSize: "28px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    textAlign: "center",
    marginBottom: "2rem",
    "@media (max-width: 768px)": {
      fontSize: "24px",
    },
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "1.5rem",
    "@media (max-width: 768px)": {
      gridTemplateColumns: "1fr",
    },
  },
  featureCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    padding: "1.5rem",
    boxShadow: tokens.shadow4,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: tokens.shadow8,
    },
  },
  testimonialCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    padding: "1.5rem",
    boxShadow: tokens.shadow4,
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: tokens.shadow8,
    },
  },
  featureIcon: {
    fontSize: "32px",
    color: tokens.colorBrandForeground1,
    marginBottom: "1rem",
  },
  featureTitle: {
    fontSize: "20px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    marginBottom: "0.5rem",
  },
  testimonialQuote: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "1rem",
    fontStyle: "italic",
  },
  testimonialAuthor: {
    fontSize: "14px",
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  featureDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  footer: {
    marginTop: "auto",
    padding: "2rem",
    textAlign: "center",
    borderTop: `1px solid ${tokens.colorNeutralStroke1}`,
  },
  footerText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "1rem",
  },
  footerLinks: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
  },
  footerLink: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    transition: "text-decoration 0.2s ease",
    ":hover": {
      textDecoration: "underline",
    },
  },
  scrollIndicator: {
    position: "fixed",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "14px",
    color: tokens.colorNeutralForeground3,
    backgroundColor: tokens.colorNeutralBackground4,
    padding: "8px 16px",
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow2,
    opacity: 0.8,
    transition: "opacity 0.3s ease",
    ":hover": {
      opacity: 1,
    },
    "@media (max-width: 768px)": {
      fontSize: "12px",
      padding: "6px 12px",
    },
  },
});

const HomePage: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <Title1 className={styles.heroTitle}>
          Launch Your Startup with Our Incubation Program
        </Title1>
        <Subtitle1 className={styles.heroSubtitle}>
          Join our ecosystem to access mentorship, funding, and networking opportunities. Build your startup with expert guidance and resources tailored to your success.
        </Subtitle1>
        <div className={styles.ctaButtons}>
          <Link to="/signup">
            <Button className={styles.primaryButton} aria-label="Sign Up">
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button className={styles.secondaryButton} aria-label="Log In">
              Log In
            </Button>
          </Link>
        </div>
      </section>

      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Join Our Incubation Program?</h2>
        <div className={styles.featuresGrid}>
          <Card className={styles.featureCard}>
            <Lightbulb24Regular className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Expert Mentorship</h3>
            <Text className={styles.featureDescription}>
              Connect with industry leaders and experienced entrepreneurs to guide your startup’s growth.
            </Text>
          </Card>
          <Card className={styles.featureCard}>
            <Money24Regular className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Funding Opportunities</h3>
            <Text className={styles.featureDescription}>
              Access seed funding, investor networks, and pitch opportunities to fuel your startup.
            </Text>
          </Card>
          <Card className={styles.featureCard}>
            <PeopleCommunity24Regular className={styles.featureIcon} />
            <h3 className={styles.featureTitle}>Networking & Community</h3>
            <Text className={styles.featureDescription}>
              Join a vibrant community of founders, mentors, and investors to collaborate and grow.
            </Text>
          </Card>
        </div>
      </section>

      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>What Our Startups Say</h2>
        <div className={styles.testimonialsGrid}>
          <Card className={styles.testimonialCard}>
            <Text className={styles.testimonialQuote}>
              "The mentorship and resources provided by the program were game-changers for our startup."
            </Text>
            <Text className={styles.testimonialAuthor}>
              Aisha Khan, Founder of GreenSync
            </Text>
          </Card>
          <Card className={styles.testimonialCard}>
            <Text className={styles.testimonialQuote}>
              "Access to investors through the program helped us secure our first round of funding."
            </Text>
            <Text className={styles.testimonialAuthor}>
              Omar Khalid, CEO of Xovia
            </Text>
          </Card>
          <Card className={styles.testimonialCard}>
            <Text className={styles.testimonialQuote}>
              "The community here is incredible—collaborating with other founders has been invaluable."
            </Text>
            <Text className={styles.testimonialAuthor}>
              Emma Wilson, Co-Founder of EduSpark
            </Text>
          </Card>
        </div>
      </section>

      <footer className={styles.footer}>
        <Text className={styles.footerText}>
          © 2025 Startup Incubation Program. All rights reserved.
        </Text>
        <div className={styles.footerLinks}>
          <Link to="/about" className={styles.footerLink} aria-label="About Us">
            About Us
          </Link>
          <Link to="/signup" className={styles.footerLink} aria-label="Sign Up">
            Sign Up
          </Link>
          <Link to="/login" className={styles.footerLink} aria-label="Log In">
            Log In
          </Link>
          <Link to="/contact" className={styles.footerLink} aria-label="Contact">
            Contact
          </Link>
        </div>
      </footer>

      <div className={styles.scrollIndicator}>
        Scroll to explore
      </div>
    </div>
  );
};

export default HomePage;