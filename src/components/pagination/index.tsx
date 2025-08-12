import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./pagination.module.css";
import { motion } from "motion/react";

export default function Pagination({
  page,
  setPage,
  total,
}: {
  page: number;
  setPage: (page: number) => void;
  total: number;
}) {
  return (
    <div className={styles.paginationContainer} role="navigation" aria-label="Pagination">
      <motion.button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        className={page === 1 ? styles.disabled : ""}
        whileHover={page === 1 ? undefined : { y: -1 }}
        whileTap={page === 1 ? undefined : { scale: 0.98 }}
        aria-label="Previous page"
      >
        <FaChevronLeft />
      </motion.button>
      {Array.from({ length: total }, (_, i) => i + 1).map((i) => (
        <motion.button
          key={i}
          onClick={() => setPage(i)}
          className={i === page ? styles.active : ""}
          aria-current={i === page ? "page" : undefined}
          whileHover={i === page ? undefined : { y: -1 }}
          whileTap={i === page ? undefined : { scale: 0.98 }}
        >
          {i}
        </motion.button>
      ))}
      <motion.button
        onClick={() => setPage(page + 1)}
        disabled={page === total}
        className={page === total ? styles.disabled : ""}
        whileHover={page === total ? undefined : { y: -1 }}
        whileTap={page === total ? undefined : { scale: 0.98 }}
        aria-label="Next page"
      >
        <FaChevronRight />
      </motion.button>
    </div>
  );
}
