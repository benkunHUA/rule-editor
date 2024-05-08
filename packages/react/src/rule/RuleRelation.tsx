import React, { useContext } from "react";
import { RuleContext } from '../share/context';

interface RuleRelationProps {
  relation: string;
  deep: number;
  toggleReleation: () => void;
}
const RuleRelation: React.FC<RuleRelationProps> = (props) => {
  const { relation, toggleReleation, deep } = props;
  const { customRelation } = useContext(RuleContext);

  const handleClick = () => {
    toggleReleation();
  };

  return (
    <div className="releation-custom" onClick={handleClick}>
      {
        customRelation ? customRelation(relation, deep) : (
          <span className="releation">{relation === "||" ? "或" : "且"}</span>
        )
      }
    </div>
  );
};

export default RuleRelation;
