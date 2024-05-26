import express from "express";
import { authenticateToken } from "../middleware/jwtAuth";
import {
  deleteProduct,
  getAllProducts,
  getProductById,
  registerProduct,
  updateProduct,
} from "../controllers/productController";

const router = express.Router();

router.get("/", authenticateToken, getAllProducts);
router.post("/register", authenticateToken, registerProduct);
router.get("/:id", authenticateToken, getProductById);
router.put("/:id", authenticateToken, updateProduct);
router.delete("/:id", authenticateToken, deleteProduct);

export default router;
