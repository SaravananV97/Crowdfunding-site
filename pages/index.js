import React,{Component} from "react";
import ReactDom from "react-dom";
import { Card,Button,Icon,Container } from "semantic-ui-react";
import factory from "../ethereum/createfactory";
import Layout from "../Components/Layout";

class FactoryComponent extends Component{
static async getInitialProps(){
  const deployed = await factory.methods.getDeployedContracts().call();
  return {deployed};
}
renderProjects(){
  const  items = this.props.deployed.map((itr) => {
    return {
      header: itr,
      description: <a>View Project</a>,
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
      <Button style = {{marginTop:"10px"}} floated = "right" content = "Start Project" primary>
        <Icon name  = "add"/>
        Start Project
      </Button>
      <Card.Group centered items ={this.renderProjects()} />
      </Container>
  </Layout>
);
  }
}
export default FactoryComponent;
