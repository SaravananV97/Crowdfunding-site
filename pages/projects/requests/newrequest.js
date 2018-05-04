import React,{Component} from "react";
import {Form, Button,Label,Input,Message} from "semantic-ui-react";
import Layout from "../../../Components/Layout";
import Project from "../../../ethereum/project";
import web3 from "../../../ethereum/web3";
class NewRequest extends Component{
  state = {
    loading:false,
    description:"",
    amount:"",
    vendoraddress:"",
    errorMsg:""
  }
  static async getInitialProps(props){
    const {address} = props.query;
    return {address};
  }
  handleClick = async (event) => {
    event.preventDefault();
    const campaign = Project(this.props.address);
    const accounts= await web3.eth.getAccounts();
    console.log(this.state);
    try {
      this.setState({errorMsg:""});
      this.setState({loading:true});
    await campaign.methods.createSpendingRequest(this.state.description,
                                      web3.utils.toWei(this.state.amount,"ether"),this.state.vendoraddress)
                                      .send({from:accounts[0]});

    } catch (e) {
        this.setState({errorMsg:e.message});
    }
    finally{
      this.setState({loading:false});
    }
  }
  render(){
  return (
    <Layout>
    <h3>Create new Spending Request</h3>
    <Form error = {!!this.state.errorMsg} onSubmit = {this.handleClick}>
      <Form.Field>
        <Label>Description</Label>
        <Input value = {this.state.description} onChange = {(event) => {this.setState({description:event.target.value})}}/>
      </Form.Field>
      <Form.Field>
        <Label>Amount</Label>
        <Input value = {this.state.amount} onChange = {(event) => {this.setState({amount:event.target.value})}}/>
      </Form.Field>
      <Form.Field>
        <Label>Vendor Address</Label>
        <Input value = {this.state.vendoraddress} onChange = {(event) => {this.setState({vendoraddress:event.target.value})}}/>
      </Form.Field>
      <Button loading = {this.state.loading} primary>
        Create Request
      </Button>
      <Message error header = "Cannot Create a Project"
              list = {[this.state.errorMsg]} />
    </Form>
    </Layout>
  );
  }
}
export default NewRequest;
