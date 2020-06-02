import {
  VisibilityFilters,
  ADD_ITEM,
  SET_ITEMS,
  LOGIN,
  REMOVE_ITEMS,
  REMOVE_ITEM,
  SET_NAME,
  LOGOUT,
} from "./actions";
const initialId = localStorage.getItem("id")
  ? localStorage.getItem("id")
  : null;
const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  currentId: initialId,
  groupName: null,
  items: [],
};

const todoApp = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [
          ...state.items,
          {
            title: action.item.title,
            description: action.item.description,
            name: action.item.name,
          },
        ],
      };
    case SET_ITEMS:
      return {
        ...state,
        items: action.items,
        groupName: action.groupName,
      };
    case LOGIN:
      return {
        ...state,
        currentId: action.newId,
      };
    case LOGOUT:
      return {
        visibilityFilter: VisibilityFilters.SHOW_ALL,
        currentId: null,
        groupName: "",
        items: [],
      };
    case SET_NAME:
      return {
        ...state,
        groupName: action.newName,
      };
    case REMOVE_ITEM:
      return {
        ...state,
      };
    case REMOVE_ITEMS:
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};
export default todoApp;
