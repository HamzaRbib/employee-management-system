import { createContext } from "react";
import EmployeeType from "../server/types/Employee";

export const EmployeeContext = createContext<{
  employees: Array<EmployeeType>;
  trigger: boolean;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}>(
  {} as {
    employees: Array<EmployeeType>;
    trigger: boolean;
    setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  }
);
