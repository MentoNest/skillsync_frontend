'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ReportButton } from './moderation';

const filters = ['All', 'Engineering', 'Design', 'Product', 'Business', 'Data'];

const mentors = [
  {
    id: 1,
    name: 'Kwame Asante',
    role: 'Staff Engineer',
    company: 'Stripe',
    category: 'Engineering',
    initials: 'KA',
    accent: '#3b82f6',
    bg: '#0f1f3d',
    available: true,
    rating: 4.95,
    sessions: 204,
    description: 'Helps engineers level up to Staff and beyond. Specialises in distributed systems, technical leadership, and promo packets.',
    tags: ['System Design', 'Leadership', 'Go'],
  },
  {
    id: 2,
    name: 'Priya Menon',
    role: 'Head of Product Design',
    company: 'Figma',
    category: 'Design',
    initials: 'PM',
    accent: '#a855f7',
    bg: '#1e0f3d',
    available: true,
    rating: 4.98,
    sessions: 187,
    description: 'Portfolio reviews, design system strategy, and breaking into senior IC or management tracks at top-tier product companies.',
    tags: ['Figma', 'Design Systems', 'Portfolio'],
  },
  {
    id: 3,
    name: 'Tomás Reyes',
    role: 'Senior PM',
    company: 'Notion',
    category: 'Product',
    initials: 'TR',
    accent: '#10b981',
    bg: '#0a2318',
    available: false,
    rating: 4.91,
    sessions: 139,
    description: 'From APM to PM to Group PM — Tomás has made every jump and guides others through the same transitions with precision.',
    tags: ['Roadmapping', 'Stakeholders', 'APM'],
  },
  {
    id: 4,
    name: 'Aisha Nwosu',
    role: 'Data Science Lead',
    company: 'Spotify',
    category: 'Data',
    initials: 'AN',
    accent: '#f59e0b',
    bg: '#2a1800',
    available: true,
    rating: 4.93,
    sessions: 256,
    description: 'ML pipelines, A/B testing at scale, and transitioning from academia to industry. Obsessed with making data teams actually functional.',
    tags: ['Python', 'ML', 'Analytics'],
  },
  {
    id: 5,
    name: 'Leon Fischer',
    role: 'Founding Engineer',
    company: '3× YC Startups',
    category: 'Engineering',
    initials: 'LF',
    accent: '#ef4444',
    bg: '#2a0a0a',
    available: true,
    rating: 4.89,
    sessions: 98,
    description: 'Zero to one builder. Helps early-career devs ship fast, make technical decisions under uncertainty, and navigate startup chaos.',
    tags: ['React', 'Node', 'Startup'],
  },
  {
    id: 6,
    name: 'Sara Lindqvist',
    role: 'VP of Growth',
    company: 'Duolingo',
    category: 'Business',
    initials: 'SL',
    accent: '#06b6d4',
    bg: '#011f26',
    available: false,
    rating: 4.96,
    sessions: 321,
    description: 'Growth loops, retention mechanics, and go-to-market for consumer apps. Former founder. Brutally practical and candid.',
    tags: ['Growth', 'GTM', 'Retention'],
  },
];

export default function MentorDiscoverySection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? mentors
    : mentors.filter(m => m.category === activeFilter);

  return (
    <section className="mentor-discovery">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .mentor-discovery {
          font-family: 'DM Sans', sans-serif;
          background: #f7f5f2;
          padding: 88px 24px;
          position: relative;
        }

        .md-inner {
          max-width: 1160px;
          margin: 0 auto;
        }

        /* Header */
        .md-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .md-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #94928d;
          margin-bottom: 10px;
        }

        .md-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 800;
          color: #141210;
          line-height: 1.1;
          margin: 0;
        }

        .md-title span {
          position: relative;
          display: inline-block;
        }

        .md-title span::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 3px;
          background: #141210;
          border-radius: 2px;
        }

        .md-view-all {
          font-size: 13px;
          font-weight: 500;
          color: #141210;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
          padding-bottom: 2px;
          border-bottom: 1px solid rgba(20,18,16,0.25);
          transition: border-color 0.2s;
        }

        .md-view-all:hover {
          border-color: #141210;
        }

        /* Filters */
        .md-filters {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }

        .md-filter-btn {
          background: none;
          border: 1.5px solid rgba(20,18,16,0.15);
          color: #6b6860;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 18px;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .md-filter-btn:hover {
          border-color: rgba(20,18,16,0.4);
          color: #141210;
        }

        .md-filter-btn.active {
          background: #141210;
          border-color: #141210;
          color: #f7f5f2;
        }

        /* Grid */
        .md-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        @media (max-width: 1024px) {
          .md-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 600px) {
          .md-grid { grid-template-columns: 1fr; }
          .md-header { align-items: flex-start; flex-direction: column; gap: 12px; }
        }

        /* Card */
        .md-card {
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(20,18,16,0.07);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
          display: flex;
          flex-direction: column;
        }

        .md-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(20,18,16,0.1);
        }

        .md-card-top {
          padding: 28px 28px 20px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          position: relative;
        }

        /* Avatar */
        .md-avatar {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.5px;
          position: relative;
        }

        .md-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 14px;
        }

        .md-availability {
          position: absolute;
          bottom: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid #fff;
        }

        .md-availability.available { background: #10b981; }
        .md-availability.busy { background: #d1d5db; }

        /* Meta */
        .md-meta {
          flex: 1;
          min-width: 0;
        }

        .md-name {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          color: #141210;
          margin: 0 0 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .md-role {
          font-size: 13px;
          color: #94928d;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .md-company {
          font-size: 12px;
          font-weight: 500;
          margin-top: 2px;
        }

        /* Rating pill */
        .md-rating {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #f7f5f2;
          border-radius: 8px;
          padding: 4px 9px;
          font-size: 12px;
          font-weight: 600;
          color: #141210;
          flex-shrink: 0;
        }

        .md-rating-star {
          color: #f59e0b;
          font-size: 11px;
        }

        /* Divider */
        .md-divider {
          height: 1px;
          background: rgba(20,18,16,0.07);
          margin: 0 28px;
        }

        /* Body */
        .md-card-body {
          padding: 20px 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .md-description {
          font-size: 13.5px;
          line-height: 1.7;
          color: #6b6860;
          margin: 0;
          flex: 1;
        }

        .md-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .md-tag {
          font-size: 11.5px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 6px;
          background: #f7f5f2;
          color: #6b6860;
          border: 1px solid rgba(20,18,16,0.08);
        }

        /* Footer */
        .md-card-footer {
          padding: 16px 28px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .md-sessions {
          font-size: 12px;
          color: #94928d;
        }

        .md-sessions strong {
          color: #141210;
          font-weight: 600;
        }

        .md-book-btn {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          padding: 9px 18px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.18s ease;
          border: none;
          cursor: pointer;
        }

        .md-book-btn.available {
          background: #141210;
          color: #f7f5f2;
        }

        .md-book-btn.available:hover {
          background: #2d2a27;
        }

        .md-book-btn.busy {
          background: #f0efed;
          color: #94928d;
          cursor: default;
        }

        /* Empty state */
        .md-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 64px 24px;
          color: #94928d;
          font-size: 15px;
        }
      `}</style>

      <div className="md-inner">
        {/* Header */}
        <div className="md-header">
          <div>
            <p className="md-eyebrow">Our Community</p>
            <h2 className="md-title">
              Find your <span>mentor</span>
            </h2>
          </div>
          <Link href="/mentors" className="md-view-all">
            Browse all mentors →
          </Link>
        </div>

        {/* Filters */}
        <div className="md-filters">
          {filters.map(f => (
            <button
              key={f}
              className={`md-filter-btn${activeFilter === f ? ' active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="md-grid">
          {filtered.length === 0 && (
            <div className="md-empty">No mentors found in this category yet.</div>
          )}

          {filtered.map(mentor => (
            <div key={mentor.id} className="md-card">
              {/* Top */}
              <div className="md-card-top">
                <div
                  className="md-avatar"
                  style={{ background: mentor.bg, color: mentor.accent }}
                >
                  {mentor.initials}
                  <span className={`md-availability ${mentor.available ? 'available' : 'busy'}`} />
                </div>

                <div className="md-meta">
                  <p className="md-name">{mentor.name}</p>
                  <p className="md-role">{mentor.role}</p>
                  <p className="md-company" style={{ color: mentor.accent }}>{mentor.company}</p>
                </div>

                <div className="md-rating">
                  <span className="md-rating-star">★</span>
                  {mentor.rating}
                </div>

                {/* Report Button */}
                <div className="ml-auto">
                  <ReportButton
                    reportableType="mentor"
                    reportableId={mentor.id.toString()}
                    reportableTitle={mentor.name}
                    variant="icon"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>

              <div className="md-divider" />

              {/* Body */}
              <div className="md-card-body">
                <p className="md-description">{mentor.description}</p>
                <div className="md-tags">
                  {mentor.tags.map(tag => (
                    <span key={tag} className="md-tag">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="md-card-footer">
                <span className="md-sessions">
                  <strong>{mentor.sessions}</strong> sessions
                </span>
                <Link
                  href={mentor.available ? `/mentors/${mentor.id}` : '#'}
                  className={`md-book-btn ${mentor.available ? 'available' : 'busy'}`}
                >
                  {mentor.available ? 'Book session' : 'Fully booked'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}