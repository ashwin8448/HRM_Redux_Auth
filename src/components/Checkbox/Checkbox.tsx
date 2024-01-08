import React from "react";
import { handleCheckboxChange } from "../../utils/helper";
import CheckboxWrapper from "./checkbox";

function Checkbox({
  employeeId,
  deleteCheckBoxesList,
  employeesIdList,
  disabled,
}: {
  employeeId?: string;
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employeesIdList?: string[];
  disabled?: boolean;
}) {
  return (
    <CheckboxWrapper
      className="checkbox"
      type="checkbox"
      disabled={disabled}
      onClick={(e) => e.stopPropagation()}
      onChange={() =>
        handleCheckboxChange({
          employeeId,
          deleteCheckBoxesList,
          employeesIdList,
        })
      }
      checked={
        employeeId
          ? deleteCheckBoxesList.checkedBoxesList.includes(employeeId)
          : employeesIdList &&
            deleteCheckBoxesList.checkedBoxesList.length > 0 &&
            deleteCheckBoxesList.checkedBoxesList.length ===
              employeesIdList.length
          ? deleteCheckBoxesList.checkedBoxesList.every((id) =>
              employeesIdList.includes(id)
            )
          : deleteCheckBoxesList.checkedBoxesList.length ===
            employeesIdList?.length
      }
    />
  );
}

export default Checkbox;
