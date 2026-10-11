import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesProject } from '../src/lib/filter.ts';

test('category, stage and text filters combine correctly, including multi-discipline projects', () => {
  const project = {
    categories: ['interactive', 'design'],
    status: 'complete',
    search: 'pTable App development & interface design',
  };
  assert.equal(
    matchesProject(project, {
      category: 'design',
      status: 'complete',
      query: ' PTABLE ',
    }),
    true,
  );
  assert.equal(
    matchesProject(project, { category: 'film', status: 'all', query: '' }),
    false,
  );
  assert.equal(
    matchesProject(project, { category: 'all', status: 'progress', query: '' }),
    false,
  );
  assert.equal(
    matchesProject(project, {
      category: 'all',
      status: 'all',
      query: 'missing',
    }),
    false,
  );
  assert.equal(
    matchesProject(project, { category: 'all', status: 'all', query: '' }),
    true,
  );
});
