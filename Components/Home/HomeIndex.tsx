import React, { useState } from 'react';
import Form from './Form';
import Templates from './Templates';

const Home: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <div>
      {isLoggedIn ? <button onClick={() => setIsLoggedIn(false)}>Log out</button> : <button onClick={() => setIsLoggedIn(true)}>Log in</button>}
      <Templates isLoggedIn={isLoggedIn} />
      <Form isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Home;