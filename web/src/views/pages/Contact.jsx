import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'
import PageTransition from '../components/layout/PageTransition'
import CustomSelect from '../components/ui/CustomSelect'
import { useSiteSettings } from '../../controllers/hooks/useSiteSettings'
import { submitContactForm } from '../../controllers/services/contactService'
import { CATEGORIES } from '../../config/theme'
import { cn } from '../../utils/cn'

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine((val) => {
      const cleaned = val.replace(/[\s\-()]/g, '')
      return /^(?:(?:\+|00)91|0)?[6-9]\d{9}$/.test(cleaned)
    }, 'Please enter a valid 10-digit Indian phone number (e.g. +91 98765 43210)'),
  service: z.string().min(1, 'Please select a service'),
  date: z.string().optional(),
  message: z.string().min(10, 'Please write at least a few words'),
  honeypot: z.string().max(0), // Honeypot — must remain empty
})

export default function Contact() {
  const { data: settings } = useSiteSettings()
  const [submitState, setSubmitState] = useState(null) // null | 'loading' | 'success' | 'error'
  const [submitMessage, setSubmitMessage] = useState('')

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      message: '',
      honeypot: '',
    },
  })

  const dateValue = watch('date')

  const onSubmit = async (data) => {
    setSubmitState('loading')
    const { honeypot, ...formData } = data
    const result = await submitContactForm(formData)
    setSubmitState(result.success ? 'success' : 'error')
    setSubmitMessage(result.message)
    if (result.success) reset()
  }

  const getFieldClasses = (hasError) =>
    cn(
      'w-full px-4 py-3 min-h-[48px] bg-surface border text-off-white rounded-sm transition-all duration-300 placeholder:text-placeholder focus:outline-none text-base',
      hasError
        ? 'border-terracotta-light focus:border-terracotta-light focus:ring-1 focus:ring-terracotta-light'
        : 'border-warm-2 hover:border-warm-3 focus:border-brass focus:ring-1 focus:ring-brass',
    )

  return (
    <PageTransition>
      <Helmet>
        <title>Contact — Keshav Sharma Photography</title>
        <meta
          name="description"
          content="Get in touch with Keshav Sharma for photography enquiries — street, portraits, travel, festivals."
        />
      </Helmet>

      <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-sm">Contact</span>
            <h1 className="mt-2 mb-6">Let's Talk</h1>
            <p className="text-off-white-muted mb-12 max-w-md">
              Have a project in mind, or just want to say hello? Fill out the form or reach out directly — I'd love to hear from you.
            </p>

            <div className="space-y-6">
              {/* WhatsApp — prominent with dark contrast */}
              {settings?.whatsapp && (
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^0-9+]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-6 py-4 bg-brass text-[var(--color-base)] rounded-sm hover:bg-brass-bright transition-colors font-medium border border-brass"
                >
                  <SiWhatsapp size={22} className="text-[var(--color-base)] shrink-0" />
                  <div>
                    <div className="font-semibold text-base text-[var(--color-base)]">WhatsApp</div>
                    <div className="text-sm text-[var(--color-base)]/80">{settings.whatsapp}</div>
                  </div>
                </a>
              )}

              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="flex items-center gap-4 px-6 py-4 border border-warm-2 rounded-sm hover:border-warm-3 transition-colors group"
                >
                  <Mail size={22} className="text-warm-3 shrink-0" />
                  <div>
                    <div className="text-off-white font-medium">Email</div>
                    <div className="text-sm text-off-white-muted">{settings.email}</div>
                  </div>
                </a>
              )}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {submitState === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-surface rounded-sm border border-warm-1">
                <CheckCircle size={48} className="text-brass mb-4" />
                <h2 className="font-display text-3xl text-off-white mb-3">Message Sent!</h2>
                <p className="text-off-white-muted max-w-md mb-2">
                  Thank you for reaching out. I review every enquiry personally and typically reply within 24–48 hours.
                </p>
                {settings?.whatsapp && (
                  <div className="my-6 p-5 bg-surface-elevated rounded-sm border border-warm-1 max-w-md w-full text-center">
                    <p className="text-xs text-warm-4 uppercase tracking-wider mb-3 font-medium">
                      Need a faster response?
                    </p>
                    <a
                      href={`https://wa.me/${settings.whatsapp.replace(/[^0-9+]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full"
                    >
                      <SiWhatsapp size={18} />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setSubmitState(null)}
                  className="btn-secondary"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Honeypot — hidden from users & screen readers, bots fill it */}
                <input
                  {...register('honeypot')}
                  type="text"
                  name="honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: 'none', position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                />

                {/* Name */}
                <div>
                  <input
                    {...register('name')}
                    placeholder="Your name *"
                    autoComplete="name"
                    className={getFieldClasses(!!errors.name)}
                  />
                  {errors.name && (
                    <p className="text-xs font-medium text-terracotta-light mt-1.5 flex items-center gap-1.5">
                      <AlertCircle size={13} />
                      <span>{errors.name.message}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Email address *"
                    autoComplete="email"
                    className={getFieldClasses(!!errors.email)}
                  />
                  {errors.email && (
                    <p className="text-xs font-medium text-terracotta-light mt-1.5 flex items-center gap-1.5">
                      <AlertCircle size={13} />
                      <span>{errors.email.message}</span>
                    </p>
                  )}
                </div>

                {/* Phone — Required Indian mobile */}
                <div>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="Phone number *"
                    autoComplete="tel"
                    className={getFieldClasses(!!errors.phone)}
                  />
                  {errors.phone && (
                    <p className="text-xs font-medium text-terracotta-light mt-1.5 flex items-center gap-1.5">
                      <AlertCircle size={13} />
                      <span>{errors.phone.message}</span>
                    </p>
                  )}
                </div>

                {/* Service — Custom accessible dropdown */}
                <div>
                  <Controller
                    name="service"
                    control={control}
                    render={({ field }) => (
                      <CustomSelect
                        options={[
                          ...CATEGORIES.map((cat) => ({ value: cat.label, label: cat.label })),
                          { value: 'Other', label: 'Other' },
                        ]}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="What do you need? *"
                        error={!!errors.service}
                      />
                    )}
                  />
                  {errors.service && (
                    <p className="text-xs font-medium text-terracotta-light mt-1.5 flex items-center gap-1.5">
                      <AlertCircle size={13} />
                      <span>{errors.service.message}</span>
                    </p>
                  )}
                </div>

                {/* Date — Optional */}
                <div>
                  <input
                    {...register('date')}
                    type={dateValue ? 'date' : 'text'}
                    onFocus={(e) => (e.target.type = 'date')}
                    onBlur={(e) => {
                      if (!e.target.value) e.target.type = 'text'
                    }}
                    placeholder="Shoot date (optional)"
                    title="Shoot date (optional)"
                    aria-label="Shoot date (optional)"
                    className={cn(
                      getFieldClasses(!!errors.date),
                      !dateValue ? 'text-placeholder' : 'text-off-white',
                    )}
                  />
                  {errors.date && (
                    <p className="text-xs font-medium text-terracotta-light mt-1.5 flex items-center gap-1.5">
                      <AlertCircle size={13} />
                      <span>{errors.date.message}</span>
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    {...register('message')}
                    rows={5}
                    placeholder="Tell me about your project *"
                    className={getFieldClasses(!!errors.message)}
                  />
                  {errors.message && (
                    <p className="text-xs font-medium text-terracotta-light mt-1.5 flex items-center gap-1.5">
                      <AlertCircle size={13} />
                      <span>{errors.message.message}</span>
                    </p>
                  )}
                </div>

                {submitState === 'error' && (
                  <p className="flex items-center gap-2 text-sm text-terracotta-light p-3 bg-surface border border-terracotta-light/30 rounded-sm">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{submitMessage}</span>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitState === 'loading'}
                  className="btn-primary w-full"
                >
                  {submitState === 'loading' ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  )
}
