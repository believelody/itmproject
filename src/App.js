import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Header, Main, Footer } from './components/Export';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Helmet
            title="ITMProjet"
            meta={[
              { name: 'description', content: 'Project about connection between different devices' },
              { name: 'keywords', content: 'school, gime, it, web, mobile, react' },
            ]}
            script={[
              { 'src': 'https://use.fontawesome.com/releases/v5.0.4/js/all.js'},
            ]}
            link={[
              {'rel':'stylesheet', 'href': 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'}
            ]}
          />
          <div className="app">
            <Header />
            <Main />
            <Footer />
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
