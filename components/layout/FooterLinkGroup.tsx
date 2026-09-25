import Link from "next/link";

export interface FooterLink {
  label: string;
  href: string;
  /** Renders the link with `target="_blank"` and safe `rel` attributes */
  external?: boolean;
}

export interface FooterLinkGroupProps {
  /** Heading for the group of links */
  title: string;
  links: FooterLink[];
  /** Shared id prefix, used to wire the heading to its list via aria-labelledby */
  idPrefix: string;
}

export default function FooterLinkGroup({
  title,
  links,
  idPrefix,
}: FooterLinkGroupProps) {
  const headingId = `${idPrefix}-heading`;

  return (
    <nav aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-sm font-semibold text-white uppercase tracking-wider mb-4"
      >
        {title}
      </h2>
      <ul className="space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="inline-block rounded transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {link.label}
              {link.external && (
                <span className="sr-only"> (opens in a new tab)</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
