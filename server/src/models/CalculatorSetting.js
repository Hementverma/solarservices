import mongoose from 'mongoose'

const calculatorSettingSchema = new mongoose.Schema(
  {
    singleton: {
      type: String,
      default: 'main',
      unique: true,
      immutable: true,
    },
    tariffDefaults: {
      Home: { type: Number, required: true, min: 0, max: 50 },
      Shop: { type: Number, required: true, min: 0, max: 50 },
      'Commercial Building': { type: Number, required: true, min: 0, max: 50 },
      'Factory / Industry': { type: Number, required: true, min: 0, max: 50 },
      Agricultural: { type: Number, required: true, min: 0, max: 50 },
    },
    peakSunHoursByCity: {
      Indore: { type: Number, required: true, min: 1, max: 10 },
      Bhopal: { type: Number, required: true, min: 1, max: 10 },
      Sehore: { type: Number, required: true, min: 1, max: 10 },
      Ujjain: { type: Number, required: true, min: 1, max: 10 },
      Dewas: { type: Number, required: true, min: 1, max: 10 },
      Rajgarh: { type: Number, required: true, min: 1, max: 10 },
    },
    performanceRatio: {
      type: Number,
      required: true,
      min: 0.4,
      max: 1,
    },
    systemCostPerKw: {
      type: Number,
      required: true,
      min: 10000,
      max: 200000,
    },
    co2PerKwh: {
      type: Number,
      required: true,
      min: 0,
      max: 2,
    },
    minCapacity: {
      type: Number,
      required: true,
      min: 0.5,
      max: 100,
    },
    maxCapacity: {
      type: Number,
      required: true,
      min: 100,
      max: 100000,
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  { timestamps: true },
)

calculatorSettingSchema.set('toJSON', {
  transform(_doc, ret) {
    delete ret.__v
    return ret
  },
})

export default mongoose.model('CalculatorSetting', calculatorSettingSchema)
