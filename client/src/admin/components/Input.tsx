import { Text, Divider, tokens, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  inputWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  labelWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
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
  Text: {
    fontWeight: tokens.fontWeightSemibold,
    flexShrink: 0,
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
  Divider: {
    borderBottom: `2px solid ${tokens.colorNeutralForeground1}`,
    width: "100%",
  },
});

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  errorMessage,
  onBlur,
  onKeyDown,
  type,
}: InputProps) => {
  const classes = useStyles();

  return (
    <div className={classes.inputWrapper}>
      <div className={classes.labelWrapper}>
        <label className={classes.Text}>{label}</label>
        {errorMessage && (
          <Text className={classes.errorText}>{errorMessage}</Text>
        )}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        className={classes.inputField}
      />
      <Divider />
    </div>
  );
};

export default Input;
