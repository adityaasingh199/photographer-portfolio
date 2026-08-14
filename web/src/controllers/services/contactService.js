import { env } from '../../config/env'

/**
 * Contact form submission via Web3Forms.
 * No backend needed — submissions land directly in the configured email.
 *
 * @param {Object} formData
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function submitContactForm(formData) {
  const key = env.web3formsKey
  if (!key) {
    console.error('[contactService] Missing VITE_WEB3FORMS_KEY environment variable.')
    return {
      success: false,
      message: 'Form submission is temporarily unavailable (no access key configured). Please message me directly on WhatsApp or email.',
    }
  }

  // Honeypot check: If bot filled it, reject without contacting Web3Forms
  if (formData.honeypot) {
    console.warn('[contactService] Honeypot triggered.')
    return {
      success: false,
      message: 'Submission rejected as spam.',
    }
  }

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: key,
        subject: `New enquiry from Keshav Sharma Photography — ${formData.name}`,
        from_name: formData.name,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        service: formData.service || 'General Enquiry',
        date: formData.date || 'Not specified',
        message: formData.message,
        botcheck: formData.honeypot || undefined,
      }),
    })

    const data = await res.json()
    if (res.ok && data.success) {
      return {
        success: true,
        message: 'Your message has been sent successfully!',
      }
    }

    console.error('[contactService] Web3Forms API error response:', data)
    return {
      success: false,
      message: data.message || 'Unable to submit your message right now. Please message me directly on WhatsApp or email.',
    }
  } catch (err) {
    console.error('[contactService] Network error during form submission:', err)
    return {
      success: false,
      message: 'Network error while sending message. Please try again or reach out on WhatsApp.',
    }
  }
}
