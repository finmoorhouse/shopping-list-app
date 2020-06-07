import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { connect } from "react-redux";
import { startAddItem } from "../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

//import { connect } from "react-redux";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      name: "",
      description: "",
      errorMessage: "",
    };
  }
  onTitleChange = (e) => {
    const title = e.target.value;
    this.setState(() => ({ title }));
  };
  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };
  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  };
  onSuccess = () => {
    this.setState({ errorMessage: "Item added." });
  };
  onSubmit = (e) => {
    e.preventDefault();
    //this.props.startAddExpense(expense);
    //this.props.history.push("/");
    if (this.state.title.length > 0) {
      this.setState({ errorMessage: "Adding item..." });
      const submission = this.props.submitItem(
        {
          title: this.state.title,
          name: this.state.name,
          description: this.state.description,
        },
        this.props.currentId
      );
      submission.then((result) => this.setState({ errorMessage: result }));
    } else {
      this.setState({ errorMessage: "Please name the item before adding." });
    }
    this.setState({
      description: "",
      title: "",
      name: "",
    });
  };
  render() {
    return (
      <div className="container">
        <Header />
        <div className="container-main">
          <div className="component-header">
              <h1 className="component-header-title">Add Item</h1>
            <Link to="/view" className="header-link">
              View List  <FontAwesomeIcon
              className="header-logout__fa"
              icon={faArrowRight}
            />
            </Link>
          </div>
          <p className='list-header-message'>{this.state.errorMessage || "Add item below."}</p>
          <form onSubmit={this.onSubmit} className="add-form">
            <h4 className="add-form-formdescription">Item</h4>
            <input
              placeholder="Item Description"
              type="text"
              value={this.state.title}
              onChange={this.onTitleChange}
              className="add-form-input add-form-input__required add-form-input_capitalise"
              autoFocus
              tabIndex="1"
            />
            <h4 className="add-form-formdescription">Name</h4>
            <input
              placeholder="Your name (optional)"
              type="text"
              value={this.state.name}
              className="add-form-input add-form-input_capitalise"
              onChange={this.onNameChange}
              tabIndex="2"
            />
            <h4 className="add-form-formdescription">Note</h4>
            <input
              placeholder="Note (optional)"
              type="text"
              value={this.state.description}
              className="add-form-input"
              onChange={this.onDescriptionChange}
              tabIndex="3"
            />
            <br />
            <button className="button_rounded add-button">Add To List</button>
          </form>
        </div>
        <Footer />
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
  submitItem: (item, id) =>
    dispatch(startAddItem(item, id)).then(() => {
      return "Item added.";
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
