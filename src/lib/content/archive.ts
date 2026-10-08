import { getPublishedExperience } from '@/lib/content/experience';
import { getProjects } from '@/lib/content/projects';
import { getArticles } from '@/lib/content/writing';
import { formatExperiencePeriod } from '@/lib/dates';

export type ArchiveGroup = {
  title: string;
  count: number;
  entries: ArchiveEntry[];
};

export type ArchiveEntry = {
  title: string;
  href: string | null;
  meta: string;
};

export async function getArchiveGroups(): Promise<ArchiveGroup[]> {
  const projects = await getProjects();
  const articles = await getArticles();
  const experience = getPublishedExperience();

  return [
    {
      title: 'Work',
      count: projects.length,
      entries: projects.map((project) => ({
        title: project.title,
        href: `/work/${project.slug}`,
        meta: [project.disciplines[0], formatProjectYear(project.yearStart, project.yearEnd)]
          .filter(Boolean)
          .join(' · '),
      })),
    },
    {
      title: 'Writing',
      count: articles.length,
      entries: articles.map((article) => ({
        title: article.title,
        href: `/writing/${article.slug}`,
        meta: [article.topics[0], article.publishedAt.slice(0, 7)].filter(Boolean).join(' · '),
      })),
    },
    {
      title: 'Experience',
      count: experience.length,
      entries: experience.map((item) => ({
        title: item.role,
        href: '/about',
        meta: [item.company, formatExperiencePeriod(item.start, item.end)].join(' · '),
      })),
    },
  ];
}

function formatProjectYear(yearStart: number, yearEnd: number | null) {
  return yearEnd === null ? `${yearStart}—Now` : `${yearStart}—${yearEnd}`;
}
