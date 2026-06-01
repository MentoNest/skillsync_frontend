import Link from 'next/link'

type ArticleListItemProps = {
  category: string
  title: string
  author: string
  readTime: string
  href: string
}

export default function ArticleListItem({
  category,
  title,
  author,
  readTime,
  href,
}: ArticleListItemProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={href} className="group block h-full rounded-3xl p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2">
        <p className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-700">
          {category}
        </p>
        <h3 className="mt-4 text-xl font-semibold text-slate-900 transition group-hover:text-slate-700">
          {title}
        </h3>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span>By {author}</span>
          <span aria-hidden="true">•</span>
          <span>{readTime}</span>
        </div>
        <div className="mt-6 flex items-center justify-between text-slate-700">
          <span className="text-sm font-medium text-slate-900">Read article</span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
              <path d="M13 5.5l6.5 6.5-6.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4.5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  )
}
