import React from "react";

interface RuleRelationProps {
  relation: string;
  toggleReleation: () => void;
}
const RuleRelation: React.FC<RuleRelationProps> = (props) => {
  const { relation, toggleReleation } = props;

  const handleClick = () => {
    toggleReleation();
  };

  return (
    <div className="releation-custom" onClick={handleClick}>
      <span className="releation">{relation === "||" ? "或" : "且"}</span>
    </div>
  );
};

export default RuleRelation;
