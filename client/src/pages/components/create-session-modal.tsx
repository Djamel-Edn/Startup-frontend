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
} from "@fluentui/react-components";
import { CalendarAddRegular } from "@fluentui/react-icons";
import { createSession } from "../../../api/project-service";

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
  onSessionCreated: () => void;
}

const CreateSessionModal: React.FC<CreateSessionModalProps> = ({ projectId, onSessionCreated }) => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!date) {
      setError("Please select a date");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await createSession(projectId, { date });
      setOpen(false);
      onSessionCreated();
    } catch (err) {
      console.error("Error creating session:", err);
      setError(err instanceof Error ? err.message : "Failed to create session");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (_: any, data: { open: boolean | ((prevState: boolean) => boolean); }) => {
    setOpen(data.open);
    if (!data.open) {
      setDate("");
      setError(null);
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
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
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