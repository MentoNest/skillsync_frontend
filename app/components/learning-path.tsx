const tips = [
  {
    id: 1,
    title: "This Way to Raise Your Hand for a Promotion",
    description:
      "Learn the strategies top performers use to advance their careers and get recognized",
    href: "#",
  },
  {
    id: 2,
    title: "How to Navigate Career Transitions Successfully",
    description:
      "Expert advice on making smooth transitions between roles and industries",
    href: "#",
  },
];

export default function MentorsBestTips() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        .tips-section {
          font-family: 'Sora', sans-serif;
          background: #f0f4f8;
          padding: 4rem 1.5rem;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .tips-heading {
          font-size: clamp(1.75rem, 4vw, 2.5rem);
          font-weight: 800;
          color: #0f172a;
          text-align: center;
          margin-bottom: 2.5rem;
          letter-spacing: -0.5px;
        }

        .tips-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          width: 100%;
          max-width: 1000px;
        }

        .tip-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 2rem 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: default;
        }
        .tip-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(124,58,237,0.12);
        }

        .tip-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.4;
          margin: 0;
        }

        .tip-desc {
          font-size: 0.9rem;
          color: #64748b;
          line-height: 1.65;
          margin: 0;
          flex: 1;
        }

        .tip-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          color: #7c3aed;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          transition: gap 0.2s ease, opacity 0.2s;
          width: fit-content;
          margin-top: 0.25rem;
        }
        .tip-link:hover {
          gap: 0.5rem;
          opacity: 0.85;
        }
        .tip-link .arrow {
          display: inline-block;
          transition: transform 0.2s ease;
        }
        .tip-link:hover .arrow {
          transform: translateX(3px);
        }
      `}</style>

      <section className="tips-section">
        <h2 className="tips-heading">Mentors Best Tips</h2>

        <div className="tips-grid">
          {tips.map((tip) => (
            <div className="tip-card" key={tip.id}>
              <h3 className="tip-title">{tip.title}</h3>
              <p className="tip-desc">{tip.description}</p>
              <a href={tip.href} className="tip-link">
                Read More <span className="arrow">→</span>
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}