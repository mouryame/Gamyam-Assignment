import styles from "./product-list.module.css";
import ViewSwitcher from "./view-switcher";
import ProductListGrid from "./product-list-grid";
import ProductListTable from "./product-list-table";
import { useMemo, useState } from "react";
import Pagination from "../pagination";
import { useAppState } from "../../context/AppState";

export default function ProductList() {
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);
  const { products } = useAppState();

  const productsPerPage = 8;
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = page * productsPerPage;
  const pageItems = useMemo(() => products.slice(startIndex, endIndex), [products, startIndex, endIndex]);

  return (
    <div className={styles.productList}>
      <ViewSwitcher view={view} setView={setView} />
      <h2>Product List</h2>
      <div className={styles.productListContainer}>
        {view === "grid" ? (
          <ProductListGrid products={pageItems} />
        ) : (
          <ProductListTable products={pageItems} />
        )}
      </div>
      <Pagination page={page} setPage={setPage} total={totalPages} />
    </div>
  );
}
