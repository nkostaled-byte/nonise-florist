import React, { useState } from 'react';
import { AlertCircle, Check, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import { BUSINESS_INFO } from '../data/noniseData';
import { RevealSection } from '../components/RevealSection';
import { EditorialImage } from '../components/EditorialImage';

interface ContactPageProps {
  initialTopic?: string;
}

const INQUIRY_TOPICS = [
  'General Floristry Enquiry',
  'Wedding Flowers & Bridal Styling',
  'Custom Bouquet or Gift Hamper',
  'Funeral Coffin Sprays & Sympathy Tributes',
  'Corporate & Business Function Florals',
  'Baby Shower & Party Florals',
  'Share a Client Review',
];

export const ContactPage: React.FC<ContactPageProps> = ({ initialTopic }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState(
    initialTopic && INQUIRY_TOPICS.includes(initialTopic)
      ? initialTopic
      : initialTopic || INQUIRY_TOPICS[0]
  );
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState(
    initialTopic && !INQUIRY_TOPICS.includes(initialTopic)
      ? `Regarding: ${initialTopic}\n\n`
      : ''
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setFormError('Please enter your name so our florists know how to address you.');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFormError('Please provide a valid email address so we can reply to your enquiry.');
      return;
    }
    if (!message.trim()) {
      setFormError('Please share a brief note about your floral request or occasion.');
      return;
    }
    setFormError(null);
    setSubmitted(true);
  };

  const whatsappSummary = encodeURIComponent(
    `Hello Nonise Florist, my name is ${name}. Enquiry: ${topic}.${
      eventDate ? ` Date: ${eventDate}.` : ''
    } ${message}`
  );

  const mailtoHref = `mailto:${BUSINESS_INFO.emailPrimary}?subject=${encodeURIComponent(
    `Nonise Florist Website Enquiry: ${topic}`
  )}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nPreferred Date: ${
      eventDate || 'Not specified'
    }\n\nMessage:\n${message}`
  )}`;

  return (
    <div className="bg-[#FDFBF7] min-h-[75vh]">
      {/* Page Header */}
      <section className="bg-[#F7EFE3]/75 border-b border-[#EFE8DC]">
        <RevealSection immediate className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">
          <p className="eyebrow text-[#3E5B42]">Reach Our Boutique</p>
          <h1 className="font-editorial text-[34px] sm:text-[44px] font-semibold text-[#2F1B2E] leading-tight mt-2">
            Contact &amp; Bespoke Enquiries
          </h1>
          <p className="text-[15px] sm:text-[16px] text-[#584144] mt-3 max-w-2xl leading-relaxed">
            Visit our studio on Peter Kerchhoff Street in Pietermaritzburg, call us directly, or
            send an enquiry for custom bouquets, weddings, corporate events, and sympathy tributes.
          </p>
        </RevealSection>
      </section>

      {/* Main Content */}
      <section className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Verified Boutique Info */}
          <div className="lg:col-span-5 space-y-6">
            <RevealSection immediate delayMs={50}>
              <div className="bg-white border border-[#EFE8DC] rounded-sm p-6 sm:p-8 space-y-6">
                <div>
                  <p className="eyebrow text-[#3E5B42]">Visit Us</p>
                  <div className="mt-2.5 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#D84A6A] shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-[15px] text-[#2F1B2E] leading-relaxed">
                      {BUSINESS_INFO.addressLine1}
                      <br />
                      {BUSINESS_INFO.city}, {BUSINESS_INFO.postalCode}
                      <br />
                      {BUSINESS_INFO.country}
                    </p>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#EFE8DC]">
                  <p className="eyebrow text-[#3E5B42]">Call or WhatsApp</p>
                  <div className="mt-2.5 flex items-center gap-3">
                    <Phone className="w-5 h-5 text-[#D84A6A] shrink-0" aria-hidden="true" />
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="text-[16px] font-semibold text-[#2F1B2E] hover:text-[#D84A6A] transition-colors"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#EFE8DC]">
                  <p className="eyebrow text-[#3E5B42]">Email Studio</p>
                  <div className="mt-2.5 space-y-1.5">
                    <a
                      href={`mailto:${BUSINESS_INFO.emailPrimary}`}
                      className="flex items-center gap-3 text-[15px] text-[#2F1B2E] hover:text-[#D84A6A] transition-colors break-all"
                    >
                      <Mail className="w-4 h-4 text-[#D84A6A] shrink-0" aria-hidden="true" />
                      <span>{BUSINESS_INFO.emailPrimary}</span>
                    </a>
                    <a
                      href={`mailto:${BUSINESS_INFO.emailSecondary}`}
                      className="flex items-center gap-3 text-[14px] text-[#584144] hover:text-[#D84A6A] transition-colors break-all"
                    >
                      <Mail className="w-4 h-4 text-[#8B7073] shrink-0" aria-hidden="true" />
                      <span>{BUSINESS_INFO.emailSecondary}</span>
                    </a>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#EFE8DC]">
                  <p className="eyebrow text-[#3E5B42]">Trading Hours</p>
                  <div className="mt-2.5 flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#D84A6A] shrink-0 mt-0.5" aria-hidden="true" />
                    <dl className="space-y-1.5 text-[14px] w-full">
                      {BUSINESS_INFO.hours.map((row) => (
                        <div key={row.days} className="flex justify-between gap-3">
                          <dt className="text-[#584144]">{row.days}</dt>
                          <dd className="font-medium text-[#2F1B2E] text-right">{row.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>
            </RevealSection>

            <EditorialImage
              src="/assets/nonise/contact-floral.jpg"
              alt="Fresh pink and magenta rose hatbox arranged at Nonise Florist"
              hoverZoom={false}
              delayMs={120}
              wrapperClassName="aspect-[16/10] rounded-sm border border-[#EFE8DC] bg-[#F5F3EF]"
            />
          </div>

          {/* Right Inquiry Form */}
          <RevealSection
            immediate
            delayMs={100}
            className="lg:col-span-7 bg-white border border-[#EFE8DC] rounded-sm p-6 sm:p-8 lg:p-10"
          >
            {submitted ? (
              <div className="page-enter py-6 space-y-5">
                <div className="w-12 h-12 rounded-full bg-[#C7E8C8] text-[#3E5B42] flex items-center justify-center">
                  <Check className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="eyebrow text-[#3E5B42]">Enquiry Prepared</p>
                  <h2 className="font-editorial text-[30px] text-[#2F1B2E] mt-1">
                    Thank you, {name}
                  </h2>
                  <p className="text-[15px] text-[#584144] mt-2 leading-relaxed">
                    Your bespoke request has been formatted and is ready to send directly to Mrs.
                    Nokwanda Mthembu’s studio team. Because this storefront preview does not connect
                    to a live mail server yet, please use one of the direct studio links below so we
                    receive your message immediately.
                  </p>
                </div>

                <div className="p-4 bg-[#FDFBF7] border border-[#EFE8DC] rounded-sm text-[14px] space-y-1 text-[#3D3A39]">
                  <p>
                    <strong>Enquiry:</strong> {topic}
                  </p>
                  {eventDate && (
                    <p>
                      <strong>Preferred Date:</strong> {eventDate}
                    </p>
                  )}
                  <p>
                    <strong>Contact:</strong> {email}
                    {phone ? ` · ${phone}` : ''}
                  </p>
                  <p className="pt-1 text-[#584144] whitespace-pre-line">{message}</p>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={`${BUSINESS_INFO.whatsappHref}?text=${whatsappSummary}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-editorial inline-flex items-center justify-center px-6 py-3 rounded-sm bg-[#3E5B42] text-white text-[13px] font-semibold tracking-[0.04em] hover:bg-[#314D35]"
                  >
                    Send via WhatsApp
                  </a>
                  <a
                    href={mailtoHref}
                    className="btn-editorial inline-flex items-center justify-center px-6 py-3 rounded-sm bg-[#D84A6A] text-white text-[13px] font-semibold tracking-[0.04em] hover:bg-[#C43D5C]"
                  >
                    Open in Email App
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="btn-editorial px-5 py-3 rounded-sm border border-[#EFE8DC] text-[#584144] text-[13px] font-semibold hover:text-[#2F1B2E] hover:bg-[#F7EFE3] cursor-pointer"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <p className="eyebrow text-[#AB274A]">Direct Message</p>
                  <h2 className="font-editorial text-[28px] text-[#2F1B2E] mt-1">
                    Send a Request to Our Florists
                  </h2>
                </div>

                {formError && (
                  <div
                    role="alert"
                    className="toast-enter flex items-start gap-2.5 p-3.5 rounded-sm bg-[#FFF3F5] border border-[#D84A6A]/35 text-[13px] text-[#AB274A]"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      placeholder="Full name"
                      className="input-editorial w-full px-3.5 py-2.5 min-h-[44px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm text-[#1B1C1A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      placeholder="you@example.com"
                      className="input-editorial w-full px-3.5 py-2.5 min-h-[44px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm text-[#1B1C1A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                    >
                      Phone / WhatsApp
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 082 000 0000"
                      className="input-editorial w-full px-3.5 py-2.5 min-h-[44px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm text-[#1B1C1A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-date"
                      className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                    >
                      Occasion / Delivery Date
                    </label>
                    <input
                      id="contact-date"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="input-editorial w-full px-3.5 py-2.5 min-h-[44px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm text-[#1B1C1A] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                  >
                    How Can We Help?
                  </label>
                  <select
                    id="contact-topic"
                    value={INQUIRY_TOPICS.includes(topic) ? topic : INQUIRY_TOPICS[0]}
                    onChange={(e) => setTopic(e.target.value)}
                    className="input-editorial w-full px-3.5 py-2.5 min-h-[44px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm text-[#1B1C1A] focus:outline-none"
                  >
                    {INQUIRY_TOPICS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                  >
                    Tell Us About Your Floral Vision *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (formError) setFormError(null);
                    }}
                    placeholder="Share your preferred colours, flowers, occasion, approximate budget, or delivery suburb in Pietermaritzburg..."
                    className="input-editorial w-full px-3.5 py-3 text-[14px] bg-white border border-[#EFE8DC] rounded-sm text-[#1B1C1A] focus:outline-none resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-editorial inline-flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] rounded-sm bg-[#D84A6A] text-white text-[14px] font-semibold tracking-[0.04em] hover:bg-[#C43D5C] cursor-pointer"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Send Request</span>
                </button>
              </form>
            )}
          </RevealSection>
        </div>
      </section>
    </div>
  );
};
