import mongoose from 'mongoose'

const homePageSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  tagline: { type: String },
  description: { type: String },
  phone: { type: String },
  email: { type: String },
  whatsapp: { type: String },
  banners: [String],
  logo: { type: String },
}, { timestamps: true })

export default mongoose.model('HomePage', homePageSchema)