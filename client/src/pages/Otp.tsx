import { makeStyles, mergeClasses, tokens, Button, Input, Text, Image, MessageBar, MessageBarBody, MessageBarTitle } from '@fluentui/react-components';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/Logo Image.svg';
import { useTheme } from "../ThemeContext"
import { useAuthContext } from './components/AuthContext';
const useStyles = makeStyles({
  background: {
    backgroundColor: tokens.colorNeutralBackground2,
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '2rem',
    padding: '2rem',
    paddingTop: '2.5rem',
    paddingBottom: '5rem',
    position: 'relative',
    borderRadius: '1rem',
    width: '450px',
    maxHeight: '90vh',
    minHeight: '350px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    fontSize: tokens.fontSizeHero900,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: '1.2',
  },
  otpContainer: {
    display: 'flex',
    gap: '0px',
    width: '100%',
    justifyContent: 'space-between',
  },
  otpInput: {
    flex: '1',
    height: '50px',
    fontSize: tokens.fontSizeBase400,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorBrandBackground,
    borderRadius: '0px',
    padding: '0px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& input': {
      textAlign: 'center',
      justifyContent: 'center',
      padding: '0',
      fontSize: '24px',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
  },
  firstOtpInput: {
    borderRadius: '10px 0 0 10px',
  },
  lastOtpInput: {
    borderRadius: '0 10px 10px 0',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusMedium,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForegroundOnBrand,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: tokens.colorBrandBackground3Static,
    },
  },
  resendCode: {
    color: tokens.colorBrandBackground,
    fontWeight: tokens.fontWeightSemibold,
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  text: {
    color: tokens.colorNeutralForeground4,
    fontWeight: tokens.fontWeightSemibold,
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  messageBox: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    transitionDuration: '1s',
    width: '300px',
    zIndex: 100,
  },
  label: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
  },
  logo: {
    width:'50px'
  },
  logoDark: {
    filter: 'brightness(0) invert(1)', 
  },
});

const Otp: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme(); 
  const [otp, setOtp] = useState<string>(''); 
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const {user} =useAuthContext()
  const email = localStorage.getItem('email') ||user?.email || 'your.email@esi-sba.dz';

  const handleChange = (
    index: number,
    value: string,
    event?: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = otp.slice(0, index) + value + otp.slice(index + 1);
    setOtp(newOtp.padEnd(6, ''));

    if (event?.key === 'Enter') {
      handleVerify(new Event('submit') as unknown as React.FormEvent, newOtp);
      return;
    }

    if (event?.key === 'Backspace' && !value && index > 0) {
      inputRefs.current[index - 1]?.focus();
      return;
    }

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
  
    if (/^\d{6}$/.test(pastedData)) {
      setOtp(pastedData);
      inputRefs.current[5]?.focus();
      handleVerify(new Event('submit') as unknown as React.FormEvent, pastedData); 
    } else {
      setError('Please paste a valid 6-digit code.');
    }
  };

  const handleVerify = async (e: React.FormEvent, pastedData: string) => {
    e.preventDefault();
    if (otp.length < 6 && pastedData.length < 6) {
    
      setError('Please enter a 6-digit code.');
      return;
    }

    setError(null);
    setLoading(true);
    
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          token: otp || pastedData,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Invalid or expired code.');
      }

      const data = await res.json();
      console.log('Verification successful:', data);
      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to resend code.');
      }

      setError('A new code has been sent to your email.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className={classes.background}>
      <form className={classes.container} onSubmit={(e) => handleVerify(e, otp)}>
        <Image
          src={logo}
          alt="Logo"
          className={mergeClasses(classes.logo, isDarkMode && classes.logoDark)} 
        />
        <div className={classes.header}>
          <Text className={classes.title} as="h2">Verify Your Email</Text>
          <Text className={classes.text}>
            We’ve sent a 6-digit code to {email},<br />
            enter the code below to verify your account.
          </Text>
        </div>

        <div style={{ width: '100%' }}>
          <Text className={classes.label}>OTP Code</Text>
          <div className={classes.otpContainer}>
            {Array.from({ length: 6 }, (_, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className={mergeClasses(
                  classes.otpInput,
                  index === 0 && classes.firstOtpInput,
                  index === 5 && classes.lastOtpInput
                )}
                type="text"
                maxLength={1}
                inputMode="numeric"
                value={otp[index] || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(index, e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleChange(index, otp[index] || '', e)}
                onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => handlePaste(e)} 
                disabled={loading || success}
              />
            ))}
          </div>
        </div>

        <Button
          className={classes.button}
          type="submit"
          disabled={loading || success}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </Button>

        <div className={classes.textSection}>
          <Text className={classes.text}>
            Didn't receive code?{' '}
            <Text
              as="span"
              className={classes.resendCode}
              onClick={handleResendCode}
              style={{ pointerEvents: loading ? 'none' : 'auto' }}
            >
              Resend Code
            </Text>
          </Text>
          <Text className={classes.text}>
            By signing up, you agree to our Terms & Privacy Policy.
          </Text>
        </div>

        {(error || success) && (
          <MessageBar intent={success ? 'success' : 'error'} className={classes.messageBox}>
            <MessageBarBody>
              <MessageBarTitle>{success ? 'Email Verified' : 'Verification Failed'}</MessageBarTitle>
              {success ? 'Your email has been successfully verified.' : error}
            </MessageBarBody>
          </MessageBar>
        )}
      </form>
    </div>
  );
};

export default Otp;