import { IAppEmployee } from "../../../../../core/interfaces/interface.ts";
import TableDataWrapper from "./tableData.ts";
import Button from "../../../../../components/Button/Button.tsx";
import { useNavigate } from "react-router-dom";
import { concatenateNames } from "../../../../../utils/helper.ts";
import Checkbox from "../../../../../components/Checkbox/Checkbox.tsx";
import React, { useState } from "react";
import { TableDataStyles } from "../../../../../core/constants/components/text/textStyledComponents.ts";
import SkillsChip from "../../../../../components/Skills/SkillsChip.tsx";
import { ChipWrapper } from "../../../../../components/Skills/chip.ts";
import DeleteModal from "../../../../../components/DeleteModal/DeleteModal.tsx";
import { useAppSelector } from "../../../../../hooks/reduxHooks.ts";
import { AES } from "crypto-js";

function TableData({
  employee,
  index,
  deleteCheckBoxesList,
}: {
  employee: IAppEmployee;
  index: number;
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
}) {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userData);

  const encryptedId = AES.encrypt(
    `${employee.id}`,
    import.meta.env.VITE_ENCRYPTION_SECRET
  ).toString();

  const handleEmployeeDetailsView = () => {
    navigate(`/view-employee/${encodeURIComponent(encryptedId)}`);
  };

  const [deleteModal, setDeleteModal] = useState(false);
  const handleDeleteButtonClick = () => {
    setDeleteModal((prev) => !prev);
  };

  return (
    <>
      <TableDataWrapper
        key={employee.id}
        className={index % 2 !== 0 ? "alternate-table-row-color" : ""} // alternate colour for each row
        onClick={handleEmployeeDetailsView}
      >
        {user.employeeDetails?.accessControlRole === "admin" && (
          <TableDataStyles className="employee-data small-column">
            <Checkbox
              employeeId={employee.id}
              deleteCheckBoxesList={deleteCheckBoxesList}
              disabled={employee.id === user.employeeDetails.id}
            />
          </TableDataStyles>
        )}
        {/* navigating to view employee page */}
        <TableDataStyles className="employee-data overflow-ellipsis medium-column">
          {employee.lastName
            ? concatenateNames(employee.firstName, employee.lastName)
            : employee.firstName}
        </TableDataStyles>

        <TableDataStyles className="employee-data">
          {employee.designation || "-"}
        </TableDataStyles>
        <TableDataStyles className="employee-data">
          {employee.department.label || "-"}
        </TableDataStyles>
        <TableDataStyles className="employee-data">
          {employee.role.label || "-"}
        </TableDataStyles>
        <TableDataStyles className="employee-data">
          <ChipWrapper
            $color={`${employee.isActive ? "GREEN_COLOR" : "RED_COLOR"}`}
            $backgroundColor={`${employee.isActive
                ? "GREEN_BACKGROUND_COLOR"
                : "RED_BACKGROUND_COLOR"
              }`}
          >
            {employee.isActive ? "Active" : "Inactive"}
          </ChipWrapper>
        </TableDataStyles>
        <TableDataStyles className="employee-data skills-data">
          <SkillsChip skills={employee.skills} />
        </TableDataStyles>
        {user.employeeDetails?.accessControlRole === "admin" && (
          <TableDataStyles className="employee-data medium-column">
            <div className=" actions-list common-flex">
              {/* navigating to edit employee page */}
              <Button
                icon="edit"
                onClick={(e) => {
                  e?.stopPropagation();
                  navigate(`/edit-employee/${encodeURIComponent(encryptedId)}`);
                }}
              ></Button>
              <Button
                onClick={(e) => {
                  e?.stopPropagation();
                  handleDeleteButtonClick();
                }}
                className="deleteBtn"
                icon="delete"
                disabled={employee.id === user.employeeDetails.id}
              ></Button>
            </div>
          </TableDataStyles>
        )}
      </TableDataWrapper>
      {deleteModal && (
        <>
          <div className="overlay" onClick={handleDeleteButtonClick}></div>
          <DeleteModal
            changeDeleteModalOpenStatus={handleDeleteButtonClick}
            employeesToDelete={[employee.id]}
          />
        </>
      )}
    </>
  );
}

export default TableData;
