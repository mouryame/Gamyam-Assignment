import React, { useState, useRef, useEffect } from "react";
import styles from "./search.module.css";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "motion/react";
import { useAppState } from "../../context/AppState";
import type { Product as FullProduct } from "../../context/AppState";

type Product = Pick<FullProduct, "id" | "name">;

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const timeoutRef = useRef<number | null>(null);
  const { products } = useAppState();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const filteredProducts = products
        .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 8);
      setSuggestions(filteredProducts);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inputWrapper}>
        <FaSearch aria-hidden className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search products"
          className={styles.search}
          value={searchQuery}
          onChange={handleSearchChange}
          aria-autocomplete="list"
          aria-expanded={searchQuery.length > 0 && suggestions.length > 0}
        />
      </div>
      <AnimatePresence>
        {searchQuery.length > 0 && suggestions.length > 0 && (
          <motion.div
            className={styles.suggestions}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
          >
            <ul role="listbox">
              {suggestions.map((product) => (
                <motion.li
                  key={product.id}
                  role="option"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.15 }}
                >
                  {product.name}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
