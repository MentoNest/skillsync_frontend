import React from 'react';

export const QuickAccessSkeleton = () => (
  <div className="bg-gray-100 animate-pulse border border-gray-200 rounded-xl p-6 h-48">
    <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4" />
    <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-2" />
    <div className="h-4 bg-gray-200 rounded-full w-full mb-1" />
    <div className="h-4 bg-gray-200 rounded-full w-5/6" />
  </div>
);

export const LearningTrackSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse border border-gray-100 flex flex-col h-full">
    <div className="bg-gray-200 h-28 p-6">
      <div className="h-8 bg-gray-300 rounded-full w-3/4 mb-4" />
      <div className="h-4 bg-gray-300 rounded-full w-1/2" />
    </div>
    <div className="p-6 space-y-4 flex-grow bg-gray-50">
      <div className="flex items-center space-x-3">
        <div className="w-4 h-4 bg-gray-200 rounded-full" />
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-4 h-4 bg-gray-200 rounded-full" />
        <div className="h-4 bg-gray-200 rounded-full w-2/3" />
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-4 h-4 bg-gray-200 rounded-full" />
        <div className="h-4 bg-gray-200 rounded-full w-1/2" />
      </div>
    </div>
  </div>
);

export const ArticleSkeleton = () => (
  <div className="flex flex-col bg-white border border-gray-200 rounded-xl p-6 animate-pulse h-40">
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 bg-gray-200 rounded-full mr-4" />
      <div className="h-5 bg-gray-200 rounded-full w-1/2" />
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 rounded-full w-full" />
      <div className="h-4 bg-gray-200 rounded-full w-5/6" />
    </div>
  </div>
);

export const ResourceSkleteonContainer = ({ type, count = 3 }: { type: 'quick' | 'track' | 'article', count?: number }) => {
  const getSkeleton = () => {
    switch (type) {
      case 'quick': return <QuickAccessSkeleton />;
      case 'track': return <LearningTrackSkeleton />;
      case 'article': return <ArticleSkeleton />;
      default: return <QuickAccessSkeleton />;
    }
  };

  return (
    <div className={`grid grid-cols-1 ${type === 'track' ? 'lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-8`}>
      {Array.from({ length: count }).map((_, i) => (
        <React.Fragment key={i}>
          {getSkeleton()}
        </React.Fragment>
      ))}
    </div>
  );
};
