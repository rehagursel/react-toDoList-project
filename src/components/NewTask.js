import { /* useState, */ useRef } from "react";
import { v4 as uuid } from "uuid";

const NewTask = (props) => {
  /* const [input, setInput] = useState(""); */
  const inputRef = useRef(null);
console.log('NewTask')
  /* const onChangeHandler = (e) => {
    setInput(e.target.value);
  }; */

  const addItemHandler = (e) => {
      const input = inputRef.current.value;
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
    props.onAdd(newItem);
    /* setInput(""); */
    inputRef.current.value = ''
  };

  return (
    <div>
      <div>
        <h2 className="text-center fw-bold header">Todo Input</h2>
      </div>
      <form className="input-group d-flex flex-nowrap">
        <input
          type="text"
          className="form-control"
          placeholder="New Todo"
          /* value={input}
          onChange={onChangeHandler} */
          ref={inputRef}
        />
        <button onClick={addItemHandler} className="btn btn-info btn-lg ">
          Add new task
        </button>
      </form>
    </div>
  );
};

export default NewTask;
