import { XIcon } from "../../../assets/icon";

export default function CancelModal({ setModalOpen, modalOpen }) {
  return (
    <div className={`w-full px-4  md:px-10`}>
      <div
        className={`fixed cursor-pointer z-[200] inset-0 w-full h-full bg-black opacity-40 ${
          modalOpen ? "" : "hidden"
        }`}
        onClick={() => setModalOpen(false)}
      ></div>
      <section
        className={` max-w-[440px] md:max-w-[550px] z-[201] mx-auto w-full flex-col h-fit bg-white fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${
          modalOpen ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
        }`}
      >
        <div className="w-full h-fit flex items-center justify-center mb-6">
          <p className="text-tableTextTitle2 text-2xl not-italic font-AeonikProRegular">
            Причина отказа
          </p>
        </div>
        <textarea
          className="border p-3 h-32 mb-10 outline-none font-AeonikProRegular resize-none border-borderColor2 rounded-[6px]"
          placeholder="Опишите проблему"
        ></textarea>
        <button
          onClick={() => setModalOpen(false)}
          className="w-full active:scale-95  active:opacity-70 h-[40px] xs:h-12 rounded-lg flex items-center gap-x-[10px] justify-center bg-weatherWinterColor"
        >
          <span className="text-center text-base md:text-lg text-white not-italic font-AeonikProMedium">
            Отправить
          </span>
        </button>

        {/* X button */}

        <button
          onClick={() => setModalOpen(false)}
          className="absolute top-5 right-5 p-[5px] border border-[F2F2F2] rounded-lg"
        >
          <XIcon />
        </button>
      </section>
    </div>
  );
}
