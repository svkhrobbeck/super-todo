import { useDashboardContext } from "../layouts/dashboard-layout";
import { IoMdClose } from "react-icons/io";
import { createPortal } from "react-dom";

const Modal = ({ modalClose, children }) => {
  return createPortal(
    <div className="flex items-center justify-center fixed inset-0 bg-black/[.8] z-[300] p-[10px]">
      <div className="bg-white relative pt-[20px] pb-[8px] px-[20px] max-w-[700px] w-full rounded-md flex flex-col">
        <button className="absolute top-[2px] right-[2px]" onClick={modalClose}>
          <IoMdClose className="text-[24px] text-teal-600" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
export default Modal;
