import React,{Component} from "react";
import {Link} from "../../../routes"
import {Button, Table} from "semantic-ui-react";
import Layout from "../../../Components/Layout";
import RequestRow from "../../../Components/requestrow";
import Project from "../../../ethereum/project";
import web3 from "../../../ethereum/web3";
class ProjectRequests extends Component{
  static async getInitialProps(props){
    const {address} = props.query;
    const campaign = Project(address);
    const requestsCount = await campaign.methods.getRequestsCount().call();
    const donatorsCount = await campaign.methods.donatorsCount().call();
    const requests = await Promise.all(
      Array(parseInt(requestsCount)).fill().map((element,index) => {
        return campaign.methods.requests(index).call();
      })
    );
    return {address, requests, donatorsCount};
  }
  renderRows(){
    return this.props.requests.map((request,index) => {
      return <RequestRow address = {this.props.address} donatorsCount = {this.props.donatorsCount}
                        key = {index} request = {request} id = {index} />
    });
  }
  render(){
    const {Header, Row, HeaderCell,Cell,Body} = Table;
    return(
      <Layout>
        <h3>Current Requests for Spending</h3>
        <Table>
          <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Approvers Count</HeaderCell>
            <HeaderCell>Vendor Address</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
          </Header>
          <Body>
            {this.renderRows()}
          </Body>
        </Table>
        <Link route = {`/projects/${this.props.address}/requests/newrequest`}>
          <a>
            <Button primary>
              Create Request
            </Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default ProjectRequests;
