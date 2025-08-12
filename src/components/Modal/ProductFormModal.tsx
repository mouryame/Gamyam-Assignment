import React, { useEffect, useMemo, useState } from "react";
import Modal from "./index";
import styles from "./modal.module.css";
import type { Product } from "../../context/AppState";
import { useAppState } from "../../context/AppState";

export default function ProductFormModal({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product?: Product | null;
}) {
  const editing = !!product;
  const { addProduct, updateProduct } = useAppState();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState<string>("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [tags, setTags] = useState("");
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setStock("");
    setDescription("");
    setIsActive(true);
    setTags("");
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(String(product.price));
      setCategory(product.category);
      setStock(String(product.stock));
      setDescription(product.description);
      setIsActive(product.isActive);
      setTags(product.tags.join(", "));
    } else {
      resetForm();
    }
  }, [product, open]);

  const title = useMemo(
    () => (editing ? "Edit Product" : "Add Product"),
    [editing]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const priceNum = Number(price);
    const stockNum = Number(stock);

    if (!name.trim()) return setError("Name is required");
    if (price === "") return setError("Price is required");
    if (!Number.isFinite(priceNum) || priceNum < 0)
      return setError("Price must be a non-negative number");
    if (!category.trim()) return setError("Category is required");
    if (stock === "") return setError("Stock is required");
    if (!Number.isInteger(stockNum) || stockNum < 0)
      return setError("Stock must be a non-negative integer");

    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    if (editing && product) {
      updateProduct(product.id, {
        name,
        price: priceNum,
        category,
        stock: stockNum,
        description,
        isActive,
        tags: tagList,
      });
    } else {
      addProduct({
        name,
        price: priceNum,
        category,
        stock: stockNum,
        description,
        isActive,
        tags: tagList,
      });
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={title}
      actions={
        <div>
          <button className={styles.ghostBtn} onClick={handleClose}>
            Cancel
          </button>
          <button form="product-form" className={styles.primaryBtn}>
            {editing ? "Save" : "Add"}
          </button>
        </div>
      }
    >
      <form id="product-form" onSubmit={onSubmit} className={styles.body}>
        <div className={styles.inputRow}>
          <label htmlFor="p-name">Name</label>
          <input
            id="p-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inline}>
          <div className={styles.inputRow}>
            <label htmlFor="p-price">Price</label>
            <input
              id="p-price"
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              value={price}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
              }}
              onChange={(e) => {
                const v = e.target.value;
                // Allow empty to let user type
                if (v === "") return setPrice("");
                // Only digits and dot
                if (/^\d*(?:\.?\d*)?$/.test(v)) setPrice(v);
              }}
            />
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="p-stock">Stock</label>
            <input
              id="p-stock"
              type="number"
              inputMode="numeric"
              step="1"
              min="0"
              value={stock}
              onKeyDown={(e) => {
                if ([".", "e", "E", "+", "-"].includes(e.key))
                  e.preventDefault();
              }}
              onChange={(e) => {
                const v = e.target.value;
                if (v === "") return setStock("");
                if (/^\d+$/.test(v)) setStock(v);
              }}
            />
          </div>
        </div>
        <div className={styles.inline}>
          <div className={styles.inputRow}>
            <label htmlFor="p-category">Category</label>
            <input
              id="p-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className={styles.inputRow}>
            <label htmlFor="p-active">Active</label>
            <select
              id="p-active"
              value={isActive ? "true" : "false"}
              onChange={(e) => setIsActive(e.target.value === "true")}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="p-tags">Tags (comma separated)</label>
          <input
            id="p-tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <div className={styles.inputRow}>
          <label htmlFor="p-desc">Description</label>
          <textarea
            id="p-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </form>
    </Modal>
  );
}
