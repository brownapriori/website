import {groq} from 'next-sanity'

export const allVolumesQuery = groq`*[_type == "volume"] | order(number desc) {
  _id,
  number,
  year,
  eics
}`

export type VolumeListItem = {
  _id: string
  number: number
  year: number
  eics: string | null
}

export const latestVolumeQuery = groq`*[_type == "volume"] | order(number desc) [0] {
  _id,
  number,
  year,
  eics,
  "pdfUrl": pdf.asset->url,
  "articles": articles[]->{
    _id,
    title,
    authors,
    "slug": slug.current,
    pageRange,
    "pdfUrl": pdf.asset->url
  }
}`

export const latestVolumeNumberQuery = groq`*[_type == "volume"] | order(number desc) [0] {
  number
}`

export const volumeByNumberQuery = groq`*[_type == "volume" && number == $number][0] {
  _id,
  number,
  year,
  eics,
  "pdfUrl": pdf.asset->url,
  "articles": articles[]->{
    _id,
    title,
    authors,
    "slug": slug.current,
    pageRange,
    "pdfUrl": pdf.asset->url
  }
}`

export type VolumeArticle = {
  _id: string
  title: string
  authors: string[]
  slug: string | null
  pageRange: {start: number; end: number} | null
  pdfUrl: string | null
}

export type Volume = {
  _id: string
  number: number
  year: number
  eics: string | null
  pdfUrl: string | null
  articles: VolumeArticle[]
}
