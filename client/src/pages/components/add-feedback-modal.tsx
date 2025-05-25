"use client"

import type React from "react"

import { useState } from "react"
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
  makeStyles,
  tokens,
} from "@fluentui/react-components"
import { CommentAddRegular } from "@fluentui/react-icons"
import { addFeedback } from "../../../api/project-service"

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
})

interface AddFeedbackModalProps {
  sessionId: string
  onFeedbackAdded: () => void
}

const AddFeedbackModal: React.FC<AddFeedbackModalProps> = ({ sessionId, onFeedbackAdded }) => {
  const styles = useStyles()
  const [open, setOpen] = useState(false)
  const [author, setAuthor] = useState("")
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!author || !text) {
      setError("Please fill in all fields")
      return
    }

    try {
      setLoading(true)
      setError(null)

      await addFeedback(sessionId, {
        author,
        text,
      })

      setOpen(false)
      onFeedbackAdded()
    } catch (err) {
      console.error("Error adding feedback:", err)
      setError(err instanceof Error ? err.message : "Failed to add feedback")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(e: any, data: { open: boolean | ((prevState: boolean) => boolean) }) => setOpen(data.open)}>
      <DialogTrigger disableButtonEnhancement>
        <Button icon={<CommentAddRegular />}>Add Feedback</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogTitle>Add New Feedback</DialogTitle>
        <DialogBody>
          <div className={styles.formField}>
            <label className={styles.label}>Author</label>
            <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" />
          </div>

          <div className={styles.formField}>
            <label className={styles.label}>Feedback</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Provide your feedback on the project progress"
            />
          </div>

          {error && <div className={styles.errorText}>{error}</div>}
        </DialogBody>
        <DialogActions>
          <Button appearance="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button appearance="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding..." : "Add Feedback"}
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  )
}

export default AddFeedbackModal
