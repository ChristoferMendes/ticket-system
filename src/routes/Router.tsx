import { ReactComponentElement, ReactElement, useContext } from 'react';
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth';
import SignIn from '../pages/Auth/SignIn';

interface RouteWrapperComponents {
  loggedComponent: ReactElement;
  defaultComponent?: ReactElement;
  isPrivate?: boolean;
}

export default function RouteWrapper({loggedComponent, defaultComponent = <SignIn />, isPrivate}: RouteWrapperComponents) {
  // const [auth, loadingPage] = [false, false];
  const { auth, loading } = useContext(AuthContext)

  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  };

  if (auth && !isPrivate) {
    return <Navigate to={'/dashboard'} />
  } else if (!auth && isPrivate) {
    return <Navigate to='/'/>
  }

  
  return auth ? loggedComponent : defaultComponent;
}