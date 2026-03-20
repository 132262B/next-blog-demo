interface ArticleBodyProps {
  contentHtml: string
}

export default function ArticleBody({ contentHtml }: ArticleBodyProps) {
  return (
    <article
      className="
        prose prose-neutral max-w-none
        prose-headings:font-bold prose-headings:text-black
        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:text-gray-800 prose-p:leading-relaxed prose-p:mb-4
        prose-a:text-black prose-a:underline
        prose-strong:text-black
        prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-sm prose-pre:overflow-x-auto
        prose-ul:list-disc prose-ul:pl-6
        prose-ol:list-decimal prose-ol:pl-6
        prose-li:mb-1
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
        prose-img:rounded-sm prose-img:my-6
      "
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  )
}
