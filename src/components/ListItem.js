import { useState } from "react";

const ListItem = (props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editInput, setEditInput] = useState("");
  const { id, title, onDelete, onEdit, onDone, isDone } = props;

  const deleteHandler = () => {
    onDelete(id);
  };

  const doneHandler = () => {
    onDone(id);
  };

  const editHandler = () => {
    setIsEdit((prevState) => !prevState);
  };

  const editChangeHandler = (e) => {
    setEditInput(e.target.value);
  };

  const editItemTitleHandler = (e) => {
    e.preventDefault();

    onEdit(id, editInput);
    setIsEdit((prevState) => !prevState);
    setEditInput("");
  };

  return (
    <li className="list-group-item m-0 p-0 border-0">
      {isEdit && (
        <form className="input-group d-flex flex-nowrap mb-3">
          <input
            type="text"
            className="form-control py-3"
            placeholder="Enter new title"
            value={editInput}
            onChange={editChangeHandler}
          />
          <button
            onClick={editItemTitleHandler}
            className="btn btn-info btn-lg "
          >
            {`${editInput === "" ? "Cancel" : "Edit task"}`}
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
};

export default ListItem;
