import {defineType, defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons/Image'

export const PHOTO_CATEGORIES = [
  {title: 'Street Photography', value: 'street'},
  {title: 'Portraits', value: 'portraits'},
  {title: 'Travel', value: 'travel'},
  {title: 'Festivals', value: 'festivals'},
]

export default defineType({
  name: 'photo',
  title: 'Gallery ki Photos',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required().error('Photo daalna zaroori hai'),
    }),
    defineField({
      name: 'title',
      title: 'Photo ka naam',
      type: 'string',
      description: 'Optional — agar khali chhod denge toh bhi chalega',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: PHOTO_CATEGORIES,
        layout: 'radio',
      },
      validation: (Rule) => Rule.required().error('Category choose karein'),
    }),
    defineField({
      name: 'featured',
      title: 'Homepage pe dikhaayein?',
      type: 'boolean',
      initialValue: false,
      description: 'Haan select karein toh ye photo homepage pe dikhegi',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: 'Manual order',
      name: 'manualOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      const categoryLabel = PHOTO_CATEGORIES.find((c) => c.value === subtitle)?.title || subtitle
      return {
        title: title || 'Bina naam ki photo',
        subtitle: categoryLabel,
        media,
      }
    },
  },
})
