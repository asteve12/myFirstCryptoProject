import React from 'react';
import logo from './logo.svg';
import react, { useState } from 'react';
import style from './App.module.css';

const App: React.FC = () => {
  const [greeting, setGreeting] = useState<string>();
  const [showcard, setShowCard] = useState<boolean>(false);
  const makeCardVisible = (): void => {
    setShowCard(true);
  };
  return (
    <div className={style.App}>
      <header className={style.Appheader}>
        <label htmlFor='welcomeText'>input your complement</label>
        <input
          type='text'
          className={style.welcomeText}
          placeholder={greeting}
          onChange={(e) => setGreeting(e.target.value)}
        />
        <button className={style.printBtn} onClick={makeCardVisible}>
          print
        </button>
        {showcard ? <div className={style.labelPrintedOn}></div> : null}
      </header>
    </div>
  );
};

export default App;
