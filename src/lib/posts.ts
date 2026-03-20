import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'

const postsDirectory = path.join(process.cwd(), 'content', 'posts')

export interface PostFrontmatter {
  title: string
  description: string
  date: string
  author: string
  category: string
  slug: string
}

export interface Post {
  frontmatter: PostFrontmatter
  content: string
}

export interface Heading {
  id: string
  text: string
  level: 2 | 3
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs.readdirSync(postsDirectory).filter((name) => {
    const fullPath = path.join(postsDirectory, name)
    return fs.statSync(fullPath).isDirectory()
  })
}

export function getPostBySlug(slug: string, locale: string): Post | null {
  const filePath = path.join(postsDirectory, slug, `${locale}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    frontmatter: {
      title: data.title || '',
      description: data.description || '',
      date: data.date || '',
      author: data.author || '',
      category: data.category || '',
      slug: data.slug || slug,
    },
    content,
  }
}

export function getAllPosts(locale: string): Post[] {
  const slugs = getPostSlugs()
  return slugs
    .map((slug) => getPostBySlug(slug, locale))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1))
}

export async function getPostContent(
  markdown: string
): Promise<{ contentHtml: string; headings: Heading[] }> {
  const headings: Heading[] = []

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(() => (tree) => {
      // Extract headings from rehype tree (after slug generation)
      function visit(node: any) {
        if (
          node.type === 'element' &&
          (node.tagName === 'h2' || node.tagName === 'h3') &&
          node.properties?.id
        ) {
          const text = extractHastText(node)
          const level = node.tagName === 'h2' ? 2 : 3
          headings.push({
            id: node.properties.id,
            text,
            level: level as 2 | 3,
          })
        }
        if (node.children) {
          node.children.forEach(visit)
        }
      }
      visit(tree)
    })
    .use(rehypeStringify)
    .process(markdown)

  return {
    contentHtml: String(result),
    headings,
  }
}

function extractHastText(node: any): string {
  if (node.type === 'text') return node.value
  if (node.children) return node.children.map(extractHastText).join('')
  return ''
}


export function getRelatedPosts(
  currentSlug: string,
  locale: string,
  count = 3
): Post[] {
  return getAllPosts(locale)
    .filter((post) => post.frontmatter.slug !== currentSlug)
    .slice(0, count)
}

export function getExcerpt(content: string, maxLength = 200): string {
  const plainText = content
    .replace(/^#{1,6}\s+.*$/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_~`]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
  if (plainText.length <= maxLength) return plainText
  return plainText.slice(0, maxLength).replace(/\s+\S*$/, '') + '…'
}
