/*
 * action types
 */
import database from "../firebase/firebase";

export const ADD_ITEM = "ADD_ITEM";
export const SET_ITEMS = "SET_ITEMS";
export const REMOVE_ITEMS = "REMOVE_ITEMS";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_NAME = "SET_NAME";

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE",
};

/*
 * action creators
 */

export const addItem = (item) => {
  return { type: ADD_ITEM, item };
};

export const startAddItem = (newItem, id) => {
  return (dispatch) => {
    return database
      .ref(`users/${id}/items`)
      .push(newItem)
      .then(() => {
        dispatch(addItem(newItem));
      });
  };
};
//SET_EXPENSES
export const setItems = (items, groupName) => ({
  type: "SET_ITEMS",
  items,
  groupName,
});

export const startSetItems = (currentId) => {
  return (dispatch, getState) => {
    //const uid = getState().auth.uid;
    let name = "";
    database
      .ref(`users/${currentId}/name`)
      .once("value")
      .then((snapshot) => {
        name = snapshot.val();
        console.log("Name: ", name);
      });
    return database
      .ref(`users/${currentId}`)
      .once("value")
      .then((snapshot) => {
        const items = [];
        let newItems = {};
        let name = "";
        if (snapshot.val()) {
          newItems = snapshot.val().items;
          name = snapshot.val().name;
          for (const newItem in newItems) {
            items.push({
              id: newItem,
              ...newItems[newItem],
            });
          }
        }

        console.log("Name is:", name);
        dispatch(setItems(items, name));
      });
  };
};
export const startRemoveItems = (id) => {
  return (dispatch) => {
    return database
      .ref(`users/${id}/items`)
      .set(null)
      .then(() => {
        dispatch(removeItems());
      });
  };
};

export const startRemoveItem = (currentId, id) => {
  return (dispatch) => {
    return database
      .ref(`users/${currentId}/items/${id}`)
      .set(null)
      .then(() => {
        dispatch(removeItem());
      });
  };
};
const removeItem = () => {
  return { type: REMOVE_ITEM };
};
const removeItems = () => {
  return { type: REMOVE_ITEMS };
};

const login = (newId) => {
  console.log("new id is: ", newId);
  return {
    type: LOGIN,
    newId,
  };
};
export const logout = () => {
  localStorage.removeItem("id");
  return { type: LOGOUT };
};

export const startLogin = (userId) => {
  localStorage.setItem("id", userId);
  return (dispatch) => {
    return database
      .ref(`users/${userId}`)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          console.log("user exists!");
        }
      })
      .then(() => {
        dispatch(login(userId));
        //I feel like this is bad async practice...
        dispatch(startSetItems(userId));
      });
  };
};
const setName = (newName) => {
  return {
    type: SET_NAME,
    newName,
  };
};
export const startSetName = (id, newName) => {
  return (dispatch) => {
    return database
      .ref(`users/${id}/name`)
      .set(newName)
      .then(() => {
        dispatch(setName(newName));
      });
  };
};
