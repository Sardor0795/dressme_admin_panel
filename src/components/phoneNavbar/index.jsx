import { useState } from "react";
import {
  BurgerMenuIcon,
  CalendarIcon,
  MobileSearchIcon,
} from "../../assets/icon";
import PhoneModal from "./phoneModal";

export const PhoneNavbar = () => {
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <button onClick={() => setPhoneModalOpen(true)}>
          <BurgerMenuIcon />
        </button>

        <div>
          <button className="mr-[16px]">
            <MobileSearchIcon />
          </button>
          <button>
            <CalendarIcon />
          </button>
        </div>
      </div>
      <PhoneModal
        phoneModalOpen={phoneModalOpen}
        setPhoneModalOpen={setPhoneModalOpen}
      />
    </>
  );
};
