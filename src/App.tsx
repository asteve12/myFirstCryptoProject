import React from 'react';
import logo from './logo.svg';
import react, { useState, useEffect } from 'react';
import style from './App.module.css';
import Notify from '../src/artifacts/contracts/Notify.sol/Notify.json';
import { ethers } from 'ethers';

const notifyAddress = '0xE1c2B0Aaef6556E222c21C03b1e90731c418f296';

declare const window: Window & {
  ethereum: any;
};

const App: React.FC = () => {
  const [greeting, setGreeting] = useState<string>();
  const [showcard, setShowCard] = useState<boolean>(false);
  const [storedValue, setStoredValue] = useState<string>();
  const makeCardVisible = (): void => {
    setShowCard(true);
    printStoredString();
  };

  const storedString = async () => {
    let isMetaMaskAvailable = window.ethereum;

    if (isMetaMaskAvailable) {
      const provider = new ethers.providers.Web3Provider(isMetaMaskAvailable);
      const signer = provider.getSigner();
      const [account] = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const contract = new ethers.Contract(notifyAddress, Notify.abi, signer);
      try {
        await contract.storeText(greeting);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    storedString();
  }, [greeting]);

  const printStoredString = async () => {
    let isMetaMaskAvailable = window.ethereum;
    if (isMetaMaskAvailable) {
      const provider = new ethers.providers.Web3Provider(isMetaMaskAvailable);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(notifyAddress, Notify.abi, signer);
      try {
        let stored = await contract.welcomeText();
        setStoredValue(stored.toString());
      } catch (e) {
        console.log(e);
      }
    }
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
          printOut
        </button>
        {showcard ? (
          <div className={style.labelPrintedOn}>{storedValue}</div>
        ) : null}
      </header>
    </div>
  );
};

export default App;
