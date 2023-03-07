import carto from 'labs-shared/utils/carto';
import { isArray } from '@ember/array';
import { getProperties } from '@ember/object';
import { Promise } from 'rsvp';

const { getVectorTileTemplate } = carto;

export default function normalizeCartoVectors(pseudoMaplibreGlSources = []) {
  // coerce to an array
  const iterable = isArray(pseudoMaplibreGlSources) ? pseudoMaplibreGlSources : [pseudoMaplibreGlSources];

  // normalize into maplibre-gl source spec
  return Promise.all(iterable.map((source) => {
    const {
      id,
      type,
      minzoom = 0,
      'source-layers': sourceLayers,
    } = getProperties(source, 'id', 'type', 'minzoom', 'source-layers');

    if (type !== 'cartovector') {
      return new Promise((resolve) => {
        const { tiles, tileSize } = getProperties(source, 'tiles', 'tileSize');
        resolve({
          id,
          type,
          tiles,
          tileSize,
        });
      });
    }

    return getVectorTileTemplate(sourceLayers)
      .then(template => ({
        id,
        type: 'vector',
        tiles: [template],
        minzoom,
      }));
  }));
}
