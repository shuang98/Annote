import React, { Component } from 'react';
import $ from 'jquery';
import 'foundation-sites/dist/css/foundation.min.css';
import './styles/top-bar.css';
import { setCurrentPage } from "../actions/pageActions";
import { NavLink } from 'react-router-dom';
window.$ = window.jQuery = $;
require('foundation-sites/dist/js/foundation.js');

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    $(document).foundation();
  }

  handlePageChange(page) {
    let dispatch = this.props.dispatch;
    function handler(e) {
      dispatch(setCurrentPage(page));
    }
    return handler;
  }

  render() {
    let page = this.props.page.currentPage;
    return (
      <div>
        <div className="top-bar">
          <div className="top-bar-left">
            <ul className="menu" data-dropdown-menu>
              <li className={page === 'Home' ? 'is-active' : null}
                onClick={this.handlePageChange('Home')}>
                <NavLink to='/'><strong>Annote</strong></NavLink>
              </li>
              <li className={page === 'Upload_Document' ? 'is-active' : null}
                onClick={this.handlePageChange('Upload_Document')}>
                <NavLink to='/upload'>Upload</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default TopBar;