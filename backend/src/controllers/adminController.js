import Admin from '../models/AdminModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'                      // ✅ add
import transporter from '../config/mail.js'
// 👉 REGISTER ADMIN

// export const registerAdmin = async (req, res) => {
//   try {
//     const { email, password } = req.body

//     // Already exist check
//     const existing = await Admin.findOne({ email })
//     if (existing) return res.status(400).json({ message: 'Admin already exists' })

//     // Password hash
//     const hashedPassword = await bcrypt.hash(password, 10)

//     const admin = await Admin.create({
//       email,
//       password: hashedPassword
//     })

//     res.status(201).json({
//       success: true,
//       message: 'Admin registered successfully',
//       admin
//     })

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message })
//   }
// }

// 👉 LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    // Admin find karo
    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(404).json({ message: 'Admin not found' })

    // Password check karo
    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' })

    // Token banao
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

// 👉 GET ADMIN PROFILE
export const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password')
    res.status(200).json({ success: true, admin })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(404).json({ message: 'Email Not Registered!' })

    const otp    = crypto.randomInt(100000, 999999).toString()
    const expiry = new Date(Date.now() + 10 * 60 * 1000) // 10 min

    admin.resetOtp       = otp
    admin.resetOtpExpiry = expiry
    await admin.save()

    await transporter.sendMail({
      from:    process.env.EMAIL_USER,
      to:      email,
      subject: 'Samridhi Enterprises - Password Reset OTP',
      html: `
        <h3>Password Reset Request</h3>
        <p>Your OTP is:</p>
        <h1 style="color:#2563eb; letter-spacing:6px;">${otp}</h1>
        <p>Valid for <b>10 minutes</b>.</p>
        <p style="color:gray;font-size:12px;">Ignore if you didn't request this.</p>
      `
    })

    res.json({ message: 'OTP sent to your email!' })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// 👉 RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body

    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(404).json({ message: 'Admin not found!' })

    if (admin.resetOtp !== otp)
      return res.status(400).json({ message: 'Invalid OTP!' })

    if (new Date() > admin.resetOtpExpiry)
      return res.status(400).json({ message: 'OTP expired!' })

    admin.password= await bcrypt.hash(newPassword, 10)
    admin.resetOtp   = undefined
    admin.resetOtpExpiry= undefined
    await admin.save()

    res.json({ message: 'Password reset successful!' })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}