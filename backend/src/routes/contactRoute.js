import express from "express";
import { getContacts, createContact, deleteContact } from "../controllers/contactController.js";
import protect from "../auth/middleware.js";

const router = express.Router();

router.get("/",protect, getContacts);      // sirf admin dekhe
router.post("/", createContact);          // koi bhi bhej sake
// router.put("/:id", protect, updateContact); // ✅ yeh add karo
router.delete("/:id",protect, deleteContact); // sirf admin delete kare

export default router;