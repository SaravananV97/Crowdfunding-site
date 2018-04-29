const assert = require('assert');
const Web3 = require('web3');
const ganache = require("ganache-cli");
const provider = ganache.provider();
const web3 = new Web3(provider);
const compiledCampaign = require("../ethereum/build/Campaign.json");
const compiledFactory = require("../ethereum/build/CampaignFactory.json");

let accounts;
let campaignAddress;
let CampaignFactory;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  campaignFactory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
                            .deploy({data: compiledFactory.bytecode})
                            .send({from: accounts[0], gas: "1000000"});
  await campaignFactory.methods.createCampaign("100").send({from: accounts[0],gas:"1000000"});
  [campaignAddress] = await campaignFactory.methods.getDeployedContracts().call();
  campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress);
});

describe("Factory and Campaign Contracts test", () => {
  it("Should deploy the contracts", () => {
    assert.ok(campaignFactory.options.address);
    assert.ok(campaign.options.address);
  });
  it("Should set manager correctly", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(manager,accounts[0]);
  });
  it("Should allow people to donate money for campaign",async () => {
    await campaign.methods.makeDonation().send({from: accounts[1], value: "200"});
    const isDonated = await campaign.methods.donators(accounts[1]);
    assert(isDonated);
  });
  it("Should not allow donations lesser than min value",async () => {
      try{
        await campaign.methods.makeDonation().send({from: accounts[1], value: "1"});
        assert(false);
      }
      catch(e){
        assert(e)
      }
  });
  it("Should create a new spend request", async () => {
    await campaign.methods.createSpendingRequest("Rent for Servers",web3.utils.toWei("50","ether"),accounts[1])
                          .send({from: accounts[0], gas: "1000000"});
    const request =  await campaign.methods.requests(0).call();
    assert.equal(request.vendorAddress,accounts[1]);
  });
  it("Should finalize the spending request if approved by donators", async () => {
    await campaign.methods.makeDonation()
                  .send({from: accounts[2], value: web3.utils.toWei("50","ether"),gas: "1000000"});
    await campaign.methods.makeDonation()
                  .send({from: accounts[3], value: web3.utils.toWei("50","ether"),gas: "1000000"});
    await campaign.methods.createSpendingRequest("Rent for Servers",web3.utils.toWei("50","ether"),accounts[1])
                          .send({from: accounts[0], gas: "1000000"});
    await campaign.methods.approveRequest(0).send({from:accounts[2], gas: "1000000"});
    await campaign.methods.approveRequest(0).send({from:accounts[3], gas: "1000000"});
    await campaign.methods.finalizeRequest(0).send({from: accounts[0], gas: "1000000"});
    let balance = await web3.eth.getBalance(accounts[1]);
    balance = parseFloat(web3.utils.fromWei(balance,"ether"));
    assert(balance > 149);
  });
});
