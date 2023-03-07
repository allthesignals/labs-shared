import { Promise } from 'rsvp';
import Config from '../../config/environment';
import MaplibreGl from 'maplibre-gl';
import QUnit from 'qunit';

MaplibreGl.accessToken = Config['maplibre-gl'].accessToken;

export default function createMap() {
  return new Promise((resolve) => {
    const map = new MaplibreGl.Map({
      container: document.createElement('div'),
      style: Config['maplibre-gl'].map.style
    });

    map.style.once('data', () => resolve(map));

    const onErr = (data) => {
      QUnit.onUnhandledRejection((data && data.error) || data || 'Empty error event from maplibre-gl-js');
    };

    map.style.on('error', onErr);
    map.on('error', onErr);
  });
}
