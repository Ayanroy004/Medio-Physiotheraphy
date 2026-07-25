import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Do I need a doctor referral to book a physiotherapy appointment?',
    a: 'No referral is required for most patients — you can book directly with us. If your insurance plan requires a referral for reimbursement, we recommend checking with your provider beforehand.',
  },
  {
    q: 'Does my insurance cover physiotherapy sessions?',
    a: 'Many insurance plans cover physiotherapy, either partially or in full. We recommend contacting your insurer to confirm your specific coverage and any pre-authorization requirements. Our front desk can also provide a receipt formatted for reimbursement claims.',
  },
  {
    q: 'What should I wear to my appointment?',
    a: 'Loose, comfortable clothing that allows easy access to the area being treated works best — for example, shorts for a knee or hip issue, or a tank top for a shoulder issue. Avoid restrictive jeans or tight dresses.',
  },
  {
    q: 'How many sessions will I need?',
    a: "This varies by condition and severity. After your first assessment, your therapist will give you an estimated treatment timeline and revisit it as your progress is measured session to session.",
  },
  {
    q: 'What happens during the first visit?',
    a: 'Your first visit includes a full assessment: a review of your medical history, a physical examination of movement and strength, and a discussion of your goals. We\'ll agree on a treatment plan together before starting any hands-on therapy.',
  },
  {
    q: 'Can I cancel or reschedule my appointment?',
    a: 'Yes. We ask for at least 24 hours notice so we can offer the slot to another patient. You can reschedule by calling the clinic or replying to your confirmation email.',
  },
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-clinic-border py-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <span className="font-display font-medium text-clinic-navy">{faq.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-clinic-teal transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-clinic-ink/70">{faq.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div>
      {FAQS.map((faq, i) => (
        <FaqItem
          key={faq.q}
          faq={faq}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  );
}
