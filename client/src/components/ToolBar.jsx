import React, { Component } from 'react';
import $ from 'jquery';
import 'foundation-sites/dist/css/foundation.min.css';
import './styles/tool-bar.css'
import { setCurrentPage } from "../actions/pageActions";

class ToolBar extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (this.props.page.currentPage == 'Annotating') {
      this.props.dispatch(setCurrentPage('DocumentView'));
    } else {
      this.props.dispatch(setCurrentPage('Annotating'));
    }
  }

  render() {
    let buttonText = 'Add Note';
    let status = 'Document View';
    if (this.props.page.currentPage == 'Annotating') {
      buttonText = 'Cancel';
      status = 'Annotating';
    }
    return (
      <div>
        <div className="top-bar tool-bar">
          <div className="top-bar-left">
            <ul className="menu">
              <li className="menu-text">{status}</li>
            </ul>
          </div>
          <div className="top-bar-right">
            <ul className="menu">
              <li>
                <button onClick={this.handleClick}
                  className={(buttonText == 'Add Note' ? '' : "alert ") + "button"}>
                  {buttonText}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ToolBar;