const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require('web3');
const {interface,bytecode} = require("./build/CampaignFactory.json");
const provider = new HDWalletProvider("cushion pencil tuition atom blood explain envelope burst hold three jeans sorry",
                                      "https://rinkeby.infura.io/Ee0gOg7a6ej48IE0m8fO");
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await new web3.eth.getAccounts();
  console.log(`Attempting to deploy from ${accounts[0]}`);
  const deployed = await new web3.eth.Contract(JSON.parse(interface))
                .deploy({ data: bytecode })
                .send( { from: accounts[0] , gas: "1000000"} );
  console.log("Contract deployed to " + deployed.options.address);
};
deploy();
