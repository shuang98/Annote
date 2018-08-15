import React, { Component } from 'react';
import $ from 'jquery';
import 'foundation-sites';
import 'foundation-sites/dist/css/foundation.min.css';
import { updateDocument, updateSelected, fetchNotes, selectSegment } from "../actions/documentActions";
import { setCurrentPage } from "../actions/pageActions";
import ToolBar from "./ToolBar";
import Annotator from "./Annotator";

class DocumentView extends Component {

  constructor(props) {
    super(props);
    this.renderDocumentView = this.renderDocumentView.bind(this);
    this.handleSelectSegment = this.handleSelectSegment.bind(this);
  }

  componentDidMount() {
    fetch('/api/' +
      this.props.location.pathname.substring(3)
    ).then((response) => {
      return response.json();
    }).then((response) => {
      this.props.dispatch(updateDocument(response.data));
      this.props.dispatch(fetchNotes(response.data.url));
      this.props.dispatch(setCurrentPage('DocumentView'));
    })
  }

  handleSelectSegment(e) {
    console.log(e.target.id)
    if (e.target.id == this.props.doc.selectedSegment) {
      this.props.dispatch(selectSegment(-1));
    } else {
      this.props.dispatch(selectSegment(parseInt(e.target.id)));
    }
  }

  renderDocumentView() {
    let document = this.props.doc.document;
    let highlight = { backgroundColor: '#b3e6ff' };
    let mark = { backgroundColor: 'yellow' };
    let body = document.body.split(' ');
    let selectedSegment = this.props.doc.selectedSegment;
    if (!this.props.doc.segments) {
      return null;
    }
    let segments = this.props.doc.segments.map((segment, index) => {
      if (segment[2].length > 0) {
        return (
          <span id={index} key={index} style={index == selectedSegment ? mark : highlight}
            onClick={this.handleSelectSegment}>
            {body.slice(segment[0], segment[1] + 1).join(' ') + ' '}
          </span>
        )
      }
      return (
        <span id={index} key={index}>{body.slice(segment[0], segment[1] + 1).join(' ') + ' '}</span>
      )
    });
    let selectedNotes = []
    if (selectedSegment >= 0) {
      selectedNotes = this.props.doc.segments[selectedSegment][2];
    }
    selectedNotes = selectedNotes.map((note, index) => {
      return (
        <div key={index} className="primary callout">
          <b>Author:</b> {note.author} <br />
          <strong>Quote:</strong> <i>"{body.slice(note.start_index, note.end_index + 1).join(" ")}"</i>
          <br />
          <b>Note: </b> {note.body}
        </div>
      )
    });
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
                {segments}
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
            <h4>Notes: </h4>
            {selectedNotes}
          </div>
        </div>
      </div>
    )
  }

  render() {
    let view = (<div></div>);
    if (this.props.page.currentPage === "Annotating") {
      view = (<Annotator {...this.props}/>);
    } else if (this.props.page.currentPage === "DocumentView") {
      view = this.renderDocumentView();
    } else {
      return (
        <div></div>
      );
    }
    return (
      <div>
        <ToolBar {...this.props} />
        {view}
      </div>
    )
  }
}

export default DocumentView;