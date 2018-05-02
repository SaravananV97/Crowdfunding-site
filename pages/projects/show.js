import React, { Component } from "react";
import Layout from "../../Components/Layout";
import Project from  "./project";
import {Link} from "../../routes";
import web3 from "../../ethereum/web3";
import Donate from "../../Components/donate";
import {Card, Grid, Button} from "semantic-ui-react";
class ShowComponent extends Component{
  static async getInitialProps(props){
    const project = Project(props.query.address)
    const projectSummary = await project.methods.getProjectSummary().call();
    return {
      address: props.query.address,
      balance: projectSummary[0],
      minDonation: projectSummary[1],
      manager: projectSummary[2],
      requestsCount: projectSummary[3],
      donatorsCount: projectSummary[4]
    };
  }
  renderSummary(){
    const {balance, minDonation, manager, requestsCount, donatorsCount} = this.props;
    const items = [
      {
        header: manager,
        description: 'Owner of the Project',
        style:{overflowWrap:"break-word"}
      },
      {
        header: donatorsCount,
        description: 'Number of Donations made',
      },
      {
        header: requestsCount,
        description: 'Number of Spending requests made',
      },
      {
        header: web3.utils.fromWei(balance,"ether"),
        description: 'Total amount donated in Ether'
      },
      {
        header: minDonation,
        description: 'Minimum amount that could be donated(Wei)'
      },
    ];
    return items;
  };
  render(){
    return(
      <Layout>
        <h2> Project Summary </h2>
        <Grid>
          <Grid.Column width = {10}>
            <Card.Group style = {{padding: "2px"}} items = {this.renderSummary()} />
            <Link route = {`/projects/${this.props.address}/requests`}>
              <a>
                <Button content = "View Spending Requests" primary>
                </Button>
              </a>
            </Link>
          </Grid.Column>
          <Grid.Column floated = "left" width = {5}>
            <Donate addr = {this.props.address}/>
          </Grid.Column>
        </Grid>
    </Layout>);
  }
}

export default ShowComponent;
