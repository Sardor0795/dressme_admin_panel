import { useState } from "react";
import { BurgerMenuIcon, SearchIcon } from "../../assets/icon";
import PhoneModal from "./phoneModal";

export const PhoneNavbar = ({ filterFuncCloThes, filterFuncSellers }) => {
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);

  return (
    <>
      <div className="flex w-full items-center justify-between h-[35px]">
        <button onClick={() => setPhoneModalOpen(true)}>
          <BurgerMenuIcon />
        </button>

        <label className="px-[13px] relative w-full max-w-[200px] md:hidden flex items-center border border-searchBgColor rounded-lg">
          {filterFuncCloThes ? (
            <input
              className="text-[13px] md:text-base outline-none w-full h-[30px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium  placeholder-text-black pr-8"
              type="email"
              placeholder="Поиск"
              required
              inputMode="search"
              onChange={(e) => filterFuncCloThes(e)}
            />
          ) : (
            <input
              className="text-[13px] md:text-base outline-none w-full h-[30px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium  placeholder-text-black pr-8"
              type="email"
              placeholder="Поиск"
              required
              inputMode="search"
              onChange={(e) => filterFuncSellers(e)}
            />
          )}

          <button className="absolute top-0 right-0 active:scale-90 rounded-r-lg bg-[#F7F7F7] h-full w-[35px] flex items-center justify-center">
            <SearchIcon />
          </button>
        </label>
      </div>
      <PhoneModal
        phoneModalOpen={phoneModalOpen}
        setPhoneModalOpen={setPhoneModalOpen}
      />
    </>
  );
};
