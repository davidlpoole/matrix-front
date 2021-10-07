import React from 'react';
import { List } from './features/people/List';
import './App.css';
import './styles.scss';
import useDarkMode from './features/hooks/use-dark-mode'
import Toggle from './features/generic/Toggle';

function App() {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div className="App">
      <div className="navbar">
        <Toggle darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
      <List />
    </div>
  );
}

export default App;
