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
    <footer aria-label="Site footer" className="bg-white border-t border-gray-100">
      <style>{`
        .footer-root { font-family: 'Sora', sans-serif; }
        .footer-link { color: #6b7280; text-decoration: none; }
        .footer-link:hover { color: #111827; }
        .social-btn { display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:8px; background:transparent; border:none; cursor:pointer; }
        @media (min-width: 768px) {
          .footer-grid { display: flex; align-items: flex-start; gap: 2.5rem; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-12 footer-root">
        <div className="footer-grid">
          <div className="flex-1">
            <a href="/" aria-label="SkillSync home" style={{ display: 'inline-block' }}>
              <span style={{ fontSize: '1.125rem', fontWeight: 700, color: '#111827' }}>SkillSync</span>
            </a>
            <p style={{ color: '#6b7280', marginTop: 10, maxWidth: 420 }}>
              Connecting mentees and mentors to accelerate careers with practical guidance.
            </p>
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              {SOCIAL.map((s) => (
                <a key={s.name} href={s.href} className="social-btn" aria-label={s.name}>
                  <span style={{ fontSize: 12, color: '#6b7280' }}>{s.name[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 16 }}>
            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Navigate</h4>
              <ul style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {NAV.map((n) => (
                  <li key={n.label}>
                    <a href={n.href} className="footer-link">{n.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: 14, fontWeight: 700, color: '#111827' }}>Legal</h4>
              <ul style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <li><a className="footer-link" href="#">Privacy</a></li>
                <li><a className="footer-link" href="#">Terms</a></li>
                <li><a className="footer-link" href="#">Support</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 24, borderTop: '1px solid #f3f4f6', paddingTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <p style={{ color: '#9ca3af', fontSize: 13 }}>&copy; {new Date().getFullYear()} SkillSync. All rights reserved.</p>
          <div style={{ color: '#9ca3af', fontSize: 13 }}>Built with care • v1.0</div>
        </div>
      </div>
    </footer>
  );
}
