// import asyncHandler from 'express-async-handler';
// import Appointment from '../models/Appointment.js';
// import Service from '../models/Service.js';

// // @desc    Create a new appointment booking (public booking flow)
// // @route   POST /api/appointments
// // @access  Public
// export const createAppointment = asyncHandler(async (req, res) => {
//   const { serviceId, appointmentDate, timeSlot } = req.body;

//   const service = await Service.findById(serviceId);
//   if (!service || !service.isActive) {
//     res.status(404);
//     throw new Error('Selected service is not available');
//   }

//   // Guard against exact double-booking of the same slot/day
//   const clash = await Appointment.findOne({
//     appointmentDate: new Date(appointmentDate),
//     timeSlot,
//     status: { $in: ['Pending', 'Confirmed'] },
//   });
//   if (clash) {
//     res.status(409);
//     throw new Error('This time slot has just been booked. Please choose another slot.');
//   }

//   const appointment = await Appointment.create(req.body);
//   const populated = await appointment.populate('serviceId', 'title price durationMinutes');

//   res.status(201).json({
//     success: true,
//     message: 'Appointment request received. Our team will confirm shortly.',
//     data: populated,
//   });
// });

// // @desc    Get available time slots for a service on a given date
// // @route   GET /api/appointments/availability?serviceId=&date=
// // @access  Public
// export const getAvailability = asyncHandler(async (req, res) => {
//   const { date } = req.query;
//   if (!date) {
//     res.status(400);
//     throw new Error('A date query parameter is required');
//   }

//   const ALL_SLOTS = [
//     '09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM',
//     '12:00 PM', '02:00 PM', '02:45 PM', '03:30 PM',
//     '04:15 PM', '05:00 PM',
//   ];

//   const startOfDay = new Date(date);
//   startOfDay.setHours(0, 0, 0, 0);
//   const endOfDay = new Date(date);
//   endOfDay.setHours(23, 59, 59, 999);

//   const bookedSlots = await Appointment.find({
//     appointmentDate: { $gte: startOfDay, $lte: endOfDay },
//     status: { $in: ['Pending', 'Confirmed'] },
//   }).distinct('timeSlot');

//   const available = ALL_SLOTS.filter((slot) => !bookedSlots.includes(slot));

//   res.status(200).json({ success: true, date, available, booked: bookedSlots });
// });

// // @desc    Get all appointments with filtering + pagination (admin)
// // @route   GET /api/appointments?status=&date=&page=&limit=
// // @access  Private/Admin
// export const getAppointments = asyncHandler(async (req, res) => {
//   const { status, date, search } = req.query;
//   const page = parseInt(req.query.page, 10) || 1;
//   const limit = parseInt(req.query.limit, 10) || 10;

//   const filter = {};
//   if (status) filter.status = status;
//   if (date) {
//     const start = new Date(date);
//     start.setHours(0, 0, 0, 0);
//     const end = new Date(date);
//     end.setHours(23, 59, 59, 999);
//     filter.appointmentDate = { $gte: start, $lte: end };
//   }
//   if (search) {
//     filter.$or = [
//       { patientName: { $regex: search, $options: 'i' } },
//       { email: { $regex: search, $options: 'i' } },
//       { phone: { $regex: search, $options: 'i' } },
//     ];
//   }

//   const total = await Appointment.countDocuments(filter);
//   const appointments = await Appointment.find(filter)
//     .populate('serviceId', 'title price durationMinutes category')
//     .sort({ appointmentDate: -1, createdAt: -1 })
//     .skip((page - 1) * limit)
//     .limit(limit);

//   res.status(200).json({
//     success: true,
//     count: appointments.length,
//     total,
//     page,
//     totalPages: Math.ceil(total / limit),
//     data: appointments,
//   });
// });

// // @desc    Get single appointment
// // @route   GET /api/appointments/:id
// // @access  Private/Admin
// export const getAppointment = asyncHandler(async (req, res) => {
//   const appointment = await Appointment.findById(req.params.id).populate('serviceId');
//   if (!appointment) {
//     res.status(404);
//     throw new Error('Appointment not found');
//   }
//   res.status(200).json({ success: true, data: appointment });
// });

// // @desc    Update appointment status (Confirm / Cancel / Complete)
// // @route   PATCH /api/appointments/:id/status
// // @access  Private/Admin
// export const updateAppointmentStatus = asyncHandler(async (req, res) => {
//   const { status } = req.body;

//   const appointment = await Appointment.findById(req.params.id);
//   if (!appointment) {
//     res.status(404);
//     throw new Error('Appointment not found');
//   }

//   appointment.status = status;
//   await appointment.save();

//   res.status(200).json({ success: true, data: appointment });
// });

// // @desc    Get quick dashboard metrics
// // @route   GET /api/appointments/metrics
// // @access  Private/Admin
// export const getMetrics = asyncHandler(async (req, res) => {
//   const startOfToday = new Date();
//   startOfToday.setHours(0, 0, 0, 0);
//   const endOfToday = new Date();
//   endOfToday.setHours(23, 59, 59, 999);

//   const [todayCount, pendingCount, totalPatients, totalAppointments] = await Promise.all([
//     Appointment.countDocuments({ appointmentDate: { $gte: startOfToday, $lte: endOfToday } }),
//     Appointment.countDocuments({ status: 'Pending' }),
//     Appointment.distinct('email').then((emails) => emails.length),
//     Appointment.countDocuments(),
//   ]);

//   res.status(200).json({
//     success: true,
//     data: { todayCount, pendingCount, totalPatients, totalAppointments },
//   });
// });
