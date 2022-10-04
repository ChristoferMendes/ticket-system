import { ReactComponentElement, ReactElement, useContext } from 'react';
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth';

interface RouteWrapperComponents {
  loggedComponent: ReactElement;
  defaultComponent: ReactElement;
  isPrivate?: boolean;
}

export default function RouteWrapper({loggedComponent, defaultComponent, isPrivate}: RouteWrapperComponents) {
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