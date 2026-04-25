import { useState } from 'react';
import Login from '../safeflood-frontend/src/pages/Login';
import Home from '../safeflood-frontend/src/pages/Home';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  return (
    <div>
      {isAuthenticated ? (
        <Home />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
}

export default App;