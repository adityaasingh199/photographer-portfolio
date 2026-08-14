import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export default defineType({
  name: 'siteSettings',
  title: 'Website ki Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'photographerName',
      title: 'Aapka naam (website pe dikhega)',
      type: 'string',
      validation: (Rule) => Rule.required().error('Naam daalna zaroori hai'),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline — ek chhoti line',
      type: 'string',
      description: 'Jaise: "Chasing light through the streets of Delhi"',
      validation: (Rule) => Rule.max(70).warning('70 characters se zyada mat likhein'),
    }),
    defineField({
      name: 'heroImages',
      title: 'Homepage ki badi photos',
      type: 'array',
      description:
        'Ye sabse pehle dikhengi. Apni 3–5 sabse achhi photos yahan daalein.',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (Rule) =>
        Rule.min(3)
          .error('Kam se kam 3 photos daalni zaroori hain')
          .max(5)
          .error('Zyada se zyada 5 photos daal sakte hain'),
    }),
    defineField({
      name: 'profilePhoto',
      title: 'Aapki apni photo (About page ke liye)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About page ka heading',
      type: 'string',
    }),
    defineField({
      name: 'aboutText',
      title: 'About page ka text',
      type: 'text',
      rows: 8,
      description: 'Apne baare mein likhein — ye About page pe dikhega',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) =>
        Rule.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {name: 'email'}).warning(
          'Sahi email daalein',
        ),
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp number',
      type: 'string',
      description: 'Country code ke saath, jaise +91 7280867758',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram link',
      type: 'url',
      description: 'Poora link daalein, jaise https://www.instagram.com/shotbykeshav',
    }),
    defineField({
      name: 'city',
      title: 'Sheher',
      type: 'string',
      description: 'Jaise: Delhi NCR',
    }),
  ],
  preview: {
    select: {
      title: 'photographerName',
      subtitle: 'tagline',
    },
  },
})
