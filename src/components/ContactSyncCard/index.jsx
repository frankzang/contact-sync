import { ContactSelector } from '../ContactSelector';
import { Item } from '@react-stately/collections';
import styles from './ContactSyncCard.module.css';

export const ContactSyncCard = ({
  icon,
  title,
  description,
  contacts,
  onSelectionChange,
}) => {
  const handleSelectionChange = (selectedOptions) =>
    onSelectionChange?.([...selectedOptions]);

  return (
    <article className={styles.ContactSyncCard}>
      <img src={icon} alt="" className={styles.ContactSyncCardIcon} />
      <h2 className={styles.ContactSyncCardTitle}>{title}</h2>
      <p className={styles.ContactSyncCardDescription}>{description}</p>
      <ContactSelector
        label="Choose some contacts"
        selectionMode="multiple"
        onSelectionChange={handleSelectionChange}
      >
        {contacts?.map((contact) => (
          <Item key={contact}>{contact}</Item>
        ))}
      </ContactSelector>
    </article>
  );
};
