import {groq} from 'next-sanity'
import type {PortableTextBlock} from 'next-sanity'

export const mastheadOrdinalQuery = groq`*[_type == "settings"][0].mastheadOrdinal`

export const submissionsQuery = groq`*[_type == "settings"][0].submissions {
  open,
  volumeNumber,
  submissionLink,
  deadline,
  nextOpenDate
}`

export const settingsQuery = groq`*[_type == "settings"][0] {
  featuredArticles[]->{
    _id,
    title,
    authors,
    abstract,
    "slug": slug.current,
    "coverImageUrl": coverImage.asset->url,
    "coverImageCaption": coverImage.caption
  },
  "submissionsOpen": submissions.open,
  "submissionsVolumeNumber": submissions.volumeNumber,
  readVolumeCTA {
    volumeNumber,
    title,
    contents,
    position,
    "coverImageUrl": *[_type == "volume" && number == ^.volumeNumber][0].coverImage.asset->url,
    "coverImageAlt": *[_type == "volume" && number == ^.volumeNumber][0].coverImage.alt
  }
}`

export type FeaturedArticle = {
  _id: string
  title: string
  authors: string[]
  abstract: string
  slug: string
  coverImageUrl: string | null
  coverImageCaption: string | null
}

export type SubmissionsSettings = {
  open: 'yes' | 'no'
  volumeNumber: number | null
  submissionLink: string | null
  deadline: string | null
  nextOpenDate: string | null
}

export type SiteSettings = {
  featuredArticles: FeaturedArticle[] | null
  submissionsOpen: 'yes' | 'no' | null
  submissionsVolumeNumber: number | null
  readVolumeCTA: {
    volumeNumber: number | null
    title: PortableTextBlock[] | null
    contents: PortableTextBlock[] | null
    position: 'belowNav' | 'belowFeatured' | null
    coverImageUrl: string | null
    coverImageAlt: string | null
  } | null
}
