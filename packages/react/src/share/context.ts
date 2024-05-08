import { createContext } from 'react';

interface RuleContextType {
  customDelete?: React.ReactNode;
  customActionItem?: (addFn: () => void, deep: number) => React.ReactNode;
  customActionGroup?: (addFn: () => void, deep: number) => React.ReactNode;
  customRelation?: (relation: string, deep: number) => React.ReactNode;
}

const RuleContext = createContext<RuleContextType>({});

export {
  RuleContext
}

export type {
  RuleContextType
}