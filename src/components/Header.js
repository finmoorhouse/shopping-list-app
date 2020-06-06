import React from "react";
import { connect } from "react-redux";
import { startSetName, logout } from "../store/actions";
import { history } from "../routers/AppRouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName:
        typeof this.props.groupName == "string"
          ? this.props.groupName
          : "Loading...",
      saveMessage: "",
    };
  }
  onNameChange = (e) => {
    const groupName = e.target.value;
    this.setState({ groupName }, () => {
      if (this.state.groupName !== this.props.groupName) {
        ////console.log(`Props: ${this.props.groupName}, state: ${this.state.groupName}`)
        this.setState({ saveMessage: "Save" });
      } else {
        this.setState({ saveMessage: "" });
      }
    });
  };
  setName = () => {
    this.setState({ saveMessage: "Save" });
    this.props
      .submitItem(this.props.currentId, this.state.groupName)
      .then((result) => this.setState({ saveMessage: "Saved" }));
    setTimeout(() => {
      this.setState({ saveMessage: "" });
    }, 2000);
  };
  onLogout = () => {
    this.props.logOut();
    history.push("/");
  };
  //this.state.groupName
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.groupName !== this.props.groupName) {
      this.setState(() => ({ groupName: this.props.groupName }));
    }
  }
  render() {
    return (
      <div className="header-container">
        <div className="header-title">Shopping List</div>
        <div className="header">
          <div className="header-groupname">
            <span className="header-groupname-intro">
              Group<span className="header-groupname-intro__name"> name</span>:
            </span>
            <input
              placeholder="Enter group name."
              type="text"
              value={this.state.groupName || ""}
              onChange={this.onNameChange}
            />
            {this.state.saveMessage && (
              <button className="header-save" onClick={this.setName}>
                {this.state.saveMessage}
              </button>
            )}
          </div>
          <button className="header-logout" onClick={this.onLogout}>
            <span className="header-logout__text">Log Out</span>
            <FontAwesomeIcon
              className="header-logout__fa"
              icon={faSignOutAlt}
            />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentId: state.currentId,
    groupName: state.groupName,
  };
};

const mapDispatchToProps = (dispatch) => ({
  submitItem: (id, name) =>
    dispatch(startSetName(id, name)).then(() => {
      return "finished";
    }),
  logOut: () => {
    dispatch(logout());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
