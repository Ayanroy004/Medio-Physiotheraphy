const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^[0-9+\-\s()]{7,20}$/, 'Please provide a valid phone number'],
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: [true, 'Service selection is required'],
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    timeSlot: {
      type: String,
      required: [true, 'Time slot is required'],
      // e.g. "09:00 AM - 09:45 AM"
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    medicalNotes: {
      type: String,
      maxlength: [1500, 'Medical notes cannot exceed 1500 characters'],
      default: '',
    },
  },
  { timestamps: true }
);

// Prevent exact double-booking of the same slot for the same day
appointmentSchema.index({ appointmentDate: 1, timeSlot: 1 }, { unique: false });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ email: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
