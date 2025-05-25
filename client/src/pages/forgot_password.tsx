"use client"

import type React from "react"
import { makeStyles, mergeClasses, tokens, Button, Text, Image } from "@fluentui/react-components"
import logo from "../assets/Logo Image.svg"
import { Link } from "react-router-dom"
import Input from "./components/Input"
import { useState } from "react"
import { useTheme } from "../ThemeContext"
import { ArrowLeftRegular, CheckmarkCircleRegular } from "@fluentui/react-icons"

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
    alignItems: "flex-start",
    gap: "1.75rem",
    padding: "1.5rem",
    position: "relative",
    borderRadius: "1rem",
    overflow: "hidden",
    width: "450px",
    maxHeight: "90vh",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
  },
  title: {
    fontSize: tokens.fontSizeHero700,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.2",
    margin: "0.5rem 0",
  },
  centerText: {
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusMedium,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForegroundOnBrand,
    cursor: "pointer",
    marginTop: "0.25rem",
    ":hover": {
      backgroundColor: tokens.colorBrandBackground3Static,
    },
  },
  text: {
    color: tokens.colorNeutralForeground4,
    fontWeight: tokens.fontWeightSemibold,
  },
  textSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginTop: "0.5rem",
  },
  text_link: {
    fontSize: tokens.fontSizeBase400,
  },
  link: {
    color: tokens.colorBrandForeground1,
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  logo: {
    width: "70px",
    marginBottom: "0.5rem",
  },
  logoDark: {
    filter: "brightness(0) invert(1)",
  },
  successMessage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    padding: "1rem",
    textAlign: "center",
  },
  successIcon: {
    fontSize: "48px",
    color: tokens.colorStatusSuccessForeground1,
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: "14px",
    marginTop: "0.5rem",
  },
})

const ForgotPassword = () => {
  const classes = useStyles()
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [email, setEmail] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const { isDarkMode } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch(`${backendUrl}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "An error occurred while requesting password reset.")
      }

      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        {!success ? (
          <form className={classes.header} onSubmit={handleSubmit}>
            <div>
              <Image
                src={logo || "/placeholder.svg"}
                alt="logo"
                className={mergeClasses(classes.logo, isDarkMode && classes.logoDark)}
              />
            </div>
            <Text as="h1" className={classes.title}>
              Forgot Password
            </Text>
            <Text className={classes.text}>
              Enter your email address and we'll send you a link to reset your password.
            </Text>

            {error && (
              <Text className={classes.errorText} role="alert" aria-live="polite">
                {error}
              </Text>
            )}

            <Input
              label="Email Address"
              placeholder="m.riad@esi-sba.dz"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              type="email"
            />

            <Button type="submit" className={classes.button} disabled={loading}>
              {loading ? "Sending..." : "Reset Password"}
            </Button>

            <div className={classes.textSection}>
              <Link to="/login" className={classes.link}>
                <ArrowLeftRegular />
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className={classes.successMessage} role="alert" aria-live="polite">
            <CheckmarkCircleRegular className={classes.successIcon} />
            <Text as="h2" className={mergeClasses(classes.title, classes.centerText)}>
              Check Your Email
            </Text>
            <Text className={mergeClasses(classes.text, classes.centerText)}>
              We've sent a password reset link to {email}. Please check your inbox and follow the instructions to
              reset your password.
            </Text>
            <Button
              appearance="secondary"
              onClick={() => {
                setSuccess(false)
                setEmail("")
              }}
            >
              Send Again
            </Button>
            <div className={classes.textSection}>
              <Link to="/login" className={classes.link}>
                <ArrowLeftRegular />
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
