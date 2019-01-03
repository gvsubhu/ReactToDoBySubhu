import {
  ADD_ITEM_TO_LIST,
  UPDATE_ITEM_TO_LIST,
  REMOVE_ITEM_TO_LIST
} from "./actions.js";
const initialState = {
  items: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM_TO_LIST: {
      return Object.assign({}, state, {
        items: state.items.concat({
          id: action.payload.id,
          text: action.payload.item,
          completed: false
        })
      });
    }
    case UPDATE_ITEM_TO_LIST: {
      debugger;
      return Object.assign({}, state, {
        items: state.items.map(function(item) {
          if (item.id === action.payload.id) {
            return Object.assign({}, item, { text: action.payload.txt });
          }
          return item;
        })
      });
    }
    case REMOVE_ITEM_TO_LIST: {
      return Object.assign({}, state, {
        items: state.items.filter(function(item) {
          return item.id !== action.payload.id;
        })
      });
    }
    default:
      return state;
  }
}

export default rootReducer;
