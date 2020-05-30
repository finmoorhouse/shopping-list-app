import React from "react";

const ListItem = ({ title, name, description }) => (
  <div>
    <h2>{title}</h2>
    {name && <p>{`Added by: ${name}.`}</p>}
    {description && <p>{description}</p>}
    <button>Mark as done</button>
  </div>
);
export default ListItem;
