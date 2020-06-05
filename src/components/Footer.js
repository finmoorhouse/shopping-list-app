import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copied:false
    };
  }
  copyId = ()=>{
    navigator.clipboard.writeText(this.props.currentId)
    this.setState({copied:true});
    setTimeout(() => {
      this.setState({ copied: false });
    }, 2000);
  }
  handleMouseHover = () => {
    //console.log("Mouse hovered over id bit.")
  }
  render() {
    return (
      <div className="footer-container">
      <div className="footer">
        <span onClick={this.copyId} onMouseEnter={this.handleMouseHover}>
          <span className="fade footer_label">Group code: </span>
          <span className='footer-code'>  {this.state.copied && <div className='footer-copied'>Copied.</div>}{this.props.currentId || "Loading..."}</span>
        
          <FontAwesomeIcon className='footer-copy' icon={faCopy}/>
        </span>
      </div>
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
