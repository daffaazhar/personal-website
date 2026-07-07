import { getExperience } from '@/lib/content/experience';
import { getNotes } from '@/lib/content/notes';
import { getProjects } from '@/lib/content/projects';
import { getRetrospectives } from '@/lib/content/retrospectives';
import { getArticles } from '@/lib/content/writing';

export type ArchiveGroup = {
  title: string;
  count: number;
  entries: ArchiveEntry[];
};

export type ArchiveEntry = {
  title: string;
  href: string;
  meta: string;
};

export function getArchiveGroups(): ArchiveGroup[] {
  const projects = getProjects();
  const articles = getArticles();
  const notes = getNotes();
  const retrospectives = getRetrospectives();
  const experience = getExperience();

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
        href: `/writing/${retrospective.slug}`,
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

function formatExperiencePeriod(start: string, end: string | null) {
  return end === null ? `${start}—Now` : `${start}—${end}`;
}
