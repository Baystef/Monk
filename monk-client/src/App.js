import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import decoder from 'jwt-decode';
import { Provider } from 'react-redux';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './ProtectedRoute';

import NavBar from './components/NavBar';

import store from './redux/store';

import './App.css';

const { Content } = Layout;

let authenticated;
const token = localStorage.MNKToken;
if (token) {
  const decodedToken = decoder(token);
  if ((decodedToken.exp * 1000) < Date.now()) {
    authenticated = false;
  } else {
    authenticated = true;
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
                  <ProtectedRoute exact path="/" component={Home} authenticated={authenticated} />
                  <Route path="/login" component={Login}  />
                  <Route path="/signup" component={Signup} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Router>
     </Provider>
  );
}

export default App;
