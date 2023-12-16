import axios from "axios";
import { useNavigate } from "react-router-dom";
import errorToast from "../helpers/errorToast";
import { useEffect, useState } from "react";
import { getRequest } from "../service/request";
import SubmitBtn from "./submit-btn";
import { toast } from "react-toastify";

const editTaskModalInner = ({ modalClose, id }) => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState("");

  useEffect(() => {
    getRequest(`todo/${id}`).then(({ todo }) => setTodo(todo));
  }, []);

  const handleEditTask = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const payload = Object.fromEntries(formData);
    payload.status = payload?.status ? true : false;

    try {
      await axios.patch(`/todo/${id}`, payload);
      navigate("/dashboard");
      toast.success("todo updated");
      modalClose();
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <form
      onSubmit={handleEditTask}
      className="w-full max-w-[800px] py-[10px] flex flex-col mx-auto"
      method="POST"
    >
      <h2
        className="text-center text-black font-bold text-[28px]
          mb-[8px] leading-[1] rounded-[7px] select-none"
      >
        Edit Task
      </h2>
      <textarea
        className="flex mb-[10px] w-full resize-y min-h-[60px] max-h-[120px] p-[10px] flex-col border border-1 border-black rounded"
        name="task"
        id="taskBody"
        placeholder="Task body..."
        defaultValue={todo.task}
        required
      />
      <label className="flex items-center">
        <input type="checkbox" name="status" defaultChecked={todo.status} />
        <span>status</span>
      </label>
      <div className="flex justify-end gap-[10px]">
        <button className="btn-blue" type="button" onClick={modalClose}>
          cancel
        </button>
        <SubmitBtn text="update" />
      </div>
    </form>
  );
};
export default editTaskModalInner;
