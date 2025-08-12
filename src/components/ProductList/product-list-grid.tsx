import styles from "./product-list.module.css";
import { motion } from "motion/react";

export default function ProductListGrid({ products }: { products: any[] }) {
  return (
    <motion.div
      className={styles.productListContainerGrid}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          className={styles.productItemGrid}
          variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.25 }}
        >
          <h3 className={styles.productTitle}>{product.name}</h3>
          <p className={styles.productPrice}>{product.price}</p>
          <p className={styles.productDescription}>{product.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
