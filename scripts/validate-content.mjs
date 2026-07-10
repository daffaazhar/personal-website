import { loadRepositoryContent, validatePublishedCollections } from './lib/content-audit.mjs';

const collections = await loadRepositoryContent();
validatePublishedCollections(collections);

console.log('Published content validation passed.');
