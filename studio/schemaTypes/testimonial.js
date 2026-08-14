import {defineType, defineField} from 'sanity'
import {StarIcon} from '@sanity/icons/Star'

export default defineType({
  name: 'testimonial',
  title: 'Client ke Reviews',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client ka naam',
      type: 'string',
      validation: (Rule) => Rule.required().error('Client ka naam daalna zaroori hai'),
    }),
    defineField({
      name: 'eventType',
      title: 'Kis cheez ke liye',
      type: 'string',
      options: {
        list: [
          {title: 'Street Photography', value: 'street'},
          {title: 'Portraits', value: 'portraits'},
          {title: 'Travel', value: 'travel'},
          {title: 'Festivals', value: 'festivals'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'quote',
      title: 'Unhone kya kaha',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().error('Review likhna zaroori hai'),
    }),
    defineField({
      name: 'location',
      title: 'Sheher',
      type: 'string',
      description: 'Optional — client kahan se hain',
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'quote',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle ? subtitle.slice(0, 60) + (subtitle.length > 60 ? '…' : '') : '',
      }
    },
  },
})
