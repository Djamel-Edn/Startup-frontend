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
  Textarea,
  Select,
} from "@fluentui/react-components";
import { FolderAddRegular } from "@fluentui/react-icons";
import { addDeliverable } from "../../../api/project-service";

interface AddDeliverableModalProps {
  sessionId: string;
  onDeliverableAdded: () => void;
}

const AddDeliverableModal: React.FC<AddDeliverableModalProps> = ({
  sessionId,
  onDeliverableAdded,
}) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("not started");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title) {
      setError("Please enter a title");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await addDeliverable(sessionId, {
        title,
        description,
        status,
        progress: status === "not started" ? 0 : 10,
        change: "+0%",
      });

      setOpen(false);
      onDeliverableAdded();
    } catch (err) {
      console.error("Error adding deliverable:", err);
      setError(err instanceof Error ? err.message : "Failed to add deliverable");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (_: unknown, data: { open: boolean }) => {
    setOpen(data.open);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<FolderAddRegular />}>Add Deliverable</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogTitle>Add New Deliverable</DialogTitle>
        <DialogBody>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Title</label>
              <Input
                value={title}
                onChange={handleTitleChange}
                placeholder="e.g., Prototype, Demo Video"
              />
            </div>

            <div>
              <label style={{ fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Description</label>
              <Textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Deliverable description"
              />
            </div>

            <div>
              <label style={{ fontWeight: "600", display: "block", marginBottom: "0.25rem" }}>Status</label>
              <Select value={status} onChange={handleStatusChange}>
                <option value="not started">Not Started</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </div>

            {error && (
              <div style={{ color: "#d13438", fontSize: "0.875rem" }}>
                {error}
              </div>
            )}
          </div>
        </DialogBody>
        <DialogActions>
          <Button appearance="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button appearance="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Deliverable"}
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};
export default AddDeliverableModal;
