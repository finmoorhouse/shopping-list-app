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
      errorMessage:"This secret code has been generated for your group—use it to log in next time. Make a note of this, then click 'Login to my group'."
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
            fill="#f69b9d"
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
            fillOpacity="0.15"
            d="M0,192L30,181.3C60,171,120,149,180,117.3C240,85,300,43,360,69.3C420,96,480,192,540,229.3C600,267,660,245,720,224C780,203,840,181,900,176C960,171,1020,181,1080,165.3C1140,149,1200,107,1260,90.7C1320,75,1380,85,1410,90.7L1440,96L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"
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
