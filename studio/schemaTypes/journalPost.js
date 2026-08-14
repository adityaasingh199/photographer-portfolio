import {defineType, defineField} from 'sanity'
import {EditIcon} from '@sanity/icons/Edit'

export default defineType({
  name: 'journalPost',
  title: 'Blog / Journal',
  type: 'document',
  icon: EditIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Post ka title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Title daalna zaroori hai'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      // Auto-generated from title, hidden from the owner
      hidden: true,
      validation: (Rule) => Rule.required().error('Slug zaroori hai — title se apne aap banega'),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'excerpt',
      title: '2 line summary',
      type: 'text',
      rows: 3,
      description: 'Chhota sa summary — post ki list mein dikhega',
    }),
    defineField({
      name: 'body',
      title: 'Poora content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading', value: 'h2'},
          ],
          marks: {
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Italic', value: 'em'},
            ],
            annotations: [],
          },
          lists: [],
        },
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Date (newest first)',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
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
