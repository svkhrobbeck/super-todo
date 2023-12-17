import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import errorToast from "../helpers/errorToast";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline, MdInfoOutline } from "react-icons/md";
import { useState } from "react";
import Modal from "./modal";
import spinnerImg from "/images/spinner.svg";
import { EditTaskModalInner } from ".";
import { toast } from "react-toastify";

const TaskCard = ({ _id, task, details, status, createdAt, updatedAt }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteTodo = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`/todo/${_id}`);
      navigate("/dashboard");
      toast.success("todo deleted");
    } catch (err) {
      errorToast(er);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    setIsLoading(true);
    try {
      await axios.patch(`/todo/status/${_id}`);
      navigate("/dashboard");
      toast.success("todo status updated");
    } catch (err) {
      errorToast(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col max-w-[470px] relative w-full text-white bg-teal-600 rounded-[7px] p-[16px]">
      <h4 className="text-[24px] font-semibold whitespace-nowrap text-ellipsis overflow-hidden">
        {task}
      </h4>
      <p className="text-[17px] opacity-[.7] mb-[4px] font-medium whitespace-nowrap text-ellipsis overflow-hidden">
        {details}
      </p>

      {status ? (
        <div className="text-[15px] mb-[5px] font-bold flex items-center">
          <span className="block">End date:</span>
          <span className="block ml-[9px]">
            {moment(updatedAt).format("lll")}
          </span>
        </div>
      ) : (
        <div className="text-[15px] mb-[5px] font-bold flex items-center">
          <span className="block">Start date:</span>
          <span className="block ml-[9px]">
            {moment(createdAt).format("lll")}
          </span>
        </div>
      )}
      <label className="inline-flex mr-auto items-center gap-[5px] cursor-pointer">
        <input
          className="accent-black w-[16px] h-[16px]"
          type="checkbox"
          defaultChecked={status}
          disabled={isLoading}
          onChange={handleStatusUpdate}
        />
        <span>{status ? "completed" : "mark as completed"}</span>
        {isLoading && <img src={spinnerImg} alt="spinner" />}
      </label>
      <div className="absolute top-[3px] right-[3px] flex flex-col gap-[5px] items-center">
        <button
          className="flex"
          onClick={() => setModal(true)}
          title="edit task"
        >
          <FiEdit className="text-[20px]" />
        </button>
        <button className="flex" onClick={handleDeleteTodo} title="delete task">
          <MdDeleteOutline className="text-[25px]" />
        </button>
        <button
          className="flex"
          // onClick={handleDeleteTodo}
          role="info"
          title="show info"
        >
          <MdInfoOutline className="text-[21px]" />
        </button>
      </div>
      {modal ? (
        <Modal modalClose={() => setModal(false)}>
          <EditTaskModalInner id={_id} modalClose={() => setModal(false)} />
        </Modal>
      ) : null}
    </div>
  );
};
export default TaskCard;
