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
      newId: props.newId || "",
      errorMessage: "",
      tastyOrange:"#b63b1d",
    };
  }
  onSubmit = (e) => {
    e.preventDefault();
    //console.log("Login button clicked. State: ",this.state.newId," Length: ",this.state.newId.length);
    const reg = /^[a-zA-Z0-9]+$/;
    if (reg.test(this.state.newId) && this.state.newId.length === 12) {
      this.props.submitItem(this.state.newId);
      this.props.history.push("/add");
    } else {
      this.setState({
        errorMessage:
          "Not a valid login code. Enter an existing 12-digit code, or start a new group.",
      });
    }
  };
  onGenerate = (e) => {
    e.preventDefault();
    this.setState({
      newId: cryptoRandomString({ length: 12, type: "distinguishable" }),
    });
    //console.log("New ID generated.");
  };
  onLoginChange = (e) => {
    const rawId = e.target.value;
    const newId = rawId.toUpperCase().replace(/[^a-zA-Z0-9]/g, "");
    this.setState({ newId });
  };
  render() {
    return (
      <div className="container container__login">
        <svg className='login-wave__top' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill={this.state.tastyOrange}
            fillOpacity="0.2"
            d="M0,64L40,80C80,96,160,128,240,149.3C320,171,400,181,480,176C560,171,640,149,720,165.3C800,181,880,235,960,229.3C1040,224,1120,160,1200,138.7C1280,117,1360,139,1400,149.3L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
            transform="translate(0,300) scale(1,-1)"
          ></path>
        </svg>
        <div className="login">
          <h1>Simple Shopping List</h1>
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              value={this.state.newId}
              className="login-text"
              onChange={this.onLoginChange}
              placeholder="Enter login code."
              autoFocus
            />
            <div className="login-error">{this.state.errorMessage}</div>
            <div className="login-buttons">
              <button className="login-button">
                Login to my group<FontAwesomeIcon icon={faSignInAlt} />
              </button>
              <p>or</p>
              <button className="login-button" onClick={this.onGenerate}>
                Start a new group<FontAwesomeIcon icon={faRocket} />
              </button>
            </div>
          </form>
        </div>
        <svg
          className="login-wave__bottom"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill={this.state.tastyOrange}
            fillOpacity="0.2"
            d="M0,128L48,154.7C96,181,192,235,288,261.3C384,288,480,288,576,250.7C672,213,768,139,864,101.3C960,64,1056,64,1152,96C1248,128,1344,192,1392,224L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
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
      return; //console.log("finished!");
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
