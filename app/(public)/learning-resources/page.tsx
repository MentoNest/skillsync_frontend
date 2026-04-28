import ResourcesFooter from '@/components/ResourcesFooter';
import ResourcesHero from '@/components/ResourcesHero';
import ResourcesContent from '@/components/ResourcesContent';

export const metadata = {
  title: 'Learning Resources | SkillSync',
  description: 'Browse curated learning resources by category.',
};

export default function LearningResourcesPage() {
  return (
    <>
      <ResourcesHero />
      <ResourcesContent />
      <ResourcesFooter />
    </>
  );
}
