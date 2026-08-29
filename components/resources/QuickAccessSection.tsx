import {
  FileTextIcon,
  PlayCircleIcon,
  BookOpenIcon,
  DownloadIcon,
} from "@/components/ui/icons";
import QuickAccessCard from "./QuickAccessCard";

const quickAccessItems = [
  {
    title: "Resume Templates",
    description:
      "Download professionally crafted resume templates tailored for tech and creative roles.",
    href: "/resources/resume-templates",
    icon: FileTextIcon,
  },
  {
    title: "Video Tutorials",
    description:
      "Watch step-by-step video guides covering in-demand tools, frameworks, and concepts.",
    href: "/resources/video-tutorials",
    icon: PlayCircleIcon,
  },
  {
    title: "Career Guides",
    description:
      "Explore comprehensive guides to help you navigate career transitions and growth.",
    href: "/resources/career-guides",
    icon: BookOpenIcon,
  },
  {
    title: "Downloadable Tools",
    description:
      "Grab worksheets, checklists, and planning tools you can use right away.",
    href: "/resources/downloadable-tools",
    icon: DownloadIcon,
  },
];

export default function QuickAccessSection() {
  return (
    <section
      aria-labelledby="quick-access-heading"
      className="py-16"
    >
      <div className="container mx-auto px-4">
        {/* heading */}
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary-500">
            Quick Access
          </p>
          <h2
            id="quick-access-heading"
            className="mb-3 text-3xl font-bold text-gray-900"
          >
            Resources at Your Fingertips
          </h2>
          <p className="text-base text-gray-500">
            Jump straight into the materials that match where you are in your
            journey.
          </p>
        </div>

        {/* responsive grid: 1 col → 2 col → 4 col, overflow guard */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {quickAccessItems.map((item) => (
            <QuickAccessCard
              key={item.href}
              title={item.title}
              description={item.description}
              href={item.href}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
