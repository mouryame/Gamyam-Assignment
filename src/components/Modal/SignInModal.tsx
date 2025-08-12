import React, { useState } from "react";
import Modal from "./index";
import styles from "./modal.module.css";
import { useAppState } from "../../context/AppState";

export default function SignInModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { signIn } = useAppState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setError(null);
    onClose();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim()) return setError("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email");
    if (password.length < 4) return setError("Password must be at least 4 characters");

    try {
      await signIn(email, password);
      handleClose();
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Sign In"
      actions={
        <div>
          <button className={styles.ghostBtn} onClick={handleClose}>Cancel</button>
          <button form="signin-form" className={styles.primaryBtn}>Sign In</button>
        </div>
      }
    >
      <form id="signin-form" onSubmit={onSubmit} className={styles.body}>
        <div className={styles.inputRow}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="username" />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="current-password" />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.inputRow}>
          <small>
            Hint: admin email <code>admin@shoppie.com</code> / password <code>admin123</code>
          </small>
        </div>
      </form>
    </Modal>
  );
}
