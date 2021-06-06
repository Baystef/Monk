import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const authenticated = useSelector(state => state.user.authenticated);
  console.log({authenticated});

  return (
    <Route {...rest} render={props => authenticated ? <Redirect to='/' /> : <Component {...props} />} />
  )
}

export default ProtectedRoute;
