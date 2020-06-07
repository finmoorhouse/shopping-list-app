import React from "react";
import { Link } from "react-router-dom";
import ListItem from "./ListItem";
import { connect } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import { startRemoveItems } from "../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

//import { connect } from "react-redux";

const List = (props) => {
  const onComplete = () => {
    // this.setState(() => ({
    //   items: [],
    // }));
    //console.log(props.currentId)
    props.markAsComplete(props.currentId);
    //console.log("removed");
  };
  // const copyList = () => {
  //   navigator.clipboard.writeText("The list.").then(
  //     function () {
  //       //console.log("Copied.");
  //       /* clipboard successfully set */
  //     },
  //     function () {
  //       /* clipboard write failed */
  //       //console.log("Copy failed.");
  //     }
  //   );
  // };
  //console.log("Here are your props: ", props.items);
  return (
    <div className="container">
      <Header />
      <div className="container-main ">
        <div className="component-header">
          <h1 className="component-header-title">Our List</h1>
          <Link to="/add" className="header-link">
          <FontAwesomeIcon
              className="header-logout__fa"
              icon={faArrowLeft}
            />  Add Item
          </Link>
          {/* props.items.length > 0 && (
            <>
              <button onClick={copyList}>Copy List</button>
              
            </>
          ) */}
        </div>
        <ul className="list-container">
          {props.items.length > 0 ? (
            props.items.map((item, index) => (
              <ListItem
                key={item.id || (index)}
                id={item.id}
                title={item.title}
                description={item.description}
                name={item.name}
              />
            ))
            
          ) : (
            <div className="list-empty">
              <h3 className="list-emptytext">Your list is empty</h3>
              <p>Add a new item to get started.</p>
              <Link to="/add" className="list-header-link">
                <button className="button_rounded">Add Item</button>
              </Link>
            </div>
          )}
          {props.items.length > 0 && 
            <button onClick={onComplete} className="button_rounded add-button">Mark All As Complete</button>
          
          }
        </ul>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    items: state.items,
    currentId: state.currentId,
  };
};

const mapDispatchToProps = (dispatch) => ({
  markAsComplete: (currentId) => dispatch(startRemoveItems(currentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
