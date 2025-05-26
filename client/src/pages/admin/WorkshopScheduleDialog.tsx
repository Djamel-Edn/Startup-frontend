"use client";

import * as React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Textarea,
  useId,
  makeStyles,
  tokens,
  Text,
} from "@fluentui/react-components";
import { Dismiss20Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  dialogContainer: {
    display: "flex",
    width: "480px",
    padding: tokens.spacingHorizontalXXL,
    flexDirection: "column",
    alignItems: "stretch", // <- make children stretch full width
    gap: "20px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow4,
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    width: "100%",
  },

  formField: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
    width: "100%",
    minHeight: "80px", // or whatever base height you want
    resize: "none", // optional: disables manual resize if you want controlled behavior
  },
  workshopTypeOptions: {
    padding: "5px 12px",

    marginTop: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: tokens.spacingHorizontalM,
    width: "100%",
    marginTop: tokens.spacingVerticalL, // Add more breathing room
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingBottom: "2px", // from Figma description style
    flexShrink: 0,
    alignSelf: "stretch",
    height: "26px",
  },
  title: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  closeButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "28px",
    height: "28px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground3,
    cursor: "pointer",
    border: "none",
  },
  labelContainer: {
    display: "flex",
    gap: tokens.spacingHorizontalXXS,
    alignItems: "center",
  },
  label: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground1,
  },
  required: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorPaletteRedForeground1,
  },
  input: {
    width: "100%",
    minHeight: "40px",
    resize: "none",
  },
  inputt: {
    width: "100%",
    minHeight: "80px",
    resize: "none",
  },

  cancelButton: {
    backgroundColor: "transparent",
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  nextButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold,
  },
});

export interface WorkshopScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WorkshopScheduleDialog: React.FC<WorkshopScheduleDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const styles = useStyles();
  const titleId = useId("workshop-title");
  const descriptionId = useId("workshop-description");

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const descriptionRef = React.useRef<HTMLTextAreaElement | null>(null);
  const [step, setStep] = React.useState(1);
  const [date, setDate] = React.useState("");

  const [time, setTime] = React.useState("12:30 PM");
  const [workshopType, setWorkshopType] = React.useState<"online" | "onsite">(
    "online"
  );
  const [meetLink, setMeetLink] = React.useState("");
  const [location, setLocation] = React.useState("");

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    data: { value: string }
  ) => {
    setDescription(data.value);

    if (descriptionRef.current) {
      descriptionRef.current.style.height = "auto"; // reset
      descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`; // set to scroll height
    }
  };
  const handleCancel = () => {
    if (step === 2) {
      setStep(1); // Go back to Step 1
    } else {
      onOpenChange(false); // Close the dialog
    }
  };

  const handleNext = () => {
    // Handle form submission here
    console.log({ title, description });
    // For now, just close the dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={(event: any, data: { open: boolean; }) => onOpenChange(data.open)}>
      <DialogSurface className={styles.dialogContainer}>
        <header className={styles.header}>
          <DialogTitle id={titleId} className={styles.title}>
            Schedule a New Workshop
          </DialogTitle>
          <button
            className={styles.closeButton}
            onClick={() => onOpenChange(false)}
            aria-label="Close"
          >
            <Dismiss20Regular />
          </button>
        </header>

        <DialogBody className={styles.formGroup}>
          {step === 1 && (
            <>
              <div className={styles.formField}>
                <div className={styles.labelContainer}>
                  <label htmlFor={titleId} className={styles.label}>
                    Workshop Title
                  </label>
                  <span className={styles.required}>*</span>
                </div>
                <Input
                  id={titleId}
                  className={styles.input}
                  placeholder="Give your workshop a name"
                  value={title}
                  onChange={(e, data) => setTitle(data.value)}
                  required
                />
              </div>

              <div className={styles.formField}>
                <div className={styles.labelContainer}>
                  <label htmlFor={descriptionId} className={styles.label}>
                    Description
                  </label>
                  <span className={styles.required}>*</span>
                </div>
                <Textarea
                  id={descriptionId}
                  className={styles.inputt}
                  placeholder="Describe the goal, topic, or focus of this session"
                  value={description}
                  onChange={handleDescriptionChange}
                  required
                  ref={descriptionRef}
                />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className={styles.formField}>
                <div className={styles.labelContainer}>
                  <label className={styles.label}>Select a date</label>
                  <span className={styles.required}>*</span>
                </div>
                <Input
                  type="date"
                  className={styles.input}
                  value={date}
                  onChange={(e, data) => setDate(data.value)}
                  required
                />
              </div>

              <div className={styles.formField}>
                <div className={styles.labelContainer}>
                  <label className={styles.label}>Select a time</label>
                  <span className={styles.required}>*</span>
                </div>
                <Input
                  type="time"
                  className={styles.input}
                  value={time}
                  onChange={(e, data) => setTime(data.value)}
                  required
                />
              </div>

              <div className={styles.formField}>
                <div className={styles.labelContainer}>
                  <label className={styles.label}>Workshop Type</label>
                </div>
                <div className={styles.workshopTypeOptions}>
                  <label>
                    <input
                      type="radio"
                      name="workshopType"
                      value="onsite"
                      checked={workshopType === "onsite"}
                      onChange={() => setWorkshopType("onsite")}
                    />
                    On-site (Participants will attend the workshop physically)
                  </label>
                  <br />
                  <label>
                    <input
                      type="radio"
                      name="workshopType"
                      value="online"
                      checked={workshopType === "online"}
                      onChange={() => setWorkshopType("online")}
                    />
                    Online (The workshop will be conducted virtually)
                  </label>
                </div>
              </div>

              {workshopType === "online" ? (
                <div className={styles.formField}>
                  <div className={styles.labelContainer}>
                    <label className={styles.label}>Meet Link</label>
                    <span className={styles.required}>*</span>
                  </div>
                  <Input
                    type="url"
                    className={styles.input}
                    placeholder="https://meet.example.com/awesome-event"
                    value={meetLink}
                    onChange={(e, data) => setMeetLink(data.value)}
                    required
                  />
                </div>
              ) : (
                <div className={styles.formField}>
                  <div className={styles.labelContainer}>
                    <label className={styles.label}>Location</label>
                    <span className={styles.required}>*</span>
                  </div>
                  <Input
                    className={styles.input}
                    placeholder="Enter location name or address"
                    value={location}
                    onChange={(e, data) => setLocation(data.value)}
                    required
                  />
                </div>
              )}
            </>
          )}

          <div className={styles.actions}>
            <Button className={styles.cancelButton} onClick={handleCancel}>
              Cancel
            </Button>
            {step === 1 ? (
              <Button className={styles.nextButton} onClick={() => setStep(2)}>
                Next
              </Button>
            ) : (
              <Button
                className={styles.nextButton}
                onClick={() => {
                  // Final submission logic here
                  console.log({
                    title,
                    description,
                    date,
                    time,
                    workshopType,
                    meetLink,
                    location,
                  });
                  onOpenChange(false);
                }}
              >
                Submit
              </Button>
            )}
          </div>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export default WorkshopScheduleDialog;