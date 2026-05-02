import {groq} from 'next-sanity'

export const rolesQuery = groq`*[_type == "role"] | order(hierarchy asc, order asc, title asc) {
  _id,
  title,
  hierarchy,
  order,
  members
}`

export type Role = {
  _id: string
  title: string
  hierarchy?: number
  order?: number
  members?: string[]
}
