import styles from "./product-list.module.css";
import { motion } from "motion/react";

export default function ProductListTable({ products }: { products: any[] }) {
  return (
    <motion.table
      className={styles.productListContainerTable}
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <motion.tr
            key={product.id}
            className={styles.productItemTable}
            variants={{ hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
          >
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.description}</td>
          </motion.tr>
        ))}
      </tbody>
    </motion.table>
  );
}
