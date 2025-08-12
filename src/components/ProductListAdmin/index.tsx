import styles from "./product-list-admin.module.css";
import Pagination from "../pagination";
import { useMemo, useState } from "react";
import { FaPencilAlt, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useAppState } from "../../context/AppState";
import ProductFormModal from "../Modal/ProductFormModal";
import DeleteConfirmModal from "../Modal/DeleteConfirmModal";

export default function ProductListAdmin() {
  const { products, deleteProduct } = useAppState();
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState<number | string | null>(null);

  const productsPerPage = 8;
  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = page * productsPerPage;
  const pageItems = useMemo(() => products.slice(startIndex, endIndex), [products, startIndex, endIndex]);

  const currentEditing = useMemo(() => products.find((p) => p.id === editingId) || null, [products, editingId]);

  return (
    <div className={styles.productListAdmin}>
      <h2>Product List</h2>
      <button
        className={styles.addProductButton}
        onClick={() => {
          setEditingId(null);
          setOpenForm(true);
        }}
      >
        <FaPlus style={{ marginRight: ".4rem" }} /> Add Product
      </button>
      <table className={styles.productListContainerTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.map((product) => (
            <tr key={product.id} className={styles.productItemTable}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => {
                    setEditingId(product.id);
                    setOpenForm(true);
                  }}
                >
                  <FaPencilAlt />
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => {
                    setDeleteId(product.id);
                    setOpenDelete(true);
                  }}
                >
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination page={page} setPage={setPage} total={totalPages} />
      <ProductFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        product={currentEditing}
      />
      <DeleteConfirmModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {
          if (deleteId != null) deleteProduct(deleteId);
          setOpenDelete(false);
        }}
        message="Are you sure you want to delete this product?"
      />
    </div>
  );
}
