import React, { useState } from "react";
import { connect } from "react-redux";
import { startRemoveItem } from "../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

const ListItem = ({
  title,
  name,
  description,
  id,
  markAsComplete,
  currentId,
}) => {
  const onRemoveItem = () => {
    //console.log(id, currentId);
    markAsComplete(currentId, id);
    //console.log("removed");
    setIcon(faCheckCircle);
  };
  const [icon, setIcon] = useState(faCircle);
  return (
    <div className="listitem">
      <div className="listitem-left">

      <FontAwesomeIcon onClick={onRemoveItem} icon={icon} className={icon===faCircle ? "tick-off" : "tick-on"}/>
      </div>
      <div className="listitem-right">
      <div className="listitem-right_main"> 
      <h4 className={"listitem-title ".concat(icon===faCheckCircle&&"strikethrough")}>{title}</h4>
      {name &&<p className="listitem-description"><span className="fade">Added by: </span>{name}</p>}
      </div>
      {description && <p className="listitem-description listitem-description_note"><span className="fade">Note: </span>{description}</p>}
</div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    currentId: state.currentId,
  };
};
const mapDispatchToProps = (dispatch) => ({
  markAsComplete: (currentId, id) => dispatch(startRemoveItem(currentId, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
