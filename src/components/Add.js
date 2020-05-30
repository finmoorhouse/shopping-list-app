import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { connect } from "react-redux";
import { startAddItem } from "../store/actions";

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
      this.props.submitItem(
        {
          title: this.state.title,
          name: this.state.name,
          description: this.state.description,
        },
        this.props.currentId
      );
      console.log("Item added.");
    } else {
      this.setState({ errorMessage: "Please name the item before adding." });
    }
  };
  render() {
    return (
      <div className="container">
        <Header />
        <div className="container-main">
          <Link to="/view">View List</Link>
          <p>{this.state.errorMessage}</p>
          <form onSubmit={this.onSubmit}>
            <h4>Item</h4>
            <input
              placeholder="Description"
              type="text"
              value={this.state.title}
              onChange={this.onTitleChange}
              autoFocus
            />
            <h4>Name</h4>
            <input
              placeholder="Your Name"
              type="text"
              value={this.state.name}
              onChange={this.onNameChange}
            />
            <h4>Description</h4>
            <input
              placeholder="Note"
              type="text"
              value={this.state.description}
              onChange={this.onDescriptionChange}
            />
            <br />
            <button>Add To List</button>
          </form>
        </div>
        <Footer/>
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
      return console.log("finished!");
    }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Add);
