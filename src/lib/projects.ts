import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export const statuses = {
  complete: 'Completed',
  development: 'In development',
  concept: 'Concept',
  archive: 'From the archive',
};
export const isInProgress = (project: Project) =>
  ['development', 'concept'].includes(project.data.status);
export const projectUrl = (project: Project) => `/work/${project.id}/`;
export const getProjects = async () =>
  (
    await getCollection(
      'projects',
      ({ data }) => import.meta.env.DEV || !data.draft,
    )
  ).sort(
    (a, b) =>
      (a.data.featured ?? 999) - (b.data.featured ?? 999) ||
      a.data.title.localeCompare(b.data.title),
  );
