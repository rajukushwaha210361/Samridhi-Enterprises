import express from "express";
import { getProducts, getSingleProduct, createProduct, updateProduct, deleteProduct, permanentDeleteProduct } from "../controllers/prodcutController.js";
import protect from "../auth/middleware.js";
import upload from "../auth/multer.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.post("/", protect, upload.fields([{ name: "images", maxCount: 5 }]), createProduct);
router.put("/:id", protect, upload.fields([{ name: "images", maxCount: 5 }]), updateProduct);
router.delete("/:id", protect, deleteProduct);                        // soft delete
router.delete("/permanent/:id", protect, permanentDeleteProduct);     // permanent delete

export default router;