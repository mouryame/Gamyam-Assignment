import React from "react";
import styles from "./modal.module.css";
import { motion, AnimatePresence } from "motion/react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  actions,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={styles.backdrop}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            role="dialog"
            aria-modal
            aria-labelledby={title ? "modal-title" : undefined}
          >
            {title && (
              <div className={styles.header}>
                <h3 id="modal-title">{title}</h3>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                  ×
                </button>
              </div>
            )}
            <div className={styles.body}>{children}</div>
            {actions && <div className={styles.actions}>{actions}</div>}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
