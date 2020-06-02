import React , {useState} from "react";
import { connect } from "react-redux";
import { startRemoveItem } from "../store/actions";

const ListItem = ({ title, name, description, id, markAsComplete, currentId }) => {
  const onRemoveItem = () => {
    console.log(id,currentId)
    markAsComplete(currentId,id);
    console.log("removed");
    setCompleted(true)
  }
  const [completed, setCompleted] = useState(false);
  return (
    <div>
      <h2>{title}</h2>
      {name && <p>{`Added by: ${name}.`}</p>}
      {description && <p>{description}</p>}
      <button onClick={onRemoveItem}>Mark as done</button>
      {completed ? <p>Completed</p> : <p>Not completed...</p>}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    currentId: state.currentId
  };
};
const mapDispatchToProps = (dispatch) => ({
  markAsComplete: (currentId,id) => dispatch(startRemoveItem(currentId,id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListItem);
