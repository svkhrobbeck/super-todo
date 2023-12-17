import { BiAddToQueue } from "react-icons/bi";
import { FaMoon, FaSun } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { useDashboardContext } from "../layouts/dashboard-layout";
import { Link } from "react-router-dom";
import logo from "/images/logo.svg";
import { Modal, AddTaskModalInner } from ".";
import { useState } from "react";
import moment from "moment";

const Header = () => {
  const { user } = useDashboardContext();
  const [modal, setModal] = useState(false);
  const [time, setTime] = useState("");

  setInterval(() => {
    const time = moment(Date.now()).format("LTS");
    setTime(time);
  }, 1000);

  const modalClose = () => setModal(false);

  return (
    <header className="sticky flex justify-between items-center w-full py-[14px] px-[25px] bg-teal-600 text-teal-900">
      <Link className="flex items-center !outline-white" to=".">
        <img src={logo} alt="super todo logo" />
      </Link>
      <div className="flex items-center gap-[7px]">
        <p className="font-medium select-none">{time}</p>
        <button className="flex" onClick={() => setModal(true)}>
          <BiAddToQueue className="text-[25px]" />
        </button>
        <button className="rounded-full">
          <FaMoon className="text-[22px]" />
          {/* <FaSun className="text-[22px]" /> */}
        </button>
        <Link className="flex rounded-full" to="settings">
          {user?.picture ? (
            <img
              className="w-[30px] rounded-full aspect-[1/1]"
              src={user.picture}
              alt="user avatar"
            />
          ) : (
            <VscAccount className="text-[30px] rounded-full" />
          )}
        </Link>
      </div>
      {modal ? (
        <Modal modalClose={modalClose}>
          <AddTaskModalInner modalClose={modalClose} />
        </Modal>
      ) : null}
    </header>
  );
};

export default Header;
