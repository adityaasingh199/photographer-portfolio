import {defineType, defineField} from 'sanity'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'

export default defineType({
  name: 'pressMention',
  title: 'Press Mentions',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'outlet',
      title: 'Publication ka naam',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Article ya mention ka link',
    }),
  ],
  preview: {
    select: {
      title: 'outlet',
      media: 'logo',
    },
  },
})
