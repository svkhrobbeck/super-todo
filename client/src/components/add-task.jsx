import axios from "axios";
import { useNavigate } from "react-router-dom";
import errorToast from "../helpers/errorToast";
import SubmitBtn from "./submit-btn";
import { toast } from "react-toastify";
import FormInput from "./form-input";
import { SUCCESS_TOAST_OPT } from "../helpers/constants";

const AddTaskModalInner = ({ modalClose }) => {
  const navigate = useNavigate();

  const handleAddTask = async e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);

    try {
      await axios.post("/todo", payload);
      navigate("/dashboard");
      modalClose();
      toast.success("todo created", SUCCESS_TOAST_OPT);
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <form
      onSubmit={handleAddTask}
      className="w-full max-w-[800px] flex flex-col mx-auto"
      method="POST"
    >
      <h2
        className="text-center text-black font-bold text-[28px] lg:text-[26px] md:text-[24px] sm:text-[22px]
          mb-[8px] leading-[1] rounded-[7px] select-none"
      >
        Add Task
      </h2>
      <FormInput disableLabel name="task" labelText="task title" required />
      <textarea
        className="flex mb-[10px] w-full resize-y min-h-[90px] max-h-[120px] p-[10px] flex-col border border-1 border-black rounded"
        name="details"
        id="taskBody"
        placeholder="Task Details..."
        required
      />
      <div className="flex justify-end gap-[10px]">
        <button className="btn-teal" type="button" onClick={modalClose}>
          cancel
        </button>
        <SubmitBtn className="btn-indigo" text="add" />
      </div>
    </form>
  );
};
export default AddTaskModalInner;
