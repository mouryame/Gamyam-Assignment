import { Search } from "../index";
import styles from "./header.module.css";
import { FaShoppingBag, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import SignInModal from "../Modal/SignInModal";
import { useAppState } from "../../context/AppState";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const { user, signOut } = useAppState();
  const [openSignIn, setOpenSignIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const onAdminPage = useMemo(
    () => location.pathname.startsWith("/admin"),
    [location.pathname]
  );

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.brand}>
        <FaShoppingBag aria-hidden className={styles.brandIcon} />
        <h1 className={styles.title}>Shoppie</h1>
      </div>
      <Search />
      <div className={styles.actions}>
        {user ? (
          <motion.button
            className={styles.signInBtn}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              signOut();
              if (onAdminPage) navigate("/");
            }}
            aria-label="Sign out"
          >
            <FaSignOutAlt aria-hidden />
            <span>{user.email}</span>
          </motion.button>
        ) : (
          <motion.button
            className={styles.signInBtn}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpenSignIn(true)}
            aria-label="Sign in"
          >
            <FaSignInAlt aria-hidden />
            <span>Sign In</span>
          </motion.button>
        )}
        {user &&
          (onAdminPage ? (
            <motion.button
              className={styles.signInBtn}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/")}
              aria-label="Go to home"
            >
              Home
            </motion.button>
          ) : (
            <motion.button
              className={styles.signInBtn}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/admin")}
              aria-label="Go to admin"
            >
              Admin
            </motion.button>
          ))}
        <SignInModal open={openSignIn} onClose={() => setOpenSignIn(false)} />
      </div>
    </motion.header>
  );
}
