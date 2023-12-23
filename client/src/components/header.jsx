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
    <header className="sticky top-0 z-[400] flex justify-between items-center w-full py-[14px] px-[25px] bg-teal-600 text-teal-900">
      <Link className="flex items-center !outline-white" to=".">
        <img
          className="w-[150px] 2xl:w-[145px] xl:w-[135px] lg:w-[130px] md:w-[125px] sm:w-[120px]"
          src={logo}
          alt="super todo logo"
        />
      </Link>
      <div className="flex items-center gap-[7px]">
        <p className="font-medium select-none lg:text-[16px] md:text-[15px] whitespace-nowrap">
          {time}
        </p>
        <button className="flex" onClick={() => setModal(true)}>
          <BiAddToQueue className="text-[25px] xl:text-[23px]" />
        </button>
        <button className="rounded-full">
          <FaMoon className="text-[22px] xl:text-[20px]" />
          {/* <FaSun className="text-[22px]  xl:text-[20px]" /> */}
        </button>
        <Link className="flex rounded-full" to="settings">
          {user?.picture ? (
            <img
              className="w-[30px] xl:w-[28px] lg:w-[26px] rounded-full aspect-[1/1]"
              src={user.picture}
              alt="user avatar"
            />
          ) : (
            <VscAccount className="text-[30px] xl:w-[28px] lg:w-[26px] rounded-full" />
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
