"use client";

import React, { useEffect, useState } from "react";
import {
  makeStyles,
  mergeClasses,
  tokens,
  Button,
  Text,
  Image,
  Checkbox,
  Label,
} from "@fluentui/react-components";
import logo from "../assets/Logo Image.svg";
import { Link, useNavigate } from "react-router-dom";
import Input from "./components/Input";
import { useTheme } from "../ThemeContext"
import { Eye24Filled, EyeOff24Filled } from "@fluentui/react-icons";
import { useAuthContext } from "./components/AuthContext";

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
    fontSize: tokens.fontSizeHero900,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.2",
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
  },
  logo: {
    width: "60px",
    marginBottom: "0.5rem",
  },
  logoDark: {
    filter: "brightness(0) invert(1)",
  },
  passwordWrapper: {
    width: "100%",
  },
  passwordInputContainer: {
    position: "relative",
    width: "100%",
  },
  passwordToggle: {
    position: "absolute",
    right: "10px",
    top: "50%",
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
  rememberForgotRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: "0.5rem",
  },
  forgotPassword: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
  inputField: {
    height: "40px",
    width: "100%",
    border: "none",
    background: "transparent",
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    paddingLeft: "0.5rem",
    outline: "none",
    "::placeholder": {
      color: tokens.colorNeutralForeground4,
    },
  },
  divider: {
    borderBottom: `1px solid ${tokens.colorNeutralForeground1}`,
    width: "100%",
  },
  labelWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.25rem",
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: "14px",
    marginBottom: "0.5rem",
  },
});

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { login, isAuthenticated, user } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      const dest =
        user.role === 'SUPERVISOR'
          ? '/mentor/projects-management'
          : '/progress';
      navigate(dest, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);



  return (
    <div className={classes.background}>
      <form className={classes.container} onSubmit={handleSubmit}>
        <div className={classes.header}>
          <Image
            src={logo || "/placeholder.svg"}
            alt="logo"
            className={mergeClasses(classes.logo, isDarkMode && classes.logoDark)}
          />
          <Text as="h1" className={classes.title}>
            Welcome Back to ESI SBA Incubator
          </Text>
          <Text className={classes.text}>Log in to continue your journey</Text>

          {error && <Text className={classes.errorText}>{error}</Text>}

          <Input
            label="Email Address"
            placeholder="m.riad@esi-sba.dz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className={classes.passwordWrapper}>
            <div className={classes.labelWrapper}>
              <Label style={{ fontWeight: tokens.fontWeightSemibold }}>
                Password
              </Label>
            </div>
            <div className={classes.passwordInputContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={classes.inputField}
              />
              <button
                type="button"
                className={classes.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye24Filled /> : <EyeOff24Filled />}
              </button>
            </div>
            <div className={classes.divider}></div>
          </div>

          <Button type="submit" className={classes.button} disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>

          <div className={classes.rememberForgotRow}>
            <Checkbox
              label="Remember Me"
              checked={rememberMe}
              onChange={(_e, data) => setRememberMe(!!data.checked)}
            />
            <Link to="/forgot-password" className={classes.forgotPassword}>
              Forgot Password?
            </Link>
          </div>

          <div className={classes.textSection}>
            <Text className={mergeClasses(classes.text, classes.text_link)}>
              Don't have an account?{" "}
              <Link to="/signup" className={classes.link}>
                Sign up now
              </Link>
            </Text>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;