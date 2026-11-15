import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      immutable: true,
      maxlength: 80,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    metaTitle: {
      type: String,
      trim: true,
      maxlength: 200,
      default: '',
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 320,
      default: '',
    },
    intro: {
      type: String,
      trim: true,
      maxlength: 240,
      default: '',
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1500,
    },
    highlights: {
      type: [String],
      default: [],
    },
    areas: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      trim: true,
      maxlength: 300,
      default: '/images/hero-solar.jpg',
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
)

locationSchema.set('toJSON', {
  transform(_doc, ret) {
    delete ret.__v
    return ret
  },
})

export default mongoose.model('Location', locationSchema)
