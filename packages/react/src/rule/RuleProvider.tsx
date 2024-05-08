import React, { useMemo } from 'react';
import { RuleContext } from '../share/context';
import type { RuleContextType } from '../share/context';
  
interface BaseRuleProviderProps {
  children?: React.ReactNode;
}

type RuleProviderProps = BaseRuleProviderProps & RuleContextType

const RuleProvider: React.FC<RuleProviderProps> = (props) => {
  const { customDelete, customActionItem, customActionGroup, customRelation } = props;

  const contextValue = useMemo(() => ({ 
    customDelete, customActionItem, customActionGroup, customRelation 
  }), [customDelete, customActionItem, customActionGroup, customRelation]);

  return (
    <RuleContext.Provider value={contextValue}>
      {props.children}
    </RuleContext.Provider>
  )
}

export default RuleProvider;