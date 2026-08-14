import {defineType, defineField} from 'sanity'
import {LockIcon} from '@sanity/icons/Lock'

export default defineType({
  name: 'clientGallery',
  title: 'Client Gallery (private)',
  type: 'document',
  icon: LockIcon,
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client ka naam',
      type: 'string',
      validation: (Rule) => Rule.required().error('Client ka naam daalna zaroori hai'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'clientName',
        maxLength: 96,
      },
      hidden: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shootDate',
      title: 'Shoot ki date',
      type: 'date',
    }),
    defineField({
      name: 'passcode',
      title: 'Password jo client ko denge',
      type: 'string',
      description:
        'Ye halka sa protection hai. Bahut private photos yahan na daalein. Koi technical insaan chahe toh ye password dekh sakta hai.',
      validation: (Rule) => Rule.required().error('Password daalna zaroori hai'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover photo',
      type: 'image',
      options: {hotspot: true},
      description: 'Ye photo gallery ki list mein dikhegi',
    }),
    defineField({
      name: 'photos',
      title: 'Saari photos',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'shootDate',
      media: 'coverImage',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle
          ? new Date(subtitle).toLocaleDateString('en-IN', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : 'No date',
        media,
      }
    },
  },
})
