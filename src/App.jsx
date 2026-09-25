import { useState } from 'react';
import Login from './components/Login.jsx';
import Success from './components/Success.jsx';

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  return signedIn ? <Success /> : <Login onSuccess={() => setSignedIn(true)} />;
}
