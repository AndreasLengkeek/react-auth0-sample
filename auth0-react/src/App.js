import logo from './logo.svg';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

function App() {
  const { isAuthenticated, loginWithRedirect, logout, user, getAccessTokenSilently } = useAuth0();
  const [secureMessage, setSecureMessage] = useState("-");

  user && console.log(user);

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log(`secure token retrieved: ${token}`);

      const response = await fetch(
        `http://localhost:7071/api/HttpHelloWorld`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const responseData = await response.text();

      setSecureMessage(responseData);

    } catch (error) {
      console.error(error.message);
    }
  }


  return (
    <div className="App">
      <div className="real-header">
        {user && (<Profile />)}
        {!isAuthenticated ? (<button onClick={loginWithRedirect}>Log in</button>) :
          (<button onClick={() => {
            logout({ returnTo : window.location.origin })
          }}>Log out</button>)}
      </div>
      {isAuthenticated && (
      <div>
        <button onClick={callSecureApi}>Get secure message</button>
        <p>{secureMessage}</p>
      </div>)}
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