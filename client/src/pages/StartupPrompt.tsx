"use client";

import { makeStyles, tokens, Button, Text } from "@fluentui/react-components";
import { Rocket24Regular } from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    overflow: "hidden",
  },
  card: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    boxShadow: tokens.shadow8,
    padding: "2rem",
    width: "100%",
    maxWidth: "450px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    "@media (max-width: 480px)": {
      padding: "1.5rem",
      maxWidth: "95%",
    },
  },
  icon: {
    fontSize: "32px",
    color: tokens.colorBrandForeground1,
    width: "64px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "12px",
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "20px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    textAlign: "center",
  },
  message: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    textAlign: "center",
    lineHeight: "1.6",
    maxWidth: "350px",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
  },
  primaryButton: {
    padding: "0.75rem",
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: "600",
    borderRadius: "6px",
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
    "@media (max-width: 480px)": {
      padding: "0.5rem",
      fontSize: "14px",
    },
  },
  secondaryButton: {
    padding: "0.75rem",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    color: tokens.colorNeutralForeground2,
    fontWeight: "400",
    borderRadius: "6px",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
    "@media (max-width: 480px)": {
      padding: "0.5rem",
      fontSize: "14px",
    },
  },
});

const StartupPrompt: React.FC = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  const handleCreateStartup = () => {
    localStorage.setItem("hasSeenStartupPrompt", "true");
    navigate("/application");
  };

  const handleSkip = () => {
    localStorage.setItem("hasSeenStartupPrompt", "true");
    navigate("/progress");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <Rocket24Regular />
        </div>
        <Text className={styles.title}>Start Your Entrepreneurial Journey</Text>
        <Text className={styles.message}>
          Congratulations on verifying your account! Would you like to create a startup and join our incubator program, or explore the platform first?
        </Text>
        <div className={styles.buttons}>
          <Button
            appearance="primary"
            className={styles.primaryButton}
            onClick={handleCreateStartup}
          >
            Create a Startup
          </Button>
          <Button
            appearance="secondary"
            className={styles.secondaryButton}
            onClick={handleSkip}
          >
            Skip for Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StartupPrompt;