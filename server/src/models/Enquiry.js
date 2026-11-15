import mongoose from 'mongoose'
import {
  ENQUIRY_STATUSES,
  PROPERTY_TYPES,
  REQUIREMENTS,
  SERVICE_CITIES,
} from '../data/constants.js'

const noteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    addedByName: {
      type: String,
      trim: true,
      maxlength: 80,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: true },
)

const enquirySchema = new mongoose.Schema(
  {
    enquiryId: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      match: [/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'],
      index: true,
    },
    city: {
      type: String,
      required: true,
      enum: SERVICE_CITIES,
    },
    propertyType: {
      type: String,
      required: true,
      enum: PROPERTY_TYPES,
    },
    monthlyBill: {
      type: Number,
      default: null,
      min: 0,
      max: 10000000,
    },
    consumerNumber: {
      type: String,
      trim: true,
      maxlength: 30,
      default: '',
    },
    subsidyCapacity: {
      type: Number,
      min: 1,
      max: 1000,
      default: null,
    },
    requirement: {
      type: String,
      required: true,
      enum: REQUIREMENTS,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },
    consent: {
      type: Boolean,
      required: true,
      validate: {
        validator: (value) => value === true,
        message: 'Consent is required',
      },
    },
    consentAt: {
      type: Date,
      default: Date.now,
    },
    source: {
      type: String,
      trim: true,
      maxlength: 60,
      default: 'website',
    },
    status: {
      type: String,
      enum: ENQUIRY_STATUSES,
      default: 'New',
      index: true,
    },
    notes: {
      type: [noteSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret) {
        delete ret.__v
        return ret
      },
    },
  },
)

enquirySchema.index({ createdAt: -1 })
enquirySchema.index({ city: 1, status: 1 })
enquirySchema.index({ mobile: 1, createdAt: -1 })

enquirySchema.virtual('displayMobile').get(function displayMobile() {
  return `+91 ${this.mobile.slice(0, 5)} ${this.mobile.slice(5)}`
})

export default mongoose.model('Enquiry', enquirySchema)
