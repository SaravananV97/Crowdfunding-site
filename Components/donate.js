import React,{Component} from "react";
import {Message,Input, Form, Button} from "semantic-ui-react";
import Project from  "../pages/projects/project";
import web3 from "../ethereum/web3";
import {Router} from "../routes";
class DonateProject extends Component{
  state = {amount:"",
            errorMsg: "",
              loading:false};
 handleSubmit = async (event) => {
   event.preventDefault();
    const project = Project(this.props.addr);
    console.log(project);
    this.setState({loading: true});
    try {
    const accounts= await web3.eth.getAccounts();
    await project.methods.makeDonation()
      .send({from: accounts[0], value: web3.utils.toWei(this.state.amount,"ether")});
      this.setState({errorMsg:""});
      Router.replaceRoute(`/projects/${this.props.addr}`);
    } catch (e) {
      this.setState({errorMsg: e.message});
    } finally {
      this.setState({loading:false});
    }
  };
  render(){
    return(
    <Form error = {!!this.state.errorMsg} style = {{marginTop: "10px"}} onSubmit = {this.handleSubmit} >
      <Form.Field>
        <label> Donate Ether</label>
        <Input value = {this.state.amount} label = {{basic:true, content: "Ether"}} labelPosition= "right"
                                       placeholder = "Enter Amount"
          onChange = {(event) => {this.setState({amount:event.target.value})}} />
      </Form.Field>
      <Button loading = {this.state.loading} style = {{marginTop: "10px"}} content = "Donate" primary>
      </Button>
      <Message error header = "Cannot Donate!!"
              list = {[this.state.errorMsg]} />
    </Form>);
  }
}
export default DonateProject;
