import "./App.css";
import { Header, ProductList, ProductListAdmin } from "./components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { useAppState } from "./context/AppState";

function App() {
  const { isAdmin } = useAppState();
  return (
    <motion.div
      className="app"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route
            path="/admin"
            element={isAdmin ? <ProductListAdmin /> : <Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </motion.div>
  );
}

export default App;
