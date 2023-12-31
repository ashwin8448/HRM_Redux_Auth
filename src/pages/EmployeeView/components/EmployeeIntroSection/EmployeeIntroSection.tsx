import { useLocation, useNavigate } from "react-router";
import { useMediaQuery } from "usehooks-ts";
import Button from "../../../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../../../components/Button/buttonGrpWrapper.ts";
import DummyImg from "../../../../assets/userAvatar.svg";
import { useState } from "react";
import { IAppEmployee } from "../../../../core/interfaces/interface.ts";
import { FieldValues } from "react-hook-form";
import DeleteModal from "../../../../components/DeleteModal/DeleteModal.tsx";
import EmployeeIntroSectionWrapper from "./employeeIntroSection.ts";
import { getUrlType } from "../../../../utils/helper.ts";
import {
  H2Styles,
  ParagraphStyles,
} from "../../../../core/constants/components/text/textStyledComponents.ts";
import ActiveDot from "../../../../components/ActiveDot/ActiveDot.tsx";

function EmployeeIntroSection({
  employee,
}: {
  employee: IAppEmployee | FieldValues;
}) {
  const matchesWithTab = useMediaQuery("(min-width: 768px)");
  const matchesWithMobile = useMediaQuery("(max-width: 480px)");

  const navigate = useNavigate();
  const location = useLocation();
  const [deleteModal, setDeleteModal] = useState(false);

  const handleDeleteButtonClick = () => {
    setDeleteModal((prev) => !prev);
  };

  return (
    <>
      <EmployeeIntroSectionWrapper className="common-flex ">
        <div className="photo-container">
          <img
            src={
              employee.photoId === "" ||
              employee.photoId === undefined ||
              (typeof employee.photoId === "object" && !employee.photoId.length)
                ? DummyImg
                : typeof employee.photoId === "string"
                ? employee.photoId
                : URL.createObjectURL(employee.photoId[0])
            }
            alt="Employee image"
            className=" photo"
          />
        </div>
        <div className="common-flex employee-intro">
          <div className="common-flex intro-title">
            <H2Styles>{employee.firstName + " " + employee.lastName}</H2Styles>
            <ActiveDot isActive={employee.isActive}></ActiveDot>
          </div>
          <ParagraphStyles>{employee.role.label}</ParagraphStyles>
        </div>

        {getUrlType(location.pathname) === "view-employee" && (
          <ButtonGrpWrapper className="btn-grp common-flex">
            <Button
              icon="edit"
              onClick={() => navigate(`/edit-employee/${employee!.id}`)}
            >
              {(matchesWithMobile || matchesWithTab) && (
                <>
                  {matchesWithMobile && "Edit Profile"}
                  {matchesWithTab && "Edit Profile"}
                </>
              )}
            </Button>
            <Button icon="delete" onClick={() => handleDeleteButtonClick()}>
              {(matchesWithMobile || matchesWithTab) && (
                <>
                  {matchesWithMobile && "Delete Profile"}
                  {matchesWithTab && "Delete Profile"}
                </>
              )}
            </Button>
          </ButtonGrpWrapper>
        )}
      </EmployeeIntroSectionWrapper>
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

export default EmployeeIntroSection;
