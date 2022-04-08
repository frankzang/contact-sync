import { ContactSyncCard } from '../../components/ContactSyncCard';
import styles from './ContactSync.module.css';
import gmailIcon from '../../assets/images/gmail.svg';
import mailChimpIcon from '../../assets/images/mail-chimp.svg';
import { SyncButton } from '../../components/SyncButton';
import { useState } from 'react';

export const ContactSync = () => {
  const [syncStatus, setSyncStatus] = useState('idle');

  const toggleSyncStatus = () => {
    if (syncStatus === 'idle') setSyncStatus('success');
    else setSyncStatus('idle');
  };

  return (
    <div className={styles.Container}>
      <ContactSyncCard
        icon={gmailIcon}
        title="Gmail"
        description="These Gmail contacts will sync to MailChimp"
        contacts={['Family', 'Work Friends', 'Another label']}
      />
      <SyncButton status={syncStatus} onClick={toggleSyncStatus} />
      <ContactSyncCard
        icon={mailChimpIcon}
        title="Mailchimp"
        description="These Mailchimp contacts will sync to Gmail"
        contacts={[
          'Family',
          'Work Friends',
          'Another label',
          'Work Friends 2',
          'Another label 2',
          'Work Friends 3',
          'Another label 3',
        ]}
      />
    </div>
  );
};
