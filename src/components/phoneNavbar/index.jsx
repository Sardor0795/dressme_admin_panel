import { useState } from "react";
import {
  BurgerMenuIcon,
  MobileSearchIcon,
  SearchIcon,
} from "../../assets/icon";
import PhoneModal from "./phoneModal";

export const PhoneNavbar = () => {
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);

  return (
    <>
      <div className="flex w-full items-center justify-between h-[35px]">
        <button onClick={() => setPhoneModalOpen(true)}>
          <BurgerMenuIcon />
        </button>

        <label className="px-[13px] w-full max-w-[200px] md:hidden flex items-center border border-searchBgColor rounded-lg">
          <input
            className="text-[13px] md:text-base outline-none w-full h-[30px] xs:h-12 placeholder-not-italic placeholder-font-AeonikProMedium  placeholder-text-black pr-2"
            type="email"
            placeholder="Поиск"
            required
            inputMode="search"
          />
          <button className="cursor-pointer">
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
