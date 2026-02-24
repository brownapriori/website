import {groq} from 'next-sanity'

export const rolesQuery = groq`*[_type == "role"] | order(hierarchy asc, order asc, title asc) {
  _id,
  title,
  hierarchy,
  order
}`

export const staffQuery = groq`*[_type == "staff" && coalesce(isActive, true) == true] | order(name asc) {
  _id,
  name,
  role->{_id},
  roles[]->{_id}
}`

export type Role = {
  _id: string
  title: string
  hierarchy?: number
  order?: number
}

export type StaffDoc = {
  _id: string
  name: string
  role?: {_id: string}
  roles?: Array<{_id: string}>
}
