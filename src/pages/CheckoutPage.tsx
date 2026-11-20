import React, { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Check,
  Copy,
  Info,
  MapPin,
  Store,
  Truck,
} from 'lucide-react';
import { BUSINESS_INFO, formatZAR } from '../data/noniseData';
import { CartItem, ConfirmedOrder } from '../types';
import { RevealSection } from '../components/RevealSection';

interface CheckoutPageProps {
  items: CartItem[];
  subtotal: number;
  onBackToShop: () => void;
  onOrderConfirmed: (order: ConfirmedOrder) => void;
}

function getUpcomingTradingDates(count = 6) {
  const dates: { iso: string; dayLabel: string; dateLabel: string; isSat: boolean }[] = [];
  const cursor = new Date();
  while (dates.length < count) {
    const dow = cursor.getDay(); // 0 = Sunday
    if (dow !== 0) {
      const iso = cursor.toISOString().split('T')[0];
      const dayLabel = cursor.toLocaleDateString('en-ZA', { weekday: 'short' });
      const dateLabel = cursor.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
      dates.push({ iso, dayLabel, dateLabel, isSat: dow === 6 });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return dates;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  subtotal,
  onBackToShop,
  onOrderConfirmed,
}) => {
  const upcomingDates = useMemo(() => getUpcomingTradingDates(6), []);
  const prefilledDate = items.find((i) => i.deliveryDate)?.deliveryDate ?? upcomingDates[0].iso;
  const prefilledCard = items.find((i) => i.giftMessage)?.giftMessage ?? '';

  const [fulfillment, setFulfillment] = useState<'delivery' | 'collection'>('delivery');
  const [deliveryDate, setDeliveryDate] = useState(prefilledDate);
  const [timeWindow, setTimeWindow] = useState('Morning (8:30 AM – 12:30 PM)');

  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderEmail, setSenderEmail] = useState('');

  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [suburb, setSuburb] = useState('Pietermaritzburg Central');

  const [cardMessage, setCardMessage] = useState(prefilledCard);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const selectedDateIsSaturday = useMemo(() => {
    if (!deliveryDate) return false;
    return new Date(`${deliveryDate}T12:00:00`).getDay() === 6;
  }, [deliveryDate]);

  const timeSlots = selectedDateIsSaturday
    ? ['Saturday Studio Window (8:30 AM – 12:30 PM)']
    : ['Morning (8:30 AM – 12:30 PM)', 'Afternoon (12:30 PM – 4:00 PM)'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const order: ConfirmedOrder = {
      reference: `NF-${BUSINESS_INFO.copyrightYear}-${randomDigits}`,
      createdAt: new Date().toLocaleString('en-ZA'),
      fulfillment,
      deliveryDate,
      timeWindow: selectedDateIsSaturday ? timeSlots[0] : timeWindow,
      senderName: senderName.trim(),
      senderPhone: senderPhone.trim(),
      senderEmail: senderEmail.trim(),
      recipientName: fulfillment === 'delivery' ? recipientName.trim() : undefined,
      recipientPhone: fulfillment === 'delivery' ? recipientPhone.trim() : undefined,
      deliveryAddress: fulfillment === 'delivery' ? deliveryAddress.trim() : undefined,
      suburb: fulfillment === 'delivery' ? suburb.trim() : undefined,
      cardMessage: cardMessage.trim() || undefined,
      specialInstructions: specialInstructions.trim() || undefined,
      items: [...items],
      subtotalZAR: subtotal,
    };

    setConfirmedOrder(order);
    onOrderConfirmed(order);
  };

  if (confirmedOrder) {
    const itemsSummary = confirmedOrder.items
      .map((i) => `${i.quantity}x ${i.product.name} (${formatZAR(i.product.priceZAR * i.quantity)})`)
      .join(', ');
    const summaryText = [
      `Nonise Florist Order Request #${confirmedOrder.reference}`,
      `Items: ${itemsSummary}`,
      `Subtotal: ${formatZAR(confirmedOrder.subtotalZAR)}`,
      `Fulfilment: ${
        confirmedOrder.fulfillment === 'delivery'
          ? `Local Delivery to ${confirmedOrder.deliveryAddress}, ${confirmedOrder.suburb} (Recipient: ${confirmedOrder.recipientName}, ${confirmedOrder.recipientPhone})`
          : `Studio Collection at ${BUSINESS_INFO.addressLine1}`
      }`,
      `Date & Window: ${confirmedOrder.deliveryDate} (${confirmedOrder.timeWindow})`,
      `Customer: ${confirmedOrder.senderName} | ${confirmedOrder.senderPhone} | ${confirmedOrder.senderEmail}`,
      confirmedOrder.cardMessage ? `Gift Card: "${confirmedOrder.cardMessage}"` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const handleCopy = () => {
      navigator.clipboard?.writeText(summaryText).then(() => {
        setCopiedRef(true);
        window.setTimeout(() => setCopiedRef(false), 2000);
      });
    };

    return (
      <div className="bg-[#FDFBF7] py-14 md:py-20">
        <RevealSection immediate className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="bg-white border border-[#EFE8DC] rounded-sm p-7 sm:p-10 space-y-6 shadow-[0_12px_32px_-4px_rgba(47,27,46,0.06)]">
            <div className="flex items-start justify-between gap-4 pb-6 border-b border-[#EFE8DC]">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-[#3E5B42]">
                  <Check className="w-5 h-5" aria-hidden="true" />
                  <span className="eyebrow">Order Request Recorded</span>
                </div>
                <h1 className="font-editorial text-[30px] sm:text-[36px] text-[#2F1B2E]">
                  Order #{confirmedOrder.reference}
                </h1>
                <p className="text-[14px] text-[#584144]">
                  Prepared on {confirmedOrder.createdAt} for {confirmedOrder.senderName}.
                </p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="btn-editorial inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm border border-[#EFE8DC] text-[12px] font-semibold text-[#2F1B2E] hover:bg-[#F7EFE3] shrink-0 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{copiedRef ? 'Copied' : 'Copy Summary'}</span>
              </button>
            </div>

            <div className="p-4 bg-[#F7EFE3] border border-[#C5A059]/40 rounded-sm text-[13px] text-[#3D3A39] leading-relaxed">
              <strong className="text-[#2F1B2E]">Next Step — Complete Payment With Studio:</strong>{' '}
              Online card payment gateway credentials are not yet connected on this preview. Send
              your confirmed order reference directly to Nonise Florist via WhatsApp or Email below
              to receive EFT / payment confirmation and confirm local delivery fee.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[14px]">
              <div className="space-y-1">
                <p className="eyebrow text-[#3E5B42]">Fulfilment Details</p>
                <p className="font-semibold text-[#2F1B2E]">
                  {confirmedOrder.fulfillment === 'delivery'
                    ? 'Pietermaritzburg Local Delivery'
                    : 'Studio Collection'}
                </p>
                <p className="text-[#584144]">
                  {confirmedOrder.deliveryDate} &middot; {confirmedOrder.timeWindow}
                </p>
                {confirmedOrder.fulfillment === 'delivery' ? (
                  <p className="text-[#584144]">
                    {confirmedOrder.recipientName} ({confirmedOrder.recipientPhone})
                    <br />
                    {confirmedOrder.deliveryAddress}, {confirmedOrder.suburb}
                  </p>
                ) : (
                  <p className="text-[#584144]">{BUSINESS_INFO.fullAddress}</p>
                )}
              </div>

              <div className="space-y-1">
                <p className="eyebrow text-[#3E5B42]">Customer Contact</p>
                <p className="font-semibold text-[#2F1B2E]">{confirmedOrder.senderName}</p>
                <p className="text-[#584144]">{confirmedOrder.senderPhone}</p>
                <p className="text-[#584144]">{confirmedOrder.senderEmail}</p>
                {confirmedOrder.cardMessage && (
                  <p className="text-[#584144] italic pt-1">
                    Card: &ldquo;{confirmedOrder.cardMessage}&rdquo;
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-[#EFE8DC] pt-5 space-y-3">
              <p className="eyebrow text-[#3E5B42]">Items Ordered</p>
              <ul className="divide-y divide-[#EFE8DC] text-[14px]">
                {confirmedOrder.items.map((item) => (
                  <li key={item.cartKey} className="py-2.5 flex items-center justify-between gap-4">
                    <span className="text-[#2F1B2E]">
                      {item.quantity} &times; {item.product.name}
                    </span>
                    <span className="font-semibold text-[#1B1C1A] tabular-price">
                      {formatZAR(item.product.priceZAR * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-[#EFE8DC] flex items-center justify-between text-[16px] font-semibold text-[#2F1B2E]">
                <span>Order Subtotal</span>
                <span className="tabular-price">{formatZAR(confirmedOrder.subtotalZAR)}</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href={`${BUSINESS_INFO.whatsappHref}?text=${encodeURIComponent(summaryText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial inline-flex items-center justify-center px-6 py-3.5 rounded-sm bg-[#3E5B42] text-white text-[13px] font-semibold tracking-[0.04em] hover:bg-[#314D35]"
              >
                Confirm via WhatsApp
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.emailPrimary}?subject=${encodeURIComponent(
                  `Order Request #${confirmedOrder.reference}`
                )}&body=${encodeURIComponent(summaryText)}`}
                className="btn-editorial inline-flex items-center justify-center px-6 py-3.5 rounded-sm bg-[#D84A6A] text-white text-[13px] font-semibold tracking-[0.04em] hover:bg-[#C43D5C]"
              >
                Email Order to Studio
              </a>
              <button
                type="button"
                onClick={onBackToShop}
                className="btn-editorial px-5 py-3.5 rounded-sm border border-[#EFE8DC] text-[#2F1B2E] text-[13px] font-semibold hover:bg-[#F7EFE3] cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </RevealSection>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#FDFBF7] py-20">
        <RevealSection immediate className="max-w-lg mx-auto px-5 text-center space-y-4">
          <h1 className="font-editorial text-[32px] text-[#2F1B2E]">Your bag is empty</h1>
          <p className="text-[15px] text-[#584144]">
            Add a floral arrangement to your bag before proceeding to checkout.
          </p>
          <button
            type="button"
            onClick={onBackToShop}
            className="btn-editorial mt-2 px-6 py-3 rounded-sm bg-[#D84A6A] text-white text-[14px] font-semibold hover:bg-[#C43D5C] cursor-pointer"
          >
            Return to Shop
          </button>
        </RevealSection>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] pb-20">
      <div className="border-b border-[#EFE8DC] bg-white">
        <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToShop}
            className="group inline-flex items-center gap-2 text-[13px] font-medium text-[#584144] hover:text-[#2F1B2E] transition-colors cursor-pointer"
          >
            <ArrowLeft
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            <span>Continue Shopping</span>
          </button>
          <span className="eyebrow text-[#3E5B42]">Nonise Florist Checkout</span>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-5 md:px-8 lg:px-12 pt-10 md:pt-14">
        <RevealSection immediate>
          <h1 className="font-editorial text-[34px] sm:text-[40px] font-semibold text-[#2F1B2E] mb-8">
            Delivery &amp; Order Details
          </h1>
        </RevealSection>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Fulfillment Method */}
            <section className="bg-white border border-[#EFE8DC] rounded-sm p-6 sm:p-8 space-y-5">
              <div>
                <p className="eyebrow text-[#3E5B42]">01. Fulfilment</p>
                <h2 className="font-editorial text-[24px] text-[#2F1B2E] mt-1">
                  Delivery or Studio Collection
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFulfillment('delivery')}
                  className={`btn-editorial p-4 rounded-sm border text-left cursor-pointer ${
                    fulfillment === 'delivery'
                      ? 'border-[#3E5B42] bg-[#F7EFE3]/70'
                      : 'border-[#EFE8DC] bg-white hover:border-[#C5A059]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-[#2F1B2E] font-semibold text-[14px]">
                    <Truck className="w-4 h-4 text-[#3E5B42]" aria-hidden="true" />
                    <span>Pietermaritzburg Delivery</span>
                  </div>
                  <p className="text-[12px] text-[#584144] mt-1.5">
                    Hand-delivered across Pietermaritzburg &amp; surrounding suburbs.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillment('collection')}
                  className={`btn-editorial p-4 rounded-sm border text-left cursor-pointer ${
                    fulfillment === 'collection'
                      ? 'border-[#3E5B42] bg-[#F7EFE3]/70'
                      : 'border-[#EFE8DC] bg-white hover:border-[#C5A059]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-[#2F1B2E] font-semibold text-[14px]">
                    <Store className="w-4 h-4 text-[#3E5B42]" aria-hidden="true" />
                    <span>Collect From Boutique</span>
                  </div>
                  <p className="text-[12px] text-[#584144] mt-1.5">
                    Complimentary pickup at {BUSINESS_INFO.addressLine1}.
                  </p>
                </button>
              </div>

              {/* Date Picker Cards */}
              <div className="space-y-3 pt-2">
                <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E]">
                  Select {fulfillment === 'delivery' ? 'Delivery' : 'Collection'} Date *
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {upcomingDates.map((d) => {
                    const selected = deliveryDate === d.iso;
                    return (
                      <button
                        key={d.iso}
                        type="button"
                        onClick={() => setDeliveryDate(d.iso)}
                        className={`btn-editorial py-2.5 px-2 rounded-sm border text-center cursor-pointer ${
                          selected
                            ? 'bg-[#2F1B2E] border-[#2F1B2E] text-white'
                            : 'bg-[#FDFBF7] border-[#EFE8DC] text-[#2F1B2E] hover:border-[#C5A059]'
                        }`}
                      >
                        <span className="block text-[11px] uppercase tracking-[0.08em] opacity-80">
                          {d.dayLabel}
                        </span>
                        <span className="block text-[13px] font-semibold mt-0.5 tabular-price">
                          {d.dateLabel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label
                      htmlFor="checkout-custom-date"
                      className="block text-[12px] font-semibold text-[#584144] mb-1"
                    >
                      Or choose another date
                    </label>
                    <div className="relative">
                      <Calendar
                        className="w-4 h-4 text-[#8B7073] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                        aria-hidden="true"
                      />
                      <input
                        id="checkout-custom-date"
                        type="date"
                        required
                        min={upcomingDates[0].iso}
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="input-editorial w-full pl-9 pr-3 py-2.5 min-h-[42px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm text-[#1B1C1A] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="checkout-time-window"
                      className="block text-[12px] font-semibold text-[#584144] mb-1"
                    >
                      Preferred Time Window
                    </label>
                    <select
                      id="checkout-time-window"
                      value={selectedDateIsSaturday ? timeSlots[0] : timeWindow}
                      onChange={(e) => setTimeWindow(e.target.value)}
                      className="input-editorial w-full px-3 py-2.5 min-h-[42px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm text-[#1B1C1A] focus:outline-none"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 2: Recipient Details (if Delivery) */}
            {fulfillment === 'delivery' ? (
              <section
                key="delivery-step"
                className="toast-enter bg-white border border-[#EFE8DC] rounded-sm p-6 sm:p-8 space-y-4"
              >
                <div>
                  <p className="eyebrow text-[#3E5B42]">02. Recipient &amp; Address</p>
                  <h2 className="font-editorial text-[24px] text-[#2F1B2E] mt-1">
                    Where Should We Deliver?
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="recipient-name"
                      className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                    >
                      Recipient Full Name *
                    </label>
                    <input
                      id="recipient-name"
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="Who is receiving the flowers?"
                      className="input-editorial w-full px-3.5 py-2.5 min-h-[44px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="recipient-phone"
                      className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                    >
                      Recipient Mobile Number *
                    </label>
                    <input
                      id="recipient-phone"
                      type="tel"
                      required
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      placeholder="For smooth delivery handover"
                      className="input-editorial w-full px-3.5 py-2.5 min-h-[44px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="delivery-address"
                      className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                    >
                      Street Address &amp; Complex / Office *
                    </label>
                    <input
                      id="delivery-address"
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Street number, road, building or unit"
                      className="input-editorial w-full px-3.5 py-2.5 min-h-[44px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="delivery-suburb"
                      className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                    >
                      Suburb / Area *
                    </label>
                    <input
                      id="delivery-suburb"
                      type="text"
                      required
                      value={suburb}
                      onChange={(e) => setSuburb(e.target.value)}
                      className="input-editorial w-full px-3.5 py-2.5 min-h-[44px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm focus:outline-none"
                    />
                  </div>
                </div>
              </section>
            ) : (
              <section
                key="collection-step"
                className="toast-enter bg-[#F7EFE3]/70 border border-[#EFE8DC] rounded-sm p-6 flex items-start gap-3"
              >
                <MapPin className="w-5 h-5 text-[#3E5B42] shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-[14px] text-[#3D3A39]">
                  <p className="font-semibold text-[#2F1B2E]">Studio Collection Address</p>
                  <p className="mt-0.5">{BUSINESS_INFO.fullAddress}</p>
                  <p className="text-[12px] text-[#584144] mt-1">
                    Mon–Fri 8:00 AM – 4:30 PM &middot; Sat 8:00 AM – 1:00 PM
                  </p>
                </div>
              </section>
            )}

            {/* Step 3: Your Details & Gift Note */}
            <section className="bg-white border border-[#EFE8DC] rounded-sm p-6 sm:p-8 space-y-4">
              <div>
                <p className="eyebrow text-[#3E5B42]">03. Your Contact Details &amp; Card</p>
                <h2 className="font-editorial text-[24px] text-[#2F1B2E] mt-1">
                  Sender Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="sender-name"
                    className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                  >
                    Your Name *
                  </label>
                  <input
                    id="sender-name"
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Full name"
                    className="input-editorial w-full px-3.5 py-2.5 min-h-[44px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sender-phone"
                    className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                  >
                    Phone / WhatsApp *
                  </label>
                  <input
                    id="sender-phone"
                    type="tel"
                    required
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="082 000 0000"
                    className="input-editorial w-full px-3.5 py-2.5 min-h-[44px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="sender-email"
                    className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="sender-email"
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-editorial w-full px-3.5 py-2.5 min-h-[44px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="checkout-card-message"
                  className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                >
                  Complimentary Handwritten Gift Card Message
                </label>
                <textarea
                  id="checkout-card-message"
                  rows={3}
                  maxLength={240}
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                  placeholder="Write your heartfelt message here..."
                  className="input-editorial w-full px-3.5 py-2.5 text-[14px] bg-white border border-[#EFE8DC] rounded-sm focus:outline-none resize-none"
                />
              </div>

              <div>
                <label
                  htmlFor="checkout-instructions"
                  className="block text-[12px] font-semibold uppercase tracking-[0.06em] text-[#2F1B2E] mb-1.5"
                >
                  Delivery or Colour Notes (Optional)
                </label>
                <input
                  id="checkout-instructions"
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="Gate code, reception desk instructions, or ribbon preference"
                  className="input-editorial w-full px-3.5 py-2.5 min-h-[44px] text-[14px] bg-white border border-[#EFE8DC] rounded-sm focus:outline-none"
                />
              </div>
            </section>
          </div>

          {/* Right Order Summary & Payment Integration Point */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 bg-white border border-[#EFE8DC] rounded-sm p-6 sm:p-8 space-y-6">
            <div>
              <p className="eyebrow text-[#3E5B42]">Order Summary</p>
              <h2 className="font-editorial text-[24px] text-[#2F1B2E] mt-1">
                Your Floral Selection
              </h2>
            </div>

            <ul className="divide-y divide-[#EFE8DC]">
              {items.map((item) => (
                <li key={item.cartKey} className="py-3.5 first:pt-0 flex items-center gap-3.5">
                  <div className="w-14 h-16 rounded-sm overflow-hidden border border-[#EFE8DC] bg-[#F5F3EF] shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-editorial text-[16px] text-[#2F1B2E] truncate">
                      {item.product.name}
                    </p>
                    <p className="text-[12px] text-[#584144]">Qty {item.quantity}</p>
                  </div>
                  <span className="text-[14px] font-semibold text-[#1B1C1A] tabular-price shrink-0">
                    {formatZAR(item.product.priceZAR * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-[#EFE8DC] pt-4 space-y-2 text-[14px]">
              <div className="flex justify-between text-[#584144]">
                <span>Arrangements Subtotal</span>
                <span className="font-medium text-[#1B1C1A] tabular-price">
                  {formatZAR(subtotal)}
                </span>
              </div>
              <div className="flex justify-between text-[#584144]">
                <span>
                  {fulfillment === 'collection' ? 'Studio Collection' : 'Local Delivery Fee'}
                </span>
                <span className="font-medium text-[#3E5B42]">
                  {fulfillment === 'collection'
                    ? 'Complimentary'
                    : 'Confirmed by suburb'}
                </span>
              </div>
              <div className="pt-3 border-t border-[#EFE8DC] flex justify-between text-[17px] font-semibold text-[#2F1B2E]">
                <span>Estimated Total</span>
                <span className="tabular-price">{formatZAR(subtotal)}</span>
              </div>
            </div>

            {/* Honest Payment Integration Notice */}
            <div className="p-4 bg-[#FDFBF7] border border-[#EFE8DC] rounded-sm flex items-start gap-2.5 text-[12px] leading-relaxed text-[#584144]">
              <Info className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" aria-hidden="true" />
              <p>
                <strong className="text-[#2F1B2E]">Payment Integration Point:</strong> Live online
                payment processing (WooCommerce / PayFast / Yoco) is ready to connect when merchant
                credentials are supplied. Submitting below generates your confirmed Order Reference
                for direct studio payment via EFT or WhatsApp.
              </p>
            </div>

            <button
              type="submit"
              className="btn-editorial w-full py-3.5 px-6 rounded-sm bg-[#D84A6A] text-white text-[14px] font-semibold tracking-[0.04em] hover:bg-[#C43D5C] cursor-pointer"
            >
              Confirm Order Request &middot; {formatZAR(subtotal)}
            </button>
          </aside>
        </form>
      </div>
    </div>
  );
};
