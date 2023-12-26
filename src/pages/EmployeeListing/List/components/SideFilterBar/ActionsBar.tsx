import Button from "../../../../../components/Button/Button.tsx";
import {
  IData,
  ISelectOptionProps,
} from "../../../../../core/interfaces/interface.ts";
import { useSelector } from "react-redux";
import FilterSelect from "../../../../../components/FilterSelect/FilterSelect.tsx";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDropdownData } from "../../../../../core/store/actions.ts";
import store from "../../../../../core/store/configureStore.ts";
import ActionsWrapper from "./actionsBar.ts";
import ButtonGrpWrapper from "../../../../../components/Button/buttonGrpWrapper.ts";

function ActionsBar({ onClick }: { onClick: () => void }) {
  const skills = useSelector(
    (state: IData) => state.dropdownData.skills.skills
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("skillIds");
  const skillIdsArray: ISelectOptionProps[] = filter
    ? filter.split(",").map((value: string) => ({
        value: Number(value),
        label:
          skills?.find((option) => option.value === Number(value))?.label || "",
      }))
    : [];
  const updateSearchParams = (params?: {
    page?: string;
    skillIds?: string;
  }) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      ...params,
    });
  };

  const [skillFilterState, setSkillFilterState] =
    useState<ISelectOptionProps[]>(skillIdsArray);
  const skillFilterValue = { skillFilterState, setSkillFilterState };

  const applyFilters = () => {
    const skillFiltersParams = skillFilterState
      .map((option: ISelectOptionProps) => option.value)
      .join(",");
    updateSearchParams({ skillIds: skillFiltersParams });
    const displayValue = searchParams.get("display");
    if (displayValue === "List") updateSearchParams({ page: "1" });
    onClick();
  };
  const resetFilters = () => {
    setSkillFilterState([]);
    searchParams.delete("skillIds");
    const displayValue = searchParams.get("display");
    if (displayValue === "List") updateSearchParams({ page: "1" });
    else updateSearchParams();
    onClick();
  };
  useEffect(() => {
    store.dispatch(fetchDropdownData());
  }, []);

  return (
    <>
      <ActionsWrapper>
        <FilterSelect
          label="Skills"
          options={skills}
          placeholder="Select skills"
          isMulti={true} //employees can have multiple skills
          value={skillFilterValue}
        />
        <ButtonGrpWrapper className=" btn-grp">
          <Button icon="" className="filter-all-btn" onClick={applyFilters}>
            Apply Filters
          </Button>
          <Button icon="" onClick={resetFilters}>
            Clear
          </Button>
        </ButtonGrpWrapper>
      </ActionsWrapper>
    </>
  );
}
export default ActionsBar;