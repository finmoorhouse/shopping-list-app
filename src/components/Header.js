import React from "react";
import { connect } from "react-redux";
import { startSetName, logout } from "../store/actions";
import { history } from "../routers/AppRouter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: this.props.groupName ? this.props.groupName : "",
    };
  }
  onNameChange = (e) => {
    const groupName = e.target.value;
    this.setState(() => ({ groupName }));
  };
  setName = () => {
    this.props.submitItem(this.props.currentId, this.state.groupName);
  };
  onLogout = () => {
    this.props.logOut();
    history.push("/")
  }
  render() {
    return (
      <div className='header'>
        <button className='header-logout' onClick={this.onLogout}>Log Out 
        <FontAwesomeIcon icon={faSignOutAlt} />
        </button>
        <div className='header-groupname'>
           <input
          placeholder="Enter group name."
          type="text"
          value={this.state.groupName}
          onChange={this.onNameChange}
        />
        <button onClick={this.setName}>Save name</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    groupName: state.groupName,
    currentId: state.currentId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  submitItem: (id, name) =>
    dispatch(startSetName(id, name)).then(() => {
      return console.log("finished!");
    }),
  logOut:()=>{dispatch(logout())}
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
