"use client"

import React, { useState } from "react"
import { makeStyles, tokens, Button, Input, Text } from "@fluentui/react-components"
import { Eye24Filled, EyeOff24Filled } from "@fluentui/react-icons"
import { updateUserPassword } from "../../api/user-service"
import { useAuthContext } from "./components/AuthContext"

const useStyles = makeStyles({
  noProjectContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colorNeutralBackground2,
    padding: "2rem",
    textAlign: "center",
    overflowY: "hidden",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: tokens.colorNeutralForeground1,
    marginBottom: "1rem",
  },
  subtext: {
    fontSize: "16px",
    color: tokens.colorNeutralForeground2,
    maxWidth: "500px",
    marginBottom: "1rem",
  },
  settingsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    maxWidth: "500px",
  },
  settingItem: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    fontSize: "16px",
    borderRadius: "6px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    ":focus": {
      outline: "none",
      boxShadow: `0 0 0 2px ${tokens.colorBrandBackgroundStatic}`,
    },
  },
  button: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: "600",
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    fontSize: "16px",
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
    ":disabled": {
      backgroundColor: tokens.colorNeutralBackgroundDisabled,
      color: tokens.colorNeutralForegroundDisabled,
      cursor: "not-allowed",
    },
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
    padding: "4px",
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: "14px",
    marginTop: "0.5rem",
    fontWeight: "500",
  },
  successText: {
    color: tokens.colorStatusSuccessForeground1,
    fontSize: "14px",
    marginTop: "0.5rem",
    fontWeight: "500",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    borderRadius: "8px",
  },
  loadingText: {
    fontSize: "18px",
    fontWeight: "600",
    color: tokens.colorBrandForeground1,
  },
  passwordRequirements: {
    color: tokens.colorNeutralForeground3,
    fontSize: "13px",
    marginTop: "0.25rem",
  },
})

const Settings: React.FC = () => {
  const styles = useStyles()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const { user } = useAuthContext();
    const userEmail=user?.email

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from current password")
      return
    }

    setLoading(true)

    if (!userEmail) {
      setError("User email is missing. Please log in again.");
      setLoading(false);
      return;
    }

    try {
        console.log("Updating password for user:", userEmail)
      await updateUserPassword(userEmail, currentPassword, newPassword)
      setSuccess(true)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      setError(err.message || "Failed to reset password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.noProjectContainer}>
      <h2 className={styles.title}>Settings</h2>
      <p className={styles.subtext}>Update your password to keep your account secure.</p>
      <form className={styles.settingsSection} onSubmit={handleResetPassword}>
        {loading && (
          <div className={styles.loadingOverlay}>
            <Text className={styles.loadingText}>Updating password...</Text>
          </div>
        )}
        {error && <Text className={styles.errorText}>{error}</Text>}
        {success && <Text className={styles.successText}>Password updated successfully!</Text>}

        <div className={styles.settingItem}>
          <Text>Current Password</Text>
          <div style={{ position: "relative" }}>
            <Input
              className={styles.input}
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              aria-label={showCurrentPassword ? "Hide password" : "Show password"}
            >
              {showCurrentPassword ? <Eye24Filled /> : <EyeOff24Filled />}
            </button>
          </div>
        </div>

        <div className={styles.settingItem}>
          <Text>New Password</Text>
          <div style={{ position: "relative" }}>
            <Input
              className={styles.input}
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowNewPassword(!showNewPassword)}
              aria-label={showNewPassword ? "Hide password" : "Show password"}
            >
              {showNewPassword ? <Eye24Filled /> : <EyeOff24Filled />}
            </button>
          </div>
          <Text className={styles.passwordRequirements}>
            Password must be at least 8 characters long and different from current password.
          </Text>
        </div>

        <div className={styles.settingItem}>
          <Text>Confirm New Password</Text>
          <div style={{ position: "relative" }}>
            <Input
              className={styles.input}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <Eye24Filled /> : <EyeOff24Filled />}
            </button>
          </div>
        </div>

        <Button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </div>
  )
}

export default Settings
