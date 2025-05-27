"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  Button,
  Input,
  makeStyles,
  tokens,
  Textarea,
} from "@fluentui/react-components";
import { CalendarAddRegular } from "@fluentui/react-icons";
import { createSession } from "../../../api/project-service";
import { Session } from "../../../types";

const useStyles = makeStyles({
  formField: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  label: {
    fontWeight: tokens.fontWeightSemibold,
  },
  errorText: {
    color: tokens.colorStatusDangerForeground1,
    fontSize: tokens.fontSizeBase200,
    marginTop: "0.25rem",
  },
});

interface CreateSessionModalProps {
  projectId: string;
  onSessionCreated: (newSessionId: string) => void; 
}

const CreateSessionModal: React.FC<CreateSessionModalProps> = ({ projectId, onSessionCreated }) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!date) {
      setError("Please select a date");
      return;
    }

    // Validate date (e.g., not in the future)
    const selectedDate = new Date(date);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      setError("Session date cannot be in the future");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const sessionData: Partial<Session> = {
        date: new Date(date).toISOString(),
        summary: summary.trim() || ""
      };

      const newSession = await createSession(projectId, sessionData);
      setOpen(false);
      onSessionCreated(newSession.id); // Pass the new session ID to the parent
    } catch (err) {
      console.error("Error creating session:", err);
      setError(err instanceof Error ? err.message : "Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (_: any, data: { open: boolean }) => {
    setOpen(data.open);
    if (!data.open) {
      setDate("");
      setError(null);
      setSummary("")
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<CalendarAddRegular />}>Create New Session</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogTitle>Create New Progress Session</DialogTitle>
        <DialogBody>
          <div className={styles.formField}>
            <label className={styles.label}>Session Date</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
            {error && <div className={styles.errorText}>{error}</div>}
          </div>
          <div className={styles.formField}>
            <label className={styles.label}>Session Summary</label>
            <Textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Enter session summary..."
              style={{ width: "100%" }}
            />
            {error && <div className={styles.errorText}>{error}</div>}
          </div>
        </DialogBody>
        <DialogActions>
          <Button appearance="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button appearance="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Session"}
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};

export default CreateSessionModal;