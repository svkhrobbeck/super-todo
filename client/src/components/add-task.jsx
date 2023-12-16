import axios from "axios";
import { useNavigate } from "react-router-dom";
import errorToast from "../helpers/errorToast";
import SubmitBtn from "./submit-btn";
import { toast } from "react-toastify";

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
      toast.success("todo created");
    } catch (err) {
      errorToast(err);
    }
  };

  return (
    <form
      onSubmit={handleAddTask}
      className="w-full max-w-[800px] py-[10px] flex flex-col mx-auto"
      method="POST"
    >
      <h2
        className="text-center text-black font-bold text-[28px]
          mb-[8px] leading-[1] rounded-[7px] select-none"
      >
        Create task
      </h2>
      <textarea
        className="flex mb-[10px] w-full resize-y min-h-[60px] max-h-[120px] p-[10px] flex-col border border-1 border-black rounded"
        name="task"
        id="taskBody"
        placeholder="Task body..."
        required
      />
      <div className="flex justify-end gap-[10px]">
        <button className="btn-blue" type="button" onClick={modalClose}>
          cancel
        </button>
        <SubmitBtn text="add" />
      </div>
    </form>
  );
};
export default AddTaskModalInner;
