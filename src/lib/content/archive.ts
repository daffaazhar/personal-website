import { getPublishedExperience } from '@/lib/content/experience';
import { getNotes } from '@/lib/content/notes';
import { getProjects } from '@/lib/content/projects';
import { getRetrospectives } from '@/lib/content/retrospectives';
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
  const notes = await getNotes();
  const retrospectives = getRetrospectives();
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
      title: 'Notes',
      count: notes.length,
      entries: notes.map((note) => ({
        title: note.title,
        href: `/notes/${note.slug}`,
        meta: note.publishedAt.slice(0, 7),
      })),
    },
    {
      title: 'Retrospectives',
      count: retrospectives.length,
      entries: retrospectives.map((retrospective) => ({
        title: retrospective.title,
        href: null,
        meta: String(retrospective.year),
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
