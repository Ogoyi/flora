import React, { useState, useEffect, useCallback } from "react";

import Banner from "./components/Banner";
import Header from "./components/Header";

import Web3 from "web3";
import { newKitFromWeb3 } from "@celo/contractkit";
import BigNumber from "bignumber.js";

import flora from "./contracts/flora.abi.json";
import IERC from "./contracts/IERC.abi.json";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./components/Shop";
import Gift from "./components/Gift";
import MyFlowers from "./components/MyFlowers";

const ERC20_DECIMALS = 18;

const contractAddress = "0x9734cB4266ed3D586547b74dBDf1DB3e4f7F1a0f";
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1";

function App() {
  const [contract, setcontract] = useState(null);
  const [address, setAddress] = useState(null);
  const [kit, setKit] = useState(null);
  const [cUSDBalance, setcUSDBalance] = useState(0);
  const [flowers, setFlowers] = useState([]);
  const [myFlowers, setMyFlowers] = useState([]);

  const connectToWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);

        const accounts = await kit.web3.eth.getAccounts();
        const user_address = accounts[0];

        kit.defaultAccount = user_address;

        await setAddress(user_address);
        await setKit(kit);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Error Occurred");
    }
  };
  const getBalance = useCallback(async () => {
    try {
      const balance = await kit.getTotalBalance(address);
      const USDBalance = balance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);

      const contract = new kit.web3.eth.Contract(flora, contractAddress);
      setcontract(contract);
      setcUSDBalance(USDBalance);
    } catch (error) {
      console.log(error);
    }
  }, [address, kit]);

  const getFlowers = useCallback(async () => {
    const flowerLength = await contract.methods.getFlowerLength().call();
    const flowers = [];

    for (let index = 0; index < flowerLength; index++) {
      let _flowers = new Promise(async (resolve, reject) => {
        let flower = await contract.methods.getFlower(index).call();

        resolve({
          index: index,
          owner: flower[0],
          name: flower[1],
          description: flower[2],
          image: flower[3],
          price: flower[4],
          forSale: flower[5],
        });
      });
      flowers.push(_flowers);
    }

    const _flowers = await Promise.all(flowers);
    const myFlowers = _flowers.filter((flower) => flower.owner === address);
    setFlowers(_flowers);
    setMyFlowers(myFlowers);
  }, [contract]);

  const buyFlower = async (index) => {
    try {
      const cUSDContract = new kit.web3.eth.Contract(IERC, cUSDContractAddress);
      const cost = new BigNumber(flowers[index].price)
        .shiftedBy(ERC20_DECIMALS)
        .toString();
      await cUSDContract.methods
        .approve(contractAddress, cost)
        .send({ from: address });
      await contract.methods.buyFlower(index).send({ from: address });
      getFlowers();
      getBalance();
    } catch (error) {
      console.log(error);
    }
  };

  const giftFlower = async (_address, index) => {
    try {
      await contract.methods
        .giftFlower(index, _address)
        .send({ from: address });
      getFlowers();
    } catch (error) {
      console.log(error);
    }
  };

  const setForSale = async (_index) => {
    try {
      await contract.methods.setForSale(_index).send({ from: address });
      getFlowers();
    } catch (error) {
      console.log(error);
    }
  };

  const createFlower = async (
    _name,
    _description,
    _image,
    _price,
    _forSale
  ) => {
    try {
      await contract.methods
        .createFlower(_name, _description, _image, _price, _forSale)
        .send({ from: address });
      getFlowers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    connectToWallet();
  }, []);

  useEffect(() => {
    if (kit && address) {
      getBalance();
    }
  }, [kit, address, getBalance]);

  useEffect(() => {
    if (contract) {
      getFlowers();
    }
  }, [contract, getFlowers]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Banner />} />

        <Route
          path="/shop"
          element={
            <Shop
              flowers={flowers}
              buyFlower={buyFlower}
              createFlower={createFlower}
            />
          }
        />
        <Route
          path="/myflowers"
          element={<MyFlowers myFlowers={myFlowers} setForSale={setForSale} />}
        />
        <Route path="/gift/:id" element={<Gift giftFlower={giftFlower} />} />
      </Routes>
      <Header cUSDBalance={cUSDBalance} />
    </BrowserRouter>
  );
}

export default App;
