import React from 'react';
import Icon from './icon';
import cx from 'classnames';
import DropdownMenu from './dropdown-menu';
import { translate } from '../lib/i18n';

var CommentActions = React.createClass({
  handleFlag(e) {
    e.preventDefault();
    this.props.actions.flag(this.props.comment.id);
  },

  handleDelete(e) {
    e.preventDefault();
    if (this.props.comment && this.props.comment.id) {
      this.props.actions.deleteComment(this.props.comment.id);
    }
  },

  renderActions() {
    var actions = [];

    if (this.props.user) {
      actions.push({ value: 'Spam', label: <span><Icon name='ghost'/>{translate('Mark as spam')}</span>, onClick: this.handleFlag });
    }

    if (this.props.isCurrentUser) {
      actions.push({
        value: 'Delete',
        label: <span><Icon name='trash'/>{translate('Delete')}</span>,
        onClick: this.handleDelete
      });
    }

    if (actions.length == 0) { return; }
    return <DropdownMenu component='li' options={actions} title={<Icon name='cog' size={16}/>} />;
  },

  render() {
    return (
      <ul className="comment-actions light-text">
        {this.renderActions()}
      </ul>
    );
  }
});

module.exports = CommentActions;
