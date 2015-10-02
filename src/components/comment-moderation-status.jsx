import React from 'react';
import { translate } from '../lib/i18n';
import styles from '../styles/main.scss';
import cssModules from '../lib/cssModules';


const CommentModerationStatus = React.createClass({
  propTypes: {
    moderation_status: React.PropTypes.oneOfType([
      React.PropTypes.oneOf([null]),
      React.PropTypes.string,
    ]),
    isCurrentUser: React.PropTypes.bool,
  },

  render() {
    const {
      moderation_status: status,
      isCurrentUser,
    } = this.props;
    let message;

    if (!isCurrentUser || status === null || status === 'approved') { return <noscript/>; }

    if (status === 'pending') {
      message = translate('Your comment is awaiting moderation');
    } else {
      message = translate('Your comment has been marked as {status}', { status: status });
    }

    return <small className="light-text">{message}</small>;
  },

});

module.exports = cssModules(CommentModerationStatus, styles);