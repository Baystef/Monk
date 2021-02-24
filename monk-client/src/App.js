import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

import NavBar from './components/NavBar';

import './App.css';

const { Content } = Layout;

function App() {
  return (
    <div className="App">
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
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
