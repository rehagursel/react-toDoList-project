import React, { useState, useCallback } from "react";
import ListItem from "./ListItem";
import NewTask from "./NewTask";

const TodosList = ({ dummyList }) => {
  const [allList, setAllList] = useState(dummyList);
  const [selectedList, setSelectedList] = useState("");

  const addToListHandler = useCallback((newItem) => {
    setAllList((prevState) => [newItem, ...prevState]);
  }, []);

  const deleteItemHandler = (itemId) => {
    setAllList((prevState) => prevState.filter((item) => item.id !== itemId));
  };

  const deleteAllListHandler = () => {
    setAllList("");
  };

  const deleteCompletedListHandler = () => {
    if (allList === "") {
      return;
    }
    setAllList((prevState) => prevState.filter((item) => item.isDone !== true));
  };

  const editItemHandler = (itemId, itemNewTitle) => {
    if (itemNewTitle === "") {
      return;
    }
    const editingItem = allList.find((item) => item.id === itemId);
    const editingItemIndex = allList.indexOf(editingItem);
    const tempList = [...allList];
    tempList[editingItemIndex].title = itemNewTitle;
    setAllList([...tempList]);
  };

  const addItemToCompletedListHandler = (id) => {
    const checkedItem = allList.find((item) => item.id === id);
    const checkedItemIndex = allList.indexOf(checkedItem);
    const tempList = [...allList];
    tempList[checkedItemIndex].isDone = !tempList[checkedItemIndex].isDone;
    setAllList([...tempList]);
  };

  const showAllListHandler = () => {
    setSelectedList("allList");
  };

  const showCompletedListHandler = () => {
    setSelectedList("completedList");
  };

  const showTodoListHandler = () => {
    setSelectedList("todoList");
  };

  let list = [...allList];

  if (selectedList === "completedList") {
    list = allList.filter((item) => item.isDone === true);
  } else if (selectedList === "todoList") {
    list = allList.filter((item) => item.isDone !== true);
  }

  let renderList;

  if (list.length === 0) {
    renderList = <p className="mt-5 text-center">List is empty</p>;
  } else {
    renderList = list.map((item) => (
      <ListItem
        key={item.id}
        id={item.id}
        title={item.title}
        isDone={item.isDone}
        onDelete={deleteItemHandler}
        onEdit={editItemHandler}
        onDone={addItemToCompletedListHandler}
      />
    ));
  }

  return (
    <React.Fragment>
      <NewTask onAdd={addToListHandler} />
      <div>
        <h2 className="text-center mt-4 mb-3 fw-bold header">Todo List</h2>
      </div>
      <div className="d-flex justify-content-between gap-5 ">
        <button
          onClick={showAllListHandler}
          className="btn btn-info btn-lg w-100"
        >
          All
        </button>
        <button
          onClick={showCompletedListHandler}
          className="btn btn-info btn-lg w-100"
        >
          Done
        </button>
        <button
          onClick={showTodoListHandler}
          className="btn btn-info btn-lg w-100"
        >
          Todo
        </button>
      </div>

      <div className="d-flex flex-column align-items-center mt-5">
        <ul className="w-100 m-0 p-0 ">{renderList}</ul>
      </div>

      <div className="d-flex justify-content-between gap-5 mt-4">
        <button
          className="btn btn-danger btn-lg w-100"
          onClick={deleteCompletedListHandler}
        >
          Delete done tasks
        </button>
        <button
          className="btn btn-danger btn-lg w-100"
          onClick={deleteAllListHandler}
        >
          Delete all tasks
        </button>
      </div>
    </React.Fragment>
  );
};

export default TodosList;

/* const NewTask = (props) => {
  const [input, setInput] = useState("");
  

  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };

  const addItemHandler = (e) => {
    e.preventDefault();
    if (input === "") {
      return;
    }
    const unique_id = uuid();

    const newItem = {
      id: unique_id,
      title: input,
      isDone: false,
    };
    props.onAdd(newItem)
    setInput("");
  }

  return (<div>
     <div>
        <h2 className="text-center fw-bold header">Todo Input</h2>
      </div>
      <form className="input-group d-flex flex-nowrap">
        <input
          type="text"
          className="form-control"
          placeholder="New Todo"
          value={input}
          onChange={onChangeHandler}
        />
        <button onClick={addItemHandler} className="btn btn-info btn-lg ">
          Add new task
        </button>
      </form>
      </div>
  )
}


const ListItem = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editInput, setEditInput] = useState('');
  const { id, title, onDelete, onEdit, onDone, isDone } = props;
  console.log("listItemComp");

  const deleteHandler = () => {
    onDelete(id);
  };

  
  const doneHandler = () => {
    onDone(id);
  };

  const editHandler = () => {
    setIsEdit((prevState) => !prevState);
  };

  const onEditChangeHandler = (e) => {
    setEditInput(e.target.value);
  };

  const editItemTitleHandler = (e) => {
      e.preventDefault();
      onEdit(id, editInput)
      setIsEdit((prevState) => !prevState);
      setEditInput('')
  }
  

  return (
    <li className="list-group-item m-0 p-0 border-0">
      {isEdit && (
        <form className="input-group d-flex flex-nowrap mb-3">
          <input
            type="text"
            className="form-control py-3"
            placeholder="Enter new title"
            value={editInput}
          onChange={onEditChangeHandler}
          />
          <button
            onClick={editItemTitleHandler} className="btn btn-info btn-lg "
          >
            {`${editInput==='' ? 'Cancel' : 'Edit task'}`}
          </button>
        </form>
      )}
      {!isEdit && (
        <div className="d-flex p-3 mb-3 border justify-content-between">
          <h6 className={`m-0 ${isDone ? "completed-task" : ""}`}>{title}</h6>
          <div className="todo-icon">
            <button
              className={`mx-2 p-0 border-0 bg-transparent ${
                isDone ? "text-success" : "text-secondary"
              }`}
              onClick={doneHandler}
            >
              <i
                className={`${isDone ? "fa fa-check-square" : "far fa-square"}`}
              />
            </button>
            <button
              className="mx-2 text-warning p-0 border-0 bg-transparent"
              onClick={editHandler}
            >
              <i className="fas fa-pen" />
            </button>
            <button
              className="mx-2 text-danger p-0 border-0 bg-transparent"
              onClick={deleteHandler}
            >
              <i className="fas fa-trash" />
            </button>
          </div>
        </div>
      )}
    </li>
  );
}; */
