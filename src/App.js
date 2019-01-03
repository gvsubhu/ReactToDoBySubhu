import React, { Component } from "react";
import "./style.css";
import {
  ADD_ITEM_TO_LIST,
  UPDATE_ITEM_TO_LIST,
  REMOVE_ITEM_TO_LIST
} from "./actions.js";
import { connect } from "react-redux";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      showAddItem: false,
      isUpdate: false
    };
  }
  showAddItems = () => {
    this.setState({
      showAddItem: !this.state.showAddItem,
      isUpdate: false,
      updateTodoId: ""
    });
    this.itemTxt.value = "";
  };
  addItems = () => {
    if (this.itemTxt.value === "") {
      alert("Enter Something to add");
      return;
    }
    this.setState({
      showAddItem: false
    });
    this.props.addListItems(this.props.items.length + 1, this.itemTxt.value);
  };
  updateListItem(id, item) {
    this.itemTxt.value = item;
    this.setState({
      showAddItem: true,
      isUpdate: true,
      updateTodoId: id
    });
  }
  editItems = () => {
    if (this.itemTxt.value === "") {
      alert("Enter Something to add");
      return;
    }
    this.props.updateListItems(this.state.updateTodoId, this.itemTxt.value);
    this.setState({
      showAddItem: false,
      isUpdate: false,
      updateTodoId: ""
    });
  };
  render() {
    return (
      <div className="App">
        <input type="button" value="Add Items" onClick={this.showAddItems} />
        <div className={this.state.showAddItem ? "form" : "form hide"}>
          <input
            type="text"
            ref={input => (this.itemTxt = input)}
            placeholder="Enter todo item"
          />
          <input
            type="button"
            value={this.state.isUpdate ? "Update" : "Add Todo"}
            onClick={this.state.isUpdate ? this.editItems : this.addItems}
          />
        </div>
        <br />
        <ul>
          {this.props.items.map(item => (
            <li data-id={item.id} key={item.id}>
              <p>{item.id + " - " + item.text}</p>
              <input
                type="button"
                value="Edit"
                onClick={() => this.updateListItem(item.id, item.text)}
              />
              <input
                type="button"
                value="Delete"
                onClick={() => this.props.removeListItems(item.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.items
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addListItems: (id, item) => {
      dispatch({
        type: ADD_ITEM_TO_LIST,
        payload: {
          id: id,
          item: item
        }
      });
    },
    updateListItems: (id, txt) => {
      dispatch({
        type: UPDATE_ITEM_TO_LIST,
        payload: {
          id: id,
          txt: txt
        }
      });
    },
    removeListItems: id => {
      dispatch({
        type: REMOVE_ITEM_TO_LIST,
        payload: {
          id: id
        }
      });
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
