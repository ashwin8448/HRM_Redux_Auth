import React from "react";
import Button from "../../../../../../components/Button/Button.tsx";
import ButtonGrpWrapper from "../../../../../../components/Button/buttonGrpWrapper.ts";
import {
  TableActionsWrapper,
  DeleteBtnWrapper,
} from "./tableActions.ts";
import DeleteModal from "../../../../../../components/DeleteModal/DeleteModal.tsx";
import Tooltip from "../../../../../../components/Tooltip/Tooltip.tsx";

function TableActions({
  deleteCheckBoxesList,
  deleteModal,
  changeDltModalOpenStatus,
  handleActiveListing,
  listingActive,
}: {
  deleteCheckBoxesList: {
    checkedBoxesList: string[];
    setCheckedBoxesList: React.Dispatch<React.SetStateAction<string[]>>;
  };
  deleteModal: boolean;
  changeDltModalOpenStatus: () => void;
  handleActiveListing: (button: string) => void;
  listingActive: string;
}) {
  return (
    <>
      <TableActionsWrapper className="common-flex global-padding">
        <ButtonGrpWrapper className=" btn-grp-view">
          <Button
            icon="format_list_bulleted"
            className={listingActive === "List" ? "active" : ""}
            onClick={() => handleActiveListing("List")}
            $noTransition={true}
          >
            List
          </Button>
          <Button
            icon="grid_on"
            className={listingActive === "Grid" ? "active" : ""}
            onClick={() => handleActiveListing("Grid")}
            $noTransition={true}
          >
            Grid
          </Button>
        </ButtonGrpWrapper>
        <DeleteBtnWrapper
          className="common-flex"
          $disabled={deleteCheckBoxesList.checkedBoxesList.length == 0}
        >
          {deleteCheckBoxesList.checkedBoxesList.length > 0 && (
            <p className="message-text">
              {deleteCheckBoxesList.checkedBoxesList.length.toString()} items
              selected
            </p>
          )}
          <>
            <Button
              icon="delete"
              onClick={changeDltModalOpenStatus}
              disabled={deleteCheckBoxesList.checkedBoxesList.length == 0}
              $noTransition={deleteCheckBoxesList.checkedBoxesList.length == 0}
            >
              Delete
            </Button>{" "}
            {deleteCheckBoxesList.checkedBoxesList.length == 0  &&(
              <Tooltip className="dlt-btn-tooltip" message=" Do select the employees to delete the necessary ones" />
            )}
          </>
        </DeleteBtnWrapper>
      </TableActionsWrapper>
      {deleteModal && (
        <div className="overlay" onClick={changeDltModalOpenStatus}></div>
      )}
      {deleteModal && (
        <DeleteModal
          changeDltModalOpenStatus={changeDltModalOpenStatus}
          idArrayToDlt={deleteCheckBoxesList.checkedBoxesList}
          handleActiveListing={handleActiveListing}
        />
      )}
    </>
  );
}
export default TableActions;