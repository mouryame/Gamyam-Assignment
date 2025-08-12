import Modal from "./index";
import styles from "./modal.module.css";

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  message,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Delete Product"
      actions={
        <div>
          <button className={styles.ghostBtn} onClick={onClose}>Cancel</button>
          <button className={styles.primaryBtn} onClick={onConfirm}>Delete</button>
        </div>
      }
    >
      <div className={styles.body}>
        <p>{message || "Are you sure you want to delete this product? This cannot be undone."}</p>
      </div>
    </Modal>
  );
}
