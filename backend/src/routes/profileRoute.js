import express from 'express'
import {
  getHomePage,
  createHomePage,
  updateHomePage,
  deleteHomePage
} from '../controllers/homeController.js'
import protect from '../auth/middleware.js'
import upload from '../auth/multer.js'

const router = express.Router()

// GET HOMEPAGE
router.get('/', getHomePage)

// CREATE HOMEPAGE
router.post(
  '/',
  protect,
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banners', maxCount: 5 }
  ]),
  createHomePage
)

// UPDATE HOMEPAGE
router.put(
  '/:id',
  protect,
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'banners', maxCount: 5 }
  ]),
  updateHomePage
)

// DELETE HOMEPAGE
router.delete('/:id', protect, deleteHomePage)

export default router