export interface SocialLink {
  /** Accessible name for the network, e.g. "LinkedIn" */
  name: string;
  href: string;
  /** Icon markup for the network */
  icon: React.ReactNode;
}

export interface SocialLinksProps {
  links: SocialLink[];
  /** Accessible name for the surrounding navigation landmark */
  label?: string;
  className?: string;
}

export default function SocialLinks({
  links,
  label = "Social media",
  className,
}: SocialLinksProps) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center gap-3">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`SkillSync on ${link.name} (opens in a new tab)`}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-800 text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
