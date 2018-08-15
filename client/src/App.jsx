import React, { Component } from 'react';
import TopBar from './components/TopBar'
import UploadDocumentForm from './components/UploadDocumentForm'
import DocumentView from "./components/DocumentView";
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <TopBar page={this.props.page} dispatch={this.props.dispatch} />
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route exact path='/upload'
            render={(props) => <UploadDocumentForm {...props} {...this.props} dispatch={this.props.dispatch} />}>
          </Route>
          <Route exact path='/d/:id'
            render={(props) => <DocumentView {...props} {...this.props}/>}>
          </Route>
        </Switch>
      </div>
    );
  }
}

const Home = () => {
  return (
    <div>
      <h1>Welcome to Annote.</h1>
      <span>Click the upload tab to upload a sharable document</span>
    </div>
  );
};

export default withRouter(connect(
  (state) => {
    return state;
  }
)(App));
