import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
   resetOtp:       { type: String },
  resetOtpExpiry: { type: Date },
}, { timestamps: true })

export default mongoose.model('Admin', adminSchema)