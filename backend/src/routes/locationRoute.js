import express from "express";
import { getLocation, createLocation, updateLocation, deleteLocation } from "../controllers/locationController.js";
import protect from "../auth/middleware.js";

const router = express.Router();

router.get("/", getLocation);
router.post("/", protect, createLocation);
router.put("/:id", protect, updateLocation);
router.delete("/:id", protect, deleteLocation);

export default router;