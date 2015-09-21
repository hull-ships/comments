import DropdownMenu from './dropdown-menu';
import React from 'react';
import Icon from './icon';
import capitalize from '../lib/capitalize';
import { translate } from '../lib/i18n';

const ICONS = {
  newest:'chevron_down',
  best:  'heart',
  oldest:'chevron_up'
}
var SortMenu = React.createClass({

  handleChange: function(val) {
    this.props.actions.orderBy(val.value);
  },

  getTitle: function() {
    return <span><Icon name={ICONS[this.props.orderBy]}/>{translate(capitalize(this.props.orderBy))}</span>;
  },

  getOptions: function() {
    return ['best', 'newest', 'oldest'].map(function(opt) {
      return { value: opt, label: <span><Icon name={ICONS[opt]}/>{translate(capitalize(opt))}</span> }
    });
  },

  render: function() {
    return <DropdownMenu
      className={{'has-dropdown':true, 'sorting':true}}
      component="li"
      right
      inNavBar
      options={this.getOptions()}
      title={this.getTitle()}
      value={this.props.orderBy}
      onSelect={this.handleChange} />
  }
});

module.exports = SortMenu