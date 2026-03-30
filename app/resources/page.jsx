import React from 'react';
import ResourcesHero from '../../components/ResourcesHero';
import LearningTrackGrid from '../../components/learning/LearningTrackGrid';

export default function ResourcesPage() {
  return (
    <main>
      <ResourcesHero />
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="text-gray-700">
          <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
          <p>
            This page will host curated learning resources, guides, and tutorials.
            Stay tuned for updates!
          </p>
        </div>
      </section>
      
      {/* Learning Tracks Section */}
      <LearningTrackGrid
        onTrackStart={(trackId) => {
          console.log('Starting track:', trackId);
          // TODO: Navigate to track detail page or start learning flow
        }}
      />
    </main>
  );
}
