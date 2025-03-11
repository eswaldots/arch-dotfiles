import { ReactNode } from "@tanstack/react-router";
import { createContext, useState, useContext } from "react";

export interface Children {
  id: string;
  children_name: string;
  children_surnames: string;
  children_birthday: string;
  children_age: string;
  children_grade: string;
}

export interface Relative {
  id: string;
  relationship: string;
  relative_name: string;
  relative_surname: string;
  relative_birthday: string;
  relative_age: string;
  relative_grade: string;
  relative_phone: string;
  relative_address: string;
}

interface ContextType {
  childrens: Children[];
  addChild: (child: Children) => void;
  removeChild: (child: Children) => void;
  relatives: Relative[];
  addRelative: (relative: Relative) => void;
  removeRelative: (relative: Relative) => void;
}

const Context = createContext<undefined | ContextType>(undefined);

const RelativesProvider = (props: { children: ReactNode }) => {
  const [childrens, setChildrens] = useState<Children[]>(
    JSON.parse(localStorage.getItem("repein_childrens") || "[]")
  );
  const [relatives, setRelatives] = useState<Relative[]>(
    JSON.parse(localStorage.getItem("repein_relatives") || "[]")
  );

  const addChild = (child: Children) => {
    setChildrens([...childrens, child]);
  };

  const removeChild = (child: Children) => {
    setChildrens(
      childrens.filter((c) => c.children_name !== child.children_name)
    );
  };

  const addRelative = (relative: Relative) => {
    setRelatives([...relatives, relative]);
  };

  const removeRelative = (relative: Relative) => {
    setRelatives(
      relatives.filter((r) => r.relative_name !== relative.relative_name)
    );
  };

  return (
    <Context.Provider
      value={{
        childrens,
        addChild,
        removeChild,
        relatives,
        addRelative,
        removeRelative
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

const useRelatives = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error("useRelatives must be used within a RelativesProvider");
  }

  return context;
};

export { useRelatives, RelativesProvider };
