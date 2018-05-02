import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const factory = new web3.eth.Contract(JSON.parse(CampaignFactory.interface),
                          "0x9256D47B7D3bE41F6D2fd288b9aEC10b1FcA17d2");
// const a = async function(){
// console.log(await factory.methods.getDeployedContracts().call());
// };
// a();
export default factory;
