declare module '@ben/rule-editor-vue' {
  import { DefineComponent } from 'vue'
  import type { InjectionKey } from 'vue'

  const RuleProvide: DefineComponent<{}, {}, any>;
  const RuleGroup: DefineComponent<{}, {}, any>;
  const RuleItem: DefineComponent<{}, {}, any>;
  const useRule: () => any;
  const connect: (a: any, b: any, c: any) => DefineComponent<{}, {}, any>;
  const RuleSoltsKey: InjectionKey<any>;
  const ChangeKey: InjectionKey<(t: string, v: any) => void>;
  export {
    RuleProvide,
    RuleGroup,
    RuleItem,
    useRule,
    connect,
    RuleSoltsKey,
    ChangeKey
  }
}