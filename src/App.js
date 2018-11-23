import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Desktop, Mobile } from './components/Export';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: false};
  }

  handleButtonClick = visible => this.setState({ visible });

  render() {
    const { visible } = this.state;
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
            {
              window.screen.width >= 1024 && <Desktop />
            }
            {
              window.screen.width < 1024 && <Mobile handleClick={this.handleButtonClick} visible={visible} />
            }
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
