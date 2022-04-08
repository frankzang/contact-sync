import { useId } from '@react-aria/utils';
import syncArrowsIcon from '../../assets/images/sync-arrows.svg';
import styles from './SyncButton.module.css';

export const SyncButton = ({ status = 'idle', onClick }) => {
  const successId = useId();
  const idleId = useId();

  return (
    <button
      onClick={onClick}
      data-status={status}
      className={styles.Button}
      aria-labelledby={status === 'idle' ? idleId : successId}
    >
      <img src={syncArrowsIcon} alt="" />
      <div className={styles.ButtonLabel}>
        <span id={idleId} data-idle>
          Sync Contacts
        </span>
        <span id={successId} data-success>
          All done!
        </span>
      </div>
    </button>
  );
};
