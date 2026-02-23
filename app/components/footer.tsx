export default function Footer() {
  const NAV = [
    { label: "Home", href: "/" },
    { label: "Find a Mentor", href: "/" },
    { label: "Courses", href: "/" },
    { label: "Contact", href: "/" },
  ];

  const SOCIAL = [
    { name: "Twitter", href: "https://twitter.com" },
    { name: "LinkedIn", href: "https://linkedin.com" },
    { name: "GitHub", href: "https://github.com" },
  ];

  return (
    <footer aria-label="Site footer" className="bg-white border-t border-gray-100 no-overflow">
      <style>{`
        .footer-root { font-family: 'Sora', sans-serif; }
        .footer-link { color: #6b7280; text-decoration: none; }
        .footer-link:hover { color: #111827; }
        .social-btn { display:inline-flex; align-items:center; justify-content:center; width:32px; height:32px; border-radius:8px; background:transparent; border:none; cursor:pointer; }
        @media (min-width: 640px) {
          .social-btn { width:36px; height:36px; }
        }
        .footer-grid { display: flex; flex-direction: column; gap: 2rem; }
        @media (min-width: 768px) {
          .footer-grid { flex-direction: row; align-items: flex-start; gap: 2rem; }
        }
        @media (min-width: 1024px) {
          .footer-grid { gap: 2.5rem; }
        }
      `}</style>

      <div className="container-responsive max-w-7xl mx-auto py-10 md:py-12 footer-root">
        <div className="footer-grid">
          <div className="flex-1 min-w-full md:min-w-0">
            <a href="/" aria-label="SkillSync home" style={{ display: 'inline-block' }}>
              <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>SkillSync</span>
            </a>
            <p style={{ color: '#6b7280', marginTop: '0.75rem', maxWidth: 420 }} className="text-sm md:text-base">
              Connecting mentees and mentors to accelerate careers with practical guidance.
            </p>
            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }} className="flex-wrap">
              {SOCIAL.map((s) => (
                <a key={s.name} href={s.href} className="social-btn" aria-label={s.name}>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280' }} className="sm:text-xs">{s.name[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '1rem' }} className="w-full md:w-auto">
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }} className="md:text-sm">Navigate</h4>
              <ul style={{ marginTop: '0.625rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {NAV.map((n) => (
                  <li key={n.label}>
                    <a href={n.href} className="footer-link">{n.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }} className="md:text-sm">Legal</h4>
              <ul style={{ marginTop: '0.625rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><a className="footer-link" href="#">Privacy</a></li>
                <li><a className="footer-link" href="#">Terms</a></li>
                <li><a className="footer-link" href="#">Support</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', borderTop: '1px solid #f3f4f6', paddingTop: '1.125rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }} className="flex-col sm:flex-row">
          <p style={{ color: '#9ca3af', fontSize: '0.8125rem' }} className="text-center sm:text-left md:text-sm">&copy; {new Date().getFullYear()} SkillSync. All rights reserved.</p>
          <div style={{ color: '#9ca3af', fontSize: '0.8125rem' }} className="text-center sm:text-right md:text-sm">Built with care • v1.0</div>
        </div>
      </div>
    </footer>
  );
}
