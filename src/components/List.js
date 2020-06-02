import React from "react";
import { Link } from "react-router-dom";
import ListItem from "./ListItem";
import { connect } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import { startRemoveItems } from "../store/actions";

//import { connect } from "react-redux";

const List = (props) => {
  const onComplete = () => {
    // this.setState(() => ({
    //   items: [],
    // }));
    console.log(props.currentId)
    props.markAsComplete(props.currentId);
    console.log("removed");
  };
  const copyList = () => {
    navigator.clipboard.writeText("The list.").then(
      function () {
        console.log("Copied.");
        /* clipboard successfully set */
      },
      function () {
        /* clipboard write failed */
        console.log("Copy failed.");
      }
    );
  };
  console.log("Here are your props: ", props.items);
  return (
    <div className="container">
      <Header />
      <div className="container-main">
        <Link to="/add">Back to add item</Link>
        <h1>Viewing List:</h1>
        <button>Download List</button>
        <button onClick={copyList}>Copy List</button>
        <button onClick={onComplete}>Mark as completed</button>
        <ul>
          {props.items.length > 0 ? props.items.map((item, index) => (
            <ListItem
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              name={item.name}
            />
          )) : <h1>No items.</h1>}
        </ul>
      </div>
      <Footer/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    currentId: state.currentId
  };
};

const mapDispatchToProps = (dispatch) => ({
  markAsComplete: (currentId) => dispatch(startRemoveItems(currentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
