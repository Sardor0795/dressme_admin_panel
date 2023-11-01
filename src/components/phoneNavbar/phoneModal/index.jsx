import { NavLink } from "react-router-dom";
import { XIcon } from "../../../assets/icon";
import { sidebarData } from "../../../utils/sidebarData";

export default function PhoneModal({ setPhoneModalOpen, phoneModalOpen }) {
  return (
    <div className={`w-full px-4 md:px-10`}>
      <div
        className={`fixed cursor-pointer z-[200] inset-0 w-full h-full bg-black opacity-40 ${
          phoneModalOpen ? "" : "hidden"
        }`}
        onClick={() => setPhoneModalOpen(false)}
      ></div>
      <section
        className={`max-w-[90%] md:max-w-[550px] z-[201] mx-auto w-full flex-col h-fit bg-white fixed py-[30px] md:py-[35px] px-[20px] md:px-[50px] rounded-t-lg rounded-b-lg md:top-[50%] duration-300 overflow-hidden left-1/2 right-1/2 translate-x-[-50%] translate-y-[-50%] ${
          phoneModalOpen ? "bottom-0 flex" : "hidden z-[-10]"
        }`}
      >
        <div className="w-full py-16">
          {sidebarData.map((item) => {
            return (
              <NavLink
                className="flex px-6 py-4 rounded-md text-lg font-AeonikProMedium"
                key={item?.id}
                to={item.path}
                style={({ isActive }) => ({
                  color: isActive ? "#007DCA" : "#2C2C2C",
                  backgroundColor: isActive ? "#F2F2F2" : null,
                })}
              >
                <span className="mr-4 flex w-[24px]">{item.icon}</span>
                {item.title}
              </NavLink>
            );
          })}
        </div>

        {/* X button */}

        <button
          onClick={() => setPhoneModalOpen(false)}
          className="absolute top-5 right-5 p-[5px] border border-[F2F2F2] rounded-lg"
        >
          <XIcon />
        </button>
      </section>
    </div>
  );
}
