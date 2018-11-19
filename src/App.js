import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import Helmet from 'react-helmet';
import fire from './firebaseConfig';
import { Desktop, Mobile, Login } from './components/Export';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: false, user: null};
  }

  componentDidMount() {
    this.authListener();
  }

  handleButtonClick = visible => this.setState({ visible });

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user_token', user.uid);
      }
      else {
        this.setState({ user: null });
        localStorage.removeItem('user_token');
      }
    });
  }

  render() {
    const { visible, user } = this.state;
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
              user &&
              <Fragment>
                {
                  window.screen.width >= 1024 && <Desktop />
                }
                {
                  window.screen.width < 1024 && <Mobile handleClick={this.handleButtonClick} visible={visible} />
                }
              </Fragment>
            }
            {
              !user && <Route exact path='/login' component={Login} />
            }
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
