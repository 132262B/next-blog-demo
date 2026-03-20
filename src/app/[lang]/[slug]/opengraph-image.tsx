import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/posts'

export const alt = 'Blog post thumbnail'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  const post = getPostBySlug(slug, lang)

  const title = post?.frontmatter.title ?? slug.replace(/-/g, ' ')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
          padding: '60px',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 52,
            fontWeight: 700,
            textAlign: 'center',
            lineHeight: 1.3,
            maxWidth: '900px',
          }}
        >
          {title}
        </div>
      </div>
    ),
    { ...size }
  )
}
