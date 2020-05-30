import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {
  copyId = ()=>{
    navigator.clipboard.writeText(this.props.currentId)
  }
  handleMouseHover = () => {
    console.log("Mouse hovered over id bit.")
  }
  render() {
    return (
      <div className="footer">
        <span onClick={this.copyId} onMouseEnter={this.handleMouseHover}>
          <span>Your ID: </span>
          <span>{this.props.currentId}</span>
          <FontAwesomeIcon icon={faCopy}/>
        </span>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentId: state.currentId,
  };
};
//https://github.com/FortAwesome/react-fontawesome#introduction
export default connect(mapStateToProps, undefined)(Header);
