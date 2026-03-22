import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  mapLink: { type: String },
  workingHours: { type: String },
}, { timestamps: true })

export default mongoose.model('Location', locationSchema)