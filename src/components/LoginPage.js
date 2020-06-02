import React from "react";
//import shortid from "shortid";
import cryptoRandomString from "crypto-random-string";
import { startLogin } from "../store/actions";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faRocket } from "@fortawesome/free-solid-svg-icons";

//import { connect } from "react-redux";

export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newId: props.newId || '',
      errorMessage: "",
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log("Login button clicked. State: ",this.state.newId," Length: ",this.state.newId.length);
    const reg = /^[a-zA-Z0-9]+$/;
    if (reg.test(this.state.newId) && this.state.newId.length === 12) {
      this.props.submitItem(this.state.newId);
      this.props.history.push("/add");
    } else {
      this.setState({errorMessage:"Not a valid login code. Enter an existing 10-digit code, or start a new group."})
    }
  };
  onGenerate = (e) => {
    e.preventDefault();
    this.setState({
      newId: cryptoRandomString({ length: 12, type: "distinguishable" }),
    });
    console.log("New ID generated.");
  };
  onLoginChange = (e) => {
    const rawId = e.target.value
    const newId = rawId.toUpperCase().replace(/[^a-zA-Z0-9]/g, "");
    this.setState({ newId });
  };
  render() {
    return (
      
        <div className='login'>
          <h1>Simple Shopping List</h1>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              value={this.state.newId}
              className="login-text"
              onChange={this.onLoginChange}
              autoFocus
            />
            <div className="login-error">{this.state.errorMessage}</div> 
            <div className="login-buttons">
              <button className="login-button">
                Login <FontAwesomeIcon icon={faSignInAlt} />
              </button>
              <p>Or...</p>
              <button className="login-button" onClick={this.onGenerate}>
                Start a new group <FontAwesomeIcon icon={faRocket} />
              </button>
            </div>
          </form>
        </div>
     
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentId: state.currentId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  submitItem: (item) =>
    dispatch(startLogin(item)).then(() => {
      return console.log("finished!");
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
