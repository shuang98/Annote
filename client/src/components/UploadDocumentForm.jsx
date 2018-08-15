import React, { Component } from 'react';
import $ from 'jquery';
import 'foundation-sites/dist/css/foundation.min.css';
import { updateDocument, fetchNotes, invalidArguments } from "../actions/documentActions";
import { setCurrentPage } from "../actions/pageActions";

class UploadDocumentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { prompt: '', body: '', title: '' };
    this.handleTitle = this.handleTitle.bind(this);
    this.handlePrompt = this.handlePrompt.bind(this);
    this.handleBody = this.handleBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitle(e) {
    this.setState({ title: e.target.value });
  }

  handlePrompt(e) {
    this.setState({ prompt: e.target.value });
  }

  handleBody(e) {
    this.setState({ body: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    let doc = {
      title: this.state.title,
      body: this.state.body,
      prompt: this.state.prompt
    }
    fetch('/api', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doc)
    }).then(response => {
      return response.json();
    }).then(response => {
      if (response.status == "error") {
        this.props.dispatch(invalidArguments("Invalid Arguments. Please try again"));
        this.submitDom.blur();
      } else {
        this.props.dispatch(updateDocument(response.document));
        this.props.dispatch(setCurrentPage('DocumentView'));
        this.props.dispatch(fetchNotes(response.document.url));
        this.props.history.push('/d/' + response.document.url);
      }
    });
  }

  render() {
    let error = false;
    let doc = this.props.doc;
    if (doc.error) {
      error = (<div className="callout alert">
        {doc.error}
      </div>)
    }
    return (
      <div className="callout">
        <h2>Upload Document</h2>
        {error}
        <form onSubmit={this.handleSubmit}>
          <label> Title
            <input type="text" onChange={this.handleTitle} />
          </label>
          <label> Prompt
            <textarea rows="5" onChange={this.handlePrompt} />
          </label>
          <label> Body
            <textarea rows="20" onChange={this.handleBody} />
          </label>
          <input ref={(submitDom) => {this.submitDom = submitDom}} type="submit" className="button" />
        </form>
      </div>
    );
  }
}

export default UploadDocumentForm;