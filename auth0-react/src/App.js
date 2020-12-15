import logo from './logo.svg';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  user && console.log(user);
  return (
    <div className="App">
      <div className="real-header">
        {user && (<Profile />)}
        {!isAuthenticated ? (<button onClick={loginWithRedirect}>Log in</button>) :
          (<button onClick={() => {
            logout({ returnTo : window.location.origin})
          }}>Log out</button>)}
      </div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Status />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

      </header>
    </div>
  );
}

const Profile = () => {
  const { user } = useAuth0();

  return <div>Hello, {user.name}</div>;
}

const Status = () => {
  const { isLoading, error } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>Oops... {error.message}</div>
  }
  return <></>;
}

export default App;