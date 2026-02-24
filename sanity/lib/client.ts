import {createClient} from 'next-sanity'

const projectId = process.env.SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET

if (!projectId) {
  throw new Error('Missing SANITY_PROJECT_ID')
}

if (!dataset) {
  throw new Error('Missing SANITY_DATASET')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-02-19',
  useCdn: true,
})
