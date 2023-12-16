import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import errorToast from "../helpers/errorToast";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import Modal from "./modal";
import spinnerImg from "/images/spinner.svg";
import { EditTaskModalInner } from ".";
import { toast } from "react-toastify";

const TaskCard = ({ _id, task, status, createdAt, updatedAt }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const modalClose = () => setModal(false);

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
    <div className="flex flex-col max-w-[400px] relative w-full text-white bg-teal-600 rounded-[7px] p-[16px]">
      <h4 className="text-[15px] font-bold whitespace-nowrap text-ellipsis overflow-hidden">
        {task}
      </h4>

      {status ? (
        <div className="text-[12px] font-bold flex items-center">
          <span className="block">End date:</span>
          <span className="block ml-[9px]">
            {moment(updatedAt).format("lll")}
          </span>
        </div>
      ) : (
        <div className="text-[12px] font-bold flex items-center">
          <span className="block">Start date:</span>
          <span className="block ml-[9px]">
            {moment(createdAt).format("lll")}
          </span>
        </div>
      )}
      <label className="inline-flex mr-auto items-center gap-[5px]">
        <input
          className="w-[16px] h-[16px] accent-black"
          type="checkbox"
          defaultChecked={status}
          disabled={isLoading}
          onChange={handleStatusUpdate}
        />
        <span>Mark as completed</span>
        {isLoading && <img src={spinnerImg} alt="spinner" />}
      </label>
      <div className="absolute top-[3px] right-[3px] flex flex-col items-center">
        <button className="flex" onClick={() => setModal(true)}>
          <FiEdit className="text-[20px]" />
        </button>
        <button className="flex" onClick={handleDeleteTodo}>
          <MdDeleteOutline className="text-[25px]" />
        </button>
      </div>
      {modal ? (
        <Modal modalClose={modalClose}>
          <EditTaskModalInner id={_id} modalClose={modalClose} />
        </Modal>
      ) : null}
    </div>
  );
};
export default TaskCard;
