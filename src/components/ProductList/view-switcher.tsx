import styles from "./product-list.module.css";
import { FaThLarge, FaTable } from "react-icons/fa";
import { motion } from "motion/react";

export default function ViewSwitcher({
  view,
  setView,
}: {
  view: string;
  setView: (view: string) => void;
}) {
  const handleViewChange = (view: string) => {
    setView(view);
  };

  return (
    <div
      className={styles.viewSwitcher}
      role="tablist"
      aria-label="View Switcher"
    >
      <motion.button
        onClick={() => handleViewChange("grid")}
        className={view === "grid" ? styles.selected : styles.unselected}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        role="tab"
        aria-selected={view === "grid"}
      >
        <FaThLarge aria-hidden />
        <span>Grid</span>
      </motion.button>
      <motion.button
        onClick={() => handleViewChange("table")}
        className={view === "table" ? styles.selected : styles.unselected}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        role="tab"
        aria-selected={view === "table"}
      >
        <FaTable aria-hidden />
        <span>Table</span>
      </motion.button>
    </div>
  );
}
