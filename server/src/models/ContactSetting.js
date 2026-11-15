import mongoose from 'mongoose'

const contactSettingSchema = new mongoose.Schema(
  {
    singleton: {
      type: String,
      default: 'main',
      unique: true,
      immutable: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 24,
    },
    phoneRaw: {
      type: String,
      required: true,
      trim: true,
      maxlength: 24,
    },
    phone2: {
      type: String,
      trim: true,
      maxlength: 24,
      default: '',
    },
    phone2Raw: {
      type: String,
      trim: true,
      maxlength: 24,
      default: '',
    },
    whatsapp: {
      type: String,
      required: true,
      trim: true,
      maxlength: 24,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      maxlength: 160,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    hours: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    mapsUrl: {
      type: String,
      trim: true,
      maxlength: 500,
      default: '',
    },
  },
  { timestamps: true },
)

contactSettingSchema.set('toJSON', {
  transform(_doc, ret) {
    delete ret.__v
    return ret
  },
})

export default mongoose.model('ContactSetting', contactSettingSchema)
