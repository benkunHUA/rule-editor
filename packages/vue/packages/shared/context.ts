import type { InjectionKey } from 'vue'

export const RuleSymbol = Symbol('rule')
export const RuleSoltsKey = Symbol('ruleSolts') as InjectionKey<any>
export const ChangeKey = Symbol('change') as InjectionKey<(t: string, v: any) => void>