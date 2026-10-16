"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { business, telHref, whatsappHref } from "@/content/business";
import { categories, services } from "@/content/services";
import { packages } from "@/content/site";
import { useBooking } from "../BookingContext";
import Button from "../ui/Button";
import Eyebrow from "../ui/Eyebrow";
import SplitHeading from "../ui/SplitHeading";

const vehicleTypes = ["Hatchback", "Saloon / Sedan", "Estate / Wagon", "SUV / Crossover", "Coupe / Sports", "MPV / Van", "Pickup", "Other"];
const timeSlots = ["Morning", "Midday", "Afternoon", "Late afternoon", "Flexible"];

type Fields = {
  name: string;
  phone: string;
  vehicle: string;
  vehicleType: string;
  service: string;
  date: string;
  time: string;
  notes: string;
};
type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = { name: "", phone: "", vehicle: "", vehicleType: "", service: "", date: "", time: "", notes: "" };

const todayISO = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  const digits = f.phone.replace(/\D/g, "");
  if (!f.phone.trim()) e.phone = "Please enter a phone number so we can confirm your booking.";
  else if (digits.length < 7 || digits.length > 15 || /[^\d\s+()-]/.test(f.phone)) e.phone = "Please enter a valid phone number.";
  if (f.vehicle.trim().length < 2) e.vehicle = "Please tell us the make and model.";
  if (!f.vehicleType) e.vehicleType = "Please choose a vehicle type.";
  if (!f.service) e.service = "Please choose a service or package.";
  if (!f.date) e.date = "Please choose a preferred date.";
  else if (f.date < todayISO()) e.date = "Please choose a date from today onwards.";
  if (!f.time) e.time = "Please choose a preferred time.";
  if (f.notes.length > 1000) e.notes = "Please keep additional requirements under 1000 characters.";
  return e;
}

const composeMessage = (f: Fields) =>
  [
    `Booking enquiry — ${business.name}`,
    `Name: ${f.name}`,
    `Phone: ${f.phone}`,
    `Vehicle: ${f.vehicle} (${f.vehicleType})`,
    `Service: ${f.service}`,
    `Preferred: ${f.date}, ${f.time}`,
    f.notes && `Notes: ${f.notes}`,
  ]
    .filter(Boolean)
    .join("\n");

export default function Booking() {
  const { service, notes, setService } = useBooking();
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sent" | "demo">("idle");
  const [minDate, setMinDate] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => setMinDate(todayISO()), []);

  // Prefill from other sections (packages, services, coating, PPF) and from ?service= on service pages.
  useEffect(() => {
    if (service) setF((p) => ({ ...p, service }));
  }, [service]);
  useEffect(() => {
    if (notes) setF((p) => ({ ...p, notes: p.notes.includes(notes) ? p.notes : [p.notes, notes].filter(Boolean).join("\n") }));
  }, [notes]);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("service");
    const match = services.find((s) => s.slug === q);
    if (match) setService(match.title);
  }, [setService]);

  const serviceOptions = useMemo(
    () => [
      { label: "Packages", items: packages.map((p) => p.name) },
      ...categories.map((c) => ({ label: c.title, items: services.filter((s) => s.category === c.id).map((s) => s.title) })),
      { label: "Other", items: ["Custom selection", "Not sure — please advise"] },
    ],
    []
  );

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setF((p) => ({ ...p, [k]: value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: validate({ ...f, [k]: value })[k] }));
  };

  const onBlur = (k: keyof Fields) => () => {
    const msg = validate(f)[k];
    setErrors((er) => ({ ...er, [k]: msg }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const message = composeMessage(f);
    if (business.whatsapp) {
      window.open(whatsappHref(business.whatsapp, message), "_blank", "noopener,noreferrer");
      setStatus("sent");
    } else if (business.email) {
      window.location.href = `mailto:${business.email}?subject=${encodeURIComponent("Booking enquiry")}&body=${encodeURIComponent(message)}`;
      setStatus("sent");
    } else {
      setStatus("demo");
    }
  };

  const field = (k: keyof Fields) => ({
    id: `bk-${k}`,
    name: k,
    value: f[k],
    onChange: set(k),
    onBlur: onBlur(k),
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `bk-${k}-err` : undefined,
  });

  const inputCls = (k: keyof Fields) =>
    `mt-2 block min-h-[3.25rem] w-full rounded-xl border bg-white px-4 py-3 text-base font-medium text-obsidian placeholder:text-graphite/50 transition-colors focus:border-accent-strong focus:outline-none focus:ring-2 focus:ring-accent/30 ${
      errors[k] ? "border-red-600" : "border-obsidian/15"
    }`;

  const label = (k: keyof Fields, children: string, optional?: boolean) => (
    <label htmlFor={`bk-${k}`} className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-graphite">
      {children} {optional && <span className="font-medium normal-case tracking-normal text-graphite/70">(optional)</span>}
    </label>
  );
  const err = (k: keyof Fields) =>
    errors[k] ? (
      <p id={`bk-${k}-err`} className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-red-700">
        <AlertCircle aria-hidden className="size-4" /> {errors[k]}
      </p>
    ) : null;

  return (
    <section id="book" aria-labelledby="book-title" className="section-pad bg-mist text-obsidian">
      <div className="site-x mx-auto max-w-site">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Eyebrow className="text-graphite">Book your detailing session</Eyebrow>
            <SplitHeading id="book-title" lines={["Your next", "level of clean", "starts here."]} className="display-lg mt-6" />
            <p data-reveal className="lede mt-8 max-w-md text-graphite">
              Send a booking request and we&apos;ll confirm availability, the right service for your vehicle and the
              price before anything is scheduled.
            </p>
            <div data-reveal className="mt-10 grid gap-3 sm:flex sm:flex-wrap">
              {business.whatsapp && (
                <Button href={whatsappHref(business.whatsapp, `Hi ${business.name}, I'd like to book a detail.`)} external variant="dark">
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle aria-hidden className="size-4" /> Book on WhatsApp
                  </span>
                </Button>
              )}
              {business.phone && (
                <Button href={telHref(business.phone)} variant="outline-dark" icon={false}>
                  <span className="inline-flex items-center gap-2">
                    <Phone aria-hidden className="size-4" /> {business.phone}
                  </span>
                </Button>
              )}
            </div>
          </div>

          <div className="lg:col-span-7">
            {status === "idle" ? (
              <form ref={formRef} noValidate onSubmit={onSubmit} className="rounded-3xl border border-obsidian/10 bg-white/60 p-5 sm:p-10">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    {label("name", "Your name")}
                    <input {...field("name")} type="text" autoComplete="name" className={inputCls("name")} />
                    {err("name")}
                  </div>
                  <div>
                    {label("phone", "Phone number")}
                    <input {...field("phone")} type="tel" inputMode="tel" autoComplete="tel" className={inputCls("phone")} />
                    {err("phone")}
                  </div>
                  <div>
                    {label("vehicle", "Vehicle make & model")}
                    <input {...field("vehicle")} type="text" placeholder="e.g. BMW 3 Series" className={inputCls("vehicle")} />
                    {err("vehicle")}
                  </div>
                  <div>
                    {label("vehicleType", "Vehicle type")}
                    <select {...field("vehicleType")} className={inputCls("vehicleType")}>
                      <option value="">Select type</option>
                      {vehicleTypes.map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                    {err("vehicleType")}
                  </div>
                  <div className="sm:col-span-2">
                    {label("service", "Service or package")}
                    <select {...field("service")} className={inputCls("service")}>
                      <option value="">Select a service</option>
                      {serviceOptions.map((g) => (
                        <optgroup key={g.label} label={g.label}>
                          {g.items.map((i) => (
                            <option key={i}>{i}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                    {err("service")}
                  </div>
                  <div>
                    {label("date", "Preferred date")}
                    <input {...field("date")} type="date" min={minDate} className={inputCls("date")} />
                    {err("date")}
                  </div>
                  <div>
                    {label("time", "Preferred time")}
                    <select {...field("time")} className={inputCls("time")}>
                      <option value="">Select a time</option>
                      {timeSlots.map((t) => (
                        <option key={t}>{t}</option>
                      ))}
                    </select>
                    {err("time")}
                  </div>
                  <div className="sm:col-span-2">
                    {label("notes", "Additional requirements", true)}
                    <textarea
                      {...field("notes")}
                      rows={4}
                      placeholder="Condition, specific concerns, collection needs…"
                      className={`${inputCls("notes")} resize-y`}
                    />
                    {err("notes")}
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-xs leading-relaxed text-graphite">
                    This is a booking request. Your appointment is confirmed only once our team replies.
                  </p>
                  <Button type="submit" variant="primary" magnetic>
                    Request a booking
                  </Button>
                </div>
                {Object.values(errors).some(Boolean) && (
                  <p role="alert" className="sr-only">
                    Please correct the highlighted fields.
                  </p>
                )}
              </form>
            ) : (
              <div role="status" className="rounded-3xl bg-obsidian p-8 text-white sm:p-12">
                <CheckCircle2 aria-hidden className="size-10 text-accent" />
                <h3 className="display-md mt-6">{status === "sent" ? "Request ready to send." : "Request validated."}</h3>
                <p className="mt-5 max-w-lg text-silver">
                  {status === "sent"
                    ? "We've opened your messaging app with your booking details. Once it's sent, our team will reply to confirm availability and price — your booking is not confirmed until then."
                    : "Demo mode: your details passed validation, but no booking channel is connected yet, so nothing has been sent. Add a WhatsApp number or email in src/content/business.ts to enable delivery."}
                </p>
                <div className="mt-8">
                  <Button
                    variant="outline"
                    icon={false}
                    onClick={() => {
                      setStatus("idle");
                      setF(empty);
                    }}
                  >
                    Start a new request
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
