import React, {Component} from "react";
import {Table, Button} from "semantic-ui-react";
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/project";
class RequestRow extends Component{
  handleFinalize = async (event) => {
    const address = await web3.eth.getAccounts();
    const campaign = await Campaign(this.props.address);
    await campaign.methods.finalizeRequest(this.props.id)
                           .send({from:address[0]});
  }
  handleClick = async (event) => {
    const address = await web3.eth.getAccounts();
    const campaign = await Campaign(this.props.address);
    await campaign.methods.approveRequest(this.props.id).send({from: address[0]});
  }
  render(){
    const { Cell,Row } = Table;
    const {id, request, donatorsCount} = this.props;
    const readyToFinalize = request.approvedCount > donatorsCount/2;
    return(
      <Row disabled = {request.completed} positive = {(readyToFinalize && !request.completed)}>
        <Cell>{id}</Cell>
        <Cell>{request.description}</Cell>
        <Cell>{web3.utils.fromWei(request.amount,"ether")}</Cell>
        <Cell>{request.approvedCount} out of {donatorsCount}</Cell>
        <Cell>{request.vendorAddress}</Cell>
        <Cell>{request.completed?null:(<Button onClick = {this.handleClick} color = "green" basic>Approve</Button>)}</Cell>
        <Cell>{request.completed?null:(<Button color = "green" onClick = {this.handleFinalize} inverted>Finalize</Button>)}</Cell>
      </Row>
    );
  }
}

export default RequestRow;
