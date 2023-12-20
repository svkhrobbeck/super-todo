import { useEffect, useState } from "react";
import { getRequest } from "../service/request";
import { FormInput } from ".";

const TaskInfoModal = ({ modalClose, id }) => {
  const [todo, setTodo] = useState({});

  useEffect(() => {
    getRequest(`todo/${id}`).then(({ todo }) => setTodo(todo));
  }, []);

  return (
    <>
      <h2
        className="text-center font-bold text-[28px] mb-[8px]
        leading-[1] rounded-[7px] select-none"
      >
        Task Info
      </h2>
      <FormInput labelText="task" disabled defaultValue={todo.task} />
      <label>Details</label>
      <textarea
        className="text-black flex mb-[10px] w-full resize-y min-h-[60px] max-h-[120px] p-[10px] flex-col border border-1 border-black rounded"
        placeholder="Task Details..."
        defaultValue={todo.details}
        disabled
      />
      <label className="flex gap-[5px] w-[16px] h-[16px] items-center">
        <input
          className="accent-black"
          type="checkbox"
          name="status"
          disabled
          defaultChecked={todo.status}
        />
        <span>status</span>
      </label>
      <div className="flex justify-end gap-[10px]">
        <button className="btn-teal" type="button" onClick={modalClose}>
          cancel
        </button>
      </div>
    </>
  );
};
export default TaskInfoModal;
