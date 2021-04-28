import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route {...rest} render={props => authenticated === true ?  <Component {...props} /> : <Redirect to='/login' />} />
)

export default ProtectedRoute;

