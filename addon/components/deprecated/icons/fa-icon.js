import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';
import layout from '../../../templates/components/deprecated/icons/fa-icon';

export default Component.extend({
  init() {
    this._super(...arguments);
  },
  tagName: 'span',
  classNames: ['legend-icon-layer'],
  layout,

  options() {},

  spanStyle: computed('options.color', function() {
    return htmlSafe(this.options.color ? `color: ${this.options.color}` : '');
  }),
});
