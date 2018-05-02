import React,{Component} from "react";
import ReactDom from "react-dom";
import { Card,Button,Icon,Container } from "semantic-ui-react";
import factory from "../ethereum/createfactory";
import Layout from "../Components/Layout";
import {Link} from "../routes";
class FactoryComponent extends Component{
static async getInitialProps(){
  const deployed = await factory.methods.getDeployedContracts().call();
  return {deployed};
}
renderProjects(){
  const  items = this.props.deployed.map((itr) => {
    return {
      header: itr,
      description: <Link route = {`projects/${itr}`}><a>View Project</a></Link>,
      fluid: true
    };
  });
  return items;
  }
render(){
    return(
      <Layout>
      <Container  style = {{marginTop:"10px"}}>
      <h2>Ongoing Projects</h2>
      <Link route = "/projects/new">
      <a>
      <Button style = {{marginTop:"10px"}} floated = "right" content = "Start Project" primary>
        <Icon name  = "add"/>
        Start Project
      </Button>
      </a>
      </Link>
      <Card.Group centered items ={this.renderProjects()} />
      </Container>
  </Layout>
);
  }
}
export default FactoryComponent;
