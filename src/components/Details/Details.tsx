import { useState } from "react";
import { ISkill } from "../../core/interfaces/interface";
import SkillsChip from "../Skills/SkillsChip.tsx";
import Tooltip from "../Tooltip/Tooltip.tsx";
import DetailsWrapper from "./details.ts";

const DetailsSection = ({
  icon,
  title,
  content,
  newline,
}: {
  icon?: string;
  title?: string;
  content: string | ISkill[];
  matches?: boolean;
  newline?: boolean;
}) => {
  //tooltip on hovering skills
  const [hover, setHover] = useState(false);
  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };
  //check for skills overflowing the scroll width
  const [skillsOverflow, setSkillsOverflow] = useState(false);
  const handleSkillsOverflow = (isOverflow: boolean) => {
    setSkillsOverflow(isOverflow);
  };
  return (
    <DetailsWrapper $newline={newline} $skill={typeof content != "string"} onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className="description"
      >
        <span className="material-symbols-outlined ">{icon}</span>
        {title && <span className="title">{title}</span>}
      </div>
      {typeof content === "string" ? (
        <p className="content overflow-ellipsis">{content}</p>
      ) : (
        Array.isArray(content) && content.length > 0 ? (
          <>
            <SkillsChip
              className="overflow-ellipsis"
              skills={content}
              handleSkillsOverflow={handleSkillsOverflow}
            />
            {hover && skillsOverflow && <Tooltip message={content} />}
          </>
        ) : (
          "-"
        )

      )}
    </DetailsWrapper>
  );
};

export default DetailsSection;
