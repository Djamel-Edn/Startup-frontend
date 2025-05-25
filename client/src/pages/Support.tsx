import React from 'react';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Mail20Regular, Phone20Regular, DocumentText20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  noProjectContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: tokens.colorNeutralBackground2,
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
    marginBottom: '1rem',
  },
  subtext: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    maxWidth: '400px',
    marginBottom: '2rem',
  },
  contactSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '400px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '14px',
    color: tokens.colorNeutralForeground1,
  },
  button: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: '600',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
});

const Support: React.FC = () => {
  const styles = useStyles();

  return (
    <div className={styles.noProjectContainer}>
      <h2 className={styles.title}>Support Center</h2>
      <p className={styles.subtext}>
        Our dedicated support team is ready to assist with any project or platform-related inquiries.
      </p>
      <div className={styles.contactSection}>
        <div className={styles.contactItem}>
          <Mail20Regular />
          <span>Email: support@starthub.com</span>
        </div>
        <div className={styles.contactItem}>
          <Phone20Regular />
          <span>Phone: +1-800-123-4567 (Mon-Fri, 8 AM - 6 PM)</span>
        </div>
        <div className={styles.contactItem}>
          <DocumentText20Regular />
          <span>Knowledge Base: <a href="https://support.starthub.com" style={{ color: tokens.colorBrandForeground1 }}>support.starthub.com</a></span>
        </div>
        <Button className={styles.button} onClick={() => window.location.href = 'mailto:support@starthub.com'}>
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default Support;