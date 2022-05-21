import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// @web3
import Web3 from "web3";
import { EthereumContext } from "context/EthereumContext";

// @Toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// @page
const Mint = React.lazy(() => import("./pages/mint"));

//-------------------------------------------------------------------

const App: React.FC = () => {
  const [account, setAccount] = useState<string>("");
  const [provider, setProvider] = useState<any>(null);
  const [web3, setWeb3] = useState<any>(null);

  let timer: any;

  useEffect(() => {
    if (window.ethereum) {
      handleEthereum();
    } else {
      window.addEventListener("ethereum#initialized", handleEthereum, {
        once: true,
      });
      timer = setTimeout(handleEthereum, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  useEffect(() => {
    const setCurrentlyConnectedAccount = async () => {
      let accounts = await web3.eth.getAccounts();

      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      }
    };
    if (web3) {
      setCurrentlyConnectedAccount();
    }
  }, [web3]);

  // @event : handle metamask
  const handleEthereum = () => {
    const { ethereum } = window;

    if (ethereum && ethereum.isMetaMask) {
      setProvider(ethereum);

      ethereum.on("accountsChanged", (accs: string[]) => {
        setAccount(accs[0]);
      });

      setWeb3(new Web3(ethereum));
    } else {
      window.alert("Please install Metamask");
    }
  };

  return (
    <EthereumContext.Provider
      value={{
        provider,
        web3,
        account,
      }}
    >
      <RouterManage />
      <ToastContainer />
    </EthereumContext.Provider>
  );
};

const RouterManage: React.FC = () => {
  return (
    <Suspense fallback={<></>}>
      <Router>
        <Routes>
          <Route path="/" element={<Mint />}></Route>
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
