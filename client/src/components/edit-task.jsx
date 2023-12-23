import axios from "axios";
import { useNavigate } from "react-router-dom";
import errorToast from "../helpers/errorToast";
import { useEffect, useState } from "react";
import { getRequest } from "../service/request";
import SubmitBtn from "./submit-btn";
import { toast } from "react-toastify";
import FormInput from "./form-input";
import { SUCCESS_TOAST_OPT } from "../helpers/constants";

const editTaskModalInner = ({ modalClose, id }) => {
  const navigate = useNavigate();
  const [todo, setTodo] = useState({});

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
      toast.success("todo updated", SUCCESS_TOAST_OPT);
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
        className="text-center font-bold text-[28px] lg:text-[26px] md:text-[24px] sm:text-[22px] mb-[8px]
        leading-[1] rounded-[7px] select-none"
      >
        Edit Task
      </h2>

      <FormInput name="task" defaultValue={todo.task} required />
      <label htmlFor="taskDetails">Details</label>
      <textarea
        className="text-black flex mb-[10px] w-full resize-y min-h-[60px] max-h-[120px] p-[10px] flex-col border border-1 border-black rounded"
        name="details"
        id="taskDetails"
        placeholder="Task Details..."
        defaultValue={todo.details}
        required
      />
      <label className="flex gap-[5px] w-[16px] h-[16px] items-center">
        <input
          className="accent-black"
          type="checkbox"
          name="status"
          defaultChecked={todo.status}
        />
        <span>status</span>
      </label>
      <div className="flex justify-end gap-[10px]">
        <button className="btn-teal" type="button" onClick={modalClose}>
          cancel
        </button>
        <SubmitBtn className="btn-indigo" text="update" />
      </div>
    </form>
  );
};
export default editTaskModalInner;
