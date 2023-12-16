import React from "react";

function Checkbox({
  employeeId,
  deleteCheckBoxesList,
  employeesIdList,
}: {
  employeeId?: string;
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  employeesIdList?: string[];
}) {
  // handle checkbox
  const handleCheckboxChange = () => {
    deleteCheckBoxesList.setCheckedBoxesList((prevList) => {
      if (employeeId) {
        // Toggle the checkbox for individual employee
        return prevList.includes(employeeId)
          ? prevList.filter((id) => id !== employeeId)
          : [...prevList, employeeId];
      } else if (employeesIdList) {
        // Toggle the checkbox for all employees
        return prevList.length === employeesIdList.length
          ? [] // Uncheck all if all are checked
          : employeesIdList; // Check all if not all are checked
      }

      return prevList;
    });
  };

  return (
    <input
      type="checkbox"
      onChange={handleCheckboxChange}
      checked={
        employeeId
          ? deleteCheckBoxesList.checkedBoxesList.includes(employeeId)
          : employeesIdList
          ? deleteCheckBoxesList.checkedBoxesList.length === employeesIdList.length
          : false
      }
    />
  );
}

export default Checkbox;