pragma solidity ^0.4.17;

/* This Smart Contract enables the users to start a new campaign/project. */
contract CampaignFactory{
  /* Array of deployed smart contracts in which each index of the array has
  the address of the ethereum network node to which the contract is deployed  */
    address[] public deployedContracts;
        constructor() public{} /*default constructor */
  /* Function createCampaign enables the user to create a new project whenever its
  called its parameter is minimum amount of donation the other users can provide for
  a project. "msg.sender" implies the creator of the contract's address. */
    function createCampaign(uint minAmount) public{
        address ContractAddress = new Campaign(msg.sender,minAmount,description);
        deployedContracts.push(ContractAddress);
    }
/* Function getDeployedContracts() simply returns the array of deployed smart contracts */
    function getDeployedContracts() public view returns(address[]){
        return deployedContracts;
    }
}
/* This smart contract implies the project created by the user of the kickstarter  */
contract Campaign{
    address public manager; /*creator of the project */
    /* Request to donators for spending their donated money for the project. */
    struct SpendingRequest{
        bool completed;
        string description;
        uint amount; /* amount of ether to transact */
        address vendorAddress; /*The donated ethers will be sent to this address if donators approved*/
        uint approvedCount; /*counting how many donators approved */
        mapping(address => bool) approvers; /*HashMap of approvers address as key
                                and isApproved as value.*/
    }
    SpendingRequest[] public requests; /*Creators can make multiple requests*/
    mapping(address => bool) public donators; /*HashMap of donators address*/
    uint public donatorsCount;
    uint public minDonation;
    constructor(address userAddress ,uint min) public{
        manager = userAddress;
        minDonation = min;
    }
/* Function makeDonation() enables the others to make donations   */
    function makeDonation() public payable{
        require(msg.value >= minDonation); /*the amount of donation must be higher than minValue */
        donators[msg.sender] = true; /*Donators address is stored */
        donatorsCount++; /*increment donators count */
    }
/*Function createSpendingRequest is for enabling the manager to create a spending request */
    function createSpendingRequest(string description, uint requiredAmount, address recipient) public restricted{
        SpendingRequest memory request =  SpendingRequest({
            description:description,
            amount:requiredAmount,
            vendorAddress: recipient,
            approvedCount: 0,
            completed: false    /*indicates the spending request status */
        });
        requests.push(request); /* add to array of SpendingRequests*/
    }
/* Function approveRequest enables donators to approve SpendingRequest */
    function approveRequest(uint index) public{
        require(donators[msg.sender]); /*to approve a request, they must be a donator */
        require(!requests[index].approvers[msg.sender]); /*The donators can approve only once*/
        requests[index].approvers[msg.sender] = true; /*make the donator as approved guy */
        requests[index].approvedCount ++; /*increment approved count */
    }
/* Function finalizeRequest enables the manager to finalize a SpendingRequest */
    function finalizeRequest(uint index) public restricted{
        SpendingRequest memory request = requests[index]; /*retrive a particular request*/
        require(!request.completed); /* It must not be completed */
        require(request.approvedCount > (donatorsCount/2)); /*More than 50 % of donators must be approved */
        requests[index].completed = true;
        request.vendorAddress.transfer(request.amount); /* transfer the amount to the vendor */
    }
/*This Modifier ensures that only manager is creating and finalizing the spending request*/
    modifier restricted{
        require(msg.sender == manager);
        _;
/* If above condition is met, the code in the function with restricted
keyword will be executed. The "_" is neccesary for a modifier. */
    }
    function getProjectSummary() public view returns(uint,uint,address,uint,uint){
      return(
            address(this).balance,
            minDonation,
            manager,
            requests.length,
            donatorsCount
          );
    }
    function getRequestsCount() public view returns(uint){
        return requests.length;
    }
}
