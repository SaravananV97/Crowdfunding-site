import Web3 from "web3";

let provider;
if(typeof window === "undefined" || typeof window.web3 === "undefined"){
  provider =  new Web3.providers.HttpProvider("https://rinkeby.infura.io/Ee0gOg7a6ej48IE0m8fO");
}
else
  provider = window.web3.currentProvider;

const web3 = new Web3(provider);
export default web3;
