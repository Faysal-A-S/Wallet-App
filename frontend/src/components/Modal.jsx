import React from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
const Modal = ({ open, onClose, children, title }) => {
  return (
    <div
      onClick={onClose}
      className={`m-2 md:m-0 fixed inset-0 flex justify-center items-center transition-colors
    ${open ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
        bg-white rounded-xl shadow p-6 transition-all
          ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <div className="text-zinc-800 ">
          <h1 className="absolute top-2 right-[40%]  p-1  text-2xl font-black text-gray-800 ">
            {title}
          </h1>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 p-1 rounded-lg text-red-400  hover:text-red-600"
          >
            <IoCloseCircleSharp size={25} />
          </button>
        </div>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
