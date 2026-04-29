import {groq} from 'next-sanity'

export const articleBySlugQuery = groq`*[_type == "journalArticle" && slug.current == $slug][0] {
  _id,
  title,
  authors,
  abstract,
  content,
  "slug": slug.current,
  pageRange,
  "pdfUrl": pdf.asset->url,
  "volume": *[_type == "volume" && references(^._id)][0] {
    number,
    year
  }
}`

export type ArticleVolume = {
  number: number
  year: number
}

export type ArticleDetail = {
  _id: string
  title: string
  authors: string[]
  abstract: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any[]
  slug: string
  pageRange: {start: number; end: number} | null
  pdfUrl: string | null
  volume: ArticleVolume | null
}

export type ExtractedFootnote = {
  id: string
  superscript: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any[]
}

export function formatAuthors(authors: string[]): string {
  if (authors.length === 0) return ''

  const formatFirst = (name: string) => {
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) return parts[0]
    const last = parts[parts.length - 1]
    const first = parts.slice(0, -1).join(' ')
    return `${last}, ${first}`
  }

  if (authors.length === 1) return formatFirst(authors[0])
  if (authors.length === 2) return `${formatFirst(authors[0])}, and ${authors[1]}`
  return `${formatFirst(authors[0])}, et al.`
}

export function buildCitationText(article: ArticleDetail): string {
  const authors = formatAuthors(article.authors)
  const pages = article.pageRange
    ? `, pp. ${article.pageRange.start}–${article.pageRange.end}`
    : ''
  const vol = article.volume
    ? `, vol. ${article.volume.number}, ${article.volume.year}`
    : ''
  return `${authors}. "${article.title}." A Priori${vol}${pages}.`
}

export function buildCitationHtml(article: ArticleDetail): string {
  const authors = formatAuthors(article.authors)
  const pages = article.pageRange
    ? `, pp. ${article.pageRange.start}–${article.pageRange.end}`
    : ''
  const vol = article.volume
    ? `, vol. ${article.volume.number}, ${article.volume.year}`
    : ''
  return `${authors}. &ldquo;${article.title}.&rdquo; <em>A Priori</em>${vol}${pages}.`
}

export function extractFootnotes(content: any[]): {
  footnotes: ExtractedFootnote[]
  footnoteMarkMap: Record<string, string>
} {
  const footnotes: ExtractedFootnote[] = []
  const footnoteMarkMap: Record<string, string> = {}
  const seen = new Set<string>()

  for (const block of content) {
    if (block._type !== 'block') continue
    const markDefsMap = new Map<string, any>(
      (block.markDefs ?? []).map((md: any) => [md._key, md]),
    )

    for (const child of block.children ?? []) {
      for (const markKey of child.marks ?? []) {
        const markDef = markDefsMap.get(markKey)
        if (markDef?._type === 'footnote' && !seen.has(markKey)) {
          seen.add(markKey)
          footnoteMarkMap[markKey] = child.text
          footnotes.push({id: markKey, superscript: child.text, content: markDef.content})
        }
      }
    }
  }

  return {footnotes, footnoteMarkMap}
}

export function extractHeadings(
  content: any[],
): Array<{id: string; text: string; style: 'h2' | 'h3'}> {
  return content
    .filter(
      (block: any) =>
        block._type === 'block' &&
        (block.style === 'h2' || block.style === 'h3'),
    )
    .map((block: any) => {
      const text = (block.children ?? [])
        .map((c: any) => c.text ?? '')
        .join('')
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/, '')
      return {id, text, style: block.style as 'h2' | 'h3'}
    })
}
