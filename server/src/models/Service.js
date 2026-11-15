import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema(
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
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 240,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 800,
    },
    image: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    icon: {
      type: String,
      required: true,
      trim: true,
      maxlength: 40,
      default: 'SunMedium',
    },
    bestFor: {
      type: String,
      trim: true,
      maxlength: 160,
      default: '',
    },
    features: {
      type: [String],
      default: [],
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

serviceSchema.set('toJSON', {
  transform(_doc, ret) {
    delete ret.__v
    return ret
  },
})

export default mongoose.model('Service', serviceSchema)
