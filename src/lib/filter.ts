export interface FilterableProject {
  categories: string[];
  status: string;
  search: string;
}
export interface Filters {
  category: string;
  status: string;
  query: string;
}
export function matchesProject(
  project: FilterableProject,
  filters: Filters,
): boolean {
  return (
    (filters.category === 'all' ||
      project.categories.includes(filters.category)) &&
    (filters.status === 'all' || project.status === filters.status) &&
    project.search.toLowerCase().includes(filters.query.trim().toLowerCase())
  );
}
