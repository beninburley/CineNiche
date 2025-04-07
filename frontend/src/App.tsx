import { useState } from 'react';

import './App.css';
import Homepage from './HomepageComplete/Homepage';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Homepage />
    </>
  );
}

export default App;
