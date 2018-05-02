import React,{Component} from "react"
import Layout from "../../Components/Layout";
import {Form,Button,Container,Input, Message} from "semantic-ui-react";
import factory from "../../ethereum/createfactory";
import web3 from "../../ethereum/web3"
class NewProject extends Component{
  state ={
    amount:"",
    errorMsg:"",
    loading: false
  }
handleClick = async (event) => {
  event.preventDefault();
  this.setState({loading: true});
  try {
    const accounts= await web3.eth.getAccounts();
    await factory.methods.createCampaign(this.state.amount)
      .send({from:accounts[0]});
  } catch (e) {
    if(e.message.length > 500)
      this.setState({errorMsg: "Unable to provide Gas"});
    else
    this.setState({errorMsg: e.message});
  }
  finally{
    this.setState({loading: false});
  }
 }
  render(){
    return(
      <Layout>
        <Container>
        <Form error = {!!this.state.errorMsg} onSubmit = {this.handleClick} style = {{marginTop: "10px"}} >
          <Form.Field>
            <label> Donate Ether</label>
            <Input value = {this.state.amount} label = {{basic:true, content: "Wei"}} labelPosition= "right"
                                           placeholder = "Enter Amount"
              onChange = {(event) => {this.setState({amount:event.target.value})}} />
          </Form.Field>
          <Button loading = {this.state.loading} style = {{marginTop: "10px"}} content = "Donate" primary>
          </Button>

          <Message error header = "Cannot Create a Project"
                  list = {[this.state.errorMsg]} />
        </Form>
        </Container>
  </Layout>);
  };
}
export default NewProject;
