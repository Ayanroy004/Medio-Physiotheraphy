import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import StepIndicator from '../components/booking/StepIndicator.jsx';
import ServiceStep from '../components/booking/ServiceStep.jsx';
import DateTimeStep from '../components/booking/DateTimeStep.jsx';
import DetailsStep from '../components/booking/DetailsStep.jsx';
import ConfirmationStep from '../components/booking/ConfirmationStep.jsx';
import { createAppointment } from '../services/appointmentApi.js';

export default function BookingPage() {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState(null);
  const [timeSlot, setTimeSlot] = useState(null);
  const [confirmedAppointment, setConfirmedAppointment] = useState(null);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createAppointment,
    onSuccess: (data) => {
      setConfirmedAppointment(data);
      setStep(4);
    },
    onError: (error) => {
      toast.error(error.message || 'Could not book your appointment. Please try again.');
    },
  });

  const handleDetailsSubmit = async (values) => {
    await mutateAsync({
      ...values,
      serviceId: selectedService._id,
      appointmentDate: date,
      timeSlot,
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {step < 4 && <StepIndicator currentStep={step} />}

      {step === 1 && (
        <ServiceStep
          selectedServiceId={selectedService?._id || location.state?.preselectedServiceId}
          onSelect={setSelectedService}
          onNext={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <DateTimeStep
          date={date}
          timeSlot={timeSlot}
          onChangeDate={setDate}
          onChangeTimeSlot={setTimeSlot}
          onBack={() => setStep(1)}
          onNext={() => setStep(3)}
        />
      )}

      {step === 3 && (
        <DetailsStep
          defaultValues={{ patientName: '', email: '', phone: '', medicalNotes: '' }}
          onBack={() => setStep(2)}
          onSubmit={handleDetailsSubmit}
          isSubmitting={isPending}
        />
      )}

      {step === 4 && <ConfirmationStep appointment={confirmedAppointment} />}
    </div>
  );
}
