"use client"

import type React from "react"

import { type JSX, useState, useEffect } from "react"
import {
  makeStyles,
  tokens,
  Button,
  Text,
  Textarea,
  ProgressBar,
  Select,
  Label,
  Tag,
  TagGroup,
  Avatar,
  useId,
  Badge,
} from "@fluentui/react-components"
import {
  ArrowLeft32Filled,
  TargetArrow24Filled,
  Rocket24Regular,
  ClockRegular,
  Lightbulb24Regular,
  MegaphoneRegular,
  DesignIdeas24Filled,
  ErrorCircleRegular,
  DismissRegular,
} from "@fluentui/react-icons"
import { useNavigate } from "react-router-dom"
import Input from "../components/Input"

interface FormData {
  name: string
  industry: string
  about: string
  problem: string
  solution: string
  targetAudience: string
  competitiveAdvantage: string
  motivation: string
  stage: string
  memberEmails: string[]
  encadrantEmails: string[]
}

interface TempEmail {
  teamMember: string
  mentor: string
}

interface Errors {
  [key: string]: string | null | undefined
}

interface ApiError {
  message: string
  error: string
  statusCode: number
}

const useStyles = makeStyles({
  background: {
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
  },
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    padding: "1.75rem 2rem",
    margin: "auto 0",
    borderRadius: "1rem",
    width: "450px",
    maxHeight: "90vh",
    boxShadow: tokens.shadow8,
    boxSizing: "border-box",
    overflow: "hidden",
    position: "relative",
    "@media (max-width: 768px)": {
      width: "80%",
      padding: "1.5rem",
      paddingTop: "2.5rem",
    },
    "@media (max-width: 480px)": {
      width: "100%",
      padding: "1rem",
      paddingTop: "2.5rem",
      borderRadius: "0.5rem",
      maxHeight: "100vh",
    },
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    textAlign: "center",
    width: "100%",
  },
  progressSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    gap: "1rem",
    "@media (max-width: 480px)": {
      flexDirection: "column",
      gap: "0.5rem",
    },
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightBold,
    color: tokens.colorNeutralForeground1,
    lineHeight: "1.1",
    marigin:"0",
    "@media (max-width: 768px)": {
      fontSize: "1.75rem",
    },
    "@media (max-width: 480px)": {
      fontSize: "1.5rem",
    },
  },
  inputWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  labelWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusMedium,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForegroundOnBrand,
    cursor: "pointer",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
    "@media (max-width: 480px)": {
      padding: "10px",
      fontSize: tokens.fontSizeBase300,
    },
  },
  secondaryButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
    "@media (max-width: 480px)": {
      padding: "10px",
      fontSize: tokens.fontSizeBase300,
    },
  },
  text: {
    color: tokens.colorNeutralForeground4,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom:"0.25",
    fontSize: tokens.fontSizeBase400,
    "@media (max-width: 480px)": {
      fontSize: tokens.fontSizeBase300,
    },
  },
  textarea: {
    width: "100%",
    height: "130px",
    border: "none",
    background: "transparent",
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
    padding: "0.5rem",
    outline: "none",
    borderRadius: tokens.borderRadiusMedium,
    resize: "none",
    "::placeholder": {
      color: tokens.colorNeutralForeground4,
    },
    "@media (max-width: 480px)": {
      height: "100px",
      fontSize: tokens.fontSizeBase200,
    },
  },
  Label: {
    fontWeight: tokens.fontWeightSemibold,
    flexShrink: 0,
    "@media (max-width: 480px)": {
      fontSize: tokens.fontSizeBase300,
    },
  },
  Select: {
    width: "100%",
    "@media (max-width: 480px)": {
      fontSize: tokens.fontSizeBase200,
    },
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: tokens.fontSizeBase200,
    padding: "0.25rem 0.5rem",
    borderRadius: tokens.borderRadiusSmall,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    whiteSpace: "nowrap",
  },
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    "@media (max-width: 480px)": {
      gap: "0.25rem",
    },
  },
  stageButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "0.75rem",
    padding: "0.5rem 0.75rem",
    paddingLeft: "1rem",
    border: `2px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    transition: "border-color 0.3s, background-color 0.3s",
    width: "100%",
    textAlign: "left",
    boxSizing: "border-box",
    ":hover": {
      border: `1.5px solid ${tokens.colorBrandStroke1}`,
    },
    "@media (max-width: 480px)": {
      padding: "0.5rem",
      paddingLeft: "0.75rem",
    },
    ":focus": {
      border: `2px solid ${tokens.colorBrandStroke1} `,
      backgroundColor: tokens.colorNeutralBackground1,
    },
  },
  selectedStageButton: {
    border: `2px solid ${tokens.colorBrandStroke1}`,
    backgroundColor: tokens.colorBrandBackground2,
  },
  stageTextWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  stageTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  stageSubtitle: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
  },
  stageIcon: {
    fontSize: "24px",
    color: tokens.colorNeutralForeground2,
  },
  successMessage: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    textAlign: "center",
    lineHeight: "1.5",
    maxWidth: "80%",
    "@media (max-width: 480px)": {
      fontSize: tokens.fontSizeBase200,
    },
  },
  applicationInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "0.5rem",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    marginTop: "0.5rem",
    "@media (max-width: 480px)": {
      flexDirection: "column",
      gap: "0.5rem",
      padding: "0.75rem",
    },
    "@media (min-width: 481px) and (max-width: 768px)": {
      padding: "1rem",
      gap: "1rem",
    },
  },
  applicationInfoText: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    "@media (max-width: 480px)": {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    "@media (min-width: 481px) and (max-width: 768px)": {
      gap: "0.75rem",
    },
  },
  badge: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground4,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    padding: "15px",
    "@media (max-width: 480px)": {
      padding: "6px",
      fontSize: tokens.fontSizeBase200,
    },
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "center",
    width: "100%",
    "@media (max-width: 480px)": {
      gap: "0.75rem",
    },
    "@media (min-width: 481px) and (max-width: 768px)": {
      gap: "1.25rem",
    },
  },
  teamMembersGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(3, auto)",
    gap: "0.25rem",
    width: "100%",
    marginTop: "0.5rem",
    "@media (max-width: 480px)": {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "auto",
    },
    "@media (min-width: 481px) and (max-width: 768px)": {
      gap: "0.75rem",
    },
  },
  teamMemberTag: {
    width: "100%",
    textOverflow: "ellipsis",
    position:"relative",
    display: "flex",
    gap: "10px",
    "@media (max-width: 480px)": {
      fontSize: tokens.fontSizeBase200,
    },
  },

  errorContainer: {
    backgroundColor: tokens.colorStatusDangerBackground1,
    color: tokens.colorStatusDangerForeground1,
    padding: "0.25rem 0.5rem",
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    position: "absolute",
    top: "0.5rem",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
    boxShadow: tokens.shadow4,
    maxWidth: "90%",
  },
  errorIcon: {
    color: tokens.colorStatusDangerForeground1,
    fontSize: "14px",
    flexShrink: 0,
  },
})

const Application: React.FC = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [step, setStep] = useState<number>(1)
  const industrySelectId = useId("industry-select")
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

  const industryOptions: string[] = ["Technology", "Healthcare", "Finance", "Education", "Tech"]
  const stageOptions: { value: string; title: string; subtitle: string; icon: JSX.Element }[] = [
    { value: "IDEA", title: "Idea Stage", subtitle: "I need to develop my startup", icon: <Lightbulb24Regular /> },
    { value: "PROTOTYPE", title: "Prototype", subtitle: "I have a working prototype", icon: <DesignIdeas24Filled /> },
    { value: "LAUNCHED", title: "Launched", subtitle: "I am ready to test my product", icon: <Rocket24Regular /> },
    { value: "SCALING", title: "Scaling", subtitle: "My startup is live and growing", icon: <MegaphoneRegular /> },
  ]

  const [formData, setFormData] = useState<FormData>({
    name: "",
    industry: "",
    about: "",
    problem: "",
    solution: "",
    targetAudience: "",
    competitiveAdvantage: "",
    motivation: "",
    stage: "",
    memberEmails: [],
    encadrantEmails: [],
  })

  const [tempEmail, setTempEmail] = useState<TempEmail>({
    teamMember: "",
    mentor: "",
  })

  const [errors, setErrors] = useState<Errors>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [createdProject, setCreatedProject] = useState<any>(null)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      setApiError("You must be logged in to create a project")
    }
  }, [])

  const validateStep = (): boolean => {
    const newErrors: Errors = {}
    switch (step) {
      case 1:
        if (!formData.name) newErrors.name = "Startup name is required"
        if (!formData.industry) newErrors.industry = "Industry is required"
        if (!formData.about) newErrors.about = "About is required"
        break
      case 2:
        if (!formData.problem) newErrors.problem = "Problem statement is required"
        if (!formData.solution) newErrors.solution = "Solution description is required"
        break
      case 3:
        if (!formData.targetAudience) newErrors.targetAudience = "Target audience is required"
        if (!formData.competitiveAdvantage) newErrors.competitiveAdvantage = "Competitive advantage is required"
        break
      case 4:
        if (formData.memberEmails.length === 0) newErrors.memberEmails = "At least 1 team member required"
        break
      case 5:
        if (!formData.stage) newErrors.stage = "Startup stage is required"
        break
      case 6:
        if (!formData.motivation) newErrors.motivation = "Motivation is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      setFormData({ ...formData, [field]: e.target.value })
      setErrors({ ...errors, [field]: null })
    }

  const handleSelectChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLSelectElement>): void => {
      const value = e.target.value
      setFormData({ ...formData, [field]: value })
      setErrors({ ...errors, [field]: null })
    }

  const handleStageChange = (value: string) => {
    setFormData({ ...formData, stage: value })
    setErrors({ ...errors, stage: null })
  }

  const handleEmailInput =
    (field: keyof TempEmail) =>
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setTempEmail({ ...tempEmail, [field]: e.target.value })
      setErrors({ ...errors, [field]: null })
    }

  const addTeamMember = (): void => {
    if (!emailRegex.test(tempEmail.teamMember)) {
      setErrors({ ...errors, teamMember: "Invalid email format" })
      return
    }
    if (tempEmail.teamMember && !formData.memberEmails.includes(tempEmail.teamMember)) {
      setFormData({ ...formData, memberEmails: [...formData.memberEmails, tempEmail.teamMember] })
      setTempEmail({ ...tempEmail, teamMember: "" })
      setErrors({ ...errors, memberEmails: null, teamMember: null })
    }
  }

  const addMentor = (): void => {
    if (!emailRegex.test(tempEmail.mentor)) {
      setErrors({ ...errors, mentor: "Invalid email format" })
      return
    }
    if (tempEmail.mentor && !formData.encadrantEmails.includes(tempEmail.mentor)) {
      setFormData({ ...formData, encadrantEmails: [...formData.encadrantEmails, tempEmail.mentor] })
      setTempEmail({ ...tempEmail, mentor: "" })
      setErrors({ ...errors, mentor: null })
    }
  }

  const handleTeamMemberKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTeamMember()
    }
  }

  const handleMentorKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault()
      addMentor()
    }
  }

  const removeTeamMember = (email: string): void => {
    setFormData({ ...formData, memberEmails: formData.memberEmails.filter((member) => member !== email) })
    if (formData.memberEmails.length <= 1) {
      setErrors({ ...errors, memberEmails: "At least 1 team member required" })
    }
  }

  const removeMentor = (email: string): void => {
    setFormData({ ...formData, encadrantEmails: formData.encadrantEmails.filter((mentor) => mentor !== email) })
  }

  const submitProject = async () => {
    setLoading(true)
    setApiError(null)

    try {
      const token = localStorage.getItem("authToken")
      if (!token) {
        throw new Error("You must be logged in to create a project")
      }

      const response = await fetch(`${backendUrl}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
      if (!response.ok) {
        const errorData: ApiError = await response.json()

        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.")
        } else if (response.status === 409) {
          throw new Error("A project with this name or in this industry already exists.")
        } else {
          throw new Error(errorData.message || "Failed to create project")
        }
      }

      const data = await response.json()
      setCreatedProject(data)
      setStep(7)
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message)
      } else {
        setApiError("An unexpected error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  const nextStep = (): void => {
    if (validateStep()) {
      if (step < 6) {
        setStep(step + 1)
      } else if (step === 6) {
        submitProject()
      }
    }
  }

  const prevStep = (): void => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      navigate(-1)
    }
  }
console.log(formData)

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        {apiError && (
          <div className={classes.errorContainer}>
            <ErrorCircleRegular className={classes.errorIcon} />
            <Text style={{ fontSize: tokens.fontSizeBase200, margin: 0, fontWeight: tokens.fontWeightSemibold }}>
              {apiError}
            </Text>
          </div>
        )}

        {step !== 7 && (
          <div className={classes.progressSection}>
            <ArrowLeft32Filled onClick={prevStep} style={{ cursor: "pointer" }} />
            <ProgressBar thickness="large" value={step / 6} />
            <span>{step}/6</span>
          </div>
        )}

        {step === 1 && (
          <div style={{ alignSelf: "flex-start", width: "100%" }}>
            <div className={classes.header}>
              <Text as="h1" className={classes.title}>
                Tell us about your startup
              </Text>
              <Text className={classes.text}>Provide some basic details to get started.</Text>
            </div>
            <div className={classes.inputWrapper}>
              <Input
                label="Startup name"
                placeholder="Starthub"
                value={formData.name}
                onChange={handleInputChange("name")}
                errorMessage={errors.name ?? undefined}
              />
              <div className={classes.inputWrapper}>
                <div className={classes.labelWrapper}>
                  <Label className={classes.Label} htmlFor={industrySelectId}>
                    Industry
                  </Label>
                  {errors.industry && <Text className={classes.errorText}>{errors.industry}</Text>}
                </div>
                <Select
                  id={industrySelectId}
                  className={classes.Select}
                  value={formData.industry}
                  onChange={handleSelectChange("industry")}
                >
                  <option value="" disabled hidden>
                    Select industry
                  </option>
                  {industryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </div>
              <div className={classes.inputWrapper}>
                <div className={classes.labelWrapper}>
                  <Label className={classes.Label}>About Startup</Label>
                  {errors.about && <Text className={classes.errorText}>{errors.about}</Text>}
                </div>
                <Textarea
                  placeholder="Briefly describe your startup's vision and purpose."
                  className={classes.textarea}
                  value={formData.about}
                  onChange={handleInputChange("about")}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ alignSelf: "flex-start", width: "100%" }}>
            <div className={classes.header}>
              <Text as="h1" className={classes.title}>
                What problem are you solving?
              </Text>
              <Text className={classes.text} style={{ marginBottom: "0.5rem" }}>
                Explain the challenge your startup addresses.
              </Text>
            </div>
            <div className={classes.inputWrapper}>
              <div className={classes.inputWrapper}>
                <div className={classes.labelWrapper}>
                  <Label className={classes.Label}>Problem Statement</Label>
                  {errors.problem && <Text className={classes.errorText}>{errors.problem}</Text>}
                </div>
                <Textarea
                  placeholder="Describe the key problem your target audience faces."
                  className={classes.textarea}
                  value={formData.problem}
                  onChange={handleInputChange("problem")}
                />
              </div>
              <div className={classes.inputWrapper}>
                <div className={classes.labelWrapper}>
                  <Label className={classes.Label}>Solution Description</Label>
                  {errors.solution && <Text className={classes.errorText}>{errors.solution}</Text>}
                </div>
                <Textarea
                  placeholder="Explain how your startup solves this problem."
                  className={classes.textarea}
                  value={formData.solution}
                  onChange={handleInputChange("solution")}
                />
              </div>
             
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ alignSelf: "flex-start", width: "100%" }}>
            <div className={classes.header}>
              <Text as="h1" className={classes.title}>
                Who are your customers?
              </Text>
              <Text className={classes.text} style={{ marginBottom: "0.5rem" }}>
                Define your target audience.
              </Text>
            </div>
            <div className={classes.inputWrapper}>
              <div className={classes.inputWrapper}>
                <div className={classes.labelWrapper}>
                  <Label className={classes.Label}>Target Audience</Label>
                  {errors.targetAudience && <Text className={classes.errorText}>{errors.targetAudience}</Text>}
                </div>
                <Textarea
                  placeholder="Describe your ideal customers and their characteristics."
                  className={classes.textarea}
                  value={formData.targetAudience}
                  onChange={handleInputChange("targetAudience")}
                />
              </div>
              <div className={classes.inputWrapper}>
                <div className={classes.labelWrapper}>
                  <Label className={classes.Label}>Competitive Advantage</Label>
                  {errors.competitiveAdvantage && (
                    <Text className={classes.errorText}>{errors.competitiveAdvantage}</Text>
                  )}
                </div>
                <Textarea
                  placeholder="Explain what makes your solution better than competitors."
                  className={classes.textarea}
                  value={formData.competitiveAdvantage}
                  onChange={handleInputChange("competitiveAdvantage")}
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ alignSelf: "flex-start", width: "100%" }}>
            <div className={classes.header}>
              <Text as="h1" className={classes.title}>
                Invite your team
              </Text>
              <Text className={classes.text} style={{ marginBottom: "0.5rem" }}>
                Add your team members and mentors.
              </Text>
            </div>
            <div className={classes.inputWrapper}>
              <Input
                label="Team Members"
                placeholder="user@esi-sba.dz"
                value={tempEmail.teamMember}
                onChange={handleEmailInput("teamMember")}
                onKeyDown={handleTeamMemberKeyPress}
                errorMessage={(errors.teamMember || errors.memberEmails) ?? undefined}
              />
              
              {formData.memberEmails.length > 0 && (
                <TagGroup onDismiss={(__e: any, { value }: { value: string }) => removeTeamMember(value)}>
                  <div className={classes.teamMembersGrid}>
                    {formData.memberEmails.map((email) => (
                      <Tag
                        key={email}
                        value={email}
                        className={classes.teamMemberTag}
                        icon={<Avatar name={email.split("@")[0]} style={{width:"28px", height:"28px"}} />}
                      >
                        <Text style={{ fontSize: tokens.fontSizeBase100 }}>{email}</Text>
                        <DismissRegular
                          aria-label="remove"
                          style={{position:"absolute", right:"0.6rem", top:"0.6rem"}}
                          onClick={(e) => {
                            e.stopPropagation();
                            removeTeamMember(email);
                          }}
                        />
                      </Tag>
                    ))}
                  </div>
                </TagGroup>
              )}
            </div>
            <div className={classes.inputWrapper}>
              <Input
                label="Mentors"
                placeholder="user@esi-sba.dz"
                value={tempEmail.mentor}
                onChange={handleEmailInput("mentor")}
                onKeyDown={handleMentorKeyPress}
                errorMessage={errors.mentor ?? undefined}
              />
              
              {formData.encadrantEmails.length > 0 && (
                <TagGroup onDismiss={(_e: any, { value }: { value: string }) => removeMentor(value)}>
                  <div className={classes.teamMembersGrid}>
                    {formData.encadrantEmails.map((email) => (
                      <Tag
                        key={email}
                        value={email}
                        className={classes.teamMemberTag}
                        icon={<Avatar name={email.split("@")[0]} />}
                      >
                        <Text style={{ fontSize: tokens.fontSizeBase100 }}>{email}</Text>
                        <DismissRegular
                          aria-label="remove"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeMentor(email);
                          }}
                        />
                      </Tag>
                    ))}
                  </div>
                </TagGroup>
              )}
            </div>
          </div>
        )}

        {step === 5 && (
          <div style={{ alignSelf: "flex-start", width: "100%" }}>
            <div className={classes.header}>
              <Text as="h1" className={classes.title}>
                How far along is your startup?
              </Text>
              <Text className={classes.text}>
                Understanding your startup's current stage helps us tailor the incubator's support
              </Text>
            </div>
            <div className={classes.inputWrapper}>
              <div className={classes.inputWrapper}>
                {errors.stage && <Text className={classes.errorText}>{errors.stage}</Text>}
                <div className={classes.radioGroup}>
                  {stageOptions.map((option) => (
                    <Button
                      key={option.value}
                      className={`${classes.stageButton} ${formData.stage === option.value ? classes.selectedStageButton : ""}`}
                      onClick={() => handleStageChange(option.value)}
                    >
                      <span className={classes.stageIcon}>{option.icon}</span>
                      <div className={classes.stageTextWrapper}>
                        <Text className={classes.stageTitle}>{option.title}</Text>
                        <Text className={classes.stageSubtitle}>{option.subtitle}</Text>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div style={{ alignSelf: "flex-start", width: "100%" }}>
            <div className={classes.header}>
              <Text as="h1" className={classes.title}>
                What motivates you to join the incubator?
              </Text>
              <Text className={classes.text} style={{ marginBottom: "0.5rem" }}>
                Tell us why you want to join and what you hope to achieve
              </Text>
            </div>
            <div className={classes.inputWrapper}>
              <div className={classes.inputWrapper}>
                <div className={classes.labelWrapper}>
                  <Label className={classes.Label}>Motivation</Label>
                  {errors.motivation && <Text className={classes.errorText}>{errors.motivation}</Text>}
                </div>
                <Textarea
                  placeholder="Share your motivation and what you hope to gain from this experience."
                  className={classes.textarea}
                  value={formData.motivation}
                  onChange={handleInputChange("motivation")}
                />
              </div>
            </div>
          </div>
        )}

        {step === 7 && (
          <div className={classes.wrapper}>
            <TargetArrow24Filled />
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" }}>
              <Text as="h1" className={classes.title} style={{ textAlign: "center" }}>
                Application Submitted!
              </Text>
              <Text className={classes.successMessage}>
                Great job! Your application is now under review. We'll notify you once a decision is made.
              </Text>
            </div>
            <div className={classes.applicationInfo}>
              <div className={classes.applicationInfoText}>
                <Avatar icon={<Rocket24Regular />} />
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-end" }}>
                  <Text style={{ fontWeight: tokens.fontWeightSemibold }}>{createdProject?.name || formData.name}</Text>
                  <Text style={{ fontSize: tokens.fontSizeBase300, color: tokens.colorNeutralForeground3 }}>
                    {createdProject?.industry || formData.industry}
                  </Text>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", alignItems: "flex-end" }}>
                <Badge appearance="outline" className={classes.badge} icon={<ClockRegular aria-label="clock" />}>
                  {createdProject?.status || "Pending"}
                </Badge>
                <Text
                  className={classes.text}
                  style={{ fontSize: tokens.fontSizeBase300, fontWeight: tokens.fontWeightRegular }}
                >
                  Submitted {new Date().toLocaleDateString()}
                </Text>
              </div>
            </div>
            <Button className={classes.button} onClick={() => navigate("/progress")}>
              Go to Dashboard
            </Button>
            <Button className={classes.secondaryButton} onClick={() => navigate("/application-details")}>
              View My Application
            </Button>
          </div>
        )}

        {step !== 7 && (
          <Button className={classes.button} onClick={nextStep} disabled={loading}>
            {loading ? "Submitting..." : step === 6 ? "Complete my application" : "Proceed to the next step"}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Application