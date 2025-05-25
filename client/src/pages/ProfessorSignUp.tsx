"use client"

import type React from "react"

import { makeStyles, mergeClasses, tokens, Button, Text, Image } from "@fluentui/react-components"
import logo from "../assets/Logo Image.svg"
import { Link, useNavigate } from "react-router-dom"
import Input from "./components/Input"
import { useState } from "react"
import { useTheme } from "../ThemeContext"
import { Eye24Filled, EyeOff24Filled} from "@fluentui/react-icons"

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
    gap: "1.5rem",
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
  },
  nameInputs: {
    display: "flex",
    gap: "1.5rem",
    width: "100%",
  },
  title: {
    fontSize: tokens.fontSizeHero900,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.1",
    margin: "0.5rem 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusMedium,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForegroundOnBrand,
    cursor: "pointer",
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
  },
  text_link: {
    fontSize: tokens.fontSizeBase400,
  },
  link: {
    color: tokens.colorBrandForeground1,
    ":hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  logo: {
    maxHeight: "60px",
  },
  logoDark: {
    filter: "brightness(0) invert(1)",
  },
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  passwordToggle: {
    position: "absolute",
    right: "10px",
    top: "calc(50% + 10px)", 
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: tokens.colorNeutralForeground3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",
    zIndex: 1,
  },
})

const ProfessorSignUp = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { isDarkMode } = useTheme()
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await fetch(`${backendUrl}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          password,
          role: "SUPERVISOR",
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || "Register Error")
      }

      const data = await res.json()
      console.log("Register success:", data)
      navigate("/verifyEmail")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={classes.background}>
      <form className={classes.container} onSubmit={handleSubmit}>
        <div className={classes.header}>
          <div>
            <Image
              src={logo || "/placeholder.svg"}
              alt="logo"
              className={mergeClasses(classes.logo, isDarkMode && classes.logoDark)}
            />
          </div>
          <Text as="h1" className={classes.title}>
            Create Your Mentor Account
          </Text>
          <Text className={classes.text}>Join the ESI SBA incubator platform and start your journey.</Text>

          {error && <Text style={{ color: "red" }}>{error}</Text>}

          <div className={classes.nameInputs}>
            <Input
              label="First Name"
              placeholder="Riad"
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
            />
            <Input
              label="Last Name"
              placeholder="Mohamed"
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
            />
          </div>

          <Input
            label="Email"
            placeholder="m.riad@esi-sba.dz"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />

          <div className={classes.inputWrapper}>
            <Input
              label="Password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={classes.passwordToggle}
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <Eye24Filled /> : <EyeOff24Filled />}
            </button>
          </div>

          <Button type="submit" className={classes.button} disabled={loading}>
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          <div className={classes.textSection}>
            <Text className={mergeClasses(classes.text, classes.text_link)}>
              Already have an account?{" "}
              <Link to="/login" className={classes.link}>
                Log in
              </Link>
            </Text>
            <Text className={classes.text}>By signing up, you agree to our Terms & Privacy Policy.</Text>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ProfessorSignUp
