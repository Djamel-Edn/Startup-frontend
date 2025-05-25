"use client"

import { makeStyles, tokens, Text, Image, mergeClasses } from "@fluentui/react-components"
import { Link } from "react-router-dom"
import logo from "../assets/Logo Image.svg"
import { PersonRegular, BookRegular, ChevronRightRegular } from "@fluentui/react-icons"
import { useTheme } from "../ThemeContext"

const useStyles = makeStyles({
  background: {
    backgroundColor: tokens.colorNeutralBackground2,
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.5rem",
    padding: "3rem 2.5rem",
    position: "relative",
    borderRadius: "16px",
    maxWidth: "480px",
    boxShadow: tokens.shadow16,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "120px",
    borderRadius: "20px",
  },
  logo: {
    width: "80px",
  },
  logoDark: {
    filter: "brightness(0) invert(1)",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    textAlign: "center",
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: "700",
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.2",
    margin: 0,
  },
  subtitle: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground2,
    fontWeight: "400",
    lineHeight: "1.4",
    maxWidth: "320px",
    margin: 0,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  button: {
    padding: "16px 20px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `2px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "12px",
    fontWeight: "600",
    fontSize: "16px",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "left",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "all 0.2s ease-in-out",
    position: "relative",
    overflow: "hidden",
    ":hover": {
      backgroundColor: tokens.colorBrandBackground,
      color: tokens.colorNeutralForegroundOnBrand,
      transform: "translateY(-5px)",
      boxShadow: tokens.shadow8,
    },
    ":active": {
      transform: "translateY(0)",
    },
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  buttonIcon: {
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
  },
  buttonText: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },
  buttonTitle: {
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "1.2",
  },
  buttonDescription: {
    fontSize: "14px",
    opacity: 0.8,
    fontWeight: "400",
    lineHeight: "1.2",
  },
  chevronIcon: {
    fontSize: "16px",
    opacity: 0.6,
    marginLeft: "0.5rem",
    transition: "transform 0.2s ease-in-out",
  },
  decorativeElement: {
    position: "absolute",
    top: "-50px",
    right: "-50px",
    width: "100px",
    height: "100px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "50%",
    opacity: 0.1,
    zIndex: 0,
  },
  decorativeElement2: {
    position: "absolute",
    bottom: "-30px",
    left: "-30px",
    width: "60px",
    height: "60px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "50%",
    opacity: 0.05,
    zIndex: 0,
  },
  contentWrapper: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2.5rem",
    width: "100%",
  },
})

const SignUpSelection = () => {
  const classes = useStyles()
  const { isDarkMode } = useTheme()

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <div className={classes.decorativeElement} />
        <div className={classes.decorativeElement2} />

        <div className={classes.contentWrapper}>
          <div className={classes.logoContainer}>
            <Image
              src={logo || "/placeholder.svg"}
              alt="Logo"
              className={mergeClasses(classes.logo, isDarkMode && classes.logoDark)}
            />
          </div>

          <div className={classes.header}>
            <Text className={classes.title} as="h1">
              Choose Your Role
            </Text>
            <Text className={classes.subtitle}>
              Select your role to get started with the right experience tailored for you.
            </Text>
          </div>

          <div className={classes.buttonContainer}>
            <Link to="/signup/student" className={classes.button}>
              <div className={classes.buttonContent}>
                <div className={classes.buttonIcon}>
                  <BookRegular />
                </div>
                <div className={classes.buttonText}>
                  <div className={classes.buttonTitle}>Student</div>
                  <div className={classes.buttonDescription}>Join as a student to access courses and projects</div>
                </div>
              </div>
              <ChevronRightRegular className={classes.chevronIcon} />
            </Link>

            <Link to="/signup/professor" className={classes.button}>
              <div className={classes.buttonContent}>
                <div className={classes.buttonIcon}>
                  <PersonRegular />
                </div>
                <div className={classes.buttonText}>
                  <div className={classes.buttonTitle}>Professor</div>
                  <div className={classes.buttonDescription}>Join as a professor to manage and mentor students</div>
                </div>
              </div>
              <ChevronRightRegular className={classes.chevronIcon} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpSelection
