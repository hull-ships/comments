import React from 'react';
import cx from 'classnames';
import { translate } from '../lib/i18n';
import DropdownMenu from './dropdown-menu';
import Icon from './icon';
import _ from '../lib/lodash';

const EmailLogin = React.createClass({
  getInitialState() {
    return {
      newUser: {},
      tab:'login'
    };
  },

  showTab(tab, e){
    e.preventDefault();
    this.props.actions.clearErrors()
    this.setState({tab:tab});
  },

  signup(e) {
    e.preventDefault();
    this.props.actions.signup(this.state.newUser);
  },

  login(e) {
    e.preventDefault();
    this.props.actions.login({login:this.state.newUser.email,password:this.state.newUser.password});
  },

  recover(e) {
    e.preventDefault();
    this.props.actions.resetPassword({email:this.state.newUser.email});
  },

  handleChange(e) {
    var newUser = this.state.newUser || {};
    this.props.actions.clearErrors()
    newUser[e.target.name] = e.target.value;
    this.setState({ newUser: newUser });
  },

  renderEmailPasswordForm(action){
    var txt = this.state.tab==='login' ? 'Log in' : 'Sign up'
    return <span>
      {this.renderEmailField()}
      <p className="input-wrapper">
        <input type="password" placeholder={translate('Password')} name="password" value={this.state.newUser.password}  onChange={this.handleChange}  />
      </p>
      <a onClick={action} className='tiny button round expand success'>
        <Icon name='chevron_right' settings={this.props.settings} colorize style={{width:24}}/>
      </a>
    </span>
  },

  renderRecoverForm(){
    if(this.props.status && this.props.status.resetPassword){
      var message = <p className="message-block text-center">
        <small>
          {translate(this.props.status.resetPassword.message, { email:this.state.newUser.email })}
        </small>
      </p>
    }
    return <span>
      {this.renderEmailField()}
      <button className="small button round expand success" onClick={this.recover}><strong>{translate('Send reset link')}</strong></button>
      {message}
    </span>
  },

  renderEmailField(){
    return <p className="input-wrapper">
      <input type="email" placeholder={translate('Email')} name="email" value={this.state.newUser.email} onChange={this.handleChange}  />
    </p>
  },

  renderNavBar(){
    var isLogin = this.state.tab=='login';
    var isRegister = this.state.tab=='register';
    var isRecover = this.state.tab=='recover';

    return <nav className="top-bar expanded nav-bar">
      <section className="top-bar-section">
        <ul className='tab-full'>
          <li className={cx({'tab-title':true,'active':isLogin})}><a onClick={this.showTab.bind(this,'login')}>{translate('Log in')}</a></li>
          <li className={cx({'tab-title':true,'active':isRegister})}><a onClick={this.showTab.bind(this,'register')}>{translate('Sign up')}</a></li>
        </ul>
      </section>
    </nav>
  },

  getTabStyle() {
    var tab = this.state.tab;
    return _.reduce(['login', 'register', 'recover'], function(m, t) {
      m[t] = { display: t == tab ? 'block' : 'none' }
      return m;
    }, {});
  },

  render() {
    if (!this.props.formIsOpen) { return <noscript/>; }

    var isLogin = this.state.tab == 'login';
    var isRegister = this.state.tab == 'register';
    var isRecover = this.state.tab == 'recover';

    if(this.props.error && this.props.error.provider=='email'){
      var error = <div className="error-block">{this.props.error.message}</div>;
    }

    var styles = this.getTabStyle();
    return (
      <div className="register" style={{clear: 'both'}}>
        {this.renderNavBar()}
        {error}
        <div className="tabs-content" style={{padding:"0 1rem"}}>
          <div className={cx({'content':true, 'active':isLogin})} style={styles.login}>
            {this.renderEmailPasswordForm(this.login)}
            <div className="text-center"><strong><a href="#" onClick={this.showTab.bind(this,'recover')}>{translate('Forgot Password?')}</a></strong></div>
          </div>

          <div className={cx({'content':true, 'active':isRecover})} style={styles.recover}>
            {this.renderRecoverForm()}
          </div>

          <div className={cx({'content':true, 'active':isRegister})} style={styles.register}>
            <p className="input-wrapper">
              <input type="text" placeholder={translate('Name')} name="name" value={this.state.newUser.name} onChange={this.handleChange} />
            </p>
            {this.renderEmailPasswordForm(this.signup)}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = EmailLogin;