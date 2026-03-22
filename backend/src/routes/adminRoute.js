import express from 'express'
import {  loginAdmin, getAdmin, sendOtp, resetPassword } from '../controllers/adminController.js'
// import protect from '../middleware/authMiddleware.js'
import protect from '../auth/middleware.js'

const router = express.Router()

// router.post('/register', registerAdmin)   // Public
router.post('/login', loginAdmin)         // Public
router.get('/profile', protect, getAdmin) // Admin only
router.post('/forgot-password', sendOtp)     // 👈 add
router.post('/reset-password',  resetPassword) // 👈 add

export default router