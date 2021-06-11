import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import decoder from 'jwt-decode';
import { Provider } from 'react-redux';
import axios from 'axios';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import User from './pages/User';
import ProtectedRoute from './ProtectedRoute';

import NavBar from './components/layout/NavBar';

import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';

import './App.css';

const { Content } = Layout;

const token = localStorage.MNKToken;
if (token) {
  const decodedToken = decoder(token);
  if ((decodedToken.exp * 1000) < Date.now()) {
    window.location.replace("/login");
    store.dispatch(logoutUser())
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <NavBar />
          <Layout>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route exact path="/" component={Home} />
                <ProtectedRoute path="/login" component={Login} />
                <ProtectedRoute path="/signup" component={Signup} />
                <Route exact path="/user/:handle" component={User} />
                <Route exact path="/user/:handle/scream/:screamId" component={User} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
