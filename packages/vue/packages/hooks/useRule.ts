import { inject } from 'vue'
import { RuleSymbol } from '../shared/context'

export const useRule = () => {
  return inject(RuleSymbol)
}

export const useRuleNode = (key: string) => {
  const rule: any = useRule()
  return rule.nodeMap[key]
}