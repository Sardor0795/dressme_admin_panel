import { createContext, useState } from "react";

export const IdsContext = createContext();

export const IdContextProvider = ({ children }) => {
  const [IdContext, setIdContext] = useState({ type: "single", id: null });

  console.log(IdContext, 'idContext');

  return (
    <IdsContext.Provider value={[IdContext, setIdContext]}>
      {children}
    </IdsContext.Provider>
  );
};
