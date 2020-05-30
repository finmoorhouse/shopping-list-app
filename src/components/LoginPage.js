import React from "react";
//import shortid from "shortid";
import cryptoRandomString from 'crypto-random-string';
import { startLogin } from "../store/actions";
import { connect } from "react-redux";

//import { connect } from "react-redux";

export class LoginPage extends React.Component {
constructor (props) {
  super(props);
  this.state = {
      newId: props.newId,
  };
}
onSubmit = (e)=>{
  e.preventDefault();
  console.log("Login button clicked.");
  this.props.submitItem(this.state.newId)
  this.props.history.push("/add");
}
onGenerate = (e)=>{
  e.preventDefault();
  this.setState({
    newId:  cryptoRandomString({length:12, type: 'distinguishable'})
  })
  console.log("New ID generated.")
}
onLoginChange = (e) => {
  const newId = e.target.value.toUpperCase().replace(/[^a-zA-Z0-9]/g, '');
  this.setState(() => ({ newId }));
}
render(){
  return (
    <div >
      <div >
        <h1 >Simple Shopping List</h1>
        <form onSubmit={this.onSubmit}>
            <input type='text' value={this.state.newId} className='login-text' onChange={this.onLoginChange} autoFocus></input>
            <button className='login-button'>Go -></button>
            <p>Or...</p>
            <button className='login-button' onClick={this.onGenerate}>Generate a code</button>
        </form>
      </div>
    </div>
  );

}};

const mapStateToProps = (state) => {
  return {
    currentId: state.currentId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  submitItem: (item) => dispatch(startLogin(item)).then(()=>{
    return console.log("finished!")
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
