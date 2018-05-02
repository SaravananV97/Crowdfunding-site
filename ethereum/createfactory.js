import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const factory = new web3.eth.Contract(JSON.parse(CampaignFactory.interface),
                          "0x083062D175f3C490A5EBA5ebEAEC71fc53734415");
// const a = async function(){
// console.log(await factory.methods.getDeployedContracts().call());
// };
// a();
export default factory;
