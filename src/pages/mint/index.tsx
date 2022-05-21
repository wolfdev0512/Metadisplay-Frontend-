import React, { useState, useEffect } from "react";

// @context
import { useEthContext } from "context/EthereumContext";

// @styled-components
import {
  Layout,
  MintForm,
  MintSoon,
  ImageLayout,
  ImageContainer,
  TextSupply,
  MintLayout,
  Text,
} from "./styled";

// @smartContract
import contract_abi from "contract/abi.json";
import { contract_address } from "contract/contract_address";

// @assets
import NFTImage from "assets/nfts.gif";

// @component
import { MintButton } from "components/Button";
import { MintInput } from "components/Input";

// @backend
import axios from "axios";

// @Toast
import { toast } from "react-toastify";

const BACKEND = "http://localhost:9000/";

//-------------------------------------------------------------------------
const Mint: React.FC = () => {
  const { provider, account, web3 } = useEthContext();

  const [loading, setLoading] = useState(false);

  const [supply, setSupply] = useState(0);
  const [status, setStatus] = useState(2);

  const [presale_price, setPresale_price] = useState(0);
  const [public_price, setPublic_price] = useState(0);
  const [max_wallet, setMax_wallet] = useState(20);
  const [mintable, setMintable] = useState(20);
  const [mintPrice, setMintPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [is_List, setIs_List] = useState(true);

  useEffect(() => {
    getInfo();
  }, [account]);

  const getInfo = async () => {
    const contract = new web3.eth.Contract(contract_abi, contract_address);

    const temp_presale_price = await contract.methods.PRESALE_PRICE().call();
    setPresale_price(temp_presale_price);

    const temp_public_price = await contract.methods.PUBLIC_PRICE().call();
    setPublic_price(temp_public_price);

    const temp_max_wallet = await contract.methods.MAX_PER_WALLET().call();
    setMax_wallet(temp_max_wallet);

    if (account !== "") {
      const proof = await axios.get(BACKEND + `get/${account}`).then((res) => {
        return res.data.proof;
      });

      const isWhitelisted = await contract.methods
        .isWhitelist(proof)
        .call({ from: account });
      setIs_List(isWhitelisted);
    }
  };

  useEffect(() => {
    if (web3) {
      const contract = new web3.eth.Contract(contract_abi, contract_address);

      const interval = setInterval(async () => {
        await contract.methods
          .totalSupply()
          .call()
          .then((res: number) => {
            setSupply(res);
          });

        const presaleOpen = await contract.methods.presaleOpen().call();

        const publicSaleOpen = await contract.methods.publicSaleOpen().call();
        if (presaleOpen === true) {
          if (is_List === true) {
            if (account !== "") {
              const owneramount = await await contract.methods
                .balanceOf(account)
                .call();
              setMintable(max_wallet - owneramount);
              if (amount > max_wallet - owneramount) {
                setAmount(max_wallet - owneramount);
              }
            } else {
              setMintable(0);
            }
          } else {
            setMintable(0);
          }
        } else {
          setMintable(2000);
        }

        if (publicSaleOpen) {
          setStatus(2);
        } else {
          if (presaleOpen) {
            setStatus(1);
          } else {
            setStatus(0);
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [web3, account, max_wallet, is_List]);

  useEffect(() => {
    if (status === 1) {
      setMintPrice(presale_price);
    }
    if (status === 2) {
      setMintPrice(public_price);
      setMintable(2000);
    }
  }, [status, presale_price, public_price]);

  const handleConnectWallet = async () => {
    if (provider) {
      await provider.request({ method: `eth_requestAccounts` });
    } else {
      alert("Please install your Metamask wallet in this browser");
    }
  };

  const handleNFTMint = async () => {
    if (amount !== 0) {
      setLoading(true);
      const proof = await axios.get(BACKEND + `get/${account}`).then((res) => {
        return res.data.proof;
      });
      const contract = new web3.eth.Contract(contract_abi, contract_address);
      if (status === 1) {
        await contract.methods
          .whitelistMint(amount, proof)
          .send({
            from: account,
            value: amount * mintPrice,
          })
          .on("receipt", (receipt: string) => {
            toast("Mint success!");
            setMintable(mintable - amount);
            setAmount(0);
            setLoading(false);
          })
          .on("error", (error: string) => {
            toast.error("Mint failure!", {
              theme: "dark",
            });
            setAmount(0);
            setLoading(false);
          });
      }
      if (status === 2) {
        await contract.methods
          .mint(amount)
          .send({
            from: account,
            value: amount * mintPrice,
          })
          .on("receipt", function (receipt: string) {
            toast("Mint success!");
            setAmount(0);
            setLoading(false);
          })
          .on("error", function (error: string) {
            toast.error("Mint failure!", {
              theme: "dark",
            });
            setAmount(0);
            setLoading(false);
          });
      }
    } else {
      toast.error("Please check amount", { theme: "dark" });
    }
  };

  return (
    <Layout>
      <MintForm>
        {status !== 0 ? (
          <>
            <ImageLayout>
              <ImageContainer>
                <img src={NFTImage} alt="No Image" />
              </ImageContainer>
              <TextSupply>{supply} / 10000</TextSupply>
            </ImageLayout>
            <MintLayout>
              <Text>{status === 1 ? "Presale" : "Public sale"}</Text>
              <Text>Price: {mintPrice / 1000000000000000000} ETH</Text>
              {mintable !== 0 && status === 1 && (
                <Text>Mintable NFTs: {mintable}</Text>
              )}
              <Text>
                Address:{" "}
                {account
                  ? `${account.substring(0, 6)}...${account.substring(38)}`
                  : "------"}
              </Text>

              <MintInput
                amount={amount}
                setAmount={setAmount}
                mintable={mintable}
              />
              <MintButton
                loading={loading}
                currentAcc={account}
                mintable={mintable}
                status={status}
                isList={is_List}
                connect={handleConnectWallet}
                mint={handleNFTMint}
              />
            </MintLayout>
          </>
        ) : (
          <MintSoon>Mint Soon</MintSoon>
        )}
      </MintForm>
    </Layout>
  );
};

export default Mint;
