import React, { Component } from 'react';
import $ from 'jquery';
import 'foundation-sites';
import 'foundation-sites/dist/css/foundation.min.css';
import { updateSelected, updateSelectRange } from "../actions/documentActions";
import { setCurrentPage } from "../actions/pageActions";

class Annotator extends Component {
  constructor(props) {
    super(props);
    this.handleHighlight = this.handleHighlight.bind(this);
    this.handleAuthor = this.handleAuthor.bind(this);
    this.handleBody = this.handleBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleHighlight(e) {
    let selectedIndex = e.target.id;
    let newSelected = [
      ...this.props.doc.selected
    ]
    if (newSelected.every((b) => b === false)) {
      newSelected[selectedIndex] = true;
      this.props.dispatch(updateSelected(newSelected));
      this.props.dispatch(updateSelectRange([selectedIndex, selectedIndex]));
      return;
    }
    if (newSelected[selectedIndex]) {
      newSelected = newSelected.map((b) => false);
      this.props.dispatch(updateSelected(newSelected));
      this.props.dispatch(updateSelectRange([selectedIndex, selectedIndex]));      
      return;
    }
    newSelected[selectedIndex] = true;
    let right = -1;
    let left = -1;
    for (let index = 0; index < newSelected.length; index++) {
      if (newSelected[index] && left === -1) {
        left = index;
      }
      if (newSelected[newSelected.length - 1 - index] && right === -1) {
        right = newSelected.length - 1 - index;
      }
    }
    for (let index = 0; index < newSelected.length; index++) {
      if (left <= index && index <= right) {
        newSelected[index] = true;
      }
    }
    this.props.dispatch(updateSelected(newSelected));
    this.props.dispatch(updateSelectRange([left, right]));
  }

  handleBody(e) {
    this.setState({
      body: e.target.value
    })
  }

  handleAuthor(e) {
    this.setState({
      author: e.target.value
    })
  }

  handleSubmit(e) {
    let range = this.props.doc.selectRange;
    let url = this.props.doc.document.url;
    fetch('/api/' + url + '/notes', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        body: this.state.body,
        author: this.state.author,
        start_index: range[0],
        end_index: range[1],
        doc_url: url
      })
    }).then(response => {
      this.props.dispatch(setCurrentPage('DocumentView'))
    })
  }

  render() {
    let document = this.props.doc.document;
    let body = document.body.split(' ');
    let selected = this.props.doc.selected;
    let quote = selected.map((b, index) => b ? body[index] : '').reduce(
      (a, b) => {
        if (a.length == 0) {
          return b;
        }
        if(b.length > 0) {
          return a + ' ' + b;
        }
        return a;
      }
    );
    let highlight = { backgroundColor: '#b3e6ff' };

    if (document) {
      let split = document.body.split(' ');
      let body = split.map((word, index) => {
        return <span style={selected[index] ? highlight : {}} id={index} key={index} onClick={this.handleHighlight}>
          {word + ' '}
        </span>
      });
      let newline = {"white-space": "pre-line"};
      return (
        <div className="callout">
          <div className="grid-x grid-margin-x">
            <div className="cell small-9">
              <div className="callout">
                <h4>Prompt:</h4>
                <p>{document.prompt}</p>
              </div>
              <div className="callout">
                <center>
                  <h2>{document.title}</h2>
                  <p style={newline}>{body}</p>
                </center>
              </div>
              <div className="callout">
                <center>
                  <h4>Sharable Link:</h4>
                  {'localhost:3000/d/' + document.url}
                </center>
              </div>
            </div>
            <div className="cell small-3">
              <h4>Preview:</h4>
              <div className="primary callout">
                <strong>Quote:</strong> <i>"{quote}"</i>
                <form onSubmit={this.handleSubmit}>
                  <label><b>Your Note</b>
                    <textarea onChange={this.handleBody} rows="3"></textarea>
                  </label>
                  <label> <b> Your Name </b>
                    <input onChange={this.handleAuthor} type="text"/>
                  </label>
                  <input type="submit" className="button"/>
                </form>
              </div>
            </div>
          </div>
        </div>

      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default Annotator;