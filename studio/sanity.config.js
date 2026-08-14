import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Keshav Photography',

  projectId: 'y51uodc2',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Remove siteSettings from the "create new" template list — true singleton
    templates: (prev) => prev.filter((t) => t.schemaType !== 'siteSettings'),
  },

  document: {
    // For the siteSettings singleton: hide "create new" and "delete" actions
    actions: (prev, context) => {
      if (context.schemaType === 'siteSettings') {
        return prev.filter(
          ({action}) => action && !['create', 'delete', 'duplicate'].includes(action),
        )
      }
      return prev
    },
    // Prevent siteSettings from appearing in the "Create new document" menu
    newDocumentOptions: (prev, {creationContext}) => {
      return prev.filter((item) => item.templateId !== 'siteSettings')
    },
  },
})
