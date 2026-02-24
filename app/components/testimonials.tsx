export default function Testimonials() {
  const TESTIMONIALS = [
    {
      quote:
        "Working with my mentor has been transformative. I successfully transitioned from junior to senior engineer in just 18 months with their guidance.",
      name: "James Smith",
      role: "Software Engineer",
    },
    {
      quote:
        "The mentorship I received helped me navigate a career change into product management. The insights and advice were invaluable.",
      name: "Maria Garcia",
      role: "Product Manager",
    },
    {
      quote:
        "My mentor's strategic guidance helped me scale my startup from 5 to 50 employees. Best investment I've made in my career.",
      name: "Alex Thompson",
      role: "Entrepreneur",
    },
  ];

  return (
    <section aria-label="Testimonials" className="container-responsive max-w-7xl mx-auto py-responsive">
      <style>{`
        .testimonials-grid { 
          display: grid; 
          gap: 1rem; 
        }
        @media (min-width: 640px) { 
          .testimonials-grid { 
            gap: 1.25rem; 
          } 
        }
        @media (min-width: 768px) { 
          .testimonials-grid { 
            grid-template-columns: repeat(3, 1fr); 
            gap: 1.5rem; 
          } 
        }
        .card { 
          background: white; 
          border: 1px solid #eef2f7; 
          border-radius: 12px; 
          padding: 1rem; 
          box-shadow: 0 6px 18px rgba(15,23,42,0.03); 
        }
        @media (min-width: 768px) {
          .card { 
            padding: 1.25rem; 
          }
        }
        .quote { 
          color: #374151; 
          line-height: 1.5; 
          font-size: 0.875rem; 
        }
        @media (min-width: 640px) {
          .quote { 
            font-size: 0.95rem; 
          }
        }
        .avatar { 
          width: 40px; 
          height: 40px; 
          border-radius: 9999px; 
          display: inline-flex; 
          align-items: center; 
          justify-content: center; 
          background: #f3f4f6; 
          color: #111827; 
          font-weight: 700; 
          font-size: 0.875rem;
        }
        @media (min-width: 640px) {
          .avatar { 
            width: 48px; 
            height: 48px; 
            font-size: 1rem;
          }
        }
        .meta { 
          margin-top: 0.75rem; 
          display: flex; 
          gap: 0.75rem; 
          align-items: center; 
        }
        @media (min-width: 640px) {
          .meta { 
            margin-top: 0.9rem; 
          }
        }
        .name { 
          font-weight: 700; 
          color: #111827; 
          font-size: 0.875rem;
        }
        @media (min-width: 640px) {
          .name { 
            font-size: 1rem;
          }
        }
        .role { 
          color: #6b7280; 
          font-size: 0.75rem; 
        }
        @media (min-width: 640px) {
          .role { 
            font-size: 0.9rem; 
          }
        }
        .stars { 
          color: #f59e0b; 
          margin-bottom: 0.5rem; 
          font-size: 0.875rem;
        }
        @media (min-width: 640px) {
          .stars { 
            font-size: 1rem;
          }
        }
      `}</style>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', textAlign: 'center', marginBottom: '1.25rem' }} className="sm:text-2xl md:text-3xl">What users are saying</h2>

      <div className="testimonials-grid">
        {TESTIMONIALS.map((t, idx) => (
          <article key={idx} className="card" aria-label={`Testimonial from ${t.name}`}>
            <div className="stars" aria-hidden="true">{'★ ★ ★ ★ ★'}</div>

            <blockquote>
              <p className="quote">{t.quote}</p>
            </blockquote>

            <footer className="meta">
              <div className="avatar" aria-hidden="true">
                {t.name
                  .split(" ")
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <div className="name">{t.name}</div>
                <div className="role">{t.role}</div>
              </div>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
