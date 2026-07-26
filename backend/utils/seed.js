import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Service from '../models/Service.js';
import Testimonial from '../models/Testimonial.js';

dotenv.config();

const services = [
  {
    title: 'Sports Injury Rehabilitation',
    description:
      'Targeted recovery programs for athletes dealing with sprains, strains, ligament tears, and overuse injuries, blending manual therapy with progressive strength work.',
    durationMinutes: 45,
    price: 90,
    category: 'Sports Rehab',
    icon: 'Dumbbell',
  },
  {
    title: 'Post-Surgical Recovery',
    description:
      'Structured rehabilitation following orthopedic surgery to safely restore range of motion, strength, and function while protecting healing tissue.',
    durationMinutes: 60,
    price: 110,
    category: 'Post-Op Recovery',
    icon: 'HeartPulse',
  },
  {
    title: 'Chronic Pain Management',
    description:
      'A whole-person approach to long-standing back, neck, and joint pain, combining hands-on therapy, movement retraining, and education.',
    durationMinutes: 45,
    price: 85,
    category: 'Chronic Pain',
    icon: 'Activity',
  },
  {
    title: 'Neurological Rehabilitation',
    description:
      'Specialized therapy for patients recovering from stroke, spinal cord injury, or other neurological conditions affecting movement and balance.',
    durationMinutes: 60,
    price: 120,
    category: 'Neurological',
    icon: 'Brain',
  },
  {
    title: 'Manual & Joint Mobilization Therapy',
    description:
      'Hands-on techniques including soft tissue release and joint mobilization to reduce stiffness and improve pain-free movement.',
    durationMinutes: 30,
    price: 70,
    category: 'Manual Therapy',
    icon: 'Hand',
  },
  {
    title: 'Geriatric Mobility Program',
    description:
      'Gentle, fall-prevention focused therapy designed to help older adults maintain independence, strength, and balance.',
    durationMinutes: 45,
    price: 80,
    category: 'Geriatric Care',
    icon: 'PersonStanding',
  },
];

const testimonials = [
  {
    patientName: 'Rohan Mehta',
    conditionTreated: 'ACL Reconstruction Recovery',
    reviewText:
      'Six months after my ACL surgery I was back on the football pitch. The team built a program that pushed me exactly as hard as I needed, never more.',
    rating: 5,
    isFeatured: true,
  },
  {
    patientName: 'Sunita Rao',
    conditionTreated: 'Chronic Lower Back Pain',
    reviewText:
      'I had lived with back pain for years before coming here. The combination of hands-on treatment and simple home exercises finally gave me lasting relief.',
    rating: 5,
    isFeatured: true,
  },
  {
    patientName: 'Arjun Nair',
    conditionTreated: 'Frozen Shoulder',
    reviewText:
      'Patient, clear communication at every visit, and real progress I could feel week over week. Highly recommend this clinic.',
    rating: 4,
    isFeatured: true,
  },
];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[Seed] Connected to MongoDB');

    const adminEmail = process.env.SEED_ADMIN_EMAIL;
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await User.create({
        name: process.env.SEED_ADMIN_NAME || 'Clinic Admin',
        email: adminEmail,
        password: process.env.SEED_ADMIN_PASSWORD,
        role: 'admin',
      });
      console.log(`[Seed] Admin user created: ${adminEmail}`);
    } else {
      console.log('[Seed] Admin user already exists, skipping');
    }

    await Service.deleteMany({});
    await Service.insertMany(services);
    console.log(`[Seed] Inserted ${services.length} services`);

    await Testimonial.deleteMany({});
    await Testimonial.insertMany(testimonials);
    console.log(`[Seed] Inserted ${testimonials.length} testimonials`);

    console.log('[Seed] Done!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error:', error.message);
    process.exit(1);
  }
};

run();
